import { ElPrimaryTabsListItem } from './styles'
import { PrimaryTab } from './tab'

import type { ComponentProps } from 'react'

interface PrimaryTabsItemProps extends ComponentProps<typeof PrimaryTab> {}

/**
 * A thin wrapper around `PrimaryTab` that ensures it is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `PrimaryTabs`.
 *
 * All props are passed through to `PrimaryTab`.
 */
export function PrimaryTabsItem(props: PrimaryTabsItemProps) {
  return (
    <ElPrimaryTabsListItem>
      <PrimaryTab {...props} />
    </ElPrimaryTabsListItem>
  )
}
