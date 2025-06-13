import { ElTopBarSecondaryNavListItem } from './styles'
import { TopBarNavIconItemAnchor } from '../nav-icon-item'

import type { ComponentProps } from 'react'

interface TopBarSecondaryNavListItemProps extends ComponentProps<typeof TopBarNavIconItemAnchor> {}

/**
 * A thin wrapper around `TopBarNavIconItemAnchor` that ensures it is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `TopBar.SecondaryNav`.
 *
 * All props are passed through to `TopBarNavIconItemAnchor`.
 */
export function TopBarSecondaryNavListItem({ children, ...props }: TopBarSecondaryNavListItemProps) {
  return (
    <ElTopBarSecondaryNavListItem>
      <TopBarNavIconItemAnchor {...props}>{children}</TopBarNavIconItemAnchor>
    </ElTopBarSecondaryNavListItem>
  )
}
