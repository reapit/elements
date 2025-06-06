import { SideBarSubmenuListItem } from './submenu-list-item'
import { ElSideBarSubmenuList } from './styles'

import type { ComponentProps, ReactNode } from 'react'

interface SideBarSubmenuProps extends ComponentProps<typeof ElSideBarSubmenuList> {
  /** A collection of items, typically `SideBar.SubmenuItem` components */
  children: ReactNode
}

/**
 * A simple submenu for use in a `SideBar`. Typically used via `SideBar.Submenu` as the child of a
 * `SideBar.MenuGroup`. The submenu itself will typically container a collection of `SideBar.SubmenuItem`'s
 * as children. Only one items, if any, in the submenu should represent the current page at any given time.
 */
export function SideBarSubmenu({ children, ...rest }: SideBarSubmenuProps) {
  return <ElSideBarSubmenuList {...rest}>{children}</ElSideBarSubmenuList>
}

SideBarSubmenu.Item = SideBarSubmenuListItem
