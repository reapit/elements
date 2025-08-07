import { Menu } from '#src/core/menu'
import { TopBarAvatarMenu } from './avatar-menu'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof TopBarAvatarMenu> = {
  component: TopBarAvatarMenu,
  title: 'Core/TopBar/AvatarMenu',
  argTypes: {
    children: {
      control: false,
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    initials: 'KD',
    children: (
      <>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
        <Menu.Item>Item 3</Menu.Item>
      </>
    ),
  },
}
