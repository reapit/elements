import { cx } from '@linaria/core'
import { elGalleryViewerCarouselTrack } from './styles'
import { useGalleryViewerCarouselContext } from './context'

import type { HTMLAttributes } from 'react'

export namespace GalleryViewerCarouselTrack {
  export interface Props extends HTMLAttributes<HTMLDivElement> {}
}

/**
 * The scrollable track of the gallery viewer carousel that contains the carousel items.
 *
 * When the carousel is in read-only controlled mode (`value` provided, `onChange` absent),
 * the track renders with `data-read-only` and disables scrolling so the user cannot swipe
 * away from the controlled value.
 */
export function GalleryViewerCarouselTrack({ children, className, ...rest }: GalleryViewerCarouselTrack.Props) {
  const { isReadOnly, trackRef } = useGalleryViewerCarouselContext()

  return (
    <div
      {...rest}
      className={cx(elGalleryViewerCarouselTrack, className)}
      data-read-only={isReadOnly || undefined}
      ref={trackRef}
    >
      {children}
    </div>
  )
}

GalleryViewerCarouselTrack.displayName = 'GalleryViewer.CarouselTrack'
