import { GalleryViewerThumbnailBase } from './thumbnail-base'

import type { ButtonHTMLAttributes } from 'react'

export namespace GalleryViewerThumbnailButton {
  export interface Props extends GalleryViewerThumbnailBase.CommonProps, ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The accessible name of the thumbnail. Should be action-oriented, not simply a description of
     * the thumbnail's image.
     */
    'aria-label': string
    /**
     * Indicates whether this thumbnail is currently selected.
     */
    'aria-pressed': boolean
  }
}

/**
 * A thumbnail used within a gallery viewer to represent a single media item.
 * Renders as a button element, making it suitable for click-handler-driven
 * selection (e.g., managing state via React state or a state management library).
 *
 * Use `GalleryViewerThumbnail` when navigation to a URL is needed instead of a
 * click handler.
 */
export function GalleryViewerThumbnailButton({ type = 'button', ...rest }: GalleryViewerThumbnailButton.Props) {
  return <GalleryViewerThumbnailBase as="button" type={type} {...rest} />
}
