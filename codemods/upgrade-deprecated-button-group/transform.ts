import { SyntaxKind } from 'ts-morph'
import { createComponentMigration } from '../shared/migration-engine.js'
import { shouldUseJsxComment } from '../shared/jsx.js'
import type { JsxOpeningElement, JsxSelfClosingElement, SourceFile } from 'ts-morph'

/**
 * Codemod to upgrade DeprecatedButtonGroup to the new ButtonGroup component.
 *
 * This codemod transforms imports of DeprecatedButtonGroup to use the new v5 ButtonGroup
 * component from @reapit/elements/core/button-group. It handles:
 *
 * Import Transformations:
 * - DeprecatedButtonGroup → ButtonGroup (from @reapit/elements/core/button-group)
 * - DeprecatedButtonGroupProps → removed (type references rewritten to ButtonGroup.Props)
 * - DeprecatedButtonGroupAlignment → removed (no equivalent in new API)
 * - DeprecatedButtonGroup as CustomName → ButtonGroup as CustomName
 * - Handles facade packages via --facade-package flag
 *
 * Type Transformations:
 * - DeprecatedButtonGroupProps → ButtonGroup.Props
 * - DeprecatedButtonGroupAlignment has no equivalent — usages will produce a TypeScript error
 *
 * JSX Element Transformations:
 * - Element name: <DeprecatedButtonGroup> → <ButtonGroup>
 * - Children are left unchanged (ButtonGroup.Item is itself a button)
 * - alignment prop is mapped to justifyContent:
 *   - alignment="left"   → justifyContent="start"
 *   - alignment="right"  → justifyContent="end"
 *   - alignment="center" → justifyContent="center"
 *   - alignment={dynamic} → prop removed, TODO comment inserted
 */

/** Maps deprecated alignment values to the new justifyContent values. */
const ALIGNMENT_TO_JUSTIFY_CONTENT: Record<string, string> = {
  left: 'start',
  right: 'end',
  center: 'center',
}

const TODO_DYNAMIC_ALIGNMENT_JSX =
  '{/* TODO: DeprecatedButtonGroup had a dynamic alignment prop that cannot be migrated automatically */}'
const TODO_DYNAMIC_ALIGNMENT_JS =
  '// TODO: DeprecatedButtonGroup had a dynamic alignment prop that cannot be migrated automatically'

interface ButtonGroupContext {
  comments: Array<{ pos: number; text: string }>
}

export default createComponentMigration<ButtonGroupContext>({
  quickRejectStrings: ['DeprecatedButtonGroup'],
  identifiers: [
    {
      from: 'DeprecatedButtonGroup',
      to: 'ButtonGroup',
      targetSpecifier: '@reapit/elements/core/button-group',
    },
  ],
  props: [
    {
      from: 'DeprecatedButtonGroupProps',
      to: 'ButtonGroup.Props',
      targetSpecifier: '@reapit/elements/core/button-group',
    },
  ],
  importsToRemove: ['DeprecatedButtonGroupAlignment'],
  alwaysRewriteMatchingImports: true,
  createContext: () => ({ comments: [] }),
  customJsxTransform(element: JsxOpeningElement | JsxSelfClosingElement, _sourceFile, _facadePackage, context): void {
    const alignmentAttr = element.getAttribute('alignment')
    if (!alignmentAttr) return

    const jsxAttr = alignmentAttr.asKind(SyntaxKind.JsxAttribute)
    if (!jsxAttr) return

    const init = jsxAttr.getInitializer()

    // Extract the static string value, if any.
    let staticValue: string | undefined

    if (!init) {
      // Bare attribute with no value — treat as undefined, remove.
      staticValue = undefined
    } else if (init.getKind() === SyntaxKind.StringLiteral) {
      staticValue = init.asKind(SyntaxKind.StringLiteral)!.getLiteralText()
    } else if (init.getKind() === SyntaxKind.JsxExpression) {
      const expr = init.asKind(SyntaxKind.JsxExpression)!.getExpression()
      if (expr?.getKind() === SyntaxKind.StringLiteral) {
        staticValue = expr.asKind(SyntaxKind.StringLiteral)!.getLiteralText()
      }
    }

    const mappedValue = staticValue !== undefined ? ALIGNMENT_TO_JUSTIFY_CONTENT[staticValue] : undefined

    if (mappedValue !== undefined) {
      // Static, mappable value — rename prop and replace value.
      jsxAttr.getNameNode().replaceWithText('justifyContent')
      jsxAttr.setInitializer(`"${mappedValue}"`)
    } else {
      // Dynamic or unmappable — remove prop and schedule a context-aware TODO comment.
      const useJsx = shouldUseJsxComment(element)
      const todoText = useJsx ? TODO_DYNAMIC_ALIGNMENT_JSX : TODO_DYNAMIC_ALIGNMENT_JS
      const elementStart =
        element.getParent()?.getKind() === SyntaxKind.JsxElement ? element.getParent()!.getStart() : element.getStart()
      jsxAttr.remove()
      context.comments.push({ pos: elementStart, text: todoText })
    }
  },
  afterTransform(sourceFile: SourceFile, { context }): void {
    if (context.comments.length === 0) return

    // Insert comments in reverse position order so earlier positions stay valid.
    const sorted = context.comments.sort((a, b) => b.pos - a.pos)
    for (const { pos, text } of sorted) {
      sourceFile.insertText(pos, `${text}\n`)
    }
  },
})
