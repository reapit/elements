import { Icon } from '../../icon'
import { SideBarMenuList } from './menu-list'
import { useSideBarContextDecorator } from '../__story__/use-side-bar-context-decorator'
import { useSideBarWidthDecorator } from '../__story__/use-side-bar-width-decorator'
import { useViewportHeightDecorator } from '../__story__/use-viewport-height-decorator'

import type { Meta, StoryObj } from '@storybook/react'

// Common href for all menu items that links to the current storybook page.
const href = globalThis.top?.location.href!

const meta = {
  title: 'Components/SideBar/MenuList',
  component: SideBarMenuList,
  argTypes: {
    children: {
      control: 'radio',
      options: ['No selected item', 'Selected item', 'Selected submenu item'],
      mapping: {
        'No selected item': buildMenu('No selected item'),
        'Selected item': buildMenu('Selected item'),
        'Selected submenu item': buildMenu('Selected submenu item'),
      },
    },
  },
  decorators: [useSideBarContextDecorator],
} satisfies Meta<typeof SideBarMenuList>

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: 'No selected item',
  },
}

/**
 * If a menu item represents the current page, it should be marked as "selected". See the `SideBar.MenuItem`
 * documentation for details on how.
 */
export const SelectedItem: Story = {
  args: {
    children: 'Selected item',
  },
}

/**
 * Likewise, if a submenu item represents the current page, it should be marked as "selected". This will automatically
 * cause the parent `SideBar.MenuGroup` to be displayed as "selected" itself. See the `SideBar.SubmenuItem` documentation
 * for details on how.
 */
export const SelectedSubmenuItem: Story = {
  args: {
    children: 'Selected submenu item',
  },
}

/**
 * The menu list simply fills it parent container. If that parent does not have enough space for the labels
 * of some or all of the submenu items, those labels will truncate as per the behaviour documented for each
 * individual component. That said, authors (both designers and engineers) should typically ensure the side bar
 * is afforded enough space for the menu items it contains.
 */
export const Truncation: Story = {
  args: {
    ...Example.args,
  },
  decorators: [useSideBarWidthDecorator],
  parameters: {
    sideBar: {
      width: '120px',
    },
  },
}

/**
 * When the side bar is collapsed, only the menu item's icons will be visible.
 */
export const Collapsed: Story = {
  args: {
    ...Example.args,
  },
  decorators: [useSideBarWidthDecorator],
  parameters: {
    sideBar: {
      state: 'collapsed',
    },
  },
}

function buildMenu(type: 'No selected item' | 'Selected item' | 'Selected submenu item') {
  return [
    <SideBarMenuList.Item key="1" href={href} icon={<Icon icon="property" />} isActive={type === 'Selected item'}>
      Menu item 1
    </SideBarMenuList.Item>,
    <SideBarMenuList.Group
      key="2"
      summary={<SideBarMenuList.GroupSummary icon={<Icon icon="property" />}>Menu item 2</SideBarMenuList.GroupSummary>}
    >
      <SideBarMenuList.Submenu>
        <SideBarMenuList.SubmenuItem href={href} isActive={type === 'Selected submenu item'}>
          Submenu item 1
        </SideBarMenuList.SubmenuItem>
        <SideBarMenuList.SubmenuItem href={href}>Submenu item 2</SideBarMenuList.SubmenuItem>
      </SideBarMenuList.Submenu>
    </SideBarMenuList.Group>,
  ]
}
