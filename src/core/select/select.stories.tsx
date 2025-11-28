import { Select } from './select'
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
 * Demonstrates a multi-select Select.
 */
export const MultiSelect: Story = {
  name: 'Multi-select',
  args: {
    ...Example.args,
    multiple: true,
  },
}
