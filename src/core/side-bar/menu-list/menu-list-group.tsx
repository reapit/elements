import { SideBarMenuGroup } from '../menu-group'
import { ElSideBarMenuListItem } from './styles'

import type { ComponentProps } from 'react'

export namespace SideBarMenuListGroup {
  export interface Props extends ComponentProps<typeof SideBarMenuGroup> {}
}

/**
 * @deprecated Use `SideBarMenuListGroup.Props` instead
 */
export type SideBarMenuListGroupProps = SideBarMenuListGroup.Props

/**
 * A thin wrapper around `SideBarMenuGroup` that ensures it is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `SideBar.MenuList`.
 *
 * All props are passed through to `SideBarMenuGroup`.
 */
export function SideBarMenuListGroup({ children, ...props }: SideBarMenuListGroup.Props) {
  return (
    <ElSideBarMenuListItem>
      <SideBarMenuGroup {...props}>{children}</SideBarMenuGroup>
    </ElSideBarMenuListItem>
  )
}

SideBarMenuListGroup.displayName = 'SideBar.MenuGroup'

SideBarMenuListGroup.Summary = SideBarMenuGroup.Summary
