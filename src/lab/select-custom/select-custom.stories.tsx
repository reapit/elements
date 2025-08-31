import { SelectCustom } from './select-custom'
import type { SelectCustomProps } from './select-custom'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Lab/SelectCustom',
  component: SelectCustom,
} satisfies Meta<typeof SelectCustom>
export type { SelectCustomProps }

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Select an option',
    isRequired: true,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
  },
}
