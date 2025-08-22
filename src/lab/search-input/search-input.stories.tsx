import { SearchInput } from './search-input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Lab/SearchInput',
  component: SearchInput,
  argTypes: {
    inputSize: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
    isDisabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof SearchInput>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Renders a `SearchInput` with the default configuration:
 * - `inputSize` = `"medium"`
 * - `isDisabled` = `false`
 */
export const Default: Story = {
  args: {},
}

/**
 * Renders a `SearchInput` in a disabled state:
 * - `isDisabled` = `true`
 * - User interaction is blocked.
 */
export const IsDisabled: Story = {
  args: {
    isDisabled: true,
  },
}

/**
 * Renders a `SearchInput` with a larger input field:
 * - `inputSize` = `"large"`
 */
export const SizeLarge: Story = {
  args: {
    inputSize: 'large',
  },
}
