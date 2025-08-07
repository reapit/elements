import { Menu } from '#src/core/menu'
import { TopBarAvatarButton } from './avatar-button'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof TopBarAvatarButton> = {
  component: TopBarAvatarButton,
  title: 'Core/TopBar/AvatarButton',
}

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'KD',
  },
}

/**
 * The following example demonstrates the use of `TopBar.AvatarButton` with the `Menu` component.
 */
export const WithMenu: Story = {
  name: 'With a Menu',
  args: {
    ...Example.args,
  },
  argTypes: {
    'aria-expanded': {
      control: false,
    },
  },
  parameters: {
    layout: 'centered',
  },
  render: ({ children }) => (
    <>
      <TopBarAvatarButton
        {...Menu.getTriggerProps({ id: 'trigger', popoverTarget: 'menu', popoverTargetAction: 'toggle' })}
      >
        {children}
      </TopBarAvatarButton>
      <Menu aria-labelledby="trigger" id="menu" placement="bottom-end">
        <Menu.Item>Menu Item 1</Menu.Item>
        <Menu.Item>Menu Item 2</Menu.Item>
        <Menu.Item>Menu Item 3</Menu.Item>
      </Menu>
    </>
  ),
}
