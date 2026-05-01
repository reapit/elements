import preview from '#.storybook/preview'
import { Menu } from '#src/core/menu'
import { TopBar } from '../top-bar'

const meta = preview.meta({
  component: TopBar.AvatarMenu,
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
