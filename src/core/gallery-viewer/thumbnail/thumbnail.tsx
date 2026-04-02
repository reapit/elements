import { GalleryViewerThumbnailBase } from './thumbnail-base'

import type { AnchorHTMLAttributes } from 'react'

export namespace GalleryViewerThumbnail {
  export interface Props extends GalleryViewerThumbnailBase.CommonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * Indicates whether this thumbnail represents the currently selected item.
     * Pass `"page"` when selected, `false` otherwise.
     */
    'aria-current': 'page' | false
    /**
     * The accessible name of the thumbnail. Should be action-oriented, not simply a description of
     * the thumbnail's image.
     */
    'aria-label': string
    /** The URL this thumbnail navigates to when activated. */
    href: string
  }
}

/**
 * A thumbnail used within a gallery viewer to represent a single media item.
 * Renders as an anchor element, making it suitable for URL-driven navigation
 * (e.g., managing the selected image via URL search params). Use via
 * `GalleryViewer.Thumbnail`.
 *
 * Use `GalleryViewer.ThumbnailButton` when a click handler is needed instead of
 * navigation.
 */
export function GalleryViewerThumbnail(props: GalleryViewerThumbnail.Props) {
  return <GalleryViewerThumbnailBase as="a" {...props} />
}
