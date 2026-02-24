import { Project, QuoteKind, SourceFile, SyntaxKind } from 'ts-morph'

/**
 * Codemod to upgrade DeprecatedButton to the new Button component.
 *
 * This codemod transforms imports of DeprecatedButton to use the new v5 Button
 * component from @reapit/elements/core/button. It handles:
 *
 * Import Transformations:
 * - DeprecatedButton → Button (from @reapit/elements/core/button)
 * - DeprecatedButtonProps → Button.Props (namespace pattern)
 * - DeprecatedButton as CustomName → Button as CustomName
 * - Adds DeprecatedIcon import when needed (if file uses DeprecatedIcon in JSX)
 * - Handles facade packages via --facade-package flag
 *
 * Type Transformations:
 * - Type references: DeprecatedButtonProps → Button.Props
 * - Interface extensions: extends DeprecatedButtonProps → extends Button.Props
 * - Generics: Generic<DeprecatedButtonProps> → Generic<Button.Props>
 *
 * JSX Element Transformations:
 * - Element name: <DeprecatedButton> → <Button>
 * - Preserves custom aliases
 *
 * Props Transformations:
 * - intent → variant
 *   - intent="primary" → variant="primary"
 *   - intent="default" → variant="secondary"
 *   - intent="danger" → variant="primary" + isDestructive={true}
 * - loading → isBusy
 *   - loading={true} → isBusy={true}
 *   - loading={false} → removed (default)
 * - size (number) → size (string)
 *   - size={1} → size="small"
 *   - size={2} → size="medium"
 *   - size={3} or size={4} → size="large"
 * - isDisabled → disabled (for button) or aria-disabled (for anchor)
 *   - isDisabled={true} → disabled={true} (or aria-disabled for anchors)
 *   - isDisabled={false} → removed (default)
 * - variant="destructive" → isDestructive={true} + removes variant
 * - variant="busy" → isBusy={true} + removes variant
 *
 * Preserves:
 * - Custom aliases: DeprecatedButton as MyBtn → Button as MyBtn
 * - Type-only imports: type DeprecatedButtonProps → type Button.Props
 * - Non-elements imports: Unchanged
 * - All other props (onClick, type, className, etc.)
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

  const basePath = facadePackage ?? '@reapit/elements'
  const targetModuleSpecifier = `${basePath}/core/button`

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

    // Skip imports that are already from the target path (core/button)
    // These are already using the new Button component, not DeprecatedButton
    if (moduleSpecifier === targetModuleSpecifier) {
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
      // Check if this import already exists in the target import declaration
      const existingImport = buttonImportDecl!.getNamedImports().find((namedImport) => {
        const importName = namedImport.getName()
        const importAlias = namedImport.getAliasNode()?.getText()
        
        // Check if the name matches
        if (importName !== name) {
          return false
        }
        
        // Check if the alias matches (both undefined or same value)
        if (alias !== importAlias) {
          return false
        }
        
        return true
      })
      
      if (existingImport) {
        const existingIsTypeOnly = existingImport.isTypeOnly()
        
        // If both are the same kind (both type-only or both value imports), nothing to do.
        if (existingIsTypeOnly === isTypeOnly) {
          return
        }
        
        // If we need a value import but only a type-only import exists,
        // upgrade the existing import to a value import so it can be used in JSX.
        if (existingIsTypeOnly && !isTypeOnly) {
          existingImport.setIsTypeOnly(false)
          return
        }
        
        // If a value import already exists and we want a type-only import,
        // the value import is sufficient for type positions; no extra import needed.
        if (!existingIsTypeOnly && isTypeOnly) {
          return
        }
      }
      
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
 *   - intent → variant (with value mapping)
 *   - loading → isBusy
 *   - size (number) → size (string)
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
    let intentValue: string | undefined
    let loadingValue: string | undefined
    let sizeValue: string | undefined

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
      } else if (name === 'intent') {
        const init = jsxAttr.getInitializer()
        if (init) {
          intentValue = extractStringOrExpressionValue(init)
        } else {
          // intent without value defaults to 'default' which maps to 'secondary'
          intentValue = 'default'
        }
      } else if (name === 'loading') {
        const init = jsxAttr.getInitializer()
        if (init) {
          loadingValue = init.getText()
        } else {
          // loading without value means loading={true}
          loadingValue = '{true}'
        }
      } else if (name === 'size') {
        const init = jsxAttr.getInitializer()
        if (init) {
          sizeValue = init.getText()
        }
      } else if (name === 'variant') {
        const init = jsxAttr.getInitializer()
        if (init) {
          variantValue = extractStringOrExpressionValue(init)
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

      // Transform intent → variant
      if (name === 'intent') {
        // Check if variant was present in the first pass using the captured variantValue
        // This avoids order-dependent behavior when variant is processed before intent
        if (variantValue) {
          // If variant already exists, remove intent to avoid duplicate variant attributes
          // Manual review may be needed to ensure the correct variant value is used
          jsxAttr.remove()
          continue
        }

        jsxAttr.getNameNode().replaceWithText('variant')
        
        // If intent had no initializer, set default value to "secondary"
        if (!jsxAttr.getInitializer()) {
          jsxAttr.setInitializer('"secondary"')
        }
        
        // Map intent values to variant values
        if (intentValue === 'default') {
          // default → secondary
          const init = jsxAttr.getInitializer()
          if (init) {
            const kind = init.getKind()
            if (kind === SyntaxKind.StringLiteral) {
              const stringLiteral = init.asKind(SyntaxKind.StringLiteral)
              if (stringLiteral) {
                stringLiteral.setLiteralValue('secondary')
              }
            } else if (kind === SyntaxKind.JsxExpression) {
              const jsxExpr = init.asKind(SyntaxKind.JsxExpression)
              if (jsxExpr) {
                const expression = jsxExpr.getExpression()
                if (expression && expression.getKind() === SyntaxKind.StringLiteral) {
                  const stringLiteral = expression.asKind(SyntaxKind.StringLiteral)
                  if (stringLiteral) {
                    stringLiteral.setLiteralValue('secondary')
                  }
                }
              }
            }
          }
        } else if (intentValue === 'danger') {
          // danger → primary + isDestructive
          const init = jsxAttr.getInitializer()
          if (init) {
            const kind = init.getKind()
            if (kind === SyntaxKind.StringLiteral) {
              const stringLiteral = init.asKind(SyntaxKind.StringLiteral)
              if (stringLiteral) {
                stringLiteral.setLiteralValue('primary')
              }
            } else if (kind === SyntaxKind.JsxExpression) {
              const jsxExpr = init.asKind(SyntaxKind.JsxExpression)
              if (jsxExpr) {
                const expression = jsxExpr.getExpression()
                if (expression && expression.getKind() === SyntaxKind.StringLiteral) {
                  const stringLiteral = expression.asKind(SyntaxKind.StringLiteral)
                  if (stringLiteral) {
                    stringLiteral.setLiteralValue('primary')
                  }
                }
              }
            }
          }
          // Add isDestructive={true} if not already present
          const existingIsDestructiveAttr = element.getAttribute('isDestructive')
          if (!existingIsDestructiveAttr) {
            element.addAttribute({
              name: 'isDestructive',
              initializer: '{true}',
            })
          }
        }
        // primary stays primary, so no transformation needed for that case
      }

      // Transform loading → isBusy
      else if (name === 'loading') {
        // Check if loading={false} using AST inspection (handles whitespace variations)
        const init = jsxAttr.getInitializer()
        let shouldRemove = false
        
        if (init) {
          const kind = init.getKind()
          if (kind === SyntaxKind.JsxExpression) {
            const jsxExpr = init.asKind(SyntaxKind.JsxExpression)
            const expression = jsxExpr?.getExpression()
            if (expression?.getKind() === SyntaxKind.FalseKeyword) {
              // It's loading={false}, remove it
              shouldRemove = true
            }
          }
        }
        
        if (shouldRemove) {
          jsxAttr.remove()
        } else {
          // Check if isBusy already exists before renaming
          const existingIsBusyAttr = element.getAttribute('isBusy')
          if (existingIsBusyAttr) {
            // isBusy already exists, remove the loading prop to avoid duplicate
            jsxAttr.remove()
          } else {
            jsxAttr.getNameNode().replaceWithText('isBusy')
          }
        }
      }

      // Transform size={number} → size="string"
      else if (name === 'size' && sizeValue) {
        const init = jsxAttr.getInitializer()
        if (init && init.getKind() === SyntaxKind.JsxExpression) {
          const jsxExpr = init.asKind(SyntaxKind.JsxExpression)
          if (jsxExpr) {
            const expression = jsxExpr.getExpression()
            if (expression) {
              const exprText = expression.getText()
              // Map numeric sizes to string sizes
              // Based on common patterns: 1=small, 2=medium, 3=large
              let newSize: string | undefined
              if (exprText === '1') {
                newSize = 'small'
              } else if (exprText === '2') {
                newSize = 'medium'
              } else if (exprText === '3' || exprText === '4') {
                newSize = 'large'
              }
              
              if (newSize) {
                jsxAttr.setInitializer(`"${newSize}"`)
              }
              // If it's already a string or unknown number, leave it unchanged
            }
          }
        }
      }

      // Transform isDisabled → disabled or aria-disabled
      else if (name === 'isDisabled') {
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
        // Add isDestructive={true} after removing variant, if not already present
        const existingIsDestructiveAttr = element.getAttribute('isDestructive')
        if (!existingIsDestructiveAttr) {
          element.addAttribute({
            name: 'isDestructive',
            initializer: '{true}',
          })
        }
      }

      // Transform variant="busy" → isBusy={true}
      else if (name === 'variant' && variantValue === 'busy') {
        jsxAttr.remove()
        // Add isBusy={true} after removing variant, if not already present
        const existingIsBusyAttr = element.getAttribute('isBusy')
        if (!existingIsBusyAttr) {
          element.addAttribute({
            name: 'isBusy',
            initializer: '{true}',
          })
        }
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

/**
 * Helper function to extract string or expression value from JSX attribute initializer
 */
function extractStringOrExpressionValue(init: any): string | undefined {
  const kind = init.getKind()

  if (kind === SyntaxKind.StringLiteral) {
    // Direct string literal: prop="value"
    const stringLiteral = init.asKind(SyntaxKind.StringLiteral)
    if (stringLiteral) {
      return stringLiteral.getLiteralText()
    }
  } else if (kind === SyntaxKind.JsxExpression) {
    // JSX expression: prop={"value"} or prop={'value'} or prop={variable}
    const jsxExpr = init.asKind(SyntaxKind.JsxExpression)
    if (jsxExpr) {
      const expression = jsxExpr.getExpression()
      if (expression) {
        const exprKind = expression.getKind()
        if (exprKind === SyntaxKind.StringLiteral) {
          const stringLiteral = expression.asKind(SyntaxKind.StringLiteral)
          if (stringLiteral) {
            return stringLiteral.getLiteralText()
          }
        } else {
          // Fallback for non-string expressions (e.g., identifiers, computed values)
          return expression.getText()
        }
      }
    }
  }
  
  return undefined
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
