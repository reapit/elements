import { TopBarMenuDrawerSubmenuItem } from './submenu-item'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/TopBar/MenuDrawer/SubmenuItem',
  component: TopBarMenuDrawerSubmenuItem,
} satisfies Meta<typeof TopBarMenuDrawerSubmenuItem>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Profile',
    href: '/settings/profile',
    'aria-current': false,
  },
}

export const Selected: Story = {
  args: {
    ...Example.args,
    'aria-current': 'page',
  },
}
