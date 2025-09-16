import { ElSideBarSubmenuListItem } from './styles'
import { SideBarSubmenuItem as SideBarSubmenuItem } from '../submenu-item'

import type { ComponentProps } from 'react'

export namespace SideBarSubmenuListItem {
  export interface Props extends ComponentProps<typeof SideBarSubmenuItem> {}
}

/**
 * @deprecated Use `SideBarSubmenuListItem.Props` instead
 */
export type SideBarSubmenuListItemProps = SideBarSubmenuListItem.Props

/**
 * A thin wrapper around `SideBarSubmenuItem` that ensures it is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `SideBar.Submenu`.
 *
 * All props are passed through to `SideBarSubmenuItem`.
 */
export function SideBarSubmenuListItem({ children, ...props }: SideBarSubmenuListItem.Props) {
  return (
    <ElSideBarSubmenuListItem>
      <SideBarSubmenuItem {...props}>{children}</SideBarSubmenuItem>
    </ElSideBarSubmenuListItem>
  )
}

SideBarSubmenuListItem.displayName = 'SideBar.SubmenuItem'
