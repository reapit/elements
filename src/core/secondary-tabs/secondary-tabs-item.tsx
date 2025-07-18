import { ElSecondaryTabsListItem, ElSecondaryTabsListItemSeparator } from './styles'
import { SecondaryTab } from './tab'

import type { ComponentProps } from 'react'

interface SecondaryTabsItemProps extends ComponentProps<typeof SecondaryTab> {}

/**
 * A thin wrapper around `SecondaryTab` that ensures it is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `SecondaryTabs`.
 *
 * All props are passed through to `SecondaryTab`.
 */
export function SecondaryTabsItem(props: SecondaryTabsItemProps) {
  return (
    <ElSecondaryTabsListItem>
      <SecondaryTab {...props} />
      <ElSecondaryTabsListItemSeparator aria-hidden />
    </ElSecondaryTabsListItem>
  )
}
