import { ElTopBarMenuDrawerSubmenuListItem } from './styles'
import { TopBarMenuDrawerSubmenuItem } from '../submenu-item'

import type { ComponentProps } from 'react'

export namespace TopBarMenuDrawerSubmenuListItem {
  export interface Props extends ComponentProps<typeof TopBarMenuDrawerSubmenuItem> {}
}

/**
 * A thin wrapper around `TopBarMenuDrawerSubmenuItem` that ensures it is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `TopBar.SubmenuItem`.
 *
 * All props are passed through to `TopBarMenuDrawerSubmenuItem`.
 */
export function TopBarMenuDrawerSubmenuListItem(props: TopBarMenuDrawerSubmenuListItem.Props) {
  return (
    <ElTopBarMenuDrawerSubmenuListItem>
      <TopBarMenuDrawerSubmenuItem {...props} />
    </ElTopBarMenuDrawerSubmenuListItem>
  )
}

TopBarMenuDrawerSubmenuListItem.displayName = 'TopBar.SubmenuItem'
