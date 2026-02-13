import { ElTopBarMenuDrawerMenuListItem } from './styles'
import { TopBarMenuDrawerMenuItem } from '../menu-item'

import type { ComponentProps } from 'react'

export namespace TopBarMenuDrawerMenuListItem {
  export interface Props extends ComponentProps<typeof TopBarMenuDrawerMenuItem> {}
}

/**
 * A thin wrapper around `TopBarMenuDrawerMenuItem` that ensures it is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `TopBar.MenuList`.
 *
 * All props are passed through to `TopBarMenuDrawerMenuItem`.
 */
export function TopBarMenuDrawerMenuListItem({ children, ...props }: TopBarMenuDrawerMenuListItem.Props) {
  return (
    <ElTopBarMenuDrawerMenuListItem>
      <TopBarMenuDrawerMenuItem {...props}>{children}</TopBarMenuDrawerMenuItem>
    </ElTopBarMenuDrawerMenuListItem>
  )
}

TopBarMenuDrawerMenuListItem.displayName = 'TopBar.MenuItem'
