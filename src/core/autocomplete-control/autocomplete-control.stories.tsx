import { useState } from "react";

import preview from "#.storybook/preview";

import { AutocompleteControl } from "./autocomplete-control";

const meta = preview.meta({
  title: "Input and selection/AutocompleteControl",
  component: AutocompleteControl,
  argTypes: {
    children: {
      control: false,
    },
    errorText: {
      control: "text",
    },
    helpText: {
      control: "text",
    },
    label: {
      control: "text",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
  render: (args) => {
    // NOTE: We initialise value from the story's `defaultOptions` to maintain state consistency.
    const [value, setValue] = AutocompleteControl.useState(
      args.defaultOptions?.map((o) => o.value) ?? [],
    );
    const [searchText, setSearchText] = useState("");

    const filteredOptions = filterFruit(searchText);

    return (
      <AutocompleteControl {...args}>
        <AutocompleteControl.Button />
        <AutocompleteControl.Popup
          search={
            <AutocompleteControl.SearchInput
              aria-label="Filter fruit"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          }
        >
          <AutocompleteControl.Listbox
            // Name prop is required for the form submission example
            name="fruit"
            onChange={(e) => setValue(AutocompleteControl.getValue(e.currentTarget))}
            value={value}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <AutocompleteControl.Option key={option.value} value={option.value}>
                  {option.label}
                </AutocompleteControl.Option>
              ))
            ) : (
              <AutocompleteControl.Placeholder>No results found</AutocompleteControl.Placeholder>
            )}
          </AutocompleteControl.Listbox>
        </AutocompleteControl.Popup>
      </AutocompleteControl>
    );
  },
});

/**
 * Demonstrates a basic autocomplete with label and form control wrapper.
 */
export const Example = meta.story({
  args: {
    children: null, // handled by meta.render function
    disabled: false,
    errorText: "",
    helpText: "",
    label: "Select a fruit",
    maxWidth: undefined,
    multiple: false,
    required: false,
    showValidity: undefined,
    size: "medium",
  },
  parameters: { docs: { source: { type: "code" } } },
});

/**
 * When the autocomplete has one or more options initially selected, the control must be provided with
 * `defaultOptions` that define the label text to use for those options.
 */
export const DefaultOptions = Example.extend({
  args: {
    defaultOptions: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
    ],

    multiple: true,
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
    (Story, { args }) => (
      <div style={{ display: "flex", flexFlow: "row nowrap", gap: "var(--spacing-6)" }}>
        <Story args={{ ...args, size: "small" }} />
        <Story args={{ ...args, size: "medium" }} />
        <Story args={{ ...args, size: "large" }} />
      </div>
    ),
  ],
});

/**
 * Optional help text can be provided to give more context about the autocompleteControl.
 */
export const HelpText = Example.extend({
  args: {
    helpText: "Choose your favorite fruit",
  },
});

/**
 * Like all form controls that visually communicate their validity, the autocomplete will display in an
 * invalid state when its value does not meet the validation constraints applied to it, such as being
 * required, and `showValidity` is true. Typically, `showValidity` will be true when the control has
 * been touched (interacted with).
 *
 * If `showValidity` is not explicitly provided, the control will show validity based on the presence of
 * `errorText`.
 */
export const Invalid = Example.extend({
  args: {
    errorText: "Please select a fruit",
    required: true,
    showValidity: true,
  },
});

/**
 * Autocompletes can be disabled. A disabled autocomplete will not receive interaction events.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
});

/**
 * By default, autocompletes will fill their parent's width. This can be constrained by providing a `maxWidth`.
 */
export const MaxWidth = Example.extend({
  name: "Max-width",
  args: {
    maxWidth: "var(--size-64)",
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

/**
 * Autocompletes can be used in forms. The name prop is required for the control to participate
 * in form submission.
 */
export const Forms = Example.extend({
  decorators: [
    (Story) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          alert(JSON.stringify({ fruit: formData.getAll("fruit") }));
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "var(--spacing-4)",
        }}
      >
        <button type="submit">Submit</button>
        <Story />
      </form>
    ),
  ],
});

interface FruitOption {
  label: string;
  value: string;
}

/** Filter fruit options based on the search text. */
function filterFruit(searchText: string) {
  return allOptions.filter((option) =>
    option.label.toLowerCase().startsWith(searchText.toLowerCase()),
  );
}

const allOptions: FruitOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Apricot", value: "apricot" },
  { label: "Avocado", value: "avocado" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Cherry", value: "cherry" },
  { label: "Cantaloupe", value: "cantaloupe" },
  { label: "Grape", value: "grape" },
  { label: "Grapefruit", value: "grapefruit" },
];
