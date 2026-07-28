import preview from "#.storybook/preview";

import { CheckboxGroupControl } from "./checkbox-group-control";

const meta = preview.meta({
  title: "Input and selection/CheckboxGroupControl",
  component: CheckboxGroupControl,
  argTypes: {
    children: {
      control: false,
    },
    orientation: {
      control: "radio",
      options: ["vertical", "horizontal"],
    },
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
    showValidity: {
      control: "boolean",
    },
  },
});

/**
 * By default, the checkbox group will stack each option vertically.
 */
export const Example = meta.story({
  args: {
    children: [
      <CheckboxGroupControl.Option key="option1" label="Option 1" value="option1" />,
      <CheckboxGroupControl.Option key="option2" label="Option 2" value="option2" />,
      <CheckboxGroupControl.Option key="option3" label="Option 3" value="option3" />,
    ],
    disabled: false,
    errorText: "",
    helpText: "",
    label: "Group label",
    name: "options",
    orientation: "vertical",
    required: false,
    showValidity: undefined,
  },
});

/**
 * A horizontal orientation is also available. In this orientation, options should not have any
 * supplementary information. This orientation should only be used when there is a small number
 * of options available.
 */
export const Horizontal = Example.extend({
  args: {
    orientation: "horizontal",
  },
});

/**
 * Help text can be provided to communicate additional context about the options.
 */
export const HelpText = Example.extend({
  args: {
    helpText: "Help text",
  },
});

/**
 * All checkboxes in the group can be marked as required by setting the `required` prop on the group. This
 * is particularly useful when implementing "select at least one"-style validation constraints, as it allows
 * for all checkboxes to be conveniently marked as required until the minimum number have been selected, at
 * which point they no longer need to be marked as required.
 *
 * Hand-in-hand with this is `showValidity`, which can also be set for all checkboxes in the group. Typically,
 * when any checkbox in the group is interacted with, the whole group should communicate it's validity.
 *
 * These values can be overriden by individual options.
 */
export const Required = Example.extend({
  args: {
    required: true,
    showValidity: false,
  },
});

/**
 * When a validation constraint has not been met, an error message can be displayed. The error message
 * will replace any help text that may be present.
 *
 * If `showValidity` is not explicitly provided, the control will show validity based on the presence of
 * `errorText`.
 */
export const Invalid = Example.extend({
  args: {
    errorText: "Error message",
    helpText: "Help text",
    required: true,
    showValidity: true,
  },
});

/**
 * All checkboxes in the group can be disabled by setting the `disabled` prop on the group. This is useful
 * when you want to prevent user interaction with the entire group based on some application state.
 *
 * This can be overriden by individual options.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
});
