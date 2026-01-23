import { ElFocusedLayoutBottomBar } from './styles'
import type { HTMLAttributes } from 'react'

export namespace FocusedLayoutBottomBar {
  export interface Props extends HTMLAttributes<HTMLElement> {}
}

/**
 * The bottom bar region of a FocusedLayout. Sticks to the bottom of the viewport.
 * Use this for primary action buttons on XS and SM screens.
 */
export function FocusedLayoutBottomBar(props: FocusedLayoutBottomBar.Props) {
  return <ElFocusedLayoutBottomBar {...props} />
}

FocusedLayoutBottomBar.displayName = 'FocusedLayout.BottomBar'
