import { ElTopBarSecondaryNavListItem } from './styles'
import { TopBarNavIconItemButton } from '../nav-icon-item'

import type { ComponentProps } from 'react'

export namespace TopBarSecondaryNavListItemButton {
  export interface Props extends ComponentProps<typeof TopBarNavIconItemButton> {}
}

/**
 * A thin wrapper around `TopBarNavIconItemButton` that ensures it is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `TopBar.SecondaryNav`.
 *
 * All props are passed through to `TopBarNavIconItemButton`.
 */
export function TopBarSecondaryNavListItemButton(props: TopBarSecondaryNavListItemButton.Props) {
  return (
    <ElTopBarSecondaryNavListItem>
      <TopBarNavIconItemButton {...props} />
    </ElTopBarSecondaryNavListItem>
  )
}

TopBarSecondaryNavListItemButton.displayName = 'TopBar.NavIconItemButton'
