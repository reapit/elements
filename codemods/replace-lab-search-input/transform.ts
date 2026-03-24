import { Node, Project, QuoteKind, SourceFile, SyntaxKind } from 'ts-morph'
import { isElementsImport, matchesPackage } from '../shared/elements-import.js'

/**
 * Codemod to replace the lab SearchInput with the core SearchInput component.
 *
 * Import transformations:
 * - SearchInput -> SearchInput (from @reapit/elements/core/search-input or facade package)
 * - SearchInputProps -> removed (type references rewritten to SearchInput.Props)
 *
 * Type transformations:
 * - SearchInputProps -> SearchInput.Props
 *
 * JSX prop transformations:
 * - inputSize -> size
 * - isDisabled -> disabled
 * - unstable_onSearch -> removed
 *
 * TODO comment:
 * - A TODO comment is inserted before each JSX statement that contained
 *   unstable_onSearch, prompting the consumer to replace it with onChange.
 *
 * Skipped:
 * - Re-export declarations (left unchanged)
 * - Files not containing SearchInput symbols
 */
const TARGET_SPECIFIER = '@reapit/elements/core/search-input'

const TODO_COMMENT = ' TODO: Replace the removed unstable_onSearch prop with onChange.'

function resolveTargetSpecifier(sourceSpecifier: string, facadePackage?: string): string {
  if (facadePackage && matchesPackage(sourceSpecifier, facadePackage)) {
    return sourceSpecifier
  }

  return TARGET_SPECIFIER
}

function getSearchInputAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'SearchInput') {
        aliases.add(namedImport.getAliasNode()?.getText() ?? 'SearchInput')
      }
    }
  }

  return aliases
}

function getSearchInputPropsAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'SearchInputProps') {
        aliases.add(namedImport.getAliasNode()?.getText() ?? 'SearchInputProps')
      }
    }
  }

  return aliases
}

function hasIdentifierUsage(sourceFile: SourceFile, localNames: Set<string>): boolean {
  for (const identifier of sourceFile.getDescendantsOfKind(SyntaxKind.Identifier)) {
    if (!localNames.has(identifier.getText())) continue

    const parent = identifier.getParent()
    if (!parent) continue

    const kind = parent.getKind()
    if (kind === SyntaxKind.ExportSpecifier) {
      const exportDeclaration = parent.getFirstAncestorByKind(SyntaxKind.ExportDeclaration)
      if (exportDeclaration?.getModuleSpecifierValue()) {
        continue
      }

      return true
    }

    if (
      kind === SyntaxKind.ImportSpecifier ||
      kind === SyntaxKind.JsxOpeningElement ||
      kind === SyntaxKind.JsxSelfClosingElement ||
      kind === SyntaxKind.JsxClosingElement
    ) {
      continue
    }

    // Type references (e.g. `type Props = SearchInputProps`) are intentionally
    // treated as usage so we keep/add the SearchInput import before
    // rewriting to SearchInput.Props.
    return true
  }

  return false
}

function hasSearchInputJsxUsage(sourceFile: SourceFile, searchInputAliases: Set<string>): boolean {
  const elements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  return elements.some((element) => searchInputAliases.has(element.getTagNameNode().getText()))
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

  // If the target declaration is declaration-level type-only (`import type { … }`)
  // but at least one of the imports we are adding is a value import, promote the
  // whole declaration. Specifier-level `isTypeOnly()` returns false inside a
  // declaration-level type-only import, so the per-specifier check below would
  // never fire — we must handle this at the declaration level.
  const needsValueDecl = importsToAdd.some((entry) => !entry.isTypeOnly)
  if (needsValueDecl && targetDecl.isTypeOnly()) {
    targetDecl.setIsTypeOnly(false)
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

function transformImports(sourceFile: SourceFile, needsSearchInputImport: boolean, facadePackage?: string): void {
  const importsToAdd: Array<{ name: string; alias?: string; isTypeOnly: boolean; targetSpecifier: string }> = []
  const alreadyMigratedPath = facadePackage ? null : TARGET_SPECIFIER

  for (const importDecl of sourceFile.getImportDeclarations().slice()) {
    if (importDecl.wasForgotten()) continue

    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue
    if (alreadyMigratedPath && moduleSpecifier === alreadyMigratedPath) continue

    const namedImports = importDecl.getNamedImports()
    const namedImportsToRemove: typeof namedImports = []

    for (const namedImport of namedImports) {
      const originalName = namedImport.getName()

      if (originalName === 'SearchInput') {
        if (needsSearchInputImport) {
          importsToAdd.push({
            name: 'SearchInput',
            alias: namedImport.getAliasNode()?.getText(),
            isTypeOnly: namedImport.isTypeOnly(),
            targetSpecifier: resolveTargetSpecifier(moduleSpecifier, facadePackage),
          })
        }
        namedImportsToRemove.push(namedImport)
        continue
      }

      if (originalName === 'SearchInputProps') {
        if (needsSearchInputImport) {
          const targetSpecifier = resolveTargetSpecifier(moduleSpecifier, facadePackage)
          // Only add an unaliased SearchInput import when no SearchInput entry
          // (aliased or unaliased) has already been queued for this specifier.
          // When SearchInput was imported with an alias, transformTypeReferences
          // uses that alias as the .Props base, so no unaliased import is needed.
          const alreadyQueued = importsToAdd.some(
            (e) => e.name === 'SearchInput' && e.targetSpecifier === targetSpecifier,
          )
          if (!alreadyQueued) {
            importsToAdd.push({
              name: 'SearchInput',
              isTypeOnly: namedImport.isTypeOnly(),
              targetSpecifier,
            })
          }
        }
        namedImportsToRemove.push(namedImport)
      }
    }

    namedImportsToRemove.forEach((namedImport) => namedImport.remove())

    if (
      namedImportsToRemove.length > 0 &&
      importDecl.getNamedImports().length === 0 &&
      !importDecl.getDefaultImport() &&
      !importDecl.getNamespaceImport()
    ) {
      importDecl.remove()
    }
  }

  if (needsSearchInputImport && importsToAdd.length === 0) {
    // importsToAdd is empty when every SearchInput specifier in the file was
    // already at the target path (alreadyMigratedPath guard above skipped them).
    // The import already exists, so addImportsToTarget will silently deduplicate
    // this entry — no duplicate import is produced. This path exists only to
    // ensure the symbol is present should the file somehow need it without a
    // matching source import (e.g. a partially-migrated file where the target
    // declaration was removed manually).
    importsToAdd.push({
      name: 'SearchInput',
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

function resolvePropsBase(searchInputAliases: Set<string>): string {
  // If SearchInput was imported under an alias (e.g. `import { SearchInput as SI }`),
  // use that alias as the namespace base (e.g. `SI.Props`) so that an unaliased
  // `SearchInput` import is not introduced into a file that may already have a
  // local `SearchInput` symbol. If there is no alias (or no SearchInput import at
  // all, i.e. SearchInputProps was imported in isolation), fall back to the
  // canonical `SearchInput` name — transformImports will add the unaliased import.
  for (const alias of searchInputAliases) {
    if (alias !== 'SearchInput') return alias
  }
  return 'SearchInput'
}

function transformTypeReferences(
  sourceFile: SourceFile,
  propsAliases: Set<string>,
  searchInputAliases: Set<string>,
): void {
  const propsBase = resolvePropsBase(searchInputAliases)

  for (const typeRef of sourceFile.getDescendantsOfKind(SyntaxKind.TypeReference)) {
    const typeName = typeRef.getTypeName()
    if (propsAliases.has(typeName.getText())) {
      typeName.replaceWithText(`${propsBase}.Props`)
    }
  }

  for (const heritage of sourceFile.getDescendantsOfKind(SyntaxKind.ExpressionWithTypeArguments)) {
    const expression = heritage.getExpression()
    if (propsAliases.has(expression.getText())) {
      expression.replaceWithText(`${propsBase}.Props`)
    }
  }
}

const PROP_RENAMES: Record<string, string> = {
  inputSize: 'size',
  isDisabled: 'disabled',
}

const PROPS_TO_REMOVE = new Set(['unstable_onSearch'])

/**
 * Finds the nearest Statement ancestor of a node (or the node itself if it is a Statement).
 */
function getNearestStatement(node: Node): Node | undefined {
  let current: Node | undefined = node
  while (current) {
    if (Node.isStatement(current)) return current
    current = current.getParent()
  }
  return undefined
}

function transformJsxElements(sourceFile: SourceFile, searchInputAliases: Set<string>): void {
  const openingElements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  // Collect insertion metadata for TODO comments (de-duplicated by statement).
  // Only inserted when unstable_onSearch was present on the element.
  // Key is stmt.getPos(); value is { insertPos, indent }.
  const stmtCommentMeta = new Map<number, { insertPos: number; indent: string }>()

  for (const element of openingElements) {
    const tagName = element.getTagNameNode()
    const tagNameText = tagName.getText()
    if (!searchInputAliases.has(tagNameText)) continue

    let hadUnstableOnSearch = false

    // Rename/remove props.
    for (const attr of element.getAttributes().slice()) {
      if (attr.getKind() !== SyntaxKind.JsxAttribute) continue
      const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute)
      const name = jsxAttr.getNameNode().getText()
      if (name in PROP_RENAMES) {
        jsxAttr.getNameNode().replaceWithText(PROP_RENAMES[name])
      } else if (PROPS_TO_REMOVE.has(name)) {
        jsxAttr.remove()
        hadUnstableOnSearch = true
      }
    }

    if (!hadUnstableOnSearch) continue

    const stmt = getNearestStatement(element)
    if (!stmt) continue

    const triviaStart = stmt.getPos()
    if (stmtCommentMeta.has(triviaStart)) continue

    // Extract the indentation from the leading trivia.
    const trivia = sourceFile.getFullText().slice(triviaStart, stmt.getStart())
    const lastNewline = trivia.lastIndexOf('\n')
    const indent = lastNewline === -1 ? '' : trivia.slice(lastNewline + 1)
    const insertPos = triviaStart + (lastNewline === -1 ? 0 : lastNewline + 1)

    stmtCommentMeta.set(triviaStart, { insertPos, indent })
  }

  // Insert TODO comments in reverse source order so that earlier insertions
  // don't shift positions of nodes we haven't yet annotated.
  const sortedEntries = [...stmtCommentMeta.values()].sort((a, b) => b.insertPos - a.insertPos)
  for (const { insertPos, indent } of sortedEntries) {
    sourceFile.insertText(insertPos, `${indent}//${TODO_COMMENT}\n`)
  }
}

export default function transform(
  source: string,
  filePath: string = 'file.tsx',
  options?: { facadePackage?: string },
): string {
  if (!source.includes('SearchInput')) {
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

  const searchInputAliases = getSearchInputAliases(sourceFile, facadePackage)
  const propsAliases = getSearchInputPropsAliases(sourceFile, facadePackage)

  const hasComponentUsage =
    hasSearchInputJsxUsage(sourceFile, searchInputAliases) || hasIdentifierUsage(sourceFile, searchInputAliases)
  const hasPropsUsage = hasIdentifierUsage(sourceFile, propsAliases)
  const needsSearchInputImport = hasComponentUsage || hasPropsUsage

  transformTypeReferences(sourceFile, propsAliases, searchInputAliases)
  transformJsxElements(sourceFile, searchInputAliases)
  transformImports(sourceFile, needsSearchInputImport, facadePackage)

  return sourceFile.getFullText()
}
