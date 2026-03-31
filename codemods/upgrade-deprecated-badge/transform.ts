import { SyntaxKind } from 'ts-morph'
import { createComponentMigration } from '../shared/migration-engine.js'
import { getPropStringValue } from '../shared/props.js'
import type { JsxOpeningElement, JsxSelfClosingElement, SourceFile } from 'ts-morph'

/**
 * Codemod to upgrade DeprecatedBadge to the new Badge component.
 *
 * Import Transformations:
 * - DeprecatedBadge → Badge (from @reapit/elements/core/badge or facade package)
 * - DeprecatedBadgeProps → removed (type references rewritten to Badge.Props)
 * - DeprecatedBadgeGroup → removed (JSX rewritten to <div> in afterTransform)
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

const TODO_BADGE_GROUP = '{/* TODO: DeprecatedBadgeGroup has no core equivalent — review this layout */}'

export default createComponentMigration({
  quickRejectStrings: ['DeprecatedBadge'],
  identifiers: [
    {
      from: 'DeprecatedBadge',
      to: 'Badge',
      targetSpecifier: '@reapit/elements/core/badge',
    },
  ],
  props: [
    {
      from: 'DeprecatedBadgeProps',
      to: 'Badge.Props',
      targetSpecifier: '@reapit/elements/core/badge',
    },
  ],
  importsToRemove: [
    'DeprecatedBadgeGroup',
    'ElDeprecatedBadge',
    'ElDeprecatedBadgeGroup',
    'ElDeprecatedBadgeGroupInner',
  ],
  alwaysRewriteMatchingImports: true,
  customJsxTransform(element: JsxOpeningElement | JsxSelfClosingElement): void {
    // This hook is called only for DeprecatedBadge (and its aliases) elements.
    // Handle intent → colour mapping.
    const attributes = element.getAttributes()

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
          // Bare attribute (boolean shorthand) — treat as 'default'.
          intentValue = 'default'
        } else {
          const strValue = getPropStringValue(jsxAttr)
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
      for (const attr of attributes.slice()) {
        if (attr.getKind() !== SyntaxKind.JsxAttribute) continue
        const jsxAttr = attr.asKind(SyntaxKind.JsxAttribute)!
        if (jsxAttr.getNameNode().getText() !== 'intent') continue

        if (intentIsDynamic) {
          // Dynamic value — rename prop only, leave value unchanged.
          jsxAttr.getNameNode().replaceWithText('colour')
        } else {
          // Static value — rename prop and map the value.
          const mappedColour = INTENT_TO_COLOUR[intentValue ?? 'default'] ?? 'neutral'
          jsxAttr.getNameNode().replaceWithText('colour')
          jsxAttr.setInitializer(`"${mappedColour}"`)
        }
      }
    } else if (!hasColourAttr) {
      // No intent and no colour — add the required colour="neutral" prop.
      element.addAttribute({ name: 'colour', initializer: '"neutral"' })
    }
  },
  afterTransform(sourceFile: SourceFile): void {
    // Transform any remaining <DeprecatedBadgeGroup> (or aliases) JSX elements to <div>.
    //
    // Note: By this point, Phase 3 has already removed the DeprecatedBadgeGroup import.
    // Aliased usages (e.g. import { DeprecatedBadgeGroup as BG }) would have their
    // import removed but the JSX tag left unrenamed because aliases are no longer
    // detectable. This is an acceptable limitation — unaliased usage (the common case)
    // is fully migrated. The rename is done by text-matching for 'DeprecatedBadgeGroup'.

    // Collect all positions for TODO comment insertion (in reverse order, highest first).
    const commentPositions: number[] = []

    // Process self-closing elements first.
    for (const element of sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement).slice()) {
      if (element.getTagNameNode().getText() !== 'DeprecatedBadgeGroup') continue

      const startPos = element.getStart()
      element.getTagNameNode().replaceWithText('div')
      element.addAttribute({ name: 'style', initializer: '{{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}' })
      commentPositions.push(startPos)
    }

    // Process opening elements (with children).
    for (const element of sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement).slice()) {
      if (element.getTagNameNode().getText() !== 'DeprecatedBadgeGroup') continue

      element.getTagNameNode().replaceWithText('div')
      element.addAttribute({ name: 'style', initializer: '{{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}' })

      const parent = element.getParent()
      if (parent?.getKind() === SyntaxKind.JsxElement) {
        const closingTag = parent.asKind(SyntaxKind.JsxElement)?.getClosingElement()
        if (closingTag?.getTagNameNode().getText() === 'DeprecatedBadgeGroup') {
          closingTag.getTagNameNode().replaceWithText('div')
        }
        commentPositions.push(parent.getStart())
      }
    }

    // Insert TODO comments in reverse order so earlier positions stay valid.
    const sortedPositions = [...new Set(commentPositions)].sort((a, b) => b - a)
    for (const pos of sortedPositions) {
      sourceFile.insertText(pos, `${TODO_BADGE_GROUP}\n`)
    }
  },
})
