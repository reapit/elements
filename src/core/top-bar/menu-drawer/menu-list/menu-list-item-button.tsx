import { ElTopBarMenuDrawerMenuListItem } from './styles'
import { TopBarMenuDrawerMenuItemButton } from '../menu-item'

import type { ComponentProps } from 'react'

export namespace TopBarMenuDrawerMenuListItemButton {
  export interface Props extends ComponentProps<typeof TopBarMenuDrawerMenuItemButton> {}
}

/**
 * A thin wrapper around `TopBarMenuDrawerMenuItemButton` that ensures it is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `TopBar.MenuList`.
 *
 * All props are passed through to `TopBarMenuDrawerMenuItemButton`.
 */
export function TopBarMenuDrawerMenuListItemButton({ children, ...props }: TopBarMenuDrawerMenuListItemButton.Props) {
  return (
    <ElTopBarMenuDrawerMenuListItem>
      <TopBarMenuDrawerMenuItemButton {...props}>{children}</TopBarMenuDrawerMenuItemButton>
    </ElTopBarMenuDrawerMenuListItem>
  )
}

TopBarMenuDrawerMenuListItemButton.displayName = 'TopBar.MenuItemButton'
