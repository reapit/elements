import { SideBarMenuItem as BaseSideBarMenuItem } from '../menu-item'
import { ElSideBarMenuListItem } from './styles'

import type { ComponentProps } from 'react'

export namespace SideBarMenuListItem {
  export interface Props extends ComponentProps<typeof BaseSideBarMenuItem> {}
}

/**
 * @deprecated Use `SideBarMenuListItem.Props` instead
 */
export type SideBarMenuListItemProps = SideBarMenuListItem.Props

/**
 * A thin wrapper around `SideBarMenuItem` that ensures it is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `SideBar.MenuList`.
 *
 * All props are passed through to `SideBarMenuItem`.
 */
export function SideBarMenuListItem({ children, ...props }: SideBarMenuListItem.Props) {
  return (
    <ElSideBarMenuListItem>
      <BaseSideBarMenuItem {...props}>{children}</BaseSideBarMenuItem>
    </ElSideBarMenuListItem>
  )
}

SideBarMenuListItem.displayName = 'SideBar.MenuItem'
