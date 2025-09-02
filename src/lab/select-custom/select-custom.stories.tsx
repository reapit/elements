import { SelectCustom } from './select-custom'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Lab/SelectCustom',
  component: SelectCustom,
} satisfies Meta<typeof SelectCustom>

export default meta

type Story = StoryObj<typeof meta>

export const BasicUsage: Story = {
  args: {
    id: 'basic-select',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
  },
}

export const SelectGroup: Story = {
  args: {
    id: 'group-select',
    options: [
      {
        label: 'Group A',
        options: [
          { label: 'Option 1', value: 'a1' },
          { label: 'Option 2', value: 'a2' },
        ],
      },
      {
        label: 'Group B',
        options: [
          { label: 'Option 3', value: 'b1' },
          { label: 'Option 4', value: 'b2' },
        ],
      },
    ],
  },
}

export const MultiSelect: Story = {
  args: {
    id: 'multi-select',
    clearable: true,
    multiple: true,
    options: [
      {
        label: 'Group A',
        options: [
          { label: 'Option 1', value: 'a1' },
          { label: 'Option 2', value: 'a2' },
        ],
      },
      {
        label: 'Group B',
        options: [
          { label: 'Option 3', value: 'b1' },
          { label: 'Option 4', value: 'b2' },
        ],
      },
    ],
  },
}
