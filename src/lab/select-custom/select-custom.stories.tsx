import { SelectCustom } from './select-custom'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Lab/SelectCustom',
  component: SelectCustom,
} satisfies Meta<typeof SelectCustom>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Select an option',
    isRequired: true,
    clearable: true,
    options: [
      {
        label: 'Group A',
        options: [
          { label: 'Option 1', value: 'a1' },
          { label: 'Option 2', value: 'a2', selected: true },
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
    label: 'Select multiple options',
    isRequired: true,
    clearable: true,
    multiple: true,
    options: [
      {
        label: 'Group A',
        options: [
          { label: 'Option 1', value: 'a1' },
          { label: 'Option 2', value: 'a2', selected: true },
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
