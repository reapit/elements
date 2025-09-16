import { SideBarSubmenuListItem } from './submenu-list-item'
import { ElSideBarSubmenuList } from './styles'

import type { ComponentProps, ReactNode } from 'react'

export namespace SideBarSubmenu {
  export interface Props extends ComponentProps<typeof ElSideBarSubmenuList> {
    /** A collection of items, typically `SideBar.SubmenuItem` components */
    children: ReactNode
  }
}

/**
 * @deprecated Use `SideBarSubmenu.Props` instead
 */
export type SideBarSubmenuProps = SideBarSubmenu.Props

/**
 * A simple submenu for use in a `SideBar`. Typically used via `SideBar.Submenu` as the child of a
 * `SideBar.MenuGroup`. The submenu itself will typically container a collection of `SideBar.SubmenuItem`'s
 * as children. Only one items, if any, in the submenu should represent the current page at any given time.
 */
export function SideBarSubmenu({ children, ...rest }: SideBarSubmenu.Props) {
  return <ElSideBarSubmenuList {...rest}>{children}</ElSideBarSubmenuList>
}

SideBarSubmenu.displayName = 'SideBar.Submenu'

SideBarSubmenu.Item = SideBarSubmenuListItem
