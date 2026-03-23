import { JsxOpeningElement, JsxSelfClosingElement, Node, Project, QuoteKind, SourceFile, SyntaxKind } from 'ts-morph'
import { isElementsImport, matchesPackage } from '../shared/elements-import.js'

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

/**
 * Returns true if JSX comment syntax should be used ({/* ... *\/}), false for JS block comment (/* *\/).
 *
 * We determine this from the *outer* JSX node:
 * - For an opening tag, that's its parent JsxElement.
 * - For a self-closing tag, that's the element itself.
 *
 * If that outer node is a direct child of a JsxElement or JsxFragment, we are
 * in JSX content and should use JSX comment syntax. Otherwise (e.g. the parent
 * is a ReturnStatement, VariableDeclaration, JsxExpression, etc.) we are in an
 * expression or statement context and must use a JS block comment.
 */
function shouldUseJsxComment(element: JsxOpeningElement | JsxSelfClosingElement): boolean {
  // For non-self-closing tags the opening element's immediate parent is the
  // JsxElement wrapper. Use that as the outer node so we check *its* parent
  // rather than the opening element's parent, which is always JsxElement.
  const outerNode: Node =
    element.getKind() === SyntaxKind.JsxOpeningElement ? (element.getParent() ?? element) : element

  const outerParent = outerNode.getParent()
  if (!outerParent) {
    return false
  }

  const parentKind = outerParent.getKind()
  return parentKind === SyntaxKind.JsxElement || parentKind === SyntaxKind.JsxFragment
}

function resolveTargetSpecifier(sourceSpecifier: string, facadePackage?: string): string {
  if (facadePackage && matchesPackage(sourceSpecifier, facadePackage)) {
    return sourceSpecifier
  }

  return TARGET_SPECIFIER
}

function getDeprecatedPaginationAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()
  let foundElementsImport = false

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    foundElementsImport = true

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'DeprecatedPagination') {
        aliases.add(namedImport.getAliasNode()?.getText() ?? 'DeprecatedPagination')
      }
    }
  }

  // Fallback for snippet tests that have no import declarations at all.
  // If other imports exist but none are from Elements/facade, skip — the symbol
  // is not from Elements and should not be transformed.
  if (aliases.size === 0 && !foundElementsImport && sourceFile.getImportDeclarations().length === 0) {
    aliases.add('DeprecatedPagination')
  }

  return aliases
}

function getDeprecatedPaginationPropsAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()
  let foundElementsImport = false

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    foundElementsImport = true

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'DeprecatedPaginationProps') {
        aliases.add(namedImport.getAliasNode()?.getText() ?? 'DeprecatedPaginationProps')
      }
    }
  }

  // Fallback for snippet tests that have no import declarations at all.
  // If other imports exist but none are from Elements/facade, skip — the symbol
  // is not from Elements and should not be transformed.
  if (aliases.size === 0 && !foundElementsImport && sourceFile.getImportDeclarations().length === 0) {
    aliases.add('DeprecatedPaginationProps')
  }

  return aliases
}

function hasIdentifierUsage(sourceFile: SourceFile, localNames: Set<string>): boolean {
  for (const identifier of sourceFile.getDescendantsOfKind(SyntaxKind.Identifier)) {
    if (!localNames.has(identifier.getText())) continue

    const parent = identifier.getParent()
    if (!parent) continue

    const kind = parent.getKind()
    if (
      kind === SyntaxKind.ImportSpecifier ||
      kind === SyntaxKind.ExportSpecifier ||
      kind === SyntaxKind.JsxOpeningElement ||
      kind === SyntaxKind.JsxSelfClosingElement ||
      kind === SyntaxKind.JsxClosingElement
    ) {
      continue
    }

    // Type references (e.g. `type Props = DeprecatedPaginationProps`) are intentionally
    // treated as usage so we keep/add the Pagination import before rewriting to Pagination.Props.
    return true
  }

  return false
}

function hasDeprecatedPaginationJsxUsage(sourceFile: SourceFile, paginationAliases: Set<string>): boolean {
  const elements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  return elements.some((element) => paginationAliases.has(element.getTagNameNode().getText()))
}

function addImportsToTarget(
  sourceFile: SourceFile,
  importsToAdd: Array<{ name: string; alias?: string; isTypeOnly: boolean }>,
  targetSpecifier: string,
): void {
  if (importsToAdd.length === 0) return

  const currentImportDeclarations = sourceFile.getImportDeclarations()

  let targetDecl = currentImportDeclarations.find(
    (importDecl) => importDecl.getModuleSpecifierValue() === targetSpecifier,
  )

  if (!targetDecl) {
    targetDecl = sourceFile.addImportDeclaration({ moduleSpecifier: targetSpecifier })
  }

  for (const { name, alias, isTypeOnly } of importsToAdd) {
    const existingImport = targetDecl.getNamedImports().find((namedImport) => {
      return namedImport.getName() === name && namedImport.getAliasNode()?.getText() === alias
    })

    if (existingImport) {
      if (existingImport.isTypeOnly() && !isTypeOnly) {
        existingImport.setIsTypeOnly(false)
      }
      continue
    }

    if (alias && alias !== name) {
      const typePrefix = isTypeOnly ? 'type ' : ''
      targetDecl.addNamedImport(`${typePrefix}${name} as ${alias}`)
    } else if (isTypeOnly) {
      targetDecl.addNamedImport({ name, isTypeOnly: true })
    } else {
      targetDecl.addNamedImport(name)
    }
  }
}

function transformImports(sourceFile: SourceFile, needsPaginationImport: boolean, facadePackage?: string): void {
  const importsToAdd: Array<{ name: string; alias?: string; isTypeOnly: boolean; targetSpecifier: string }> = []
  const alreadyMigratedPath = facadePackage ? null : TARGET_SPECIFIER

  // Collect all local names that are re-exported via `export { X }` (without a
  // module specifier). These bindings must not be removed from their import
  // declaration — doing so would leave the export referencing a missing binding.
  const reExportedLocalNames = new Set<string>()
  for (const exportDecl of sourceFile.getExportDeclarations()) {
    if (exportDecl.hasModuleSpecifier()) continue
    for (const spec of exportDecl.getNamedExports()) {
      reExportedLocalNames.add(spec.getNameNode().getText())
    }
  }

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
            targetSpecifier: resolveTargetSpecifier(moduleSpecifier, facadePackage),
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
            targetSpecifier: resolveTargetSpecifier(moduleSpecifier, facadePackage),
          })
        }
        namedImportsToRemove.push(namedImport)
      }
    }

    namedImportsToRemove.forEach((namedImport) => namedImport.remove())

    if (importDecl.getNamedImports().length === 0 && !importDecl.getDefaultImport()) {
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

function transformTypeReferences(sourceFile: SourceFile, propsAliases: Set<string>): void {
  for (const typeRef of sourceFile.getDescendantsOfKind(SyntaxKind.TypeReference)) {
    const typeName = typeRef.getTypeName()
    if (propsAliases.has(typeName.getText())) {
      typeName.replaceWithText('Pagination.Props')
    }
  }

  for (const heritage of sourceFile.getDescendantsOfKind(SyntaxKind.ExpressionWithTypeArguments)) {
    const expression = heritage.getExpression()
    if (propsAliases.has(expression.getText())) {
      expression.replaceWithText('Pagination.Props')
    }
  }
}

function transformIdentifierReferences(sourceFile: SourceFile, paginationAliases: Set<string>): void {
  // Only rewrite the bare (non-aliased) name. When the user writes
  // `import { DeprecatedPagination as DP }`, the import rewrite already emits
  // `import { Pagination as DP }`, so value-site references to `DP` are already
  // correct and must not be changed. Only `DeprecatedPagination` itself (the
  // non-aliased case) needs renaming to `Pagination`.
  if (!paginationAliases.has('DeprecatedPagination')) return

  for (const identifier of sourceFile.getDescendantsOfKind(SyntaxKind.Identifier)) {
    if (identifier.getText() !== 'DeprecatedPagination') continue

    const parent = identifier.getParent()
    if (!parent) continue
    const parentKind = parent.getKind()

    if (
      parentKind === SyntaxKind.ImportSpecifier ||
      parentKind === SyntaxKind.ExportSpecifier ||
      parentKind === SyntaxKind.JsxOpeningElement ||
      parentKind === SyntaxKind.JsxSelfClosingElement ||
      parentKind === SyntaxKind.JsxClosingElement
    ) {
      continue
    }

    identifier.replaceWithText('Pagination')
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
      const jsxElement =
        element.asKind(SyntaxKind.JsxOpeningElement) ?? element.asKind(SyntaxKind.JsxSelfClosingElement)
      const useJsx = jsxElement ? shouldUseJsxComment(jsxElement) : false
      const todoText = useJsx
        ? `{/* TODO: ${propList} ${verb} no equivalent in Pagination — implement navigation with leftAction and rightAction */}`
        : `// TODO: ${propList} ${verb} no equivalent in Pagination — implement navigation with leftAction and rightAction`
      todoInsertions.set(insertPos, todoText)
    }

    // Rename the corresponding closing tag if this is a non-self-closing element.
    // Only rename when the original tag was 'DeprecatedPagination' (non-aliased).
    // Aliased elements (e.g. <DP>...</DP>) keep their alias on both tags.
    if (element.getKind() === SyntaxKind.JsxOpeningElement) {
      const parent = element.getParent()
      if (parent?.getKind() !== SyntaxKind.JsxElement) continue
      const jsxElement = parent.asKind(SyntaxKind.JsxElement)
      const closingTag = jsxElement?.getClosingElement()
      if (
        closingTag &&
        tagNameText === 'DeprecatedPagination' &&
        closingTag.getTagNameNode().getText() === 'DeprecatedPagination'
      ) {
        closingTag.getTagNameNode().replaceWithText('Pagination')
      }
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

  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      jsx: 2, // JsxEmit.React
    },
    manipulationSettings: {
      quoteKind: QuoteKind.Single,
    },
  })

  const sourceFile = project.createSourceFile(filePath, source)
  const facadePackage = options?.facadePackage

  const paginationAliases = getDeprecatedPaginationAliases(sourceFile, facadePackage)
  const propsAliases = getDeprecatedPaginationPropsAliases(sourceFile, facadePackage)

  const hasPaginationUsage =
    hasDeprecatedPaginationJsxUsage(sourceFile, paginationAliases) || hasIdentifierUsage(sourceFile, paginationAliases)
  const hasPropsUsage = hasIdentifierUsage(sourceFile, propsAliases)
  const needsPaginationImport = hasPaginationUsage || hasPropsUsage

  transformImports(sourceFile, needsPaginationImport, facadePackage)
  transformTypeReferences(sourceFile, propsAliases)
  if (needsPaginationImport) {
    transformIdentifierReferences(sourceFile, paginationAliases)
  }
  transformJsxElements(sourceFile, paginationAliases)

  return sourceFile.getFullText()
}
