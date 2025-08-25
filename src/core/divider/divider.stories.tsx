import { Divider } from './divider'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Divider',
  component: Divider,
} satisfies Meta<typeof Divider>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {}
