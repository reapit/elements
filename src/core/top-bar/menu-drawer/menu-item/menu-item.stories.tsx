import { TopBarMenuDrawerMenuItem } from './menu-item'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/TopBar/MenuDrawer/MenuItem',
  component: TopBarMenuDrawerMenuItem,
} satisfies Meta<typeof TopBarMenuDrawerMenuItem>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Dashboard',
    href: '/dashboard',
    'aria-current': false,
  },
}

export const Selected: Story = {
  args: {
    ...Example.args,
    'aria-current': 'page',
  },
}
