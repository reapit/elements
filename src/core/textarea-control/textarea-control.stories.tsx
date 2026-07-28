import preview from "#.storybook/preview";

import { TextareaControl } from "./textarea-control";

const meta = preview.meta({
  title: "Input and selection/TextareaControl",
  component: TextareaControl,
  argTypes: {
    errorText: {
      control: "text",
    },
    fieldSizing: {
      control: "select",
      options: ["content", "fixed", "manual"],
    },
    helpText: {
      control: "text",
    },
    label: {
      control: "text",
    },
    maxRows: {
      control: "number",
    },
    minRows: {
      control: "number",
    },
    placeholder: {
      control: "text",
    },
    rows: {
      control: "number",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    value: {
      control: "text",
      table: {
        type: {
          summary: "string | number | readonly string[] | undefined",
        },
      },
    },
  },
});

export const Example = meta.story({
  args: {
    defaultValue: "",
    disabled: false,
    errorText: "",
    fieldSizing: "content",
    helpText: "",
    label: "Label",
    maxLength: undefined,
    maxRows: undefined,
    minLength: undefined,
    minRows: 2,
    name: "myTextarea",
    placeholder: "",
    readOnly: false,
    required: false,
    showValidity: undefined,
    size: "medium",
    value: undefined,
  },
});

/**
 * There are three sizes available: `small`, `medium` and `large`.
 */
export const Sizes = Example.extend({
  args: {
    defaultValue: "Text content",
  },
  argTypes: {
    size: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", flexFlow: "row nowrap", gap: "var(--spacing-6)" }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <TextareaControl {...args} size="small" />
      <TextareaControl {...args} size="medium" />
      <TextareaControl {...args} size="large" />
    </>
  ),
});

/**
 * Text areas using the `content` field sizing option will resize based on their content. Their size can
 * be constrained to a minimum and/or maximum number of rows using `minRows` and `maxRows`.
 */
export const ContentSizing = Example.extend({
  args: {
    defaultValue: "Type in me! I can dynamically resize between 2 and 8 rows.",
    fieldSizing: "content",
    maxRows: 8,
    minRows: 2,
  },
});

/**
 * Similarly, text areas can be set to a fixed number of rows using the `rows` prop.
 */
export const FixedSizing = Example.extend({
  args: {
    defaultValue: "I have a fixed height of 5 rows.",
    fieldSizing: "fixed",
    rows: 5,
  },
});

/**
 * Optional help text can be provided to give more context about the textarea.
 */
export const HelpText = Example.extend({
  args: {
    helpText: "Optional help text",
  },
});

/**
 * Like all form controls that visually communicate their validity, the textarea will display in an
 * invalid state when its value does not meet the validation constraints applied to it, such as being
 * required, and `showValidity` is true. Typically, `showValidity` will be true when the control has
 * been touched (interacted with).
 *
 * If `showValidity` is not explicitly provided, the control will show validity based on the presence of
 * `errorText`.
 */
export const Invalid = Example.extend({
  args: {
    errorText: "Error message",
    required: true,
    showValidity: true,
  },
});

/**
 * Textareas can be disabled. A disabled textarea will not receive the `click` event, and are not submitted
 * with the form they're associated with.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
    defaultValue: "Text",
  },
});

/**
 * Textareas can be marked as read-only. Unlike disabled textareas, read-only textareas will participate
 * in form submission.
 */
export const Readonly = Example.extend({
  name: "Read-only",
  args: {
    readOnly: true,
    defaultValue: "Text",
  },
});

/**
 * Placeholder text can be provided to help users understand what the textarea is for. This is typically
 * used when the textarea has no visual label.
 */
export const Placeholder = Example.extend({
  args: {
    placeholder: "Enter your comments here...",
  },
});

/**
 * By default, text areas will fill their parent's width. This can be constrained by providing a `maxWidth`.
 */
export const MaxWidth = Example.extend({
  name: "Max-width",
  args: {
    maxWidth: "var(--size-64)",
    defaultValue: "Text",
  },
});

/**
 * The label, help text and error text will all wrap naturally when the form control does not have sufficient
 * space available for them.
 */
export const Wrapping = MaxWidth.extend({
  args: {
    label: "This is a long label that will not fit on a single line",
    helpText: "This is a long optional help text that will not fit on a single line",
  },
});
