import { ElTopBarMenuDrawerHeader } from './styles'
import { TopBarMenuDrawerHeaderCloseButton } from './close-button'

import type { HTMLAttributes } from 'react'

export namespace TopBarMenuDrawerHeader {
  export interface Props extends HTMLAttributes<HTMLElement> {}
}

/**
 * A header for the TopBarMenuDrawer. Contains a built-in close button.
 */
export function TopBarMenuDrawerHeader(props: TopBarMenuDrawerHeader.Props) {
  return (
    <ElTopBarMenuDrawerHeader {...props}>
      <TopBarMenuDrawerHeaderCloseButton />
    </ElTopBarMenuDrawerHeader>
  )
}

TopBarMenuDrawerHeader.displayName = 'TopBar.MenuDrawerHeader'
