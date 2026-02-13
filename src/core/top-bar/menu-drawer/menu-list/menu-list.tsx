import { ElTopBarMenuDrawerMenuList } from './styles'
import { TopBarMenuDrawerMenuListItem } from './menu-list-item'
import { TopBarMenuDrawerMenuListItemButton } from './menu-list-item-button'
import { TopBarMenuDrawerMenuListGroup } from './menu-list-group'

import type { ComponentProps } from 'react'

export namespace TopBarMenuDrawerMenuList {
  export interface ItemProps extends TopBarMenuDrawerMenuListItem.Props {}
  export interface ItemButtonProps extends TopBarMenuDrawerMenuListItemButton.Props {}
  export interface GroupProps extends TopBarMenuDrawerMenuListGroup.Props {}
  export interface GroupSummaryProps extends TopBarMenuDrawerMenuListGroup.SummaryProps {}

  export interface Props extends ComponentProps<typeof ElTopBarMenuDrawerMenuList> {}
}

/**
 * Main menu list for the `TopBar.MenuDrawer`. Typically provided a collection of `TopBar.MenuItem` and
 * `TopBar.MenuGroup` components as children.
 */
export function TopBarMenuDrawerMenuList({ children, ...rest }: TopBarMenuDrawerMenuList.Props) {
  return <ElTopBarMenuDrawerMenuList {...rest}>{children}</ElTopBarMenuDrawerMenuList>
}

TopBarMenuDrawerMenuList.displayName = 'TopBar.MenuList'

TopBarMenuDrawerMenuList.Item = TopBarMenuDrawerMenuListItem
TopBarMenuDrawerMenuList.ItemButton = TopBarMenuDrawerMenuListItemButton
TopBarMenuDrawerMenuList.Group = TopBarMenuDrawerMenuListGroup
TopBarMenuDrawerMenuList.GroupSummary = TopBarMenuDrawerMenuListGroup.Summary
