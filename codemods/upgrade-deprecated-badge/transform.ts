import {
  Project,
  QuoteKind,
  SourceFile,
  SyntaxKind,
  StringLiteral,
  JsxExpression,
  JsxElement,
  JsxFragment,
  JsxSelfClosingElement,
} from 'ts-morph'
import { isElementsImport } from '../shared/elements-import.js'

/**
 * Codemod to upgrade DeprecatedBadge to the new Badge component.
 *
 * Import Transformations:
 * - DeprecatedBadge → Badge (from @reapit/elements/core/badge or facade package)
 * - DeprecatedBadgeProps → removed (type references rewritten to Badge.Props in phase 3)
 * - DeprecatedBadgeGroup → removed (JSX rewritten to <div> in phase 4)
 * - ElDeprecatedBadge → removed (styled component; manual migration needed)
 * - ElDeprecatedBadgeGroup → removed (styled component; manual migration needed)
 * - ElDeprecatedBadgeGroupInner → removed (styled component; manual migration needed)
 *
 * Type Transformations:
 * - DeprecatedBadgeProps → Badge.Props
 *
 * JSX Element Transformations:
 * - <DeprecatedBadge> → <Badge> with intent → colour mapping
 * - <DeprecatedBadgeGroup> → <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
 *   with a TODO comment inserted above the element
 */

/** Maps deprecated `intent` values to new `colour` values. */
const INTENT_TO_COLOUR: Record<string, string> = {
  primary: 'neutral',
  neutral: 'neutral',
  success: 'success',
  pending: 'pending',
  warning: 'warning',
  danger: 'danger',
  default: 'neutral',
  secondary: 'neutral',
  critical: 'danger',
  low: 'neutral',
}

/**
 * Collects all local aliases used for DeprecatedBadge in import declarations.
 * Returns the set of names that may appear as JSX tag names.
 */
function getDeprecatedBadgeAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'DeprecatedBadge') {
        aliases.add(namedImport.getAliasNode()?.getText() ?? 'DeprecatedBadge')
      }
    }
  }

  // Fallback for snippet tests that have no import declarations
  if (aliases.size === 0 && sourceFile.getImportDeclarations().length === 0) {
    aliases.add('DeprecatedBadge')
  }

  return aliases
}

/**
 * Collects all local aliases used for DeprecatedBadgeGroup in import declarations.
 */
function getDeprecatedBadgeGroupAliases(sourceFile: SourceFile, facadePackage?: string): Set<string> {
  const aliases = new Set<string>()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()
    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    for (const namedImport of importDecl.getNamedImports()) {
      if (namedImport.getName() === 'DeprecatedBadgeGroup') {
        aliases.add(namedImport.getAliasNode()?.getText() ?? 'DeprecatedBadgeGroup')
      }
    }
  }

  if (aliases.size === 0 && sourceFile.getImportDeclarations().length === 0) {
    aliases.add('DeprecatedBadgeGroup')
  }

  return aliases
}

/**
 * The set of named imports that should be removed from elements import declarations.
 * DeprecatedBadge is handled separately (converted to Badge).
 */
const IMPORTS_TO_REMOVE = new Set([
  'DeprecatedBadgeProps',
  'DeprecatedBadgeGroup',
  'ElDeprecatedBadge',
  'ElDeprecatedBadgeGroup',
  'ElDeprecatedBadgeGroupInner',
])

/**
 * Transforms import declarations:
 * - Moves DeprecatedBadge → Badge into the target module specifier.
 * - Removes DeprecatedBadgeProps, DeprecatedBadgeGroup, and El* styled components.
 * - Merges into an existing target import declaration if one is present.
 * - Removes empty import declarations after all deprecated imports are removed.
 */
function transformImports(sourceFile: SourceFile, facadePackage?: string): void {
  const badgeImportsToAdd: Array<{ name: string; alias?: string; isTypeOnly: boolean }> = []

  // When using a facade package, Badge is imported from the bare facade specifier.
  // Without a facade package, Badge is imported from @reapit/elements/core/badge.
  const targetModuleSpecifier = facadePackage ?? '@reapit/elements/core/badge'

  // The "already migrated" path only applies to the default (non-facade) target.
  // With a facade, we still need to process the bare facade specifier itself.
  const alreadyMigratedPath = facadePackage ? null : '@reapit/elements/core/badge'

  const importDeclarations = sourceFile.getImportDeclarations().slice()

  for (const importDecl of importDeclarations) {
    if (importDecl.wasForgotten()) continue

    const moduleSpecifier = importDecl.getModuleSpecifierValue()

    if (!isElementsImport(moduleSpecifier, facadePackage)) continue

    // Already from the target path (non-facade only) — do not touch
    if (alreadyMigratedPath && moduleSpecifier === alreadyMigratedPath) continue

    const namedImports = importDecl.getNamedImports()
    const importsToRemove: typeof namedImports = []

    for (const namedImport of namedImports) {
      const originalName = namedImport.getName()

      if (originalName === 'DeprecatedBadge') {
        badgeImportsToAdd.push({
          name: 'Badge',
          alias: namedImport.getAliasNode()?.getText(),
          isTypeOnly: namedImport.isTypeOnly(),
        })
        importsToRemove.push(namedImport)
        continue
      }

      if (IMPORTS_TO_REMOVE.has(originalName)) {
        importsToRemove.push(namedImport)
      }
    }

    importsToRemove.forEach((namedImport) => namedImport.remove())

    if (importDecl.getNamedImports().length === 0 && !importDecl.getDefaultImport()) {
      importDecl.remove()
    }
  }

  if (badgeImportsToAdd.length === 0) return

  // Get fresh list after removals
  const currentImportDeclarations = sourceFile.getImportDeclarations()

  let badgeImportDecl = currentImportDeclarations.find(
    (importDecl) => importDecl.getModuleSpecifierValue() === targetModuleSpecifier,
  )

  if (!badgeImportDecl) {
    badgeImportDecl = sourceFile.addImportDeclaration({
      moduleSpecifier: targetModuleSpecifier,
    })
  }

  for (const { name, alias, isTypeOnly } of badgeImportsToAdd) {
    // Avoid duplicating an import that is already in the target declaration
    const existingImport = badgeImportDecl.getNamedImports().find((namedImport) => {
      return namedImport.getName() === name && namedImport.getAliasNode()?.getText() === alias
    })

    if (existingImport) {
      // Upgrade type-only to value import if needed
      if (existingImport.isTypeOnly() && !isTypeOnly) {
        existingImport.setIsTypeOnly(false)
      }
      continue
    }

    if (alias && alias !== name) {
      const typePrefix = isTypeOnly ? 'type ' : ''
      badgeImportDecl.addNamedImport(`${typePrefix}${name} as ${alias}`)
    } else if (isTypeOnly) {
      badgeImportDecl.addNamedImport({ name, isTypeOnly: true })
    } else {
      badgeImportDecl.addNamedImport(name)
    }
  }
}

/**
 * Rewrites DeprecatedBadgeProps type references to Badge.Props.
 * Covers type annotations, interface extensions (heritage clauses), and generics.
 */
function transformTypeReferences(sourceFile: SourceFile): void {
  for (const typeRef of sourceFile.getDescendantsOfKind(SyntaxKind.TypeReference)) {
    const typeName = typeRef.getTypeName()
    if (typeName.getText() === 'DeprecatedBadgeProps') {
      typeName.replaceWithText('Badge.Props')
    }
  }

  for (const heritage of sourceFile.getDescendantsOfKind(SyntaxKind.ExpressionWithTypeArguments)) {
    const expression = heritage.getExpression()
    if (expression.getText() === 'DeprecatedBadgeProps') {
      expression.replaceWithText('Badge.Props')
    }
  }
}

/**
 * Extracts the literal string value from a StringLiteral or JsxExpression node.
 * Returns undefined for non-string (dynamic) expressions.
 */
function extractStringValue(
  init: StringLiteral | JsxExpression | JsxElement | JsxFragment | JsxSelfClosingElement,
): string | undefined {
  const kind = init.getKind()

  if (kind === SyntaxKind.StringLiteral) {
    return (init as StringLiteral).getLiteralText()
  }

  if (kind === SyntaxKind.JsxExpression) {
    const expr = (init as JsxExpression).getExpression()
    if (expr?.getKind() === SyntaxKind.StringLiteral) {
      return (expr as StringLiteral).getLiteralText()
    }
  }

  return undefined
}

/**
 * Transforms <DeprecatedBadge> elements to <Badge> with colour prop.
 */
function transformBadgeElements(sourceFile: SourceFile, aliases: Set<string>): void {
  const elements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const element of elements) {
    const tagName = element.getTagNameNode()
    const tagNameText = tagName.getText()

    if (!aliases.has(tagNameText)) continue

    // Rename non-aliased tag to Badge
    if (tagNameText === 'DeprecatedBadge') {
      tagName.replaceWithText('Badge')
    }

    const attributes = element.getAttributes()

    // Collect existing intent value
    let intentValue: string | undefined
    let intentIsDynamic = false
    let hasIntentAttr = false
    let hasColourAttr = false

    for (const attr of attributes) {
      if (attr.getKind() !== SyntaxKind.JsxAttribute) continue
      const jsxAttr = attr.asKind(SyntaxKind.JsxAttribute)!
      const name = jsxAttr.getNameNode().getText()

      if (name === 'intent') {
        hasIntentAttr = true
        const init = jsxAttr.getInitializer()
        if (!init) {
          // Bare attribute: intent (boolean shorthand) — treat as 'default'
          intentValue = 'default'
        } else {
          const strValue = extractStringValue(init)
          if (strValue !== undefined) {
            intentValue = strValue
          } else {
            intentIsDynamic = true
          }
        }
      } else if (name === 'colour') {
        hasColourAttr = true
      }
    }

    if (hasIntentAttr) {
      // Find and transform the intent attribute
      for (const attr of attributes.slice()) {
        if (attr.getKind() !== SyntaxKind.JsxAttribute) continue
        const jsxAttr = attr.asKind(SyntaxKind.JsxAttribute)!
        if (jsxAttr.getNameNode().getText() !== 'intent') continue

        if (intentIsDynamic) {
          // Dynamic: rename only, leave value unchanged
          jsxAttr.getNameNode().replaceWithText('colour')
        } else {
          // Static: rename and map value
          const mappedColour = INTENT_TO_COLOUR[intentValue ?? 'default'] ?? 'neutral'
          jsxAttr.getNameNode().replaceWithText('colour')
          jsxAttr.setInitializer(`"${mappedColour}"`)
        }
      }
    } else if (!hasColourAttr) {
      // No intent and no colour — add colour="neutral" (required prop)
      element.addAttribute({ name: 'colour', initializer: '"neutral"' })
    }

    // Update closing tag if present
    if (element.getKind() === SyntaxKind.JsxOpeningElement) {
      const parent = element.getParent()
      if (parent?.getKind() === SyntaxKind.JsxElement) {
        const closingTag = parent.asKind(SyntaxKind.JsxElement)?.getClosingElement()
        if (closingTag?.getTagNameNode().getText() === 'DeprecatedBadge') {
          closingTag.getTagNameNode().replaceWithText('Badge')
        }
      }
    }
  }
}

const TODO_COMMENT = '{/* TODO: DeprecatedBadgeGroup has no core equivalent — review this layout */}'

/**
 * Transforms <DeprecatedBadgeGroup> elements to <div> with inline layout styles.
 *
 * The TODO comment is inserted as text before each converted element after all AST
 * mutations are complete. ts-morph cannot replace a single JSX node with two adjacent
 * sibling nodes (comment + element), so we use `sourceFile.insertText()` at the
 * element's start position instead.
 */
function transformBadgeGroupElements(sourceFile: SourceFile, aliases: Set<string>): void {
  // Collect the start positions of nodes that need a comment inserted before them,
  // after completing all AST renames. We do insertions in reverse order (highest
  // position first) so earlier positions remain valid.
  const commentPositions: number[] = []

  // Process self-closing elements (no children)
  for (const element of sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)) {
    if (!aliases.has(element.getTagNameNode().getText())) continue

    // Snapshot position before any mutation — replaceWithText shifts the node text
    // so getStart() would return a stale offset afterwards.
    const startPos = element.getStart()
    element.getTagNameNode().replaceWithText('div')
    element.addAttribute({ name: 'style', initializer: '{{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}' })
    commentPositions.push(startPos)
  }

  // Process opening elements (with children)
  for (const element of sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement)) {
    if (!aliases.has(element.getTagNameNode().getText())) continue

    element.getTagNameNode().replaceWithText('div')
    element.addAttribute({ name: 'style', initializer: '{{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}' })

    // Rename closing tag
    const parent = element.getParent()
    if (parent?.getKind() === SyntaxKind.JsxElement) {
      const closingTag = parent.asKind(SyntaxKind.JsxElement)?.getClosingElement()
      if (closingTag && aliases.has(closingTag.getTagNameNode().getText())) {
        closingTag.getTagNameNode().replaceWithText('div')
      }
      commentPositions.push(parent.getStart())
    }
  }

  // Insert TODO comments in reverse order so positions stay valid
  const sortedPositions = [...new Set(commentPositions)].sort((a, b) => b - a)
  for (const pos of sortedPositions) {
    sourceFile.insertText(pos, `${TODO_COMMENT}\n`)
  }
}

export default function transform(
  source: string,
  filePath: string = 'file.tsx',
  options?: { facadePackage?: string },
): string {
  if (!source.includes('DeprecatedBadge')) return source

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

  // Phase 1 — collect aliases before any AST mutation
  const badgeAliases = getDeprecatedBadgeAliases(sourceFile, facadePackage)
  const badgeGroupAliases = getDeprecatedBadgeGroupAliases(sourceFile, facadePackage)

  // Phase 2 — transform imports
  transformImports(sourceFile, facadePackage)

  // Phase 3 — transform type references
  transformTypeReferences(sourceFile)

  // Phase 4 — transform JSX elements
  transformBadgeElements(sourceFile, badgeAliases)
  transformBadgeGroupElements(sourceFile, badgeGroupAliases)

  return sourceFile.getFullText()
}
