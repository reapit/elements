import { BottomBarItemAnchor } from '../item'
import { ElBottomBarMenuListItem } from './styles'

import type { ComponentProps } from 'react'

export namespace BottomBarListItem {
  export interface Props extends ComponentProps<typeof BottomBarItemAnchor> {}
}

/**
 * A thin wrapper around `BottomBarMenuItem` that ensures it is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `BottomBar.MenuList`.
 *
 * All props are passed through to `BottomBarMenuItem`.
 */
export function BottomBarListItem({ children, ...props }: BottomBarListItem.Props) {
  return (
    <ElBottomBarMenuListItem>
      <BottomBarItemAnchor {...props}>{children}</BottomBarItemAnchor>
    </ElBottomBarMenuListItem>
  )
}

BottomBarListItem.displayName = 'BottomBar.Item'
