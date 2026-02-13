import { ElTopBarMenuDrawerSubmenuList } from './styles'
import { TopBarMenuDrawerSubmenuListItem } from './submenu-list-item'
import { TopBarMenuDrawerSubmenuListItemButton } from './submenu-list-item-button'

import type { ComponentProps, ReactNode } from 'react'

export namespace TopBarMenuDrawerSubmenu {
  export interface ItemProps extends TopBarMenuDrawerSubmenuListItem.Props {}
  export interface ItemButtonProps extends TopBarMenuDrawerSubmenuListItemButton.Props {}

  export interface Props extends ComponentProps<typeof ElTopBarMenuDrawerSubmenuList> {
    /**
     * A collection of items, typically `TopBar.MenuDrawer.SubmenuItem` or
     * `TopBar.MenuDrawerSubmenuItemButton` components
     */
    children: ReactNode
  }
}

/**
 * A simple submenu for use in TopBar MenuDrawer. Typically used as the child of a MenuGroup.
 * The submenu itself will typically contain a collection of SubmenuItem or SubmenuItemButton components.
 */
export function TopBarMenuDrawerSubmenu({ children, ...rest }: TopBarMenuDrawerSubmenu.Props) {
  return <ElTopBarMenuDrawerSubmenuList {...rest}>{children}</ElTopBarMenuDrawerSubmenuList>
}

TopBarMenuDrawerSubmenu.displayName = 'TopBar.MenuDrawer.Submenu'

TopBarMenuDrawerSubmenu.Item = TopBarMenuDrawerSubmenuListItem
TopBarMenuDrawerSubmenu.ItemButton = TopBarMenuDrawerSubmenuListItemButton
