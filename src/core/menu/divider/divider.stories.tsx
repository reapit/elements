import { MenuDivider } from './divider'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Menu/Divider',
  component: MenuDivider,
} satisfies Meta<typeof MenuDivider>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {}
