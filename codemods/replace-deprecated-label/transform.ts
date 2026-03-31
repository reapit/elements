import { createComponentMigration } from '../shared/migration-engine.js'

const TARGET_SPECIFIER = '@reapit/elements/core/label-text'

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
const transform = createComponentMigration({
  identifiers: [
    {
      from: 'DeprecatedLabel',
      to: 'LabelText',
      targetSpecifier: TARGET_SPECIFIER,
    },
  ],
  props: [
    {
      from: 'DeprecatedLabelProps',
      to: 'LabelText.Props',
      targetSpecifier: TARGET_SPECIFIER,
    },
  ],
})

export default transform
