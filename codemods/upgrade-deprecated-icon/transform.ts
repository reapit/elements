import {
  Project,
  QuoteKind,
  SourceFile,
  SyntaxKind,
  JsxAttribute,
  JsxElement,
  JsxExpression,
  JsxFragment,
  JsxOpeningElement,
  JsxSelfClosingElement,
  Node,
  StringLiteral,
} from 'ts-morph'
import { isElementsImport } from '../shared/elements-import.js'

/**
 * Codemod to upgrade DeprecatedIcon to individual v5 icon components.
 *
 * This codemod transforms DeprecatedIcon usage to use individual icon components
 * from @reapit/elements/icons/*. It handles:
 *
 * Transformations:
 * - DeprecatedIcon with static icon prop → individual icon components (e.g., ChevronRightIcon)
 * - Icon name mapping: camelCase → kebab-case (chevronRight → chevron-right → ChevronRightIcon)
 * - Special mappings: exportIcon → export, elipsis → more
 * - Removed icons: drawClose, placeholderLarge, placeholderSmall, reapitLogo, reapitLogoSmall
 * - Props transformations:
 *   - fontSize → size mapping (12px→xs, 16px→sm, 20px→md, 24px→lg)
 *   - intent → color mapping (critical→secondary, danger→error, etc.)
 *   - width/height → size (if square and mapped)
 *   - Non-square width/height → style with TODO comment
 *   - Style merging with TODO comments when needed
 * - Only migrates static string literal icon props
 * - Adds TODO comments for dynamic props (ternary, variables)
 * - Adds TODO comments for removed icons
 *
 * Preserves:
 * - className, onClick, other HTML props
 * - Custom styles (with TODO comment if merged)
 */

/**
 * Finds the alias used for DeprecatedIcon in imports, if any.
 * Returns the alias name or null if not aliased.
 */
function getDeprecatedIconAlias(sourceFile: SourceFile, facadePackage?: string): string | null {
  const importDeclarations = sourceFile.getImportDeclarations()

  for (const importDecl of importDeclarations) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    const namedImports = importDecl.getNamedImports()
    for (const namedImport of namedImports) {
      if (namedImport.getName() === 'DeprecatedIcon') {
        const aliasNode = namedImport.getAliasNode()
        if (aliasNode) {
          return aliasNode.getText()
        }
      }
    }
  }

  return null
}

/**
 * Collects all static icon usages in the file.
 * Handles both direct DeprecatedIcon usage and aliased imports.
 */
function collectIconUsages(
  sourceFile: SourceFile,
  deprecatedIconAlias: string | null,
): Map<string, { componentName: string; fileName: string }> {
  const iconUsages = new Map<string, { componentName: string; fileName: string }>()
  const jsxElements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  // Check for both the original name and any alias
  const validTagNames = ['DeprecatedIcon']
  if (deprecatedIconAlias) {
    validTagNames.push(deprecatedIconAlias)
  }

  for (const element of jsxElements) {
    const tagName = element.getTagNameNode().getText()
    if (!validTagNames.includes(tagName)) continue

    // Find the icon prop
    const attributes = element.getAttributes()
    for (const attr of attributes) {
      if (attr.getKind() !== SyntaxKind.JsxAttribute) continue

      const jsxAttr = attr.asKind(SyntaxKind.JsxAttribute)!
      const name = jsxAttr.getNameNode().getText()

      if (name === 'icon') {
        const init = jsxAttr.getInitializer()
        if (init && isStaticStringLiteral(init)) {
          const iconName = extractStringLiteral(init)
          if (iconName) {
            const mapped = mapIconName(iconName)
            if (mapped && !mapped.removed) {
              iconUsages.set(iconName, {
                componentName: mapped.componentName,
                fileName: mapped.fileName,
              })
            }
          }
        }
      }
    }
  }

  return iconUsages
}

/**
 * Maps icon names from DeprecatedIcon to v5 icon file names.
 * Handles special cases and removed icons.
 */
function mapIconName(iconName: string): { fileName: string; componentName: string; removed?: boolean } | null {
  // Removed icons - no migration path
  const removedIcons = ['drawClose', 'placeholderLarge', 'placeholderSmall', 'reapitLogo', 'reapitLogoSmall']
  if (removedIcons.includes(iconName)) {
    return { fileName: '', componentName: '', removed: true }
  }

  // Special mappings
  const specialMappings: Record<string, string> = {
    exportIcon: 'export',
    elipsis: 'more',
  }

  const fileName = specialMappings[iconName] ?? camelToKebab(iconName)
  const componentName =
    fileName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('') + 'Icon'

  return { fileName, componentName }
}

/**
 * Maps fontSize values to icon size tokens.
 */
function mapFontSizeToSize(fontSize: string): string | null {
  const sizeMap: Record<string, string> = {
    '12px': 'xs',
    '0.75rem': 'xs',
    '16px': 'sm',
    '1rem': 'sm',
    '20px': 'md',
    '1.25rem': 'md',
    '24px': 'lg',
    '1.5rem': 'lg',
  }
  return sizeMap[fontSize] ?? null
}

/**
 * Maps intent values to color values.
 */
function mapIntentToColor(intent: string): string {
  const intentMap: Record<string, string> = {
    critical: 'secondary',
    danger: 'error',
    default: 'secondary',
    low: 'secondary',
    neutral: 'info',
    pending: 'pending',
    success: 'success',
    primary: 'action',
    secondary: 'secondary',
    warning: 'warning',
  }
  return intentMap[intent] ?? 'inherit'
}

/**
 * Extracts string literal value from JSX attribute initializer.
 */
function extractStringLiteral(
  initializer: StringLiteral | JsxExpression | JsxElement | JsxFragment | JsxSelfClosingElement,
): string | null {
  const kind = initializer.getKind()

  if (kind === SyntaxKind.StringLiteral) {
    return initializer.asKind(SyntaxKind.StringLiteral)?.getLiteralText() ?? null
  }

  if (kind === SyntaxKind.JsxExpression) {
    const jsxExpr = initializer.asKind(SyntaxKind.JsxExpression)
    if (jsxExpr) {
      const expression = jsxExpr.getExpression()
      if (expression && expression.getKind() === SyntaxKind.StringLiteral) {
        return expression.asKind(SyntaxKind.StringLiteral)?.getLiteralText() ?? null
      }
    }
  }

  return null
}

/**
 * Checks if an expression is a static string literal (not dynamic).
 */
function isStaticStringLiteral(
  initializer: StringLiteral | JsxExpression | JsxElement | JsxFragment | JsxSelfClosingElement,
): boolean {
  return extractStringLiteral(initializer) !== null
}

/**
 * Converts camelCase to kebab-case.
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Adds individual icon imports.
 */
function addIconImports(
  sourceFile: SourceFile,
  iconUsages: Map<string, { componentName: string; fileName: string }>,
  facadePackage?: string,
): void {
  const basePath = facadePackage ?? '@reapit/elements'

  // Add individual icon imports
  for (const { componentName, fileName } of iconUsages.values()) {
    const moduleSpecifier = `${basePath}/icons/${fileName}`

    // Check if import already exists
    const existingImport = sourceFile
      .getImportDeclarations()
      .find((imp) => imp.getModuleSpecifierValue() === moduleSpecifier)

    if (existingImport) {
      // Check if component is already imported
      const hasImport = existingImport.getNamedImports().some((namedImport) => namedImport.getName() === componentName)

      if (!hasImport) {
        existingImport.addNamedImport(componentName)
      }
    } else {
      // Create new import
      sourceFile.addImportDeclaration({
        moduleSpecifier,
        namedImports: [componentName],
      })
    }
  }
}

/**
 * Removes unused DeprecatedIcon import after JSX transformation.
 * Handles both direct imports and aliased imports.
 */
function removeUnusedDeprecatedIconImport(
  sourceFile: SourceFile,
  deprecatedIconAlias: string | null,
  facadePackage?: string,
): void {
  const importDeclarations = sourceFile.getImportDeclarations().slice()

  // Check for both the original name and any alias
  const validTagNames = ['DeprecatedIcon']
  if (deprecatedIconAlias) {
    validTagNames.push(deprecatedIconAlias)
  }

  for (const importDecl of importDeclarations) {
    if (importDecl.wasForgotten()) continue

    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    const namedImports = importDecl.getNamedImports()
    const deprecatedIconImport = namedImports.find((namedImport) => namedImport.getName() === 'DeprecatedIcon')

    if (deprecatedIconImport) {
      // Get the imported name (either the alias or 'DeprecatedIcon')
      const importedName = deprecatedIconImport.getAliasNode()?.getText() || deprecatedIconImport.getName()

      // Find ALL references to this identifier (not just JSX tags)
      // Note: We can't use findReferencesAsNodes() as it doesn't exist on ImportSpecifier
      // Instead, we search for all identifiers matching the imported name
      const allIdentifiers = sourceFile.getDescendantsOfKind(SyntaxKind.Identifier)
      const references = allIdentifiers.filter((id) => id.getText() === importedName)

      // Filter out the import specifier itself
      const usages = references.filter((ref) => {
        const parent = ref.getParent()
        return parent?.getKind() !== SyntaxKind.ImportSpecifier
      })

      if (usages.length === 0) {
        // No usages found - safe to remove
        deprecatedIconImport.remove()
        if (importDecl.getNamedImports().length === 0) {
          importDecl.remove()
        }
      } else {
        // Check if all usages are JSX tags (which may have been transformed)
        const allJsxUsages = usages.every((ref) => {
          const parent = ref.getParent()
          return (
            parent?.getKind() === SyntaxKind.JsxOpeningElement ||
            parent?.getKind() === SyntaxKind.JsxSelfClosingElement ||
            parent?.getKind() === SyntaxKind.JsxClosingElement
          )
        })

        if (allJsxUsages) {
          // All usages are JSX tags - check if any are still present (un-transformed)
          const validTagNames = ['DeprecatedIcon']
          if (deprecatedIconAlias) {
            validTagNames.push(deprecatedIconAlias)
          }

          const selfClosingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
          const openingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
          const stillUsedInJsx = [...selfClosingElements, ...openingElements].some((element) =>
            validTagNames.includes(element.getTagNameNode().getText()),
          )

          if (!stillUsedInJsx) {
            // All JSX usages were transformed - safe to remove
            deprecatedIconImport.remove()
            if (importDecl.getNamedImports().length === 0) {
              importDecl.remove()
            }
          }
        }
        // else: Keep import - has non-JSX usages (styled, props, etc.) - will be handled by addNonJsxUsageTodos
      }
    }
  }
}

/**
 * Transforms JSX elements from DeprecatedIcon to individual icon components.
 * Returns a map of component names to sets of TODO messages (with correct comment syntax) for elements that need comments.
 * Handles both direct DeprecatedIcon usage and aliased imports.
 */
function transformJsxElements(
  sourceFile: SourceFile,
  iconUsages: Map<string, { componentName: string; fileName: string }>,
  deprecatedIconAlias: string | null,
): Map<string, Set<string>> {
  const jsxElements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
  ]

  // Check for both the original name and any alias
  const validTagNames = ['DeprecatedIcon']
  if (deprecatedIconAlias) {
    validTagNames.push(deprecatedIconAlias)
  }

  const todosNeeded = new Map<string, Set<string>>() // componentName/iconName -> set of TODO reasons

  for (const element of jsxElements) {
    const tagName = element.getTagNameNode()
    const tagNameText = tagName.getText()

    if (!validTagNames.includes(tagNameText)) continue

    const attributes = element.getAttributes()
    let iconAttr: JsxAttribute | null = null
    let iconValue: string | null = null
    const propsToTransform: Map<
      string,
      { value: string; init: StringLiteral | JsxExpression | JsxElement | JsxFragment | JsxSelfClosingElement }
    > = new Map()
    const propsToRemove: JsxAttribute[] = []
    const propsToPreserve: Map<string, JsxAttribute> = new Map()

    // First pass: collect all props
    for (const attr of attributes) {
      if (attr.getKind() !== SyntaxKind.JsxAttribute) continue

      const jsxAttr = attr.asKind(SyntaxKind.JsxAttribute)!
      const name = jsxAttr.getNameNode().getText()
      const init = jsxAttr.getInitializer()

      if (name === 'icon') {
        iconAttr = jsxAttr
        if (init) {
          iconValue = extractStringLiteral(init)
        }
      } else if (name === 'intent') {
        if (init) {
          const value = extractStringLiteral(init)
          if (value) {
            propsToTransform.set('intent', { value, init })
            propsToRemove.push(jsxAttr)
          } else {
            // Dynamic value - preserve it
            propsToPreserve.set(name, jsxAttr)
          }
        } else {
          // No initializer - preserve to avoid losing potential behavior
          propsToPreserve.set(name, jsxAttr)
        }
      } else if (name === 'fontSize') {
        if (init) {
          const value = extractStringLiteral(init)
          if (value) {
            propsToTransform.set('fontSize', { value, init })
            propsToRemove.push(jsxAttr)
          } else {
            // Dynamic value - preserve it
            propsToPreserve.set(name, jsxAttr)
          }
        } else {
          // No initializer - preserve to avoid losing potential behavior
          propsToPreserve.set(name, jsxAttr)
        }
      } else if (name === 'width' || name === 'height') {
        if (init) {
          const value = extractStringLiteral(init)
          if (value) {
            propsToTransform.set(name, { value, init })
            propsToRemove.push(jsxAttr)
          } else {
            // Dynamic value - preserve it
            propsToPreserve.set(name, jsxAttr)
          }
        } else {
          // No initializer - preserve to avoid losing potential behavior
          propsToPreserve.set(name, jsxAttr)
        }
      } else if (name === 'style') {
        propsToPreserve.set('style', jsxAttr)
      } else {
        // Preserve other props (className, onClick, etc.)
        propsToPreserve.set(name, jsxAttr)
      }
    }

    // Handle icon prop - check if it's static or dynamic
    if (!iconValue || !iconAttr) {
      // Dynamic icon prop - skip transformation, leave as DeprecatedIcon
      // Note: We can't easily add TODO comments to un-transformed elements in ts-morph
      // These will remain as DeprecatedIcon and users will need to migrate manually
      continue
    }

    // Check if icon is removed
    const mapped = mapIconName(iconValue)
    if (!mapped) continue

    if (mapped.removed) {
      // Removed icon - skip transformation, leave as DeprecatedIcon
      // Users will need to manually handle these
      continue
    }

    const usage = iconUsages.get(iconValue)
    if (!usage) continue

    const { componentName } = usage

    // Check if we have dynamic props that need manual migration
    const hasDynamicProps = ['intent', 'fontSize', 'width', 'height'].some((propName) => propsToPreserve.has(propName))

    if (hasDynamicProps) {
      // Determine context for comment syntax
      const useJsxComment = shouldUseJsxComment(element)

      // Track this element needs a TODO
      if (!todosNeeded.has(componentName)) {
        todosNeeded.set(componentName, new Set())
      }
      const commentText = useJsxComment
        ? '{/* TODO: Migrate dynamic props manually */}'
        : '// TODO: Migrate dynamic props manually'
      todosNeeded.get(componentName)!.add(commentText)
    }

    // Rename element
    tagName.replaceWithText(componentName)

    // Remove icon prop
    if (iconAttr) {
      iconAttr.remove()
    }

    // Transform props
    const newProps: Array<{ name: string; initializer: string }> = []
    let needsStyleMerge = false
    const stylesToMerge: string[] = []

    // Handle fontSize
    if (propsToTransform.has('fontSize')) {
      const { value } = propsToTransform.get('fontSize')!
      const mappedSize = mapFontSizeToSize(value)
      if (mappedSize) {
        newProps.push({ name: 'size', initializer: `"${mappedSize}"` })
      } else {
        // Unmapped fontSize - add to style
        stylesToMerge.push(`fontSize: '${value}'`)
        needsStyleMerge = true
      }
    }

    // Handle intent
    if (propsToTransform.has('intent')) {
      const { value } = propsToTransform.get('intent')!
      const mappedColor = mapIntentToColor(value)
      newProps.push({ name: 'color', initializer: `"${mappedColor}"` })
    }

    // Handle width/height
    const width = propsToTransform.get('width')?.value
    const height = propsToTransform.get('height')?.value

    if (width && height && width === height) {
      // Square dimensions - try to map to size
      const mappedSize = mapFontSizeToSize(width)
      if (mappedSize && !newProps.some((p) => p.name === 'size')) {
        newProps.push({ name: 'size', initializer: `"${mappedSize}"` })
      } else {
        // Non-standard square size
        stylesToMerge.push(`width: '${width}'`, `height: '${height}'`)
        needsStyleMerge = true
      }
    } else if (width || height) {
      // Non-square dimensions - add to style with TODO
      if (width) stylesToMerge.push(`width: '${width}'`)
      if (height) stylesToMerge.push(`height: '${height}'`)
      needsStyleMerge = true
    }

    // Remove old props
    propsToRemove.forEach((prop) => {
      if (!prop.wasForgotten()) {
        prop.remove()
      }
    })

    // Add new props
    newProps.forEach(({ name, initializer }) => {
      element.addAttribute({ name, initializer })
    })

    // Handle style merging
    if (needsStyleMerge) {
      const existingStyleAttr = propsToPreserve.get('style')

      if (existingStyleAttr) {
        // Merge with existing style prop
        const existingInit = existingStyleAttr.asKind(SyntaxKind.JsxAttribute)?.getInitializer()

        if (existingInit && existingInit.getKind() === SyntaxKind.JsxExpression) {
          const jsxExpr = existingInit.asKind(SyntaxKind.JsxExpression)
          const expression = jsxExpr?.getExpression()

          if (expression) {
            const existingStyleText = expression.getText()
            // Merge styles - wrap existing in spread if it's an object
            const mergedStyle = `{{ ...${existingStyleText}, ${stylesToMerge.join(', ')} }}`
            existingStyleAttr.asKind(SyntaxKind.JsxAttribute)?.setInitializer(mergedStyle)

            // Mark for TODO comment with context-aware syntax
            const useJsxComment = shouldUseJsxComment(element)
            if (!todosNeeded.has(componentName)) {
              todosNeeded.set(componentName, new Set())
            }
            const commentText = useJsxComment
              ? '{/* TODO: Review merged style prop for manual verification */}'
              : '// TODO: Review merged style prop for manual verification'
            todosNeeded.get(componentName)!.add(commentText)
          }
        }
      } else {
        // Add new style prop
        const styleObject = `{{ ${stylesToMerge.join(', ')} }}`
        element.addAttribute({ name: 'style', initializer: styleObject })

        // Mark for TODO comment with context-aware syntax
        const useJsxComment = shouldUseJsxComment(element)
        if (!todosNeeded.has(componentName)) {
          todosNeeded.set(componentName, new Set())
        }
        const commentText = useJsxComment
          ? '{/* TODO: Review unmapped dimensions for manual verification */}'
          : '// TODO: Review unmapped dimensions for manual verification'
        todosNeeded.get(componentName)!.add(commentText)
      }
    }

    // Update closing tag if needed
    if (element.getKind() === SyntaxKind.JsxOpeningElement) {
      const parent = element.getParent()
      if (parent && parent.getKind() === SyntaxKind.JsxElement) {
        const closingElement = parent.asKind(SyntaxKind.JsxElement)?.getClosingElement()
        if (closingElement) {
          const closingTagName = closingElement.getTagNameNode()
          const closingTagNameText = closingTagName.getText()
          // Check if closing tag is DeprecatedIcon or its alias
          if (closingTagNameText === 'DeprecatedIcon' || closingTagNameText === deprecatedIconAlias) {
            closingTagName.replaceWithText(componentName)
          }
        }
      }
    }
  }

  return todosNeeded
}

/**
 * Adds TODO comments before icon components via string replacement.
 * Comments are pre-formatted with correct syntax (JSX or JS) based on context.
 */
function addTodoComments(output: string, todosNeeded: Map<string, Set<string>>): string {
  let result = output

  // For each component that needs TODOs, find its first occurrence and add comments
  for (const [componentName, messages] of todosNeeded.entries()) {
    // Combine messages intelligently if both "merged style prop" and "unmapped dimensions" are present
    let combinedMessage: string | null = null
    const messagesArray = Array.from(messages)

    const hasMergedStyle = messagesArray.some((msg) => msg.includes('merged style prop'))
    const hasUnmappedDimensions = messagesArray.some((msg) => msg.includes('unmapped dimensions'))

    if (hasMergedStyle && hasUnmappedDimensions) {
      // Combine both messages into one
      const isJsxComment = messagesArray[0].startsWith('{/*')
      combinedMessage = isJsxComment
        ? '{/* TODO: Review merged style prop and unmapped dimensions for manual verification */}'
        : '// TODO: Review merged style prop and unmapped dimensions for manual verification'
    }

    // Find pattern like <ComponentName or <ComponentName> (both self-closing and opening tags)
    const pattern = new RegExp(`(<${componentName}[\\s>])`, 'g')
    let foundFirst = false

    result = result.replace(pattern, (match) => {
      // Only add TODO to the first occurrence
      if (!foundFirst) {
        foundFirst = true
        // Use combined message if available, otherwise join all messages
        const allComments = combinedMessage || messagesArray.join('\n')
        return `${allComments}\n${match}`
      }
      return match
    })
  }

  return result
}

/**
 * Checks if a JSX element is inside JSX content vs JavaScript expression context.
 * Returns true if we should use JSX comment syntax, false if we should use JS comment syntax.
 */
function shouldUseJsxComment(element: JsxSelfClosingElement | JsxOpeningElement): boolean {
  let parent: Node | undefined = element.getParent()

  // Walk up the tree to find the context
  while (parent) {
    const kind = parent.getKind()

    // If we hit a JSX element/fragment, we're in JSX content - use JSX comment
    if (kind === SyntaxKind.JsxElement || kind === SyntaxKind.JsxFragment) {
      return true
    }

    // If we're directly inside a JsxExpression (e.g., {<Icon />}), we're in JS context
    if (kind === SyntaxKind.JsxExpression) {
      return false
    }

    // If we're in various JS contexts (object property, array element, etc.), use JS comment
    if (
      kind === SyntaxKind.PropertyAssignment ||
      kind === SyntaxKind.ArrayLiteralExpression ||
      kind === SyntaxKind.VariableDeclaration ||
      kind === SyntaxKind.CallExpression ||
      kind === SyntaxKind.ReturnStatement ||
      kind === SyntaxKind.ArrowFunction
    ) {
      return false
    }

    parent = parent.getParent()
  }

  // Default to JS comment for safety
  return false
}

/**
 * Collects the positions and text for TODO comments for DeprecatedIcon elements
 * that cannot be migrated (dynamic icon props or removed icons).
 * Returns an array of {position, text} insertions to apply, without applying them.
 * Positions are sourced from the AST snapshot captured before any string insertions.
 */
function collectDeprecatedIconTodoInsertions(
  sourceFile: SourceFile,
  alias: string | null,
): Array<{ position: number; text: string; message: string }> {
  const jsxElements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
  ]

  const elementsNeedingComments: Array<{ position: number; message: string; useJsxComment: boolean }> = []

  for (const element of jsxElements) {
    const tagName = element.getTagNameNode()
    const tagNameText = tagName.getText()

    // Check if this is DeprecatedIcon or its alias
    if (tagNameText !== 'DeprecatedIcon' && tagNameText !== alias) continue

    const attributes = element.getAttributes()
    let iconValue: string | null = null
    let hasIconProp = false

    for (const attr of attributes) {
      if (attr.getKind() !== SyntaxKind.JsxAttribute) continue

      const jsxAttr = attr.asKind(SyntaxKind.JsxAttribute)!
      const name = jsxAttr.getNameNode().getText()

      if (name === 'icon') {
        hasIconProp = true
        const init = jsxAttr.getInitializer()
        if (init) {
          iconValue = extractStringLiteral(init)
        }
      }
    }

    // Determine if we should use JS comment (//) or JSX comment ({/* */})
    const useJsxComment = shouldUseJsxComment(element)

    // Check if this is a dynamic icon prop or removed icon
    if (hasIconProp && !iconValue) {
      // Dynamic icon prop
      elementsNeedingComments.push({
        position: element.getStart(),
        message: 'TODO: DeprecatedIcon with dynamic icon prop needs manual migration',
        useJsxComment,
      })
    } else if (iconValue) {
      const mapped = mapIconName(iconValue)
      if (mapped?.removed) {
        // Removed icon
        elementsNeedingComments.push({
          position: element.getStart(),
          message: `TODO: Icon "${iconValue}" has been removed in v5 and has no replacement`,
          useJsxComment,
        })
      }
    }
  }

  return elementsNeedingComments.map(({ position, message, useJsxComment }) => ({
    position,
    text: useJsxComment ? `{/* ${message} */}\n` : `// ${message}\n`,
    message,
  }))
}

/**
 * Collects the positions and text for TODO comments for DeprecatedIcon used as
 * values (not JSX tags) — e.g., styled(DeprecatedIcon), passed as props, etc.
 * Returns an array of {position, text} insertions to apply, without applying them.
 * Positions are sourced from the AST snapshot captured before any string insertions.
 */
function collectNonJsxUsageTodoInsertions(
  sourceFile: SourceFile,
): Array<{ position: number; text: string; message: string }> {
  // Find the import to get the actual imported name (accounting for aliases)
  const deprecatedIconImport = sourceFile
    .getImportDeclarations()
    .flatMap((imp) => imp.getNamedImports())
    .find((named) => named.getName() === 'DeprecatedIcon')

  if (!deprecatedIconImport) return []

  // Get the actual name used in the code (alias if present, otherwise 'DeprecatedIcon')
  const actualName = deprecatedIconImport.getAliasNode()?.getText() || deprecatedIconImport.getName()

  // Find ALL references to this identifier (not just JSX tags)
  const allIdentifiers = sourceFile.getDescendantsOfKind(SyntaxKind.Identifier)
  const references = allIdentifiers.filter((id) => id.getText() === actualName)

  // Filter to non-JSX usages only
  const nonJsxUsages = references.filter((ref) => {
    const parent = ref.getParent()
    return (
      parent?.getKind() !== SyntaxKind.ImportSpecifier &&
      parent?.getKind() !== SyntaxKind.JsxOpeningElement &&
      parent?.getKind() !== SyntaxKind.JsxSelfClosingElement &&
      parent?.getKind() !== SyntaxKind.JsxClosingElement
    )
  })

  const message = 'TODO: DeprecatedIcon used as value - needs manual migration'
  return nonJsxUsages.map((usage) => ({
    position: usage.getStart(),
    text: `// ${message}\n`,
    message,
  }))
}

/**
 * Applies a list of text insertions to a string.
 *
 * All insertions must be sorted in descending position order before calling this
 * function. Applying in descending order ensures that each insertion does not shift
 * the position of subsequent (lower-position) insertions, so the AST positions
 * captured before any mutation remain valid throughout the pass.
 *
 * Duplicate insertions (same message already present in the 200-char lookback
 * window) are skipped for idempotency.
 */
function applyInsertions(
  output: string,
  insertions: Array<{ position: number; text: string; message: string }>,
): string {
  // Insertions must already be sorted descending by position
  let result = output
  for (const { position, text, message } of insertions) {
    // Check if a TODO comment already exists before this position (idempotency)
    const lookbackStart = Math.max(0, position - 200)
    const lookback = result.substring(lookbackStart, position)

    if (lookback.includes(message)) {
      continue // Skip adding duplicate comment
    }

    result = result.slice(0, position) + text + result.slice(position)
  }
  return result
}

export default function transform(
  source: string,
  filePath: string = 'file.tsx',
  options?: { facadePackage?: string },
): string {
  // Early return if file doesn't contain DeprecatedIcon
  if (!source.includes('DeprecatedIcon')) {
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

  // Detect if DeprecatedIcon is imported with an alias
  const alias = getDeprecatedIconAlias(sourceFile, options?.facadePackage)

  // Collect all icon usages (only static ones)
  const iconUsages = collectIconUsages(sourceFile, alias)

  // Add new icon imports
  addIconImports(sourceFile, iconUsages, options?.facadePackage)

  // Transform JSX elements and collect TODOs needed
  const todosNeeded = transformJsxElements(sourceFile, iconUsages, alias)

  // Remove unused DeprecatedIcon import
  removeUnusedDeprecatedIconImport(sourceFile, alias, options?.facadePackage)

  // Get transformed output
  let output = sourceFile.getFullText()

  // Collect all position-based TODO insertions from both sources.
  // Positions are sourced from the AST snapshot before any string insertions, so
  // they must all be merged and applied in a single descending pass via applyInsertions().
  const deprecatedIconInsertions = collectDeprecatedIconTodoInsertions(sourceFile, alias)
  const nonJsxInsertions = collectNonJsxUsageTodoInsertions(sourceFile)
  const allInsertions = [...deprecatedIconInsertions, ...nonJsxInsertions].sort(
    (a, b) => b.position - a.position,
  )
  output = applyInsertions(output, allInsertions)

  // Add TODO comments for transformed elements (style merging cases, dynamic props)
  if (todosNeeded.size > 0) {
    output = addTodoComments(output, todosNeeded)
  }

  return output
}
