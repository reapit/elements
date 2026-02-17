import { ElTopBarMenuDrawerContent } from './styles'

import type { HTMLAttributes } from 'react'

export namespace TopBarMenuDrawerContent {
  export interface Props extends HTMLAttributes<HTMLElement> {}
}

/**
 * A navigation element for the TopBarMenuDrawer. Typically wraps the main, secondary, and profile
 * menu lists.
 */
export function TopBarMenuDrawerContent(props: TopBarMenuDrawerContent.Props) {
  return <ElTopBarMenuDrawerContent {...props} />
}

TopBarMenuDrawerContent.displayName = 'TopBar.MenuContent'
