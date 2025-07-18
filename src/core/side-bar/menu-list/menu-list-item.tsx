import { SideBarMenuItem as BaseSideBarMenuItem } from '../menu-item'
import { ElSideBarMenuListItem } from './styles'

import type { ComponentProps } from 'react'

interface SideBarMenuListItemProps extends ComponentProps<typeof BaseSideBarMenuItem> {}

/**
 * A thin wrapper around `SideBarMenuItem` that ensures it is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `SideBar.MenuList`.
 *
 * All props are passed through to `SideBarMenuItem`.
 */
export function SideBarMenuListItem({ children, ...props }: SideBarMenuListItemProps) {
  return (
    <ElSideBarMenuListItem>
      <BaseSideBarMenuItem {...props}>{children}</BaseSideBarMenuItem>
    </ElSideBarMenuListItem>
  )
}
