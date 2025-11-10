import { Listbox } from './listbox'
import { useId, useState } from 'react'

import type { ButtonHTMLAttributes, ChangeEventHandler } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Utils/Listbox',
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
    const prefix = useId()
    const id = `${args.id}-${prefix}`

    return <Listbox {...args} id={id} />
  },
} satisfies Meta<typeof Listbox>

export default meta
type Story = StoryObj<typeof meta>

/**
 * At its most basic, `ListboxBaseListbox` renders the options (and option groups) provided to it alongside
 * a hidden `<select>` element. The hidden select allows the selected options to be submitted as part of
 * a standard HTML form.
 */
export const Example: Story = {
  args: {
    'aria-disabled': false,
    'aria-multiselectable': false,
    'aria-orientation': 'horizontal',
    'aria-required': false,
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
}

/**
 * Single-select behaviour is the default. When used as a single-select, the first option of the combobox
 * will always be a special "placeholder" option that will be automatically selected by the native select
 * element when no other specific option is selected.
 */
export const Single: Story = {
  name: 'Single-select',
  args: {
    ...Example.args,
    defaultValue: [],
  },
}

/**
 * Multi-select behaviour can be achieved using `multiple`.
 */
export const Multiple: Story = {
  name: 'Multi-select',
  args: {
    ...Example.args,
    'aria-multiselectable': true,
    defaultValue: ['1', '2'],
  },
}

/**
 * Listbox options can be disabled.
 */
export const Disabled: Story = {
  args: {
    ...Example.args,
    'aria-disabled': true,
  },
}

/**
 * There are two behaviours available when selecting an option. By default, the select action will
 * `toggle` the option's selected state. In some cases however, we may want clicks to only select the option,
 * preferring deselection to occur through a separate UI element. This `select-only` behaviour is
 * demonstrated here.
 */
export const SelectAction: Story = {
  name: 'Select actions',
  args: {
    ...Example.args,
    defaultValue: ['1'],
    selectAction: 'select',
  },
}

/**
 * Options can be grouped using `Listbox.Optgroup` and `Listbox.Divider`.
 */
export const Groups: Story = {
  args: {
    ...Example.args,
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
    defaultValue: ['1', '4'],
  },
}

/**
 * Since we rely on a native select element, the selected state can be controlled in the same manner
 * as any other native form control. However, when controlling the combobox's state, consumers become
 * responsible for implementing the same behaviour as the combobox would facilitate if its state
 * were uncontrolled. To assist with this when using controlled form state management libraries like
 * Formik, the `Listbox.getValue` helper is provided.
 *
 * Whether single- or multi-select behaviour is desired, the controlled state must be an array of
 * string values. The example here demonstrates a controlled usage of the `Listbox` via simple
 * local component state (`useState`) and `Listbox.getValue`.
 */
export const Controlled: Story = {
  args: {
    ...Example.args,
    defaultValue: undefined,
  },
  parameters: { docs: { source: { type: 'code' } } },
  render: (args) => {
    // Our controlled state. We start with the option whose value is "1" checked.
    const [value, setValue] = useState<readonly string[]>(['1'])

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
      // NOTE: we get a reference to the current target outside of our state setter function
      // because the state setter may be called after the synthetic event has been cleaned up
      // and it's reference to the current target lost.
      const selectElement = event.currentTarget

      // `getValue` does the heavy lifting for us, returning the new state for the select.
      setValue(Listbox.getValue(selectElement))
    }

    return <Listbox {...args} onChange={handleChange} value={value} />
  },
}

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
export const ClearingState: Story = {
  name: 'Clearing state',
  args: {
    ...Example.args,
    'aria-multiselectable': true,
    defaultValue: ['1', '2'],
  },
  render: (args) => {
    const fallbackId = useId()
    const id = args.id ?? fallbackId
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 'var(--spacing-2)' }}>
        <button onClick={() => Listbox.clearValue(id)}>Clear</button>
        <Listbox {...args} id={id} />
      </div>
    )
  },
}

/**
 * As with clearing state, observing the listboxes selection state is trivial when it is controlled and
 * within scope. However, if the controlled state is not easily available, or the state is uncontrolled,
 * it can be useful to observe the selection state via a MutationObserver.
 *
 * The `Listbox.useSelectionObserver` makes this simple to achieve. It observes the selected options in
 * the listbox, calling the provided callback with the array of selected options (the actual button
 * elements), allowing consumers to react to changes in the selection state as shown here.
 */
export const ObservingState: Story = {
  name: 'Observing state',
  args: {
    ...Example.args,
    'aria-multiselectable': true,
  },
  render: (args) => {
    const fallbackId = useId()
    const id = args.id ?? fallbackId

    const [output, setOutput] = useState('')

    // NOTE: The callback passed to `Listbox.useSelectionObserver` does not need to be stable.
    Listbox.useSelectionObserver(id, (selectedOptions) => {
      setOutput(selectedOptions.map((option) => option.textContent).join(', '))
    })

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 'var(--spacing-2)' }}>
        <button onClick={() => Listbox.clearValue(id)}>Clear</button>
        <Listbox {...args} id={id} />
        <output>{output}</output>
      </div>
    )
  },
}

/**
 * Any selected options will be included in the form data during submission. The following example
 * demonstrates this through a native HTML form.
 */
export const Forms: Story = {
  args: {
    ...Example.args,
    'aria-multiselectable': true,
    name: 'options',
  },
  argTypes: {
    name: { control: false },
  },
  decorators: [
    (Story) => (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          alert(JSON.stringify({ options: formData.getAll('options') }))
        }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 'var(--spacing-2)' }}
      >
        <button type="submit">Submit</button>
        <Story />
      </form>
    ),
  ],
}

/** A barebones, custom listbox option component used by the listbox stories */
function MyListboxOption(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const isSelected = props['aria-checked'] || props['aria-selected']
  const fontWeight = isSelected ? 'bold' : 'normal'
  return <button {...props} style={{ fontWeight }} />
}

/** A barebones, custom listbox optgroup component used by the listbox stories */
function MyListboxOptgroup({ children, label, ...rest }: Listbox.OptgroupProps) {
  const labelId = useId()
  return (
    <div {...rest} aria-labelledby={labelId}>
      {label && <div id={labelId}>{label}</div>}
      {children}
    </div>
  )
}
