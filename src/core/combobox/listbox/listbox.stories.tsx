import { ComboboxContext } from '../context'
import { ComboboxListbox } from './listbox'
import { useId, useState } from 'react'

import type { ChangeEventHandler } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Combobox/Listbox',
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
    (Story) => {
      const listboxId = useId()
      return (
        <ComboboxContext.Provider value={{ disabled: false, listboxId, required: false }}>
          <Story />
        </ComboboxContext.Provider>
      )
    },
  ],
} satisfies Meta<typeof ComboboxListbox>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Renders options and option groups with a hidden `<select>` element. The hidden select submits
 * selected options in standard HTML forms.
 */
export const Example: Story = {
  args: {
    'aria-multiselectable': false,
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
    defaultValue: ['1'],
    name: 'options',
  },
}

/**
 * Single-select is the default. The first option is always a special "placeholder" option that the
 * native select automatically chooses when no other option is selected.
 */
export const Single: Story = {
  name: 'Single-select',
  args: {
    ...Example.args,
    defaultValue: [],
  },
}

/**
 * Use `aria-multiselectable` for multi-select behavior.
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
 * Group options using `Combobox.Optgroup` and `Combobox.Divider`.
 */
export const Groups: Story = {
  args: {
    ...Example.args,
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
    defaultValue: ['1', '4'],
  },
}

/**
 * Control the selected state like any native form control. When controlling the combobox state,
 * you must implement the behavior the combobox would otherwise handle automatically. The
 * `ComboboxListbox.getValue` helper, also exposed via `Combobox.getListboxValue`, assists with
 * this in form libraries like Formik.
 *
 * Controlled state must always be a string array, regardless of single- or multi-select mode,
 * which is what this helper ensures.
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
      setValue(ComboboxListbox.getValue(selectElement))
    }

    return <ComboboxListbox {...args} onChange={handleChange} value={value} />
  },
}

/**
 * Form data includes any selected options during submission. This example demonstrates submission
 * with a native HTML form.
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
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}
      >
        <button style={{ alignSelf: 'start' }} type="submit">
          Submit
        </button>
        <Story />
      </form>
    ),
  ],
}
