import { DashboardIcon } from '#src/icons/dashboard'
import { PropertyIcon } from '#src/icons/property'
import { SettingsIcon } from '#src/icons/settings'
import { SideBarMenuItem } from './menu-item'
import { UserIcon } from '#src/icons/user'
import { useSideBarContextDecorator } from '../__story__/use-side-bar-context-decorator'
import { useSideBarWidthDecorator } from '../__story__/use-side-bar-width-decorator'

import type { Meta, StoryObj } from '@storybook/react-vite'

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
        Property: <PropertyIcon />,
        Dashboard: <DashboardIcon />,
        Settings: <SettingsIcon />,
        User: <UserIcon />,
      },
    },
  },
  decorators: [useSideBarContextDecorator],
} satisfies Meta<typeof SideBarMenuItem>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-current': false,
    children: 'Menu item',
    href: globalThis.top?.location.href!,
    icon: 'Property',
  },
}

/**
 * When the item represents the current page, `aria-current="page"` should be supplied to communicate to visual and
 * accessible users that the item is currently "selected".
 */
export const Selected = {
  args: {
    ...Example.args,
    'aria-current': 'page',
  },
}

/**
 * When there is not enough space to display the full label, it will be truncated with an ellipsis. That said,
 * author's should typically ensure menu item labels are short enough to fit within the available space in the
 * `SideBar`. Importantly, when the `SideBar` is collapsed, the menu item's label will be available in the
 * accessibility tree despite not being fully visible.
 */
export const Truncation: Story = {
  args: {
    ...Example.args,
  },
  decorators: [useSideBarWidthDecorator],
  parameters: {
    sideBar: { width: '100px' },
  },
}

/**
 * When the `SideBar` is collapsed, the menu item's label will be completely hidden. Again though, while the label
 * is not visible, it is still available in the accessibility tree.
 */
export const Collapsed: Story = {
  args: {
    ...Example.args,
  },
  decorators: [useSideBarWidthDecorator],
  parameters: {
    sideBar: { state: 'collapsed' },
  },
}
