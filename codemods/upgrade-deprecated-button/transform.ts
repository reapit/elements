import { Project, QuoteKind, SourceFile, SyntaxKind } from 'ts-morph'

/**
 * Codemod to upgrade DeprecatedButton to the new Button component.
 *
 * This codemod transforms imports of DeprecatedButton to use the new v5 Button
 * component from @reapit/elements/core/button. It handles:
 *
 * Transformations:
 * - DeprecatedButton → Button (from @reapit/elements/core/button)
 * - DeprecatedButtonProps → Button.Props (namespace pattern)
 * - Type references: DeprecatedButtonProps → Button.Props
 * - Interface extensions: extends DeprecatedButtonProps → extends Button.Props
 * - Generics: Generic<DeprecatedButtonProps> → Generic<Button.Props>
 * - DeprecatedButton as CustomName → Button as CustomName
 * - Adds DeprecatedIcon import when needed (if file uses DeprecatedIcon in JSX)
 * - Handles facade packages via --facade-package flag
 *
 * Preserves:
 * - Custom aliases: DeprecatedButton as MyBtn → Button as MyBtn
 * - Type-only imports: type DeprecatedButtonProps → type Button.Props
 * - Non-elements imports: Unchanged
 *
 * Note: This codemod handles import, type, JSX element, and props transformations,
 * including JSX element renaming and props such as isDisabled and variant values.
 */

/**
 * Checks if a module specifier matches a package name.
 * Handles both exact matches and subpath imports.
 * @example
 * matchesPackage('@company/ui', '@company/ui') // true
 * matchesPackage('@company/ui/elements', '@company/ui') // true
 * matchesPackage('@company/ui-v2', '@company/ui') // false
 */
function matchesPackage(moduleSpecifier: string, packageName: string): boolean {
  return moduleSpecifier === packageName || moduleSpecifier.startsWith(packageName + '/')
}

/**
 * Checks if a module specifier is an import from @reapit/elements or a facade package.
 */
function isElementsImport(moduleSpecifier: string, facadePackage?: string): boolean {
  return (
    matchesPackage(moduleSpecifier, '@reapit/elements') ||
    (facadePackage !== undefined && matchesPackage(moduleSpecifier, facadePackage))
  )
}

/**
 * Checks if the source file uses DeprecatedIcon in JSX.
 * This helps determine if we need to add a DeprecatedIcon import.
 */
function usesDeprecatedIconInJsx(sourceFile: SourceFile): boolean {
  const jsxElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
  const jsxSelfClosingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)

  const allElements = [...jsxElements, ...jsxSelfClosingElements]

  return allElements.some((element) => {
    const tagName = element.getTagNameNode().getText()
    return tagName === 'DeprecatedIcon'
  })
}

/**
 * Checks if an import from @reapit/elements already has DeprecatedIcon imported.
 */
function hasDeprecatedIconImport(sourceFile: SourceFile, facadePackage?: string): boolean {
  const importDeclarations = sourceFile.getImportDeclarations()

  for (const importDecl of importDeclarations) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()

    if (!isElementsImport(moduleSpecifier, facadePackage)) {
      continue
    }

    const namedImports = importDecl.getNamedImports()
    const hasDeprecatedIcon = namedImports.some((namedImport) => {
      const name = namedImport.getName()
      return name === 'DeprecatedIcon'
    })

    if (hasDeprecatedIcon) {
      return true
    }
  }

  return false
}

/**
 * Adds DeprecatedIcon import to the main @reapit/elements import if needed.
 * Only adds if:
 * 1. File uses DeprecatedIcon in JSX
 * 2. DeprecatedIcon is not already imported
 */
function addDeprecatedIconImportIfNeeded(sourceFile: SourceFile, facadePackage?: string): void {
  // Check if we need to add DeprecatedIcon import
  if (!usesDeprecatedIconInJsx(sourceFile)) {
    return
  }

  if (hasDeprecatedIconImport(sourceFile, facadePackage)) {
    return
  }

  // Find the main @reapit/elements import (or facade package import)
  const importDeclarations = sourceFile.getImportDeclarations()
  let mainImport = importDeclarations.find((importDecl) => {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    return moduleSpecifier === '@reapit/elements' || moduleSpecifier === facadePackage
  })

  // If no main import exists, create one
  if (!mainImport) {
    const targetPackage = facadePackage ?? '@reapit/elements'
    mainImport = sourceFile.addImportDeclaration({
      moduleSpecifier: targetPackage,
      namedImports: ['DeprecatedIcon'],
    })
  } else {
    // Add DeprecatedIcon to existing import
    mainImport.addNamedImport('DeprecatedIcon')
  }
}

/**
 * Transforms type references from DeprecatedButtonProps to Button.Props.
 * Handles type annotations, interface extensions, generics, and utility types.
 */
function transformTypeReferences(sourceFile: SourceFile): void {
  // Handle TypeReference nodes (type annotations, generics, etc.)
  const typeReferences = sourceFile.getDescendantsOfKind(SyntaxKind.TypeReference)

  for (const typeRef of typeReferences) {
    const typeName = typeRef.getTypeName()
    const typeNameText = typeName.getText()

    // Transform DeprecatedButtonProps to Button.Props
    if (typeNameText === 'DeprecatedButtonProps') {
      typeName.replaceWithText('Button.Props')
    }
  }

  // Handle heritage clauses (extends/implements)
  // These use ExpressionWithTypeArguments instead of TypeReference
  const heritageExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.ExpressionWithTypeArguments)

  for (const heritage of heritageExpressions) {
    const expression = heritage.getExpression()
    const expressionText = expression.getText()

    // Transform DeprecatedButtonProps to Button.Props
    if (expressionText === 'DeprecatedButtonProps') {
      expression.replaceWithText('Button.Props')
    }
  }
}

/**
 * Transforms DeprecatedButton imports to use the new Button component.
 */
function transformImports(sourceFile: SourceFile, facadePackage?: string): void {
  const buttonImportsToAdd: Array<{ name: string; alias?: string; isTypeOnly: boolean }> = []

  // Get all import declarations up front (we'll be modifying them)
  const importDeclarations = sourceFile.getImportDeclarations().slice()

  for (const importDecl of importDeclarations) {
    // Skip if this import was already removed
    if (importDecl.wasForgotten()) {
      continue
    }

    const moduleSpecifier = importDecl.getModuleSpecifierValue()

    // Only process @reapit/elements or facade package imports
    if (!isElementsImport(moduleSpecifier, facadePackage)) {
      continue
    }

    const namedImports = importDecl.getNamedImports()
    const importsToRemove: typeof namedImports = []

    for (const namedImport of namedImports) {
      const originalName = namedImport.getName()

      // Handle DeprecatedButton
      if (originalName === 'DeprecatedButton') {
        // Get the alias if one exists
        const existingAlias = namedImport.getAliasNode()?.getText()

        // Check if this is an inline type import
        const isTypeOnly = namedImport.isTypeOnly()

        // Track this import for adding to the new Button import
        buttonImportsToAdd.push({
          name: 'Button',
          alias: existingAlias, // undefined if no alias
          isTypeOnly,
        })

        // Mark for removal from current import
        importsToRemove.push(namedImport)
      }

      // Handle DeprecatedButtonProps -> Button.Props
      if (originalName === 'DeprecatedButtonProps') {
        // Remove this import - type references are handled by transformTypeReferences()
        importsToRemove.push(namedImport)
      }
    }

    // Remove the DeprecatedButton imports from the original import statement
    importsToRemove.forEach((namedImport) => namedImport.remove())

    // If this import statement is now empty, remove it
    if (importDecl.getNamedImports().length === 0 && !importDecl.getDefaultImport()) {
      importDecl.remove()
    }
  }

  // Add new Button import if we found DeprecatedButton imports
  if (buttonImportsToAdd.length > 0) {
    const basePath = facadePackage ?? '@reapit/elements'
    const newModuleSpecifier = `${basePath}/core/button`

    // Get fresh list of import declarations after removals
    const currentImportDeclarations = sourceFile.getImportDeclarations()

    // Check if an import from this path already exists
    let buttonImportDecl = currentImportDeclarations.find(
      (importDecl) => importDecl.getModuleSpecifierValue() === newModuleSpecifier,
    )

    if (!buttonImportDecl) {
      // Create new import statement
      buttonImportDecl = sourceFile.addImportDeclaration({
        moduleSpecifier: newModuleSpecifier,
      })
    }

    // Add each Button import
    buttonImportsToAdd.forEach(({ name, alias, isTypeOnly }) => {
      // Only use alias syntax if the alias is different from the name
      if (alias && alias !== name) {
        const typePrefix = isTypeOnly ? 'type ' : ''
        buttonImportDecl!.addNamedImport(`${typePrefix}${name} as ${alias}`)
      } else {
        // No alias needed
        if (isTypeOnly) {
          buttonImportDecl!.addNamedImport({ name, isTypeOnly: true })
        } else {
          buttonImportDecl!.addNamedImport(name)
        }
      }
    })
  }

  // Add DeprecatedIcon import if the file uses it
  addDeprecatedIconImportIfNeeded(sourceFile, facadePackage)
}

/**
 * Collects all aliases used for DeprecatedButton imports.
 * Returns a set of names that could be used in JSX (including 'DeprecatedButton' itself).
 */
function getDeprecatedButtonAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()

    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'DeprecatedButton') {
        // Get the alias if it exists, otherwise use the original name
        const alias = namedImport.getAliasNode()?.getText()
        aliases.add(alias ?? 'DeprecatedButton')
      }
    }
  }

  // Add default only if file has NO imports at all (handles test snippets without imports)
  if (aliases.size === 0 && sourceFile.getImportDeclarations().length === 0) {
    aliases.add('DeprecatedButton')
  }

  return aliases
}

/**
 * Transforms JSX elements and their props from DeprecatedButton to Button/AnchorButton.
 * Handles:
 * - Element name: DeprecatedButton → Button (name determined by import alias)
 * - Props transformations:
 *   - isDisabled → disabled (for button) or aria-disabled (for anchor)
 *   - variant="destructive" → isDestructive={true}, remove variant
 *   - variant="busy" → isBusy={true}, remove variant
 * @param sourceFile The source file to transform
 * @param aliases Set of all aliases used for DeprecatedButton (including 'DeprecatedButton' itself)
 */
function transformJsxElements(sourceFile: SourceFile, aliases: Set<string>): void {
  // Find all DeprecatedButton JSX elements (both opening and self-closing)
  const jsxElements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const element of jsxElements) {
    const tagName = element.getTagNameNode()
    const tagNameText = tagName.getText()

    // Only process DeprecatedButton elements (checking against all aliases)
    if (!aliases.has(tagNameText)) {
      continue
    }

    // Rename element to Button only if it's the non-aliased 'DeprecatedButton'
    // If an alias was used (e.g., MyBtn), we preserve it because the import
    // transformation already renamed "DeprecatedButton as MyBtn" -> "Button as MyBtn"
    if (tagNameText === 'DeprecatedButton') {
      tagName.replaceWithText('Button')
    }

    // Transform props
    const attributes = element.getAttributes()

    let hasHref = false
    let isDisabledValue: string | undefined
    let variantValue: string | undefined

    // First pass: collect information about props
    for (const attr of attributes) {
      if (attr.getKind() !== SyntaxKind.JsxAttribute) {
        continue
      }

      const jsxAttr = attr.asKind(SyntaxKind.JsxAttribute)!
      const name = jsxAttr.getNameNode().getText()

      if (name === 'href') {
        hasHref = true
      } else if (name === 'isDisabled') {
        const init = jsxAttr.getInitializer()
        if (init) {
          isDisabledValue = init.getText()
        } else {
          // isDisabled without value means isDisabled={true}
          isDisabledValue = '{true}'
        }
      } else if (name === 'variant') {
        const init = jsxAttr.getInitializer()
        if (init) {
          // Use AST-based extraction for robust variant value parsing
          const kind = init.getKind()

          if (kind === SyntaxKind.StringLiteral) {
            // Direct string literal: variant="destructive"
            const stringLiteral = init.asKind(SyntaxKind.StringLiteral)
            if (stringLiteral) {
              variantValue = stringLiteral.getLiteralText()
            }
          } else if (kind === SyntaxKind.JsxExpression) {
            // JSX expression: variant={"destructive"} or variant={'busy'}
            const jsxExpr = init.asKind(SyntaxKind.JsxExpression)
            if (jsxExpr) {
              const expression = jsxExpr.getExpression()
              if (expression) {
                const exprKind = expression.getKind()
                if (exprKind === SyntaxKind.StringLiteral) {
                  // variant={"destructive"} or variant={'busy'}
                  const stringLiteral = expression.asKind(SyntaxKind.StringLiteral)
                  if (stringLiteral) {
                    variantValue = stringLiteral.getLiteralText()
                  }
                } else {
                  // Fallback for non-string expressions (e.g., identifiers, computed values)
                  variantValue = expression.getText()
                }
              }
            }
          }
        }
      }
    }

    // Second pass: transform props
    for (const attr of attributes.slice()) {
      if (attr.getKind() !== SyntaxKind.JsxAttribute) {
        continue
      }

      const jsxAttr = attr.asKind(SyntaxKind.JsxAttribute)!
      const name = jsxAttr.getNameNode().getText()

      // Transform isDisabled → disabled or aria-disabled
      if (name === 'isDisabled') {
        if (isDisabledValue === '{false}' || isDisabledValue === 'false') {
          // Remove isDisabled={false} (false is default)
          jsxAttr.remove()
        } else {
          // Transform to disabled (for button) or aria-disabled (for anchor)
          const newPropName = hasHref ? 'aria-disabled' : 'disabled'
          jsxAttr.getNameNode().replaceWithText(newPropName)
        }
      }

      // Transform variant="destructive" → isDestructive={true}
      else if (name === 'variant' && variantValue === 'destructive') {
        jsxAttr.remove()
        // Add isDestructive={true} after removing variant
        element.addAttribute({
          name: 'isDestructive',
          initializer: '{true}',
        })
      }

      // Transform variant="busy" → isBusy={true}
      else if (name === 'variant' && variantValue === 'busy') {
        jsxAttr.remove()
        // Add isBusy={true} after removing variant
        element.addAttribute({
          name: 'isBusy',
          initializer: '{true}',
        })
      }
    }

    // Find and update the closing tag if this is an opening element
    if (element.getKind() === SyntaxKind.JsxOpeningElement) {
      const parent = element.getParent()
      if (parent && parent.getKind() === SyntaxKind.JsxElement) {
        const closingElement = parent.asKind(SyntaxKind.JsxElement)?.getClosingElement()
        if (closingElement) {
          const closingTagName = closingElement.getTagNameNode()
          // Only rename closing tag if it's the non-aliased 'DeprecatedButton'
          if (closingTagName.getText() === 'DeprecatedButton') {
            closingTagName.replaceWithText('Button')
          }
        }
      }
    }
  }
}

export default function transform(
  source: string,
  filePath: string = 'file.tsx',
  options?: { facadePackage?: string },
): string {
  // Early return if file doesn't contain DeprecatedButton
  if (!source.includes('DeprecatedButton')) {
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

  // Collect aliases BEFORE transforming imports (imports will be modified)
  const deprecatedButtonAliases = getDeprecatedButtonAliases(sourceFile, options?.facadePackage)

  transformImports(sourceFile, options?.facadePackage)
  transformTypeReferences(sourceFile)
  transformJsxElements(sourceFile, deprecatedButtonAliases)

  return sourceFile.getFullText()
}
