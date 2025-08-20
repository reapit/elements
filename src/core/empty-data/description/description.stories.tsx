import { EmptyDataDescription } from './description'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/EmptyData/Description',
  component: EmptyDataDescription,
  argTypes: {
    children: {
      control: 'text',
    },
    secondaryText: {
      control: 'text',
    },
  },
} satisfies Meta<typeof EmptyDataDescription>

export default meta
type Story = StoryObj<typeof EmptyDataDescription>

/**
 *
 */
export const Example: Story = {
  args: {
    children: 'No things found',
    secondaryText: 'Secondary text',
  },
}
