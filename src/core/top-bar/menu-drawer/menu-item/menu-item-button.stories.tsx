import { TopBarMenuDrawerMenuItemButton } from './menu-item-button'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/TopBar/MenuDrawer/MenuItemButton',
  component: TopBarMenuDrawerMenuItemButton,
} satisfies Meta<typeof TopBarMenuDrawerMenuItemButton>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Sign Out',
    onClick: () => alert('Clicked!'),
  },
}
