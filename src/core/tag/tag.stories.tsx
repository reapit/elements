import { Tag } from './tag'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Tag',
  component: Tag,
  argTypes: {
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Tag',
  },
}
