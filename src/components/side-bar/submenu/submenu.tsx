import { SideBarSubmenuListItem } from './submenu-list-item'
import { ElSideBarSubmenuList } from './styles'

import type { ComponentProps, ReactNode } from 'react'

interface SideBarSubmenuProps extends ComponentProps<typeof ElSideBarSubmenuList> {
  /** A collection of items, typically `SideBar.SubmenuItem` components */
  children: ReactNode
}

/**
 * A simple submenu for use in a `SideBar`. Typically used via `SideBar.Submenu`, with a collection of
 * `SideBar.SubmenuItem`'s as children and used in conjunction with `SideBar.MenuGroup`. Only one item, if any, in the
 * submenu should represent the current page at any given time. The children provided to the submenu should be list items
 * (`<li>` elements). `SideBar.SubmenuItem` handles this for you.
 */
export function SideBarSubmenu({ children, ...props }: SideBarSubmenuProps) {
  return <ElSideBarSubmenuList {...props}>{children}</ElSideBarSubmenuList>
}

SideBarSubmenu.Item = SideBarSubmenuListItem
