import preview from '#.storybook/preview'
import { TopBarMenuDrawerSubmenu } from '../submenu'
import { TopBarMenuDrawerMenuList } from './menu-list'

import type { ReactNode } from 'react'

// Placeholder href for all menu items in this story.
const href = '#'

const meta = preview.meta({
  title: 'Core/TopBar/MenuDrawer/MenuList',
  component: TopBarMenuDrawerMenuList,
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
})

export const Example = meta.story({
  args: {
    children: 'No selected item',
  },
})

/**
 * If a menu item represents the current page, it should be marked as "selected". See the `TopBar.MenuItem`
 * documentation for details on how.
 */
export const SelectedItem = meta.story({
  args: {
    children: 'Selected item',
  },
})

/**
 * Likewise, if a submenu item represents the current page, it should be marked as "selected". This will
 * automatically cause the parent `TopBar.MenuGroup` to be displayed as "selected" itself. See the
 * `TopBar.MenuSubmenuItem` documentation for details on how.
 */
export const SelectedSubmenuItem = meta.story({
  args: {
    children: 'Selected submenu item',
  },
})

/**
 * When there are multiple sibling menu lists, a border will automatically display between them.
 */
export const Border = meta.story({
  args: {
    children: 'No selected item',
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Story />
      </>
    ),
  ],
})

function buildMenu(type: 'No selected item' | 'Selected item' | 'Selected submenu item'): ReactNode[] {
  return [
    <TopBarMenuDrawerMenuList.Item key="1" aria-current={type === 'Selected item' ? 'page' : false} href={href}>
      Menu item 1
    </TopBarMenuDrawerMenuList.Item>,
    <TopBarMenuDrawerMenuList.ItemButton key="button" onClick={() => {}}>
      Menu item button
    </TopBarMenuDrawerMenuList.ItemButton>,
    <TopBarMenuDrawerMenuList.Group
      key="2"
      summary={<TopBarMenuDrawerMenuList.GroupSummary>Menu item 2</TopBarMenuDrawerMenuList.GroupSummary>}
    >
      <TopBarMenuDrawerSubmenu>
        <TopBarMenuDrawerSubmenu.Item aria-current={type === 'Selected submenu item' ? 'page' : false} href={href}>
          Submenu item 1
        </TopBarMenuDrawerSubmenu.Item>
        <TopBarMenuDrawerSubmenu.Item aria-current={false} href={href}>
          Submenu item 2
        </TopBarMenuDrawerSubmenu.Item>
      </TopBarMenuDrawerSubmenu>
    </TopBarMenuDrawerMenuList.Group>,
  ]
}
