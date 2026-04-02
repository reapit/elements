import { cx } from '@linaria/core'
import { GalleryViewerMediaItem } from '../media-item'
import { elGalleryViewerCarouselItem } from './styles'

export namespace GalleryViewerCarouselItem {
  export interface CaptionProps extends GalleryViewerMediaItem.CaptionProps {}
  export interface Props extends GalleryViewerMediaItem.Props {}
}

/**
 * A carousel slide wrapping a `GalleryViewer.MediaItem` with the ARIA slide semantics
 * required inside a carousel region.
 *
 * Used to show media inside a `GalleryViewer.Carousel`. Use `GalleryViewer.MediaItem`
 * directly when the item is rendered outside a carousel context, e.g. in a vertical
 * stack on small devices.
 */
export function GalleryViewerCarouselItem({ className, ...props }: GalleryViewerCarouselItem.Props) {
  return (
    <GalleryViewerMediaItem
      {...props}
      className={cx(elGalleryViewerCarouselItem, className)}
      aria-roledescription="slide"
      role="group"
    />
  )
}

GalleryViewerCarouselItem.displayName = 'GalleryViewer.CarouselItem'
GalleryViewerCarouselItem.Caption = GalleryViewerMediaItem.Caption
