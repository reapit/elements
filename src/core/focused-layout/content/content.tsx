import { ElFocusedLayoutContent } from './styles'
import type { HTMLAttributes } from 'react'

export namespace FocusedLayoutContent {
  export interface Props extends HTMLAttributes<HTMLElement> {}
}

/**
 * The main content region of a FocusedLayout. This is where the primary page content is placed.
 * The content area has responsive padding and a maximum width of 1200px.
 */
export function FocusedLayoutContent(props: FocusedLayoutContent.Props) {
  return <ElFocusedLayoutContent {...props} />
}

FocusedLayoutContent.displayName = 'FocusedLayout.Content'
