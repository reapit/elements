import { useId } from "react";
import type { ChangeEventHandler } from "react";

import preview from "#.storybook/preview";

import { ComboboxContext } from "../context";
import { ComboboxListbox } from "./listbox";

const meta = preview.meta({
  title: "Utils/Combobox/Listbox",
  component: ComboboxListbox,
  argTypes: {
    children: {
      control: false,
    },
    defaultValue: {
      control: false,
    },
    value: {
      control: false,
    },
  },
  decorators: [
    (Story, { parameters }) => {
      const listboxId = useId();
      return (
        <ComboboxContext.Provider
          value={{
            comboboxId: "button-id",
            disabled: false,
            listboxId,
            multiple: parameters.multiple ?? false,
            popupId: "popup-id",
            required: false,
            searchInputId: "search-input-id",
            size: "medium",
          }}
        >
          <Story />
        </ComboboxContext.Provider>
      );
    },
  ],
});

/**
 * Renders options and option groups with a hidden `<select>` element. The hidden select submits
 * selected options in standard HTML forms.
 */
export const Example = meta.story({
  args: {
    children: [
      <ComboboxListbox.Option key="1" value="1">
        Option 1
      </ComboboxListbox.Option>,
      <ComboboxListbox.Option key="2" value="2">
        Option 2
      </ComboboxListbox.Option>,
      <ComboboxListbox.Option key="3" value="3">
        Option 3
      </ComboboxListbox.Option>,
    ],
    defaultValue: ["1"],
    name: "options",
  },
  parameters: {
    multiple: false,
  },
});

/**
 * Single-select is the default. The first option is always a special "placeholder" option that the
 * native select automatically chooses when no other option is selected.
 */
export const Single = Example.extend({
  name: "Single-select",
  args: {
    defaultValue: [],
  },
});

/**
 * The listbox will allow multiple selections when the parent Combobox has `aria-multiselectable`.
 */
export const Multiple = Example.extend({
  name: "Multi-select",
  args: {
    defaultValue: ["1", "2"],
  },
  parameters: {
    multiple: true,
  },
});

/**
 * Group options using `Combobox.Optgroup` and `Combobox.Divider`.
 */
export const Groups = Example.extend({
  args: {
    children: [
      <ComboboxListbox.Optgroup key="group-1" label="Group 1">
        <ComboboxListbox.Option value="1">Option 1</ComboboxListbox.Option>
        <ComboboxListbox.Option value="2">Option 2</ComboboxListbox.Option>
        <ComboboxListbox.Option value="3">Option 3</ComboboxListbox.Option>
      </ComboboxListbox.Optgroup>,
      <ComboboxListbox.Divider key="divider-1" />,
      <ComboboxListbox.Optgroup key="group-2" label="Group 2">
        <ComboboxListbox.Option value="4">Option 4</ComboboxListbox.Option>
        <ComboboxListbox.Option value="5">Option 5</ComboboxListbox.Option>
        <ComboboxListbox.Option value="6">Option 6</ComboboxListbox.Option>
      </ComboboxListbox.Optgroup>,
    ],

    defaultValue: ["1", "4"],
  },
});

/**
 * Control the selected state like any native form control. When controlling the combobox state,
 * you must implement the behaviour the combobox would otherwise handle automatically. The
 * `ComboboxListbox.getValue` helper, also exposed via `Combobox.getListboxValue`, assists with
 * this in form libraries like Formik.
 *
 * Controlled state must always be a string array, regardless of single- or multi-select mode,
 * which is what this helper ensures.
 */
export const Controlled = Example.extend({
  args: {
    defaultValue: undefined,
  },
  parameters: { docs: { source: { type: "code" } } },
  render: (args) => {
    // Our controlled state. We start with the option whose value is "1" checked.
    const [value, setValue] = ComboboxListbox.useState("1");

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
      // NOTE: we get a reference to the current target outside of our state setter function
      // because the state setter may be called after the synthetic event has been cleaned up
      // and it's reference to the current target lost.
      const selectElement = event.currentTarget;

      // `getValue` does the heavy lifting for us, returning the new state for the select.
      setValue(ComboboxListbox.getValue(selectElement));
    };

    return <ComboboxListbox {...args} onChange={handleChange} value={value} />;
  },
});

/**
 * Form data includes any selected options during submission. This example demonstrates submission
 * with a native HTML form.
 */
export const Forms = Example.extend({
  args: {
    name: "options",
  },
  argTypes: {
    name: { control: false },
  },
  decorators: [
    (Story) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          alert(JSON.stringify({ options: formData.getAll("options") }));
        }}
        style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2)" }}
      >
        <button style={{ alignSelf: "start" }} type="submit">
          Submit
        </button>
        <Story />
      </form>
    ),
  ],
  parameters: {
    multiple: true,
  },
});

/**
 * Display a placeholder when no options are available. This is useful for search results or
 * filtered lists.
 */
export const Placeholder = meta.story({
  args: {
    children: <ComboboxListbox.Placeholder>No results found</ComboboxListbox.Placeholder>,
    name: "options",
  },
  decorators: [
    (Story) => (
      <div style={{ border: "1px solid #FA00FF" }}>
        <Story />
      </div>
    ),
  ],
});
