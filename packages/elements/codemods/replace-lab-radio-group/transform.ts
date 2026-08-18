import { createComponentMigration } from "../shared/migration-engine.js";

const TARGET_SPECIFIER = "@reapit/elements/core/radio-group-control";

/**
 * Codemod to replace the lab RadioGroup with the core RadioGroupControl component.
 *
 * Import transformations:
 * - RadioGroup -> RadioGroupControl (from @reapit/elements/core/radio-group-control or facade package)
 * - RadioGroupProps -> removed (type references rewritten to RadioGroupControl.Props)
 *
 * Type transformations:
 * - RadioGroupProps -> RadioGroupControl.Props
 *
 * JSX element transformations:
 * - <RadioGroup> -> <RadioGroupControl>
 *
 * JSX prop transformations:
 * - isRequired -> required
 * - errorMessage -> errorText
 *
 * Skipped:
 * - Re-export declarations (left unchanged)
 * - Files not containing RadioGroup or RadioGroupProps
 */
const transform = createComponentMigration({
  identifiers: [
    {
      from: "RadioGroup",
      to: "RadioGroupControl",
      targetSpecifier: TARGET_SPECIFIER,
    },
  ],
  props: [
    {
      from: "RadioGroupProps",
      to: "RadioGroupControl.Props",
      targetSpecifier: TARGET_SPECIFIER,
    },
  ],
  propRenames: {
    isRequired: "required",
    errorMessage: "errorText",
  },
  useFindReferencesForIdentifiers: true,
});

export default transform;
