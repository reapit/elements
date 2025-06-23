import { DeprecatedIcon } from '../deprecated-icon'
import { SideBar } from './side-bar'
import { useViewportHeightDecorator } from './__story__/use-viewport-height-decorator'

import type { Meta, StoryObj } from '@storybook/react-vite'

// Common href for all menu items that links to the current storybook page.
const href = globalThis.top?.location.href!

export default {
  title: 'Components/SideBar',
  component: SideBar,
  argTypes: {
    children: {
      control: 'radio',
      options: ['No selected item', 'Selected item', 'Selected submenu item'],
      mapping: {
        'No selected item': buildMenu('No slected item'),
        'Selected item': buildMenu('Selected item'),
        'Selected submenu item': buildMenu('Selected submenu item'),
      },
    },
    footer: {
      control: false,
    },
  },
  decorators: [useViewportHeightDecorator],
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
} as Meta<typeof SideBar>

type Story = StoryObj<typeof SideBar>

export const Example: Story = {
  args: {
    children: 'No selected item',
    footer: <SideBar.CollapseButton />,
  },
}

/**
 * If a menu item represents the current page, it should be marked as "selected". See the `SideBar.MenuItem`
 * documentation for details on how.
 */
export const SelectedItem: Story = {
  args: {
    ...Example.args,
    children: 'Selected item',
  },
}

/**
 * Likewise, if a submenu item represents the current page, it should be marked as "selected". This will
 * automatically cause the parent `SideBar.MenuGroup` to be displayed as "selected" itself. See the
 * `SideBar.SubmenuItem` documentation for details on how.
 */
export const SelectedSubmenuItem: Story = {
  args: {
    ...Example.args,
    children: 'Selected submenu item',
  },
}

/**
 * The side bar can be resized using the `width` prop. This size only applies when the side bar is expanded. Products
 * should set the width according the menu items they display within the side bar. The side bar cannot be sized smaller
 * than `--size-48` or larger than `--size-64`.
 *
 * By default, the side bar will size itself to `--size-64`.
 */
export const Sizing: Story = {
  args: {
    ...Example.args,
    children: 'Selected submenu item',
    width: '--size-52',
  },
}

function buildMenu(type: 'No slected item' | 'Selected item' | 'Selected submenu item') {
  return (
    <SideBar.MenuList>
      <SideBar.MenuItem aria-current={false} key="1" href={href} icon={<DeprecatedIcon icon="dashboard" />}>
        Menu item 1
      </SideBar.MenuItem>
      <SideBar.MenuItem
        key="2"
        aria-current={type === 'Selected item' ? 'page' : false}
        href={href}
        icon={<DeprecatedIcon icon="contact" />}
      >
        Menu item 2
      </SideBar.MenuItem>
      <SideBar.MenuGroup
        key="3"
        summary={
          <SideBar.MenuGroupSummary icon={<DeprecatedIcon icon="property" />}>Menu item 3</SideBar.MenuGroupSummary>
        }
      >
        <SideBar.Submenu>
          <SideBar.SubmenuItem aria-current={false} href={href}>
            Submenu item 1
          </SideBar.SubmenuItem>
          <SideBar.SubmenuItem aria-current={type === 'Selected submenu item' ? 'page' : false} href={href}>
            Submenu item 2
          </SideBar.SubmenuItem>
        </SideBar.Submenu>
      </SideBar.MenuGroup>
      <SideBar.MenuGroup
        key="4"
        summary={
          <SideBar.MenuGroupSummary icon={<DeprecatedIcon icon="settings" />}>Menu item 4</SideBar.MenuGroupSummary>
        }
      >
        <SideBar.Submenu>
          <SideBar.SubmenuItem aria-current={false} href={href}>
            Submenu item 3
          </SideBar.SubmenuItem>
          <SideBar.SubmenuItem aria-current={false} href={href}>
            Submenu item 4
          </SideBar.SubmenuItem>
        </SideBar.Submenu>
      </SideBar.MenuGroup>
    </SideBar.MenuList>
  )
}
