import { Project, QuoteKind, SourceFile, SyntaxKind } from 'ts-morph'
import { isElementsImport, matchesPackage } from '../shared/elements-import.js'

/**
 * Codemod to replace DeprecatedLabel with the new LabelText component.
 *
 * Import transformations:
 * - DeprecatedLabel -> LabelText (from @reapit/elements/core/label-text or facade package)
 * - DeprecatedLabelProps -> removed (type references rewritten to LabelText.Props)
 *
 * Type transformations:
 * - DeprecatedLabelProps -> LabelText.Props
 *
 * JSX element transformations:
 * - <DeprecatedLabel> -> <LabelText>
 *
 * Skipped:
 * - Re-export declarations (left unchanged)
 * - Files not containing DeprecatedLabel or DeprecatedLabelProps
 */
const TARGET_SPECIFIER = '@reapit/elements/core/label-text'

function resolveTargetSpecifier(sourceSpecifier: string, facadePackage?: string): string {
  if (facadePackage && matchesPackage(sourceSpecifier, facadePackage)) {
    return sourceSpecifier
  }

  return TARGET_SPECIFIER
}

function getDeprecatedLabelAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'DeprecatedLabel') {
        aliases.add(namedImport.getAliasNode()?.getText() ?? 'DeprecatedLabel')
      }
    }
  }

  if (aliases.size === 0 && sourceFile.getImportDeclarations().length === 0) {
    aliases.add('DeprecatedLabel')
  }

  return aliases
}

function getDeprecatedLabelPropsAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'DeprecatedLabelProps') {
        aliases.add(namedImport.getAliasNode()?.getText() ?? 'DeprecatedLabelProps')
      }
    }
  }

  if (aliases.size === 0 && sourceFile.getImportDeclarations().length === 0) {
    aliases.add('DeprecatedLabelProps')
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

    // Type references (e.g. `type Props = DeprecatedLabelProps`) are intentionally
    // treated as usage so we keep/add the LabelText import before rewriting to LabelText.Props.
    return true
  }

  return false
}

function hasDeprecatedLabelJsxUsage(sourceFile: SourceFile, labelAliases: Set<string>): boolean {
  const elements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  return elements.some((element) => labelAliases.has(element.getTagNameNode().getText()))
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

function transformImports(sourceFile: SourceFile, needsLabelTextImport: boolean, facadePackage?: string): void {
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

      if (originalName === 'DeprecatedLabel') {
        if (needsLabelTextImport) {
          importsToAdd.push({
            name: 'LabelText',
            alias: namedImport.getAliasNode()?.getText(),
            isTypeOnly: namedImport.isTypeOnly(),
            targetSpecifier: resolveTargetSpecifier(moduleSpecifier, facadePackage),
          })
        }
        namedImportsToRemove.push(namedImport)
        continue
      }

      if (originalName === 'DeprecatedLabelProps') {
        if (needsLabelTextImport) {
          importsToAdd.push({
            name: 'LabelText',
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

  if (needsLabelTextImport && importsToAdd.length === 0) {
    importsToAdd.push({
      name: 'LabelText',
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
      typeName.replaceWithText('LabelText.Props')
    }
  }

  for (const heritage of sourceFile.getDescendantsOfKind(SyntaxKind.ExpressionWithTypeArguments)) {
    const expression = heritage.getExpression()
    if (propsAliases.has(expression.getText())) {
      expression.replaceWithText('LabelText.Props')
    }
  }
}

function transformIdentifierReferences(sourceFile: SourceFile): void {
  for (const identifier of sourceFile.getDescendantsOfKind(SyntaxKind.Identifier)) {
    if (identifier.getText() !== 'DeprecatedLabel') continue

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

    identifier.replaceWithText('LabelText')
  }
}

function transformJsxElements(sourceFile: SourceFile, labelAliases: Set<string>): void {
  const elements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const element of elements) {
    const tagName = element.getTagNameNode()
    const tagNameText = tagName.getText()
    if (!labelAliases.has(tagNameText)) continue

    if (tagNameText === 'DeprecatedLabel') {
      tagName.replaceWithText('LabelText')
    }

    if (element.getKind() === SyntaxKind.JsxOpeningElement) {
      const parent = element.getParent()
      if (parent?.getKind() !== SyntaxKind.JsxElement) continue
      const jsxElement = parent.asKind(SyntaxKind.JsxElement)
      const closingTag = jsxElement?.getClosingElement()
      if (closingTag?.getTagNameNode().getText() === 'DeprecatedLabel') {
        closingTag.getTagNameNode().replaceWithText('LabelText')
      }
    }
  }
}

export default function transform(
  source: string,
  filePath: string = 'file.tsx',
  options?: { facadePackage?: string },
): string {
  if (!source.includes('DeprecatedLabel') && !source.includes('DeprecatedLabelProps')) {
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

  const labelAliases = getDeprecatedLabelAliases(sourceFile, facadePackage)
  const propsAliases = getDeprecatedLabelPropsAliases(sourceFile, facadePackage)

  const hasLabelUsage =
    hasDeprecatedLabelJsxUsage(sourceFile, labelAliases) || hasIdentifierUsage(sourceFile, labelAliases)
  const hasPropsUsage = hasIdentifierUsage(sourceFile, propsAliases)
  const needsLabelTextImport = hasLabelUsage || hasPropsUsage

  transformImports(sourceFile, needsLabelTextImport, facadePackage)
  transformTypeReferences(sourceFile, propsAliases)
  transformIdentifierReferences(sourceFile)
  transformJsxElements(sourceFile, labelAliases)

  return sourceFile.getFullText()
}
