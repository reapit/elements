import { SourceFile, SyntaxKind } from 'ts-morph'
import {
  isElementsImport,
  createProjectFromSource,
  getImportAliases,
  hasJsxUsage,
  hasIdentifierUsage,
  addImportsToTarget,
  resolveTargetSpecifier,
  transformTypeReferences,
  transformIdentifierReferences,
  syncClosingTag,
  shouldUseJsxComment,
  getReExportedLocalNames,
} from '../shared/index.js'

/**
 * Codemod to replace DeprecatedPagination with the new Pagination component.
 *
 * Import transformations:
 * - DeprecatedPagination -> Pagination (from @reapit/elements/core/pagination or facade package)
 * - DeprecatedPaginationProps -> removed (type references rewritten to Pagination.Props)
 *
 * Type transformations:
 * - DeprecatedPaginationProps -> Pagination.Props
 *
 * JSX element transformations:
 * - <DeprecatedPagination> -> <Pagination>
 * - callback prop -> onPageChange
 * - currentPage prop -> pageNumber
 * - numberPages prop -> pageCount
 * - hasStartButton / hasEndButton props -> removed with a TODO comment
 *
 * Skipped:
 * - Re-export declarations (left unchanged)
 * - Sub-components, helper functions, and styled components from the deprecated module
 * - Files not containing DeprecatedPagination or DeprecatedPaginationProps
 */
const TARGET_SPECIFIER = '@reapit/elements/core/pagination'

/** Props that can be automatically renamed to their new equivalents. */
const PROP_RENAMES: Record<string, string> = {
  callback: 'onPageChange',
  currentPage: 'pageNumber',
  numberPages: 'pageCount',
}

/** Props that have no direct equivalent and must be removed with a TODO. */
const PROPS_WITH_NO_EQUIVALENT = new Set(['hasStartButton', 'hasEndButton'])

function transformImports(sourceFile: SourceFile, needsPaginationImport: boolean, facadePackage?: string): void {
  const importsToAdd: Array<{ name: string; alias?: string; isTypeOnly: boolean; targetSpecifier: string }> = []
  const alreadyMigratedPath = facadePackage ? null : TARGET_SPECIFIER

  const reExportedLocalNames = getReExportedLocalNames(sourceFile)

  for (const importDecl of sourceFile.getImportDeclarations().slice()) {
    if (importDecl.wasForgotten()) continue

    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue
    if (alreadyMigratedPath && moduleSpecifier === alreadyMigratedPath) continue

    const namedImports = importDecl.getNamedImports()
    const namedImportsToRemove: typeof namedImports = []

    for (const namedImport of namedImports) {
      const originalName = namedImport.getName()

      if (originalName === 'DeprecatedPagination') {
        const localName = namedImport.getAliasNode()?.getText() ?? 'DeprecatedPagination'
        // If this local binding is re-exported, preserve the import as-is.
        if (reExportedLocalNames.has(localName)) continue
        if (needsPaginationImport) {
          importsToAdd.push({
            name: 'Pagination',
            alias: namedImport.getAliasNode()?.getText(),
            isTypeOnly: namedImport.isTypeOnly(),
            targetSpecifier: resolveTargetSpecifier(moduleSpecifier, TARGET_SPECIFIER, facadePackage),
          })
        }
        namedImportsToRemove.push(namedImport)
        continue
      }

      if (originalName === 'DeprecatedPaginationProps') {
        const localName = namedImport.getAliasNode()?.getText() ?? 'DeprecatedPaginationProps'
        // If this local binding is re-exported, preserve the import as-is.
        if (reExportedLocalNames.has(localName)) continue
        if (needsPaginationImport) {
          importsToAdd.push({
            name: 'Pagination',
            isTypeOnly: namedImport.isTypeOnly(),
            targetSpecifier: resolveTargetSpecifier(moduleSpecifier, TARGET_SPECIFIER, facadePackage),
          })
        }
        namedImportsToRemove.push(namedImport)
      }
    }

    namedImportsToRemove.forEach((namedImport) => namedImport.remove())

    if (
      importDecl.getNamedImports().length === 0 &&
      !importDecl.getDefaultImport() &&
      !importDecl.getNamespaceImport()
    ) {
      importDecl.remove()
    }
  }

  if (needsPaginationImport && importsToAdd.length === 0) {
    importsToAdd.push({
      name: 'Pagination',
      isTypeOnly: false,
      targetSpecifier: facadePackage ?? TARGET_SPECIFIER,
    })
  }

  const groupedBySpecifier = new Map<string, Array<{ name: string; alias?: string; isTypeOnly: boolean }>>()
  for (const { targetSpecifier, ...entry } of importsToAdd) {
    const group = groupedBySpecifier.get(targetSpecifier) ?? []
    group.push(entry)
    groupedBySpecifier.set(targetSpecifier, group)
  }

  for (const [specifier, entries] of groupedBySpecifier) {
    addImportsToTarget(sourceFile, entries, specifier)
  }
}

/**
 * Transforms DeprecatedPagination JSX elements:
 * - Renames the tag to Pagination
 * - Renames known props (callback, currentPage, numberPages)
 * - Removes props with no equivalent (hasStartButton, hasEndButton) and
 *   records their positions for a context-aware TODO comment insertion.
 *   Inside JSX content: a JSX block comment on its own line before the element.
 *   In expression position: an inline block comment before the element on the same line.
 *
 * TODO comments cannot be inserted via replaceWithText because ts-morph
 * cannot replace a single JSX node with two adjacent sibling nodes. Instead
 * we collect start positions and insert text in reverse order after all
 * AST mutations are complete.
 */
function transformJsxElements(sourceFile: SourceFile, paginationAliases: Set<string>): void {
  // Collect all elements first so mutations don't invalidate the iterator.
  const openingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
  const selfClosingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)

  // Maps start position -> TODO comment text, collected during AST mutation.
  const todoInsertions = new Map<number, string>()

  for (const element of [...openingElements, ...selfClosingElements]) {
    if (element.wasForgotten()) continue

    const tagName = element.getTagNameNode()
    const tagNameText = tagName.getText()
    if (!paginationAliases.has(tagNameText)) continue

    // Snapshot the start position of the outermost JSX node before any mutations
    // shift offsets. For a JsxElement the comment goes before the JsxElement
    // parent; for a self-closing element it goes before the element itself.
    let insertPos: number
    if (element.getKind() === SyntaxKind.JsxOpeningElement) {
      insertPos = element.getParent()?.getStart() ?? element.getStart()
    } else {
      insertPos = element.getStart()
    }

    // Rename the JSX tag.
    if (tagNameText === 'DeprecatedPagination') {
      tagName.replaceWithText('Pagination')
    }

    // Rename/remove props on this element.
    const removedNoEquivalentProps: string[] = []

    for (const attr of element.getAttributes()) {
      if (attr.getKind() !== SyntaxKind.JsxAttribute) continue
      const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute)
      const propName = jsxAttr.getNameNode().getText()

      if (PROP_RENAMES[propName]) {
        jsxAttr.getNameNode().replaceWithText(PROP_RENAMES[propName])
        continue
      }

      if (PROPS_WITH_NO_EQUIVALENT.has(propName)) {
        removedNoEquivalentProps.push(propName)
        jsxAttr.remove()
      }
    }

    // Record TODO insertion for props with no equivalent.
    if (removedNoEquivalentProps.length > 0) {
      const propList = removedNoEquivalentProps.join(', ')
      const verb = removedNoEquivalentProps.length === 1 ? 'has' : 'have'
      const useJsx = shouldUseJsxComment(element)
      const todoText = useJsx
        ? `{/* TODO: ${propList} ${verb} no equivalent in Pagination — implement navigation with leftAction and rightAction */}`
        : `// TODO: ${propList} ${verb} no equivalent in Pagination — implement navigation with leftAction and rightAction`
      todoInsertions.set(insertPos, todoText)
    }

    // Rename the corresponding closing tag if this is a non-self-closing element.
    // Only rename when the original tag was 'DeprecatedPagination' (non-aliased).
    // Aliased elements (e.g. <DP>...</DP>) keep their alias on both tags.
    if (tagNameText === 'DeprecatedPagination') {
      syncClosingTag(element, 'DeprecatedPagination', 'Pagination')
    }
  }

  // Insert TODO comments in reverse position order so earlier positions stay valid.
  const sortedPositions = [...todoInsertions.keys()].sort((a, b) => b - a)
  for (const pos of sortedPositions) {
    const commentText = todoInsertions.get(pos)
    if (!commentText) continue

    // When the comment is a JS line comment (// ...), inserting it at the start
    // of the JSX element would produce broken code in expression position
    // (e.g. `const el = // TODO\n<Pagination />`). Convert it to an inline block
    // comment instead so it sits safely before the element on the same line:
    //   const el = /* TODO ... */ <Pagination />
    if (/^\/\//.test(commentText)) {
      const content = commentText.replace(/^\/\/\s?/, '')
      sourceFile.insertText(pos, `/* ${content} */ `)
    } else {
      // For JSX comments ({/* ... */}), keep them on their own line.
      sourceFile.insertText(pos, `${commentText}\n`)
    }
  }
}

export default function transform(
  source: string,
  filePath: string = 'file.tsx',
  options?: { facadePackage?: string },
): string {
  if (!source.includes('DeprecatedPagination') && !source.includes('DeprecatedPaginationProps')) {
    return source
  }

  const sourceFile = createProjectFromSource(source, filePath)
  const facadePackage = options?.facadePackage

  const paginationAliases = getImportAliases(sourceFile, 'DeprecatedPagination', facadePackage, {
    fallbackToName: true,
  })
  const propsAliases = getImportAliases(sourceFile, 'DeprecatedPaginationProps', facadePackage, {
    fallbackToName: true,
  })

  const hasPaginationUsage =
    hasJsxUsage(sourceFile, paginationAliases) || hasIdentifierUsage(sourceFile, paginationAliases)
  const hasPropsUsage = hasIdentifierUsage(sourceFile, propsAliases)
  const needsPaginationImport = hasPaginationUsage || hasPropsUsage

  transformImports(sourceFile, needsPaginationImport, facadePackage)
  transformTypeReferences(sourceFile, propsAliases, 'Pagination.Props')
  if (needsPaginationImport) {
    // Only rewrite non-aliased 'DeprecatedPagination' references; aliased bindings
    // were already handled correctly by the import transform.
    if (paginationAliases.has('DeprecatedPagination')) {
      transformIdentifierReferences(sourceFile, 'DeprecatedPagination', 'Pagination')
    }
  }
  transformJsxElements(sourceFile, paginationAliases)

  return sourceFile.getFullText()
}
