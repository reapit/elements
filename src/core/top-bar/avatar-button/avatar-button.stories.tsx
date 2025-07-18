import { Menu } from '../../menu'
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
 * The following example demonstrates the use of `TopBar.AvatarButton` with the `Menu` component. The code
 * snippet does not work well with the `Menu.Trigger` component's render-prop, but it works as follows:
 *
 * ```tsx
 * <Menu.Trigger>
 *  {({ getTriggerProps }) => (
 *    <TopBar.AvatarButton {...getTriggerProps()}>KD</TopBar.AvatarButton>
 *  )}
 * </Menu.Trigger>
 * ```
 */
export const WithAMenu: Story = {
  name: 'With a Menu',
  args: {
    ...Example.args,
  },
  argTypes: {
    'aria-expanded': {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200px' }}>
        <Story />
      </div>
    ),
  ],
  render: ({ children }) => (
    <Menu>
      <Menu.Trigger>
        {({ getTriggerProps }) => <TopBarAvatarButton {...getTriggerProps()}>{children}</TopBarAvatarButton>}
      </Menu.Trigger>
      <Menu.Popover>
        <Menu.List>
          <Menu.Item label="Menu Item 1" />
          <Menu.Item label="Menu Item 2" />
          <Menu.Item label="Menu Item 3" />
        </Menu.List>
      </Menu.Popover>
    </Menu>
  ),
}
