import { cx } from '@linaria/core'
import { elGalleryViewerMediaListLayout } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace GalleryViewerMediaListLayout {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The layout content, typically filters followed by a media list. */
    children: ReactNode
  }
}

/**
 * A single-column layout for the gallery viewer at small breakpoints (XS–MD). Stacks
 * its children vertically with consistent spacing, with padding that responds to the
 * dialog container's width.
 *
 * This component is breakpoint-agnostic. Use `MatchMedia` or `useMatchMedia` to
 * conditionally render it at the appropriate breakpoint.
 */
export function GalleryViewerMediaListLayout({ children, className, ...rest }: GalleryViewerMediaListLayout.Props) {
  return (
    <div className={cx(elGalleryViewerMediaListLayout, className)} {...rest}>
      {children}
    </div>
  )
}

GalleryViewerMediaListLayout.displayName = 'GalleryViewer.MediaListLayout'
