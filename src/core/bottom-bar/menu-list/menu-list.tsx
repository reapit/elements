import { BottomBarListItem } from './menu-list-item'
import { BottomBarMenuListItem } from './menu-list-menu-item'
import { ElBottomBarMenuList } from './styles'

import type { ComponentProps } from 'react'

export namespace BottomBarMenuList {
  export interface Props extends ComponentProps<typeof ElBottomBarMenuList> {}
}

/**
 * The menu list for the `BottomBar`. Typically provided a collection of `BottomBar.Item` and `BottomBar.MenuItem`
 * components as children. Should only contain a maximum of five (5) items. If more are needed, the fifth item
 * in the list should a `BottomBar.MenuItem` that provides access to the remaining items via a dropdown menu.
 *
 * Note: There are limitations with the `Menu` component which prevent us from always placing it above its trigger
 * button. Further, it's automatic placement logic relies on the menu being close to the viewport's edge, which means
 * it always has room on Storybook docs pages to render below its trigger.
 */
export function BottomBarMenuList({ children, ...rest }: BottomBarMenuList.Props) {
  return <ElBottomBarMenuList {...rest}>{children}</ElBottomBarMenuList>
}

BottomBarMenuList.displayName = 'BottomBar.MenuList'

BottomBarMenuList.Item = BottomBarListItem
BottomBarMenuList.MenuItem = BottomBarMenuListItem
