import { Project, QuoteKind, SourceFile, SyntaxKind, VariableDeclaration, ObjectBindingPattern } from 'ts-morph'
import { isElementsImport } from '../shared/elements-import.js'

/**
 * Codemod to migrate deprecated useMediaQuery and related exports.
 *
 * Handles:
 * - useMediaQuery() destructured calls → individual useMatchMedia() calls
 * - useMediaQuery() non-destructured calls → TODO comment (safe fallback)
 * - <MediaStateProvider> wrapper → unwrap children
 * - MOBILE_BREAKPOINT etc. references → inlined numeric values with TODO comment
 * - MediaType type references → TODO comment
 * - MediaStateContext references → TODO comment
 * - Import cleanup: removes deprecated imports, adds new utility imports
 */

// Deprecated exports this codemod handles
const DEPRECATED_EXPORTS = [
  'useMediaQuery',
  'MediaStateProvider',
  'MediaStateContext',
  'MediaType',
  'MOBILE_BREAKPOINT',
  'TABLET_BREAKPOINT',
  'DESKTOP_BREAKPOINT',
  'WIDESCREEN_BREAKPOINT',
  'SUPER_WIDESCREEN_BREAKPOINT',
]

// Breakpoint constant → inlined numeric value
const BREAKPOINT_VALUES: Record<string, number> = {
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
  DESKTOP_BREAKPOINT: 1440,
  WIDESCREEN_BREAKPOINT: 1920,
  SUPER_WIDESCREEN_BREAKPOINT: 2560,
}

// useMediaQuery property → media query expression (using isWidthAtOrAbove / isWidthBelow)
const PROPERTY_TO_MEDIA_QUERY: Record<string, string> = {
  isMobile: "isWidthBelow('SM')",
  isTablet: "isWidthAtOrAbove('SM') and isWidthBelow('MD')",
  isDesktop: "isWidthAtOrAbove('MD') and isWidthBelow('LG')",
  isWideScreen: "isWidthAtOrAbove('LG') and isWidthBelow('XL')",
  isSuperWideScreen: "isWidthAtOrAbove('XL') and isWidthBelow('2XL')",
  is4KScreen: "isWidthAtOrAbove('2XL')",
}

/**
 * Returns the media query string for a property name, formatted as a
 * template-literal expression that calls the breakpoint helpers at runtime.
 * For compound expressions we use template literals; for simple ones a plain string.
 */
function buildMediaQueryExpression(property: string): string {
  const expr = PROPERTY_TO_MEDIA_QUERY[property]
  if (!expr) return `''`

  // Simple (no "and") — emit a direct isWidthBelow / isWidthAtOrAbove call
  if (!expr.includes(' and ')) {
    return expr
  }

  // Compound — emit a template literal joining the two halves
  const [left, right] = expr.split(' and ')
  return `\`\${${left}} and \${${right}}\``
}

/**
 * Given a module specifier like '@reapit/elements/deprecated/use-media-query'
 * or '@reapit/elements', returns the base package name (e.g. '@reapit/elements').
 */
function extractBasePackage(moduleSpecifier: string, facadePackage?: string): string {
  const base = facadePackage ?? '@reapit/elements'
  // The specifier IS the base package or a subpath of it — strip everything after the base
  if (moduleSpecifier === base || moduleSpecifier.startsWith(base + '/')) {
    return base
  }
  // Should not happen given isElementsImport guard, but fall back safely
  return base
}

interface DeprecatedImportInfo {
  /** Alias (or original name) used in this file for each deprecated export */
  aliases: Map<string, string>
  /** Base package extracted from the first matched import declaration */
  basePackage: string
}

/**
 * Scans import declarations for deprecated exports.
 * Returns a map of export name → local alias (or same name if no alias).
 */
function collectDeprecatedImports(sourceFile: SourceFile, facadePackage?: string): DeprecatedImportInfo {
  const aliases = new Map<string, string>()
  let basePackage = facadePackage ?? '@reapit/elements'
  let foundBase = false

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    if (!foundBase) {
      basePackage = extractBasePackage(moduleSpecifier, facadePackage)
      foundBase = true
    }

    for (const namedImport of importDecl.getNamedImports()) {
      const name = namedImport.getName()
      if (DEPRECATED_EXPORTS.includes(name)) {
        const alias = namedImport.getAliasNode()?.getText() ?? name
        aliases.set(name, alias)
      }
    }
  }

  return { aliases, basePackage }
}

/**
 * Removes deprecated named imports from all matching import declarations.
 * Deletes the entire declaration if it becomes empty.
 */
function removeDeprecatedImports(sourceFile: SourceFile, facadePackage?: string): void {
  for (const importDecl of sourceFile.getImportDeclarations().slice()) {
    if (importDecl.wasForgotten()) continue

    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports().slice()) {
      if (DEPRECATED_EXPORTS.includes(namedImport.getName())) {
        namedImport.remove()
      }
    }

    if (importDecl.getNamedImports().length === 0 && !importDecl.getDefaultImport()) {
      importDecl.remove()
    }
  }
}

/**
 * Adds a named import to the source file, merging into an existing declaration
 * from the same module specifier when one already exists.
 */
function addNamedImport(sourceFile: SourceFile, moduleSpecifier: string, name: string): void {
  const existing = sourceFile.getImportDeclarations().find((d) => d.getModuleSpecifierValue() === moduleSpecifier)

  if (existing) {
    const alreadyPresent = existing.getNamedImports().some((n) => n.getName() === name)
    if (!alreadyPresent) {
      existing.addNamedImport(name)
    }
  } else {
    sourceFile.addImportDeclaration({ moduleSpecifier, namedImports: [name] })
  }
}

/**
 * Determines which breakpoint helper functions are needed for a given set of
 * property names.
 */
function neededBreakpointHelpers(propertyNames: string[]): { needsAtOrAbove: boolean; needsBelow: boolean } {
  let needsAtOrAbove = false
  let needsBelow = false

  for (const prop of propertyNames) {
    const expr = PROPERTY_TO_MEDIA_QUERY[prop]
    if (!expr) continue
    if (expr.includes('isWidthAtOrAbove')) needsAtOrAbove = true
    if (expr.includes('isWidthBelow')) needsBelow = true
  }

  return { needsAtOrAbove, needsBelow }
}

/**
 * Transforms destructured useMediaQuery() calls.
 *
 * const { isMobile, isDesktop } = useMediaQuery()
 * →
 * const isMobile = useMatchMedia(isWidthBelow('SM'))
 * const isDesktop = useMatchMedia(`${isWidthAtOrAbove('MD')} and ${isWidthBelow('LG')}`)
 */
function transformDestructuredUseMediaQuery(
  sourceFile: SourceFile,
  useMediaQueryAlias: string,
): { transformedProperties: string[] } {
  const transformedProperties: string[] = []
  const declarationsToProcess: VariableDeclaration[] = []

  // Collect variable declarations where the initialiser is a call to the alias
  for (const varDecl of sourceFile.getDescendantsOfKind(SyntaxKind.VariableDeclaration)) {
    const initializer = varDecl.getInitializer()
    if (!initializer) continue
    if (initializer.getKind() !== SyntaxKind.CallExpression) continue

    const callExpr = initializer.asKind(SyntaxKind.CallExpression)!
    if (callExpr.getExpression().getText() !== useMediaQueryAlias) continue

    const nameNode = varDecl.getNameNode()
    if (nameNode.getKind() !== SyntaxKind.ObjectBindingPattern) continue

    declarationsToProcess.push(varDecl)
  }

  for (const varDecl of declarationsToProcess) {
    const varDeclList = varDecl.getParent()
    if (!varDeclList || varDeclList.getKind() !== SyntaxKind.VariableDeclarationList) continue

    const varStatement = varDeclList.getParent()
    if (!varStatement || varStatement.getKind() !== SyntaxKind.VariableStatement) continue

    // Guard: if the declaration list has other declarators, replacing the whole statement
    // would silently drop them — emit a TODO instead.
    const allDeclarations = varDeclList.asKind(SyntaxKind.VariableDeclarationList)?.getDeclarations() ?? []
    if (allDeclarations.length > 1) {
      const existingText = varStatement.getText()
      varStatement.replaceWithText(
        `// TODO: Migrate to useMatchMedia — see @reapit/elements migration guide\n${existingText}`,
      )
      continue
    }

    const nameNode = varDecl.getNameNode() as ObjectBindingPattern

    // Build replacement declarations
    const replacements: string[] = []
    for (const element of nameNode.getElements()) {
      const propertyName = element.getPropertyNameNode()?.getText() ?? element.getNameNode().getText()
      const localName = element.getNameNode().getText()
      const mediaExpr = buildMediaQueryExpression(propertyName)

      if (mediaExpr === `''`) {
        // Unknown property — emit a TODO comment and skip
        replacements.push(`// TODO: Unknown useMediaQuery property '${propertyName}' — migrate manually`)
      } else {
        replacements.push(`const ${localName} = useMatchMedia(${mediaExpr})`)
        transformedProperties.push(propertyName)
      }
    }

    // Replace the original statement
    varStatement.replaceWithText(replacements.join('\n'))
  }

  return { transformedProperties }
}

/**
 * Adds TODO comments above non-destructured useMediaQuery() calls.
 *
 * const media = useMediaQuery()
 * →
 * // TODO: Migrate to useMatchMedia — see @reapit/elements migration guide
 * const media = useMediaQuery()
 */
function addTodosForNonDestructuredUseMediaQuery(sourceFile: SourceFile, useMediaQueryAlias: string): void {
  const declarationsToAnnotate: VariableDeclaration[] = []

  for (const varDecl of sourceFile.getDescendantsOfKind(SyntaxKind.VariableDeclaration)) {
    const initializer = varDecl.getInitializer()
    if (!initializer) continue
    if (initializer.getKind() !== SyntaxKind.CallExpression) continue

    const callExpr = initializer.asKind(SyntaxKind.CallExpression)!
    if (callExpr.getExpression().getText() !== useMediaQueryAlias) continue

    const nameNode = varDecl.getNameNode()
    // Only handle NON-destructured (identifier binding)
    if (nameNode.getKind() !== SyntaxKind.Identifier) continue

    declarationsToAnnotate.push(varDecl)
  }

  for (const varDecl of declarationsToAnnotate) {
    const varDeclList = varDecl.getParent()
    if (!varDeclList || varDeclList.getKind() !== SyntaxKind.VariableDeclarationList) continue

    const varStatement = varDeclList.getParent()
    if (!varStatement || varStatement.getKind() !== SyntaxKind.VariableStatement) continue

    const existingText = varStatement.getText()
    varStatement.replaceWithText(
      `// TODO: Migrate to useMatchMedia — see @reapit/elements migration guide\n${existingText}`,
    )
  }
}

/**
 * Removes <MediaStateProvider>...</MediaStateProvider> wrappers by unwrapping children.
 */
function transformMediaStateProvider(sourceFile: SourceFile, mediaStateProviderAlias: string): void {
  // We need to process in bottom-up order to handle nesting correctly.
  // Collect all matching JSX elements first, then process from deepest to shallowest.

  const processElements = () => {
    const jsxElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)

    for (const jsxElement of jsxElements) {
      const openingTag = jsxElement.getOpeningElement()
      const tagName = openingTag.getTagNameNode().getText()

      if (tagName !== mediaStateProviderAlias) continue

      const children = jsxElement.getJsxChildren()

      // Filter out whitespace-only JsxText nodes
      const meaningfulChildren = children.filter((child) => {
        if (child.getKind() === SyntaxKind.JsxText) {
          return child.getText().trim().length > 0
        }
        return true
      })

      if (meaningfulChildren.length === 0) {
        // Self-closing equivalent — remove entirely
        jsxElement.replaceWithText('')
        return // Restart after mutation
      }

      if (meaningfulChildren.length === 1) {
        // Single child — replace with just the child
        jsxElement.replaceWithText(meaningfulChildren[0].getText())
        return // Restart after mutation
      }

      // Multiple children — wrap in a fragment
      const childrenText = meaningfulChildren.map((c) => c.getText()).join('\n')
      jsxElement.replaceWithText(`<>\n${childrenText}\n</>`)
      return // Restart after mutation
    }
  }

  // Run until no more MediaStateProvider elements are found
  let iterations = 0
  while (iterations < 100) {
    const before = sourceFile.getFullText()
    processElements()
    const after = sourceFile.getFullText()
    if (before === after) break
    iterations++
  }
}

/**
 * Inlines breakpoint constant references and adds TODO comments.
 *
 * MOBILE_BREAKPOINT → 768 // TODO: Consider using breakpoint utilities from @reapit/elements/utils/breakpoints
 */
function inlineBreakpointConstants(sourceFile: SourceFile, aliases: Map<string, string>): void {
  for (const [exportName, alias] of aliases.entries()) {
    if (!(exportName in BREAKPOINT_VALUES)) continue

    const value = BREAKPOINT_VALUES[exportName]

    // Find all identifier references to this alias (excluding the import specifier itself)
    const identifiers = sourceFile
      .getDescendantsOfKind(SyntaxKind.Identifier)
      .filter((id) => id.getText() === alias)
      .filter((id) => {
        const parent = id.getParent()
        return parent?.getKind() !== SyntaxKind.ImportSpecifier
      })

    for (const id of identifiers) {
      // Replace identifier with numeric literal + trailing TODO comment
      id.replaceWithText(
        `${value} /* TODO: Consider using breakpoint utilities from @reapit/elements/utils/breakpoints */`,
      )
    }
  }
}

/**
 * Adds TODO comments for MediaType type references and removes the import.
 * Uses string replacement on the output (post ts-morph) for type annotation positions
 * that are hard to mutate cleanly via AST.
 */
function addTodosForMediaType(output: string, mediaTypeAlias: string): string {
  // Replace type annotations like ": MediaType" or "<MediaType>" with TODO comment.
  // The replacement string deliberately avoids repeating the alias word to prevent
  // re-matching if this function were ever called more than once on the same output.
  return output.replace(
    new RegExp(`\\b${mediaTypeAlias}\\b`, 'g'),
    `never /* TODO: replace with a more specific type or use ReturnType<typeof useMatchMedia> */`,
  )
}

/**
 * Adds TODO comments for MediaStateContext usages.
 */
function addTodosForMediaStateContext(output: string, mediaStateContextAlias: string): string {
  return output.replace(
    new RegExp(`\\b${mediaStateContextAlias}\\b`, 'g'),
    `undefined /* TODO: MediaStateContext has been removed — migrate to individual useMatchMedia calls */`,
  )
}

export default function transform(
  source: string,
  filePath: string = 'file.tsx',
  options?: { facadePackage?: string },
): string {
  // Early return: skip if no deprecated symbols are present
  const hasAny = DEPRECATED_EXPORTS.some((name) => source.includes(name))
  if (!hasAny) {
    return source
  }

  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      jsx: 2, // JsxEmit.React
    },
    manipulationSettings: {
      quoteKind: QuoteKind.Single,
      useTrailingCommas: false,
    },
  })

  const sourceFile = project.createSourceFile(filePath, source)

  // Collect deprecated import aliases BEFORE any mutations
  const { aliases, basePackage } = collectDeprecatedImports(sourceFile, options?.facadePackage)

  if (aliases.size === 0) {
    // Nothing from @reapit/elements — skip
    return source
  }

  // --- Step 1: Transform useMediaQuery call sites ---
  const useMediaQueryAlias = aliases.get('useMediaQuery')
  const transformedProperties: string[] = []

  if (useMediaQueryAlias) {
    const result = transformDestructuredUseMediaQuery(sourceFile, useMediaQueryAlias)
    transformedProperties.push(...result.transformedProperties)
    addTodosForNonDestructuredUseMediaQuery(sourceFile, useMediaQueryAlias)
  }

  // --- Step 2: Transform MediaStateProvider ---
  const mediaStateProviderAlias = aliases.get('MediaStateProvider')
  if (mediaStateProviderAlias) {
    transformMediaStateProvider(sourceFile, mediaStateProviderAlias)
  }

  // --- Step 3: Inline breakpoint constants ---
  inlineBreakpointConstants(sourceFile, aliases)

  // --- Step 4: Remove deprecated imports ---
  removeDeprecatedImports(sourceFile, options?.facadePackage)

  // --- Step 5: Add new imports ---

  // Re-compute which properties were actually transformed by re-running a dry
  // collection over the (now mutated) source text.  We rely on the transformedProperties
  // array captured earlier which contains all property names that were destructured.

  // Determine which breakpoint helpers are needed
  const { needsAtOrAbove, needsBelow } = neededBreakpointHelpers(transformedProperties)
  const useMatchMediaNeeded = transformedProperties.length > 0

  if (useMatchMediaNeeded) {
    addNamedImport(sourceFile, `${basePackage}/utils/match-media`, 'useMatchMedia')
  }

  if (needsAtOrAbove) {
    addNamedImport(sourceFile, `${basePackage}/utils/breakpoints`, 'isWidthAtOrAbove')
  }

  if (needsBelow) {
    addNamedImport(sourceFile, `${basePackage}/utils/breakpoints`, 'isWidthBelow')
  }

  let result = sourceFile.getFullText()

  // --- Step 6: Post-process MediaType and MediaStateContext references ---
  const mediaTypeAlias = aliases.get('MediaType')
  if (mediaTypeAlias) {
    result = addTodosForMediaType(result, mediaTypeAlias)
  }

  const mediaStateContextAlias = aliases.get('MediaStateContext')
  if (mediaStateContextAlias) {
    result = addTodosForMediaStateContext(result, mediaStateContextAlias)
  }

  // Strip trailing semicolons from codemod-generated import lines only.
  // ts-morph emits semicolons; we strip them to match the no-semicolon convention
  // of the generated imports this codemod introduces (/utils/match-media, /utils/breakpoints).
  // We intentionally do NOT touch pre-existing import lines to avoid altering the
  // surrounding code style.
  result = result.replace(/^(import\s+.*?from\s+'[^']+\/utils\/(?:match-media|breakpoints)');$/gm, '$1')

  return result
}
