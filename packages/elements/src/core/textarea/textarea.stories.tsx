import preview from "#.storybook/preview";

import { Textarea } from "./index";

const meta = preview.meta({
  title: "Input and selection/Textarea",
  component: Textarea,
  argTypes: {
    defaultValue: { control: "text" },
    fieldSizing: { control: "radio", options: ["content", "fixed", "manual"] },
    maxLength: { control: "text" },
    minLength: { control: "text" },
    size: { control: "radio", options: ["small", "medium", "large"] },
    value: { control: "text" },
  },
});

export const Example = meta.story({
  args: {
    defaultValue: undefined,
    disabled: false,
    fieldSizing: "content",
    maxLength: undefined,
    minLength: undefined,
    name: "description",
    placeholder: "Description",
    readOnly: false,
    required: false,
    showValidity: false,
    size: "medium",
    value: undefined,
  },
});

/**
 * There are three sizes available: `small`, `medium` and `large`.
 */
export const Sizes = Example.extend({
  argTypes: {
    size: {
      control: false,
    },
  },

  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexFlow: "row nowrap",
          gap: "var(--spacing-6)",
        }}
      >
        <Story />
      </div>
    ),
  ],

  render: (args) => (
    <>
      <Textarea {...args} size="small" />
      <Textarea {...args} size="medium" />
      <Textarea {...args} size="large" />
    </>
  ),
});

/**
 * Like all form controls that visually communicate their validity, the input will display in an
 * invalid state when it's value does not meet the validation constraints applied to it, such as being
 * required, and it `showValidity` is true. Typically, `showValidity` will be true when the control has
 * been touched (interacted with).
 */
export const Invalid = Example.extend({
  args: {
    placeholder: "Description",
    required: true,
    showValidity: true,
  },
});

/**
 * The textarea also displays in an invalid state when `aria-invalid="true"` and `showValidity` is
 * true. This supports usage where the element is not natively invalid, such as via custom
 * logic that does not use the browser's constraint validation API.
 */
export const AriaInvalid = Example.extend({
  name: "Aria Invalid",
  args: {
    "aria-invalid": true,
    placeholder: "Description",
    showValidity: true,
  },
});

/**
 * A Text area can be disabled in forms to prevent their use. When disabled, the text area cannot be focused and its
 * value will not be submitted with the form.
 */
export const Disabled = Example.extend({
  args: {
    placeholder: "Description",
    disabled: true,
  },
});

/**
 * A Text area can also be marked as read-only in forms to prevent their current value being changed. Unlike a disabled
 * text area, a read-only text area can still be focused, and its value will still be submitted with the form.
 */
export const ReadOnly = Example.extend({
  args: {
    value: "I can't be edited",
    readOnly: true,
  },
});

/**
 * Text area's can automatically grow or shrink between a min and/or max row count. The min and max rows define the
 * number of lines of text that should be visible within the text area. If the number of lines exceeds the specified
 * maximum, the text area's content will overflow with a scrollbar.
 *
 * **Note:** This resizing behaviour is available for CSS-only consumers on Chrome and Edge. For browsers that do not
 * yet support the [field-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing) property, we fallback
 * to a JS-based resizing solution that is only available to React-based consumers.
 *
 * This example demonstrates resizing behaviour for an *uncontrolled* text area.
 */
export const Uncontrolled = Example.extend({
  args: {
    defaultValue: "1\n2",
    placeholder: "Type here...",
    maxRows: 5,
    minRows: 1,
  },
});

/**
 * This next example demonstrates auto-sizing behaviour for a *controlled* text area.
 *
 * **Note:** to change the value of the text area, you will need to use the `value` control when viewing the
 * story individually.
 */
export const Controlled = Example.extend({
  args: {
    maxRows: 5,
    minRows: 1,
    value: "1\n2\n3",
  },
});

/**
 * Importantly, when an explicit row count is specified, no resizing will occur, whether the text area's
 * value is controlled or not. This allows text areas to have a fixed size when necessary.
 */
export const FixedSizing = Example.extend({
  args: {
    fieldSizing: "fixed",
    placeholder: "Type here...",
    rows: 10,
  },
});

/**
 * To continue using the Elements v4 `TextArea` behaviour where manual resizing was permitted, consumers can
 * use `fieldSizing="manual"`.
 *
 * **This option is deprecated and will be removed in a future version.** Prefer either `content` or `fixed`
 * field sizing.
 *
 * @deprecated
 */
export const ManualSizing = Example.extend({
  args: {
    fieldSizing: "manual",
    placeholder: "Type here...",
  },
});
