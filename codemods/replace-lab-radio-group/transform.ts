import { Project, QuoteKind, SourceFile, SyntaxKind } from 'ts-morph'
import { isElementsImport, matchesPackage } from '../shared/elements-import.js'

/**
 * Codemod to replace the lab RadioGroup with the core RadioGroupControl component.
 *
 * Import transformations:
 * - RadioGroup -> RadioGroupControl (from @reapit/elements/core/radio-group-control or facade package)
 * - RadioGroupProps -> removed (type references rewritten to RadioGroupControl.Props)
 *
 * Type transformations:
 * - RadioGroupProps -> RadioGroupControl.Props
 *
 * JSX element transformations:
 * - <RadioGroup> -> <RadioGroupControl>
 *
 * JSX prop transformations:
 * - isRequired -> required
 * - errorMessage -> errorText
 *
 * Skipped:
 * - Re-export declarations (left unchanged)
 * - Files not containing RadioGroup or RadioGroupProps
 */
const TARGET_SPECIFIER = '@reapit/elements/core/radio-group-control'

function resolveTargetSpecifier(sourceSpecifier: string, facadePackage?: string): string {
  if (facadePackage && matchesPackage(sourceSpecifier, facadePackage)) {
    return sourceSpecifier
  }

  return TARGET_SPECIFIER
}

function getRadioGroupAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'RadioGroup') {
        aliases.add(namedImport.getAliasNode()?.getText() ?? 'RadioGroup')
      }
    }
  }

  return aliases
}

function getRadioGroupPropsAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'RadioGroupProps') {
        aliases.add(namedImport.getAliasNode()?.getText() ?? 'RadioGroupProps')
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

    // Type references (e.g. `type Props = RadioGroupProps`) are intentionally
    // treated as usage so we keep/add the RadioGroupControl import before
    // rewriting to RadioGroupControl.Props.
    return true
  }

  return false
}

function hasRadioGroupJsxUsage(sourceFile: SourceFile, radioGroupAliases: Set<string>): boolean {
  const elements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  return elements.some((element) => radioGroupAliases.has(element.getTagNameNode().getText()))
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

function transformImports(sourceFile: SourceFile, needsRadioGroupControlImport: boolean, facadePackage?: string): void {
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

      if (originalName === 'RadioGroup') {
        if (needsRadioGroupControlImport) {
          importsToAdd.push({
            name: 'RadioGroupControl',
            alias: namedImport.getAliasNode()?.getText(),
            isTypeOnly: namedImport.isTypeOnly(),
            targetSpecifier: resolveTargetSpecifier(moduleSpecifier, facadePackage),
          })
        }
        namedImportsToRemove.push(namedImport)
        continue
      }

      if (originalName === 'RadioGroupProps') {
        if (needsRadioGroupControlImport) {
          importsToAdd.push({
            name: 'RadioGroupControl',
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

  if (needsRadioGroupControlImport && importsToAdd.length === 0) {
    importsToAdd.push({
      name: 'RadioGroupControl',
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
      typeName.replaceWithText('RadioGroupControl.Props')
    }
  }

  for (const heritage of sourceFile.getDescendantsOfKind(SyntaxKind.ExpressionWithTypeArguments)) {
    const expression = heritage.getExpression()
    if (propsAliases.has(expression.getText())) {
      expression.replaceWithText('RadioGroupControl.Props')
    }
  }
}

function transformIdentifierReferences(sourceFile: SourceFile, radioGroupAliases: Set<string>): void {
  if (!radioGroupAliases.has('RadioGroup')) return

  for (const importDecl of sourceFile.getImportDeclarations()) {
    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() !== 'RadioGroup') continue
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

          identifier.replaceWithText('RadioGroupControl')
        }
      }
    }
  }
}

const PROP_RENAMES: Record<string, string> = {
  isRequired: 'required',
  errorMessage: 'errorText',
}

function transformJsxElements(sourceFile: SourceFile, radioGroupAliases: Set<string>): void {
  const openingElements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const element of openingElements) {
    const tagName = element.getTagNameNode()
    const tagNameText = tagName.getText()
    if (!radioGroupAliases.has(tagNameText)) continue

    // Rename props before renaming the tag (order matters for AST stability)
    for (const attr of element.getAttributes()) {
      if (attr.getKind() !== SyntaxKind.JsxAttribute) continue
      const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute)
      const name = jsxAttr.getNameNode().getText()
      if (name in PROP_RENAMES) {
        jsxAttr.getNameNode().replaceWithText(PROP_RENAMES[name])
      }
    }

    if (tagNameText === 'RadioGroup') {
      tagName.replaceWithText('RadioGroupControl')
    }

    if (element.getKind() === SyntaxKind.JsxOpeningElement) {
      const parent = element.getParent()
      if (parent?.getKind() !== SyntaxKind.JsxElement) continue
      const jsxElement = parent.asKind(SyntaxKind.JsxElement)
      const closingTag = jsxElement?.getClosingElement()
      if (closingTag?.getTagNameNode().getText() === 'RadioGroup') {
        closingTag.getTagNameNode().replaceWithText('RadioGroupControl')
      }
    }
  }
}

export default function transform(
  source: string,
  filePath: string = 'file.tsx',
  options?: { facadePackage?: string },
): string {
  if (!source.includes('RadioGroup') && !source.includes('RadioGroupProps')) {
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

  const radioGroupAliases = getRadioGroupAliases(sourceFile, facadePackage)
  const propsAliases = getRadioGroupPropsAliases(sourceFile, facadePackage)

  const hasComponentUsage =
    hasRadioGroupJsxUsage(sourceFile, radioGroupAliases) || hasIdentifierUsage(sourceFile, radioGroupAliases)
  const hasPropsUsage = hasIdentifierUsage(sourceFile, propsAliases)
  const needsRadioGroupControlImport = hasComponentUsage || hasPropsUsage

  transformTypeReferences(sourceFile, propsAliases)
  transformIdentifierReferences(sourceFile, radioGroupAliases)
  transformJsxElements(sourceFile, radioGroupAliases)
  transformImports(sourceFile, needsRadioGroupControlImport, facadePackage)

  return sourceFile.getFullText()
}
