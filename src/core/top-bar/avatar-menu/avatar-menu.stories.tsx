import preview from '#.storybook/preview'
import { Menu } from '#src/core/menu'
import { TopBarAvatarMenu } from './avatar-menu'

const meta = preview.meta({
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
})

export const Example = meta.story({
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
})
