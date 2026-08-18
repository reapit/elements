import { styled } from "@linaria/react";
import { useId, useState } from "react";
import type { ChangeEventHandler } from "react";

import preview from "#.storybook/preview";

import { Listbox } from "./listbox";

/** A barebones, custom listbox option component used by the listbox stories */
const MyListboxOption = styled.button`
  &:where([aria-checked="true"], [aria-selected="true"])::before {
    content: "✅ ";
  }

  &[data-is-active="true"] {
    font-weight: bold;
  }
`;

/** A barebones, custom listbox optgroup component used by the listbox stories */
function MyListboxOptgroup({ children, label, ...rest }: Listbox.OptgroupProps) {
  const labelId = useId();
  return (
    <div {...rest} aria-labelledby={labelId}>
      {label && <div id={labelId}>{label}</div>}
      {children}
    </div>
  );
}

const meta = preview.meta({
  title: "Utils/Listbox",
  component: Listbox,
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
  render: (args) => {
    // NOTE: Since multiple stories may involve the same ID, we need to
    // make it unique for each instance to avoid collisions.
    const prefix = useId();
    const id = `${args.id}-${prefix}`;

    return <Listbox {...args} id={id} />;
  },
});

/**
 * At its most basic, `ListboxBaseListbox` renders the options (and option groups) provided to it alongside
 * a hidden `<select>` element. The hidden select allows the selected options to be submitted as part of
 * a standard HTML form.
 */
export const Example = meta.story({
  args: {
    "aria-disabled": false,
    "aria-multiselectable": false,
    "aria-orientation": "horizontal",
    "aria-required": false,
    children: [
      <Listbox.Option key="1" as={MyListboxOption} value="1">
        Option 1
      </Listbox.Option>,
      <Listbox.Option key="2" as={MyListboxOption} value="2">
        Option 2
      </Listbox.Option>,
      <Listbox.Option key="3" as={MyListboxOption} value="3">
        Option 3
      </Listbox.Option>,
    ],
  },
});

/**
 * Single-select behaviour is the default. When used as a single-select, the first option of the combobox
 * will always be a special "placeholder" option that will be automatically selected by the native select
 * element when no other specific option is selected.
 */
export const Single = Example.extend({
  name: "Single-select",
  args: {
    defaultValue: [],
  },
});

/**
 * Multi-select behaviour can be achieved using `multiple`.
 */
export const Multiple = Example.extend({
  name: "Multi-select",
  args: {
    "aria-multiselectable": true,
    defaultValue: ["1", "2"],
  },
});

/**
 * Listbox options can be disabled.
 */
export const Disabled = Example.extend({
  args: {
    "aria-disabled": true,
  },
});

/**
 * When a listbox has no options, tabbing into it still shows a focus outline on the
 * container itself, since there is no active option to display one instead.
 */
export const Empty = Example.extend({
  args: {
    children: [],
  },
});

/**
 * Clicking an option's selection behaviour is controlled by `selectAction`. The default,
 * `'auto'`, selects the option for single-select listboxes and toggles it for multi-select
 * listboxes. Setting `selectAction="select"`, as demonstrated here, forces select-only
 * behaviour even for multi-select listboxes, useful when deselection should only occur
 * through a separate UI element (e.g. a "Clear" button). Conversely, `selectAction="toggle"`
 * forces toggle behaviour even for single-select listboxes.
 */
export const SelectAction = Example.extend({
  name: "Select actions",
  args: {
    "aria-multiselectable": true,
    defaultValue: ["1"],
    selectAction: "select",
  },
});

/**
 * Options can be grouped using `Listbox.Optgroup` and `Listbox.Divider`.
 */
export const Groups = Example.extend({
  args: {
    children: [
      <Listbox.Optgroup key="group-1" as={MyListboxOptgroup} label="Group 1">
        <Listbox.Option as={MyListboxOption} value="1">
          Option 1
        </Listbox.Option>
        <Listbox.Option as={MyListboxOption} value="2">
          Option 2
        </Listbox.Option>
        <Listbox.Option as={MyListboxOption} value="3">
          Option 3
        </Listbox.Option>
      </Listbox.Optgroup>,
      <Listbox.Divider key="divider-1" />,
      <Listbox.Optgroup key="group-2" as={MyListboxOptgroup} label="Group 2">
        <Listbox.Option as={MyListboxOption} value="4">
          Option 4
        </Listbox.Option>
        <Listbox.Option as={MyListboxOption} value="5">
          Option 5
        </Listbox.Option>
        <Listbox.Option as={MyListboxOption} value="6">
          Option 6
        </Listbox.Option>
      </Listbox.Optgroup>,
    ],

    defaultValue: ["1", "4"],
  },
});

/**
 * Since we rely on a native select element, the selected state can be controlled in the same manner
 * as any other native form control. However, when controlling the combobox's state, consumers become
 * responsible for implementing the same behaviour as the combobox would facilitate if its state
 * were uncontrolled. To assist with this when using controlled form state management libraries like
 * Formik, the `Listbox.getValue` helper is provided.
 *
 * Whether single- or multi-select behaviour is desired, the controlled state must be an array of
 * string values. The example here demonstrates a controlled usage of the `Listbox` via simple
 * local component state (`Listbox.useState`) and `Listbox.getValue`.
 */
export const Controlled = Example.extend({
  args: {
    defaultValue: undefined,
  },
  parameters: { docs: { source: { type: "code" } } },
  render: (args) => {
    // Our controlled state. We start with the option whose value is "1" checked.
    const [value, setValue] = Listbox.useState("1");

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
      // NOTE: we get a reference to the current target outside of our state setter function
      // because the state setter may be called after the synthetic event has been cleaned up
      // and it's reference to the current target lost.
      const selectElement = event.currentTarget;

      // `getValue` does the heavy lifting for us, returning the new state for the select.
      setValue(Listbox.getValue(selectElement));
    };

    return (
      <>
        <pre style={{ color: "#FA00FF" }}>{JSON.stringify(value)}</pre>
        <Listbox {...args} onChange={handleChange} value={value} />
      </>
    );
  },
});

/**
 * For multi-select listboxes, the controlled value should be an array of strings. This example
 * demonstrates a controlled multi-select listbox where users can select multiple options.
 *
 * The `Listbox.getValue` helper returns an array for multi-select listboxes, making it easy to
 * manage the state.
 */
export const ControlledMultiSelect = Example.extend({
  name: "Controlled (multi-select)",
  args: {
    "aria-multiselectable": true,
    defaultValue: undefined,
  },
  parameters: { docs: { source: { type: "code" } } },
  render: (args) => {
    // Our controlled state. We start with options "1" and "2" selected.
    const [value, setValue] = Listbox.useState(["1", "2"]);

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
      // NOTE: we get a reference to the current target outside of our state setter function
      // because the state setter may be called after the synthetic event has been cleaned up
      // and it's reference to the current target lost.
      const selectElement = event.currentTarget;

      // `getValue` does the heavy lifting for us, returning the new state for the select.
      setValue(Listbox.getValue(selectElement));
    };

    return (
      <>
        <pre>{JSON.stringify(value)}</pre>
        <Listbox {...args} onChange={handleChange} value={value} />
      </>
    );
  },
});

/**
 * Clearing the listbox's selection when it's value is controlled is trivial: the value can simply be
 * set to an empty array. However, sometimes the controlled value's setter may not be available to the
 * component trying to clear it and lifting the state higher in the component tree may not be desirable.
 * Further, sometimes the value is uncontrolled and exists only in the DOM.
 *
 * In these cases, `Listbox.clearValue` can be used to clear the selection state of the listbox via the
 * DOM. When used, it will ensure a change event is fired (technically, it will be an input event) on the
 * underlying select element so that consumers can react appropriately to the change.
 */
export const ClearingState = Example.extend({
  name: "Clearing state",
  args: {
    "aria-multiselectable": true,
    defaultValue: ["1", "2"],
  },
  render: (args) => {
    const fallbackId = useId();
    const id = args.id ?? fallbackId;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "var(--spacing-2)",
        }}
      >
        <button onClick={() => Listbox.clearValue(id)}>Clear</button>
        <Listbox {...args} id={id} />
      </div>
    );
  },
});

/**
 * As with clearing state, observing the listboxes selection state is trivial when it is controlled and
 * within scope. However, if the controlled state is not easily available, or the state is uncontrolled,
 * it can be useful to observe the selection state via a MutationObserver.
 *
 * The `Listbox.useSelectionObserver` makes this simple to achieve. It observes the selected options in
 * the listbox, calling the provided callback with the array of selected options (the actual button
 * elements), allowing consumers to react to changes in the selection state as shown here.
 */
export const ObservingState = Example.extend({
  name: "Observing state",
  args: {
    "aria-multiselectable": true,
  },
  render: (args) => {
    const fallbackId = useId();
    const id = args.id ?? fallbackId;

    const [output, setOutput] = useState("");

    // NOTE: The callback passed to `Listbox.useSelectionObserver` does not need to be stable.
    Listbox.useSelectionObserver(id, (selectedOptions) => {
      setOutput(selectedOptions.map((option) => option.textContent).join(", "));
    });

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "var(--spacing-2)",
        }}
      >
        <button onClick={() => Listbox.clearValue(id)}>Clear</button>
        <Listbox {...args} id={id} />
        <output>{output}</output>
      </div>
    );
  },
});

/**
 * Any selected options will be included in the form data during submission. The following example
 * demonstrates this through a native HTML form.
 *
 * Note: the form submission handler retrieves the "options" form value using `formData.getAll('options')`.
 * This will result in an array of selected values, whether the listbox is a single- or multi-select.
 */
export const Forms = Example.extend({
  args: {
    "aria-multiselectable": true,
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
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "var(--spacing-2)",
        }}
      >
        <button type="submit">Submit</button>
        <Story />
      </form>
    ),
  ],
});
