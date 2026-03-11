import { Node, Project, QuoteKind, SourceFile, SyntaxKind } from 'ts-morph'
import { isElementsImport, matchesPackage } from '../shared/elements-import.js'

/**
 * Codemod to replace the lab Radio with the core RadioButton component.
 *
 * Import transformations:
 * - Radio -> RadioButton (from @reapit/elements/core/radio-group-control or facade package)
 * - RadioProps -> removed (type references rewritten to RadioButton.Props)
 *
 * Type transformations:
 * - RadioProps -> RadioButton.Props
 *
 * JSX element transformations:
 * - <Radio> -> <RadioButton>
 *
 * JSX prop transformations:
 * - isRequired -> required
 * - hasError -> removed (no direct equivalent on RadioButton)
 *
 * TODO comment:
 * - A TODO comment is inserted before each migrated JSX statement, encouraging
 *   use of RadioGroupControl rather than direct RadioButton usage.
 *
 * Skipped:
 * - Re-export declarations (left unchanged)
 * - Files not containing Radio symbols
 */
const TARGET_SPECIFIER = '@reapit/elements/core/radio-group-control'

const TODO_COMMENT = ' TODO: Consider using RadioGroupControl rather than RadioButton directly.'

function resolveTargetSpecifier(sourceSpecifier: string, facadePackage?: string): string {
  if (facadePackage && matchesPackage(sourceSpecifier, facadePackage)) {
    return sourceSpecifier
  }

  return TARGET_SPECIFIER
}

function getRadioAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'Radio') {
        aliases.add(namedImport.getAliasNode()?.getText() ?? 'Radio')
      }
    }
  }

  return aliases
}

function getRadioPropsAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'RadioProps') {
        aliases.add(namedImport.getAliasNode()?.getText() ?? 'RadioProps')
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

    // Type references (e.g. `type Props = RadioProps`) are intentionally
    // treated as usage so we keep/add the RadioButton import before
    // rewriting to RadioButton.Props.
    return true
  }

  return false
}

function hasRadioJsxUsage(sourceFile: SourceFile, radioAliases: Set<string>): boolean {
  const elements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  return elements.some((element) => radioAliases.has(element.getTagNameNode().getText()))
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

function transformImports(sourceFile: SourceFile, needsRadioButtonImport: boolean, facadePackage?: string): void {
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

      if (originalName === 'Radio') {
        if (needsRadioButtonImport) {
          importsToAdd.push({
            name: 'RadioButton',
            alias: namedImport.getAliasNode()?.getText(),
            isTypeOnly: namedImport.isTypeOnly(),
            targetSpecifier: resolveTargetSpecifier(moduleSpecifier, facadePackage),
          })
        }
        namedImportsToRemove.push(namedImport)
        continue
      }

      if (originalName === 'RadioProps') {
        if (needsRadioButtonImport) {
          importsToAdd.push({
            name: 'RadioButton',
            isTypeOnly: namedImport.isTypeOnly(),
            targetSpecifier: resolveTargetSpecifier(moduleSpecifier, facadePackage),
          })
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

  if (needsRadioButtonImport && importsToAdd.length === 0) {
    importsToAdd.push({
      name: 'RadioButton',
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
      typeName.replaceWithText('RadioButton.Props')
    }
  }

  for (const heritage of sourceFile.getDescendantsOfKind(SyntaxKind.ExpressionWithTypeArguments)) {
    const expression = heritage.getExpression()
    if (propsAliases.has(expression.getText())) {
      expression.replaceWithText('RadioButton.Props')
    }
  }
}

function transformIdentifierReferences(sourceFile: SourceFile, radioAliases: Set<string>): void {
  if (!radioAliases.has('Radio')) return

  for (const importDecl of sourceFile.getImportDeclarations()) {
    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() !== 'Radio') continue
      if (namedImport.getAliasNode()) continue

      const nameNode = namedImport.getNameNode().asKind(SyntaxKind.Identifier)
      if (!nameNode) continue

      for (const referencedSymbol of nameNode.findReferences()) {
        for (const reference of referencedSymbol.getReferences()) {
          if (reference.isDefinition()) continue

          const identifier = reference.getNode().asKind(SyntaxKind.Identifier)
          if (!identifier) continue

          const parent = identifier.getParent()
          if (!parent) continue
          const parentKind = parent.getKind()

          if (parentKind === SyntaxKind.ExportSpecifier) {
            const exportDeclaration = parent.getFirstAncestorByKind(SyntaxKind.ExportDeclaration)
            if (exportDeclaration?.getModuleSpecifierValue()) {
              continue
            }
          }

          if (
            parentKind === SyntaxKind.ImportSpecifier ||
            parentKind === SyntaxKind.JsxOpeningElement ||
            parentKind === SyntaxKind.JsxSelfClosingElement ||
            parentKind === SyntaxKind.JsxClosingElement
          ) {
            continue
          }

          identifier.replaceWithText('RadioButton')
        }
      }
    }
  }
}

const PROP_RENAMES: Record<string, string> = {
  isRequired: 'required',
}

const PROPS_TO_REMOVE = new Set(['hasError'])

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

function transformJsxElements(sourceFile: SourceFile, radioAliases: Set<string>): void {
  const openingElements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  // Collect insertion metadata for TODO comments (de-duplicated by statement).
  // Key is stmt.getPos(); value is { insertPos, indent } where insertPos is right
  // after the last newline in the leading trivia and indent is the indentation string.
  const stmtCommentMeta = new Map<number, { insertPos: number; indent: string }>()

  for (const element of openingElements) {
    const tagName = element.getTagNameNode()
    const tagNameText = tagName.getText()
    if (!radioAliases.has(tagNameText)) continue

    // Rename/remove props before renaming the tag (order matters for AST stability).
    for (const attr of element.getAttributes().slice()) {
      if (attr.getKind() !== SyntaxKind.JsxAttribute) continue
      const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute)
      const name = jsxAttr.getNameNode().getText()
      if (name in PROP_RENAMES) {
        jsxAttr.getNameNode().replaceWithText(PROP_RENAMES[name])
      } else if (PROPS_TO_REMOVE.has(name)) {
        jsxAttr.remove()
      }
    }

    if (tagNameText === 'Radio') {
      tagName.replaceWithText('RadioButton')
    }

    if (element.getKind() === SyntaxKind.JsxOpeningElement) {
      const parent = element.getParent()
      if (parent?.getKind() !== SyntaxKind.JsxElement) continue
      const jsxElement = parent.asKind(SyntaxKind.JsxElement)
      const closingTag = jsxElement?.getClosingElement()
      if (closingTag?.getTagNameNode().getText() === 'Radio') {
        closingTag.getTagNameNode().replaceWithText('RadioButton')
      }
    }

    const stmt = getNearestStatement(element)
    if (!stmt) continue

    const triviaStart = stmt.getPos()
    if (stmtCommentMeta.has(triviaStart)) continue

    // Extract the indentation: the portion of leading trivia after the last newline.
    // getPos() includes leading whitespace/newlines; getStart() is the first non-trivia char.
    //
    // NOTE: getFullText() is called here after JSX tag and prop mutations have already been
    // applied to earlier elements in this loop. Both triviaStart (from stmt.getPos()) and
    // stmt.getStart() are live AST positions re-queried against the post-mutation state, so they
    // are consistent with the post-mutation text returned by getFullText(). This is safe because
    // all prior mutations are scoped inside JSX element boundaries, which lie within the
    // statement body — they cannot shift the byte offset of the statement's own leading trivia.
    const trivia = sourceFile.getFullText().slice(triviaStart, stmt.getStart())
    const lastNewline = trivia.lastIndexOf('\n')
    const indent = lastNewline === -1 ? '' : trivia.slice(lastNewline + 1)
    // The comment should be inserted right after the last newline in the trivia,
    // so that it sits on its own line immediately before the (indented) statement.
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
  if (!source.includes('Radio')) {
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

  const radioAliases = getRadioAliases(sourceFile, facadePackage)
  const propsAliases = getRadioPropsAliases(sourceFile, facadePackage)

  const hasComponentUsage = hasRadioJsxUsage(sourceFile, radioAliases) || hasIdentifierUsage(sourceFile, radioAliases)
  const hasPropsUsage = hasIdentifierUsage(sourceFile, propsAliases)
  const needsRadioButtonImport = hasComponentUsage || hasPropsUsage

  transformTypeReferences(sourceFile, propsAliases)
  transformIdentifierReferences(sourceFile, radioAliases)
  transformJsxElements(sourceFile, radioAliases)
  transformImports(sourceFile, needsRadioButtonImport, facadePackage)

  return sourceFile.getFullText()
}
