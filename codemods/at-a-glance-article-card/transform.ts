import { Project, SyntaxKind, JsxOpeningElement, JsxSelfClosingElement, SourceFile } from 'ts-morph'

/**
 * Codemod to migrate AtAGlance.Card to the new AtAGlance.ArticleCard.
 *
 * The old AtAGlance.Card component accepted props like `displayValue`, `label`,
 * `description`, and `icon` directly. The new API separates concerns:
 *
 * - `AtAGlance.Card` is now a primitive for custom layouts using `grid` prop and
 *   subcomponents (Icon, Label, Description, Value)
 * - `AtAGlance.ArticleCard` is the new high-level component for static article cards
 *
 * Transformations:
 * - AtAGlance.Card (with displayValue/label props) -> AtAGlance.ArticleCard
 * - AtAGlanceCard (with displayValue/label props) -> AtAGlance.ArticleCard
 * - AtAGlance.Card (with children/grid) -> No change (already using new API)
 * - AtAGlanceCard (with children/grid) -> No change (already using new API)
 * - AtAGlance.AnchorCard / AtAGlanceAnchorCard -> No change (API unchanged)
 * - AtAGlance.ButtonCard / AtAGlanceButtonCard -> No change (API unchanged)
 */

type JsxElementWithTag = JsxOpeningElement | JsxSelfClosingElement

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

function getTagName(element: JsxElementWithTag): string {
  return element.getTagNameNode().getText()
}

function isNamespacedComponent(element: JsxElementWithTag, componentName: string): boolean {
  return getTagName(element) === `AtAGlance.${componentName}`
}

function hasProp(element: JsxElementWithTag, propName: string): boolean {
  const attributes = element.getAttributes()
  return attributes.some((attr) => {
    if (attr.getKind() !== SyntaxKind.JsxAttribute) {
      return false
    }
    const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute)
    const nameNode = jsxAttr.getNameNode()
    return nameNode.getText() === propName
  })
}

function hasChildren(element: JsxElementWithTag): boolean {
  // Self-closing elements have no children
  if (element.getKind() === SyntaxKind.JsxSelfClosingElement) {
    return false
  }

  // For opening elements, check the parent JsxElement's children
  const parent = element.getParent()
  if (parent?.getKind() === SyntaxKind.JsxElement) {
    const jsxElement = parent.asKindOrThrow(SyntaxKind.JsxElement)
    const children = jsxElement.getJsxChildren()
    // Filter out whitespace-only text
    return children.some((child) => {
      if (child.getKind() === SyntaxKind.JsxText) {
        return child.getText().trim().length > 0
      }
      return true
    })
  }

  return false
}

function isUsingOldApi(element: JsxElementWithTag): boolean {
  // New API uses subcomponents as children or grid prop
  if (hasChildren(element) || hasProp(element, 'grid')) {
    return false
  }
  // Old API has displayValue or label props, or is completely empty (no props, no children)
  // Empty cards should be migrated to ArticleCard (will cause TS errors, but that's expected)
  return true
}

function renameTagTo(element: JsxElementWithTag, newTagName: string): void {
  const tagNameNode = element.getTagNameNode()
  tagNameNode.replaceWithText(newTagName)
}

function transformJsxElements(sourceFile: SourceFile, atAGlanceCardAliases: Set<string>): void {
  // Two-pass transformation approach:
  // Pass 1: Transform namespaced components (AtAGlance.Card -> AtAGlance.ArticleCard)
  // Pass 2: Transform direct imports (AtAGlanceCard -> AtAGlance.ArticleCard)
  //
  // We cannot do this in a single pass because mutating the AST while iterating
  // over it can cause nodes to be invalidated or missed. By collecting all elements
  // first, then mutating, we avoid iterator invalidation issues.

  // Pass 1: Process namespaced AtAGlance.Card components
  const selfClosingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
  const openingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement)

  // Transform namespaced AtAGlance.Card to AtAGlance.ArticleCard when using old API
  for (const element of [...selfClosingElements, ...openingElements]) {
    if (isNamespacedComponent(element, 'Card') && isUsingOldApi(element)) {
      renameTagTo(element, 'AtAGlance.ArticleCard')

      // Also rename closing tag for non-self-closing elements
      if (element.getKind() === SyntaxKind.JsxOpeningElement) {
        const parent = element.getParent()
        if (parent?.getKind() === SyntaxKind.JsxElement) {
          const jsxElement = parent.asKindOrThrow(SyntaxKind.JsxElement)
          const closingElement = jsxElement.getClosingElement()
          if (closingElement) {
            closingElement.getTagNameNode().replaceWithText('AtAGlance.ArticleCard')
          }
        }
      }
    }
  }

  // Pass 2: Re-fetch elements after Pass 1 mutations, then transform direct imports
  const selfClosingElements2 = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
  const openingElements2 = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement)

  // Transform direct AtAGlanceCard (or its aliases) to AtAGlance.ArticleCard when using old API
  for (const element of [...selfClosingElements2, ...openingElements2]) {
    const tagName = getTagName(element)
    if (atAGlanceCardAliases.has(tagName) && isUsingOldApi(element)) {
      renameTagTo(element, 'AtAGlance.ArticleCard')

      // Also rename closing tag for non-self-closing elements
      if (element.getKind() === SyntaxKind.JsxOpeningElement) {
        const parent = element.getParent()
        if (parent?.getKind() === SyntaxKind.JsxElement) {
          const jsxElement = parent.asKindOrThrow(SyntaxKind.JsxElement)
          const closingElement = jsxElement.getClosingElement()
          if (closingElement) {
            closingElement.getTagNameNode().replaceWithText('AtAGlance.ArticleCard')
          }
        }
      }
    }
  }
}

function getAtAGlanceCardAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()

    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'AtAGlanceCard') {
        // Get the alias if it exists, otherwise use the original name
        // Only add the alias (or original name) that's actually used in the file
        const alias = namedImport.getAliasNode()?.getText()
        aliases.add(alias ?? 'AtAGlanceCard')
      }
    }
  }

  // Add default only if file has NO imports at all (handles test snippets without imports)
  if (aliases.size === 0 && sourceFile.getImportDeclarations().length === 0) {
    aliases.add('AtAGlanceCard')
  }

  return aliases
}

function isAtAGlanceCardStillUsed(sourceFile: SourceFile, aliases: Set<string>): boolean {
  const selfClosingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
  const openingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement)

  return [...selfClosingElements, ...openingElements].some((element) => {
    const tagName = getTagName(element)
    return aliases.has(tagName)
  })
}

function hasAtAGlanceImport(sourceFile: SourceFile, facadePackage?: string): boolean {
  return sourceFile.getImportDeclarations().some((importDecl) => {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()

    if (!isElementsImport(moduleSpecifier, facadePackage)) return false

    return importDecl.getNamedImports().some((namedImport) => namedImport.getName() === 'AtAGlance')
  })
}

function usesAtAGlanceNamespace(sourceFile: SourceFile): boolean {
  const selfClosingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
  const openingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement)

  return [...selfClosingElements, ...openingElements].some((element) => getTagName(element).startsWith('AtAGlance.'))
}

function updateImports(sourceFile: SourceFile, atAGlanceCardAliases: Set<string>, facadePackage?: string): void {
  const importDeclarations = sourceFile.getImportDeclarations()
  const atAGlanceCardStillUsed = isAtAGlanceCardStillUsed(sourceFile, atAGlanceCardAliases)
  const needsAtAGlanceImport = usesAtAGlanceNamespace(sourceFile) && !hasAtAGlanceImport(sourceFile, facadePackage)
  let importDeclWhereAtAGlanceCardWasRemoved: (typeof importDeclarations)[0] | null = null

  // First pass: Remove AtAGlanceCard imports and track where it was removed
  for (const importDecl of importDeclarations) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()

    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    if (!atAGlanceCardStillUsed) {
      const namedImports = importDecl.getNamedImports()

      for (const namedImport of namedImports) {
        if (namedImport.getName() === 'AtAGlanceCard') {
          namedImport.remove()
          importDeclWhereAtAGlanceCardWasRemoved = importDecl
        }
      }
    }
  }

  // Second pass: Add AtAGlance import to the same declaration where AtAGlanceCard was removed
  // Do this BEFORE removing empty imports to avoid accessing removed nodes
  if (needsAtAGlanceImport && importDeclWhereAtAGlanceCardWasRemoved) {
    importDeclWhereAtAGlanceCardWasRemoved.addNamedImport('AtAGlance')
  } else if (needsAtAGlanceImport) {
    // If we didn't find where AtAGlanceCard was removed, add to first elements import
    for (const importDecl of importDeclarations) {
      const moduleSpecifier = importDecl.getModuleSpecifierValue()

      if (isElementsImport(moduleSpecifier, facadePackage)) {
        importDecl.addNamedImport('AtAGlance')
        break
      }
    }
  }

  // Third pass: Remove empty import declarations
  for (const importDecl of importDeclarations) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()

    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    if (
      importDecl.getNamedImports().length === 0 &&
      !importDecl.getDefaultImport() &&
      !importDecl.getNamespaceImport()
    ) {
      importDecl.remove()
    }
  }
}

export default function transform(
  source: string,
  filePath: string = 'file.tsx',
  options?: { facadePackage?: string },
): string {
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      jsx: 2, // JsxEmit.React
    },
  })

  const sourceFile = project.createSourceFile(filePath, source)

  // Get aliases before transforming (e.g., import { AtAGlanceCard as Card })
  const atAGlanceCardAliases = getAtAGlanceCardAliases(sourceFile, options?.facadePackage)

  transformJsxElements(sourceFile, atAGlanceCardAliases)
  updateImports(sourceFile, atAGlanceCardAliases, options?.facadePackage)

  return sourceFile.getFullText()
}
