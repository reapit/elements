import { SideBarMenuItem as BaseSideBarMenuItem } from '../menu-item'
import { ElSideBarMenuListItem } from './styles'

import type { ComponentProps } from 'react'

interface SideBarMenuListItemProps extends ComponentProps<typeof BaseSideBarMenuItem> {}

/**
 * Menu item for use in a Side Bar's top-level menu list.
 */
export function SideBarMenuListItem({ children, ...props }: SideBarMenuListItemProps) {
  return (
    <ElSideBarMenuListItem>
      <BaseSideBarMenuItem {...props}>{children}</BaseSideBarMenuItem>
    </ElSideBarMenuListItem>
  )
}
