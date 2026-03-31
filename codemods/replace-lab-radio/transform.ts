import { createComponentMigration } from '../shared/migration-engine.js'

const TARGET_SPECIFIER = '@reapit/elements/core/radio-group-control'

/**
 * Codemod to replace the lab Radio with the core RadioButton component.
 *
 * Import transformations:
 * - Radio -> RadioButton (from @reapit/elements/core/radio-group-control or facade package)
 * - RadioProps -> removed (type references rewritten to RadioButton.Props)
 *
 * Type transformations:
 * - RadioProps -> RadioButton.Props
 *
 * JSX element transformations:
 * - <Radio> -> <RadioButton>
 *
 * JSX prop transformations:
 * - isRequired -> required
 * - hasError -> removed (no direct equivalent on RadioButton)
 *
 * TODO comment:
 * - A TODO comment is inserted before each migrated JSX statement, encouraging
 *   use of RadioGroupControl rather than direct RadioButton usage.
 *
 * Skipped:
 * - Re-export declarations (left unchanged)
 * - Files not containing Radio symbols
 */
const transform = createComponentMigration({
  identifiers: [
    {
      from: 'Radio',
      to: 'RadioButton',
      targetSpecifier: TARGET_SPECIFIER,
    },
  ],
  props: [
    {
      from: 'RadioProps',
      to: 'RadioButton.Props',
      targetSpecifier: TARGET_SPECIFIER,
    },
  ],
  propRenames: {
    isRequired: 'required',
  },
  propsToRemove: new Set(['hasError']),
  todoComment: {
    text: ' TODO: Consider using RadioGroupControl rather than RadioButton directly.',
  },
  useFindReferencesForIdentifiers: true,
})

export default transform
