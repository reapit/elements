import preview from "#.storybook/preview";

import { ChipSelect } from "../chip-select";
import { Pattern } from "../drawer/__story__/Pattern";
import { FormControl } from "./form-control";

const meta = preview.meta({
  title: "Input and selection/FormControl",
  component: FormControl,
  argTypes: {
    as: {
      control: false,
    },
    children: {
      control: false,
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "'medium'" },
      },
    },
  },
});

export const Example = meta.story({
  args: {
    as: "div",
    children: (
      <>
        <FormControl.Label htmlFor="my-control" isRequired>
          Label
        </FormControl.Label>
        <Pattern height="var(--size-8)" />
      </>
    ),
    size: "medium",
  },
});

/**
 * By default, the form control will grow to the width of its parent. To constrain its width,
 * an explicit `maxWidth` can be specified.
 */
export const MaxWidth = Example.extend({
  name: "Max-width",
  args: {
    maxWidth: "300px",
  },
});

/**
 * When the form control is invalid, an error message will commonly be displayed beneath using
 * `FormControl.ErrorText` to describing why the form control's value is not valid.
 *
 * **Important:** Error messages should only be displayed when the form control is invalid and
 * either it has been touched (that is, focused then blurred by the user) or submission of the
 * form has been attempted. This behaviour is up to consumers to implement themselves.
 */
export const Invalid = meta.story({
  args: {
    as: "div",
    children: (
      <>
        <FormControl.Label htmlFor="my-control" isRequired>
          Label
        </FormControl.Label>
        <Pattern height="var(--size-8)" />
        <FormControl.ErrorText id="my-error-text">Error text</FormControl.ErrorText>
      </>
    ),
    size: "medium",
  },
});

/**
 * Some form controls require additional information. This can be provided below the form control
 * using `FormControl.HelpText`.
 */
export const HelpText = meta.story({
  args: {
    as: "div",
    children: (
      <>
        <FormControl.Label htmlFor="my-control" isRequired>
          Label
        </FormControl.Label>
        <Pattern height="var(--size-8)" />
        <FormControl.HelpText id="my-help-text">Optional help text</FormControl.HelpText>
      </>
    ),
    size: "medium",
  },
});

/**
 * In some cases, such as with checkbox groups, radio groups and chip selects, we need to enclose
 * the form control within a `<fieldset>`. In these cases, we can set `as="fieldset"` and use
 * `FormControl.Label` with the `as="legend"`.
 */
export const Fieldset = meta.story({
  args: {
    as: "fieldset",
    children: (
      <>
        <FormControl.Label as="legend" isRequired>
          Inspection type
        </FormControl.Label>
        <ChipSelect name="inspectionType" size="medium">
          <ChipSelect.Option defaultChecked value="ROUTINE">
            Routine
          </ChipSelect.Option>
          <ChipSelect.Option value="ENTRY">Entry</ChipSelect.Option>
          <ChipSelect.Option value="EXIT">Exit</ChipSelect.Option>
        </ChipSelect>
      </>
    ),
    size: "medium",
  },
  decorators: [
    (Story) => (
      // NOTE: ChipSelect must be associated with a form for its single-select behaviour to work
      // in an uncontrolled usage like this story.
      <form>
        <Story />
      </form>
    ),
  ],
});
