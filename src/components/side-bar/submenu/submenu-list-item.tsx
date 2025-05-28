import { SideBarSubmenuItem as BaseSideBarSubmenuItem } from '../submenu-item'
import { ElSideBarSubmenuListItem } from './styles'

import type { ComponentProps } from 'react'

interface SideBarSubmenuItemProps extends ComponentProps<typeof BaseSideBarSubmenuItem> {}

/**
 * Menu item for use in a Side Bar's submenus. This is a thin wrapper around `SideBarSubmenuItem`
 * that ensures the item is contained within a list item (`<li>`).
 */
export function SideBarSubmenuListItem({ children, ...props }: SideBarSubmenuItemProps) {
  return (
    <ElSideBarSubmenuListItem>
      <BaseSideBarSubmenuItem {...props}>{children}</BaseSideBarSubmenuItem>
    </ElSideBarSubmenuListItem>
  )
}
