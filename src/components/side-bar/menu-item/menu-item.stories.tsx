import { Icon } from '../../icon'
import { SideBarMenuItem } from './menu-item'
import { useSideBarContextDecorator } from '../__story__/use-side-bar-context-decorator'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/SideBar/MenuItem',
  component: SideBarMenuItem,
  argTypes: {
    children: {
      control: 'text',
    },
    icon: {
      control: 'radio',
      options: ['Property', 'Dashboard', 'Settings', 'User'],
      mapping: {
        Property: <Icon icon="property" />,
        Dashboard: <Icon icon="dashboard" />,
        Settings: <Icon icon="settings" />,
        User: <Icon icon="user" />,
      },
    },
  },
  decorators: [useSideBarContextDecorator],
} satisfies Meta<typeof SideBarMenuItem>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'Menu item',
    href: '',
    icon: 'Property',
    isActive: false,
  },
}

/**
 * When the item represents the current page, `isActive` should be supplied to communicate to visual and accessible
 * users that the item is currently "selected". For accessible users, this is communicated via `aria-current="page"`
 * on the underlying `<a>` element. The visual styling of the item is applied based on this ARIA attribute as well,
 * which means CSS-only consumers just need to ensure `aria-current="page"` is applied when appropriate.
 */
export const Selected = {
  args: {
    ...Example.args,
    isActive: true,
  },
}

/**
 * When there is not enough space to display the full label, it will be truncated with an ellipsis. That said, author's
 * should typically ensure menu item labels are short enough to fit within the available space in the `SideBar`.
 * Importantly, when the `SideBar` is collapsed, the menu item's label will be available in the accessibility tree
 * despite not being visible.
 */
export const Truncation: Story = {
  args: {
    ...Example.args,
  },
  parameters: {
    sideBar: { width: '100px' },
  },
}

/**
 * When the `SideBar` is collapsed, the submenu item's label will be completely hidden. Again though, while the label
 * is not visible, it is still available in the accessibility tree.
 */
export const Collapsed: Story = {
  args: {
    ...Example.args,
  },
  parameters: {
    sideBar: { state: 'collapsed' },
  },
}
