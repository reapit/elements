import { TopBarMenuDrawerSubmenu } from './submenu'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/TopBar/MenuDrawer/Submenu',
  component: TopBarMenuDrawerSubmenu,
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof TopBarMenuDrawerSubmenu>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: (
      <>
        <TopBarMenuDrawerSubmenu.Item href="#" aria-current={false}>
          Item 1
        </TopBarMenuDrawerSubmenu.Item>
        <TopBarMenuDrawerSubmenu.Item href="#" aria-current="page">
          Item 2
        </TopBarMenuDrawerSubmenu.Item>
        <TopBarMenuDrawerSubmenu.ItemButton onClick={() => alert('Item 3 clicked!')}>
          Item 3
        </TopBarMenuDrawerSubmenu.ItemButton>
      </>
    ),
  },
}
