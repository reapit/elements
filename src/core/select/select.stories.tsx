import { Select } from './select'
import { useId } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Select',
  component: Select,
  argTypes: {
    children: {
      control: false,
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Demonstrates a single-select Select.
 */
export const Example: Story = {
  args: {
    children: [
      <Select.Button key="button" />,
      <Select.Popup key="popup">
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
          <Select.Option value="apricot">Apricot</Select.Option>
          <Select.Option value="avocado">Avocado</Select.Option>
          <Select.Option value="banana">Banana</Select.Option>
          <Select.Option value="blueberry">Blueberry</Select.Option>
          <Select.Option value="cherry">Cherry</Select.Option>
          <Select.Option value="cantaloupe">Cantaloupe</Select.Option>
          <Select.Option value="grape">Grape</Select.Option>
          <Select.Option value="grapefruit">Grapefruit</Select.Option>
        </Select.Listbox>
      </Select.Popup>,
    ],
    disabled: false,
    multiple: false,
    required: false,
    showValidity: false,
    size: 'medium',
  },
}

/**
 * Options can be grouped using the `CompactSelect.Optgroup`. Groups should always be separated
 * by a `CompactSelect.Divider`.
 */
export const Groups: Story = {
  args: {
    ...Example.args,
    children: [
      <Select.Button key="button" />,
      <Select.Popup key="popup">
        <Select.Listbox>
          <Select.Optgroup label="Fruits">
            <Select.Option value="apple">Apple</Select.Option>
            <Select.Option value="banana">Banana</Select.Option>
            <Select.Option value="orange">Orange</Select.Option>
          </Select.Optgroup>
          <Select.Divider />
          <Select.Optgroup label="Vegetables">
            <Select.Option value="carrot">Carrot</Select.Option>
            <Select.Option value="broccoli">Broccoli</Select.Option>
            <Select.Option value="spinach">Spinach</Select.Option>
          </Select.Optgroup>
        </Select.Listbox>
      </Select.Popup>,
    ],
    id: 'groups-example',
  },
}

/**
 * Demonstrates a multi-select that lets users choose multiple preloaded options.
 */
export const MultiSelect: Story = {
  name: 'Multi-select',
  args: {
    ...Example.args,
    id: 'multi-select-example',
    multiple: true,
  },
  parameters: { docs: { source: { type: 'code' } } },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexFlow: 'column', gap: 'var(--spacing-2)' }}>
        <Story />
      </div>
    ),
  ],
  render: (args, { parameters }) => {
    const fallbackId = useId()
    const id = args.id ?? fallbackId

    return (
      <Select.DefaultOptionsContext.Provider value={parameters.defaultOptions ?? []}>
        <Select {...args} id={id}>
          <Select.Button />
          <Select.Popup>
            <Select.Listbox>
              <Select.Option value="apple">Apple</Select.Option>
              <Select.Option value="apricot">Apricot</Select.Option>
              <Select.Option value="avocado">Avocado</Select.Option>
              <Select.Option value="banana">Banana</Select.Option>
              <Select.Option value="blueberry">Blueberry</Select.Option>
              <Select.Option value="cherry">Cherry</Select.Option>
              <Select.Option value="cantaloupe">Cantaloupe</Select.Option>
              <Select.Option value="grape">Grape</Select.Option>
              <Select.Option value="grapefruit">Grapefruit</Select.Option>
            </Select.Listbox>
          </Select.Popup>
        </Select>
        <Select.SelectionChips listboxId={Select.getListboxId(id)} />
      </Select.DefaultOptionsContext.Provider>
    )
  },
}

/**
 * When the select has one or more initial selections, the label text for those options must
 * be provided to `Select.Button` (single-select), and `Select.SelectionChips` (multi-select).
 * The value of each option should also form the `value` or `defaultValue` of `Select.Listbox`.
 * This wire up can be done manually via each component's prop interface or automatically through
 * `Select.DefaultOptionsContext`.
 */
export const DefaultOptions = {
  args: {
    ...MultiSelect.args,
    id: 'default-options-example',
  },
  render: MultiSelect.render,
  parameters: {
    docs: { story: { source: 'code' } },
    defaultOptions: [
      { label: 'Banana', value: 'banana' },
      { label: 'Blueberry', value: 'blueberry' },
    ],
  },
}
