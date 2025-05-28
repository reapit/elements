import { SideBarMenuGroup as BaseSideBarMenuGroup } from '../menu-group'
import { ElSideBarMenuListItem } from './styles'

import type { ComponentProps } from 'react'

interface SideBarMenuListGroupProps extends ComponentProps<typeof BaseSideBarMenuGroup> {}

/**
 * Menu item for use in a Side Bar's top-level menu list.
 */
export function SideBarMenuListGroup({ children, ...props }: SideBarMenuListGroupProps) {
  return (
    <ElSideBarMenuListItem>
      <BaseSideBarMenuGroup {...props}>{children}</BaseSideBarMenuGroup>
    </ElSideBarMenuListItem>
  )
}
