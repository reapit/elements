import { ElSideBarMenuList } from './styles'
import { SideBarMenuListItem } from './menu-list-item'
import { SideBarMenuListGroup } from './menu-list-group'

import type { ComponentProps } from 'react'
import { SideBarSubmenu } from '../submenu'

interface SideBarMenuListProps extends ComponentProps<typeof ElSideBarMenuList> {}

/**
 * Main menu list for the `SideBar`. Typically provided a collection of `SideBar.MenuItem` and `SideBar.MenuGroup`
 * components as children.
 */
export function SideBarMenuList({ children, ...rest }: SideBarMenuListProps) {
  return <ElSideBarMenuList {...rest}>{children}</ElSideBarMenuList>
}

SideBarMenuList.Item = SideBarMenuListItem
SideBarMenuList.Group = SideBarMenuListGroup
SideBarMenuList.GroupSummary = SideBarMenuListGroup.Summary
SideBarMenuList.Submenu = SideBarSubmenu
SideBarMenuList.SubmenuItem = SideBarSubmenu.Item
