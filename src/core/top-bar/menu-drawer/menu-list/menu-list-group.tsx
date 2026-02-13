import { ElTopBarMenuDrawerMenuListItem } from './styles'
import { TopBarMenuDrawerMenuGroup } from '../menu-group'

import type { ComponentProps } from 'react'

export namespace TopBarMenuDrawerMenuListGroup {
  export interface SummaryProps extends TopBarMenuDrawerMenuGroup.SummaryProps {}

  export interface Props extends ComponentProps<typeof TopBarMenuDrawerMenuGroup> {}
}

/**
 * A thin wrapper around `TopBarMenuDrawerMenuGroup` that ensures it is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `TopBar.MenuList`.
 *
 * All props are passed through to `TopBarMenuDrawerMenuGroup`.
 */
export function TopBarMenuDrawerMenuListGroup({ children, ...props }: TopBarMenuDrawerMenuListGroup.Props) {
  return (
    <ElTopBarMenuDrawerMenuListItem>
      <TopBarMenuDrawerMenuGroup {...props}>{children}</TopBarMenuDrawerMenuGroup>
    </ElTopBarMenuDrawerMenuListItem>
  )
}

TopBarMenuDrawerMenuListGroup.displayName = 'TopBar.MenuGroup'

TopBarMenuDrawerMenuListGroup.Summary = TopBarMenuDrawerMenuGroup.Summary
