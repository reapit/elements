import { useState } from "react";

import preview from "#.storybook/preview";

import { SearchInput } from "./search-input";

const meta = preview.meta({
  title: "Input and selection/SearchInput",
  component: SearchInput,
  argTypes: {
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
    "aria-label": "My input",
    defaultValue: "",
    disabled: false,
    name: "myInput",
    max: undefined,
    min: undefined,
    pattern: undefined,
    placeholder: "Search",
    readOnly: false,
    required: false,
    showValidity: false,
    size: "medium",
    type: "search",
  },
});

/**
 * There are three sizes available: `small`, `medium` and `large`.
 */
export const Sizes = Example.extend({
  args: {
    defaultValue: "Text",
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
      <SearchInput {...args} size="small" />
      <SearchInput {...args} size="medium" />
      <SearchInput {...args} size="large" />
    </>
  ),
});

/**
 * Search inputs can be disabled. A disabled input will not receive the `click` event, and are not submitted
 * with the form they're associated with. Further, the "Clear" button will also be disabled.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
});

/**
 * Search inputs can be marked as read-only. When they are, the "Clear" button will be hidden.
 * Unlike disabled inputs, read-only inputs participate in form submission.
 */
export const Readonly = Example.extend({
  args: {
    readOnly: true,
  },
});

/**
 * Search inputs can be marked as busy. This is particularly useful when a network request is being performed
 * off the back of the input's value changing (and the request takes long enough to warrant visual communication).
 */
export const Busy = Example.extend({
  args: {
    isBusy: true,
  },
});

/**
 * Like all form controls that visually communicate their validity, the input will display in an
 * invalid state when it's value does not meet the validation constraints applied to it, such as being
 * required, and it `showValidity` is true. Typically, `showValidity` will be true when the control has
 * been touched (interacted with).
 */
export const Invalid = Example.extend({
  args: {
    required: true,
    showValidity: true,
  },
});

/**
 * Search inputs support a borderless variant for use in contexts where the default border is too visually heavy.
 */
export const Borderless = Example.extend({
  args: {
    variant: "borderless",
  },
  globals: {
    backgrounds: {
      value: "light",
    },
  },
});

/**
 * By default, search inputs will fill their parent's width. This can be constrained by providing
 * a `maxWidth`.
 */
export const MaxWidth = Example.extend({
  name: "Max-width",
  args: {
    maxWidth: "var(--size-64)",
  },
});

/**
 * Search inputs will typically be controlled, especially on list pages where they are used to filter
 * the result set of a table base on their value. Even when controlled, the clear button should work
 * as expected, as it results in an input event being manually dispatched from the search input, which
 * will be handled by the consumer-supplied `onChange` handler.
 */
export const Controlled = Example.extend({
  args: {
    defaultValue: undefined,
    value: "My search string",
  },
  argTypes: {
    value: {
      control: false,
    },
  },
  render: (args) => {
    const [value, setValue] = useState("My search text");
    return (
      <SearchInput {...args} onChange={(e) => setValue(e.currentTarget.value)} value={value} />
    );
  },
});
