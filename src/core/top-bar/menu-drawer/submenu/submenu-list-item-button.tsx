import { ElTopBarMenuDrawerSubmenuListItem } from './styles'
import { TopBarMenuDrawerSubmenuItemButton } from '../submenu-item'

import type { ComponentProps } from 'react'

export namespace TopBarMenuDrawerSubmenuListItemButton {
  export interface Props extends ComponentProps<typeof TopBarMenuDrawerSubmenuItemButton> {}
}

/**
 * A thin wrapper around `TopBarMenuDrawerSubmenuItemButton` that ensures it is contained within a
 * list item (`<li>`) for correct semantics and accessibility when used with `TopBar.SubmenuItemButton`.
 *
 * All props are passed through to `TopBarMenuDrawerSubmenuItemButton`.
 */
export function TopBarMenuDrawerSubmenuListItemButton(props: TopBarMenuDrawerSubmenuListItemButton.Props) {
  return (
    <ElTopBarMenuDrawerSubmenuListItem>
      <TopBarMenuDrawerSubmenuItemButton {...props} />
    </ElTopBarMenuDrawerSubmenuListItem>
  )
}

TopBarMenuDrawerSubmenuListItemButton.displayName = 'TopBar.SubmenuItemButton'
