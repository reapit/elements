import { ElSideBarSubmenuListItem } from './styles'
import { SideBarSubmenuItem as SideBarSubmenuItem } from '../submenu-item'

import type { ComponentProps } from 'react'

interface SideBarSubmenuListItemProps extends ComponentProps<typeof SideBarSubmenuItem> {}

/**
 * A thin wrapper around `SideBarSubmenuItem` that ensures it is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `SideBar.Submenu`.
 *
 * All props are passed through to `SideBarSubmenuItem`.
 */
export function SideBarSubmenuListItem({ children, ...props }: SideBarSubmenuListItemProps) {
  return (
    <ElSideBarSubmenuListItem>
      <SideBarSubmenuItem {...props}>{children}</SideBarSubmenuItem>
    </ElSideBarSubmenuListItem>
  )
}
