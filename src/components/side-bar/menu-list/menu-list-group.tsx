import { SideBarMenuGroup } from '../menu-group'
import { ElSideBarMenuListItem } from './styles'

import type { ComponentProps } from 'react'

interface SideBarMenuListGroupProps extends ComponentProps<typeof SideBarMenuGroup> {}

/**
 * A thin wrapper around `SideBarMenuGroup` that ensures it is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `SideBar.MenuList`.
 *
 * All props are passed through to `SideBarMenuGroup`.
 */
export function SideBarMenuListGroup({ children, ...props }: SideBarMenuListGroupProps) {
  return (
    <ElSideBarMenuListItem>
      <SideBarMenuGroup {...props}>{children}</SideBarMenuGroup>
    </ElSideBarMenuListItem>
  )
}

SideBarMenuListGroup.Summary = SideBarMenuGroup.Summary
