import { TopBarMenuDrawerSubmenuItemButton } from './submenu-item-button'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/TopBar/MenuDrawer/SubmenuItemButton',
  component: TopBarMenuDrawerSubmenuItemButton,
  args: {
    children: 'Logout',
    onClick: () => alert('Logout clicked!'),
  },
} satisfies Meta<typeof TopBarMenuDrawerSubmenuItemButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
