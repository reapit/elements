import { cx } from '@linaria/core'
import { elGalleryViewerMediaItem } from './styles'

import type { HTMLAttributes } from 'react'

export namespace GalleryViewerMediaItem {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /** Unique identifier for this media item. Used by the scroll observer to report which item is visible. */
    id: string
  }
}

/**
 * A media item represents a single piece of media content in the gallery viewer, such as an image or video
 * with an optional caption. The media content itself will usually be an `Image` or `Video`.
 */
export function GalleryViewerMediaItem({ className, id, ...rest }: GalleryViewerMediaItem.Props) {
  return <figure {...rest} className={cx(elGalleryViewerMediaItem, className)} id={id} />
}
