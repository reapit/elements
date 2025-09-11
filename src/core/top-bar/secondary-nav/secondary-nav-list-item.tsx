import { ElTopBarSecondaryNavListItem } from './styles'
import { TopBarNavIconItem } from '../nav-icon-item'

import type { ComponentProps } from 'react'

export namespace TopBarSecondaryNavListItem {
  export interface Props extends ComponentProps<typeof TopBarNavIconItem> {}
}

/**
 * A thin wrapper around `TopBarNavIconItemAnchor` that ensures it is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `TopBar.SecondaryNav`.
 *
 * All props are passed through to `TopBarNavIconItemAnchor`.
 */
export function TopBarSecondaryNavListItem(props: TopBarSecondaryNavListItem.Props) {
  return (
    <ElTopBarSecondaryNavListItem>
      <TopBarNavIconItem {...props} />
    </ElTopBarSecondaryNavListItem>
  )
}
