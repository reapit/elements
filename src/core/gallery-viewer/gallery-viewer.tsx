import { type ReactNode } from 'react'
import { GalleryViewerCarousel } from './carousel'
import { GalleryViewerCarouselLayout } from './carousel-layout'
import { GalleryViewerDialog } from './dialog'
import { GalleryViewerMediaItemCaption } from './media-item-caption'
import { GalleryViewerMediaList } from './media-list'
import { GalleryViewerMediaListLayout } from './media-list-layout'
import { GalleryViewerThumbnailList } from './thumbnail-list'

export namespace GalleryViewer {
  export interface CaptionProps extends GalleryViewerMediaItemCaption.Props {}
  export interface CarouselProps extends GalleryViewerCarousel.Props {}
  export interface CarouselButtonProps extends GalleryViewerCarousel.ButtonProps {}
  export interface CarouselItemProps extends GalleryViewerCarousel.ItemProps {}
  export interface CarouselLayoutProps extends GalleryViewerCarouselLayout.Props {}
  export interface CarouselTrackProps extends GalleryViewerCarousel.TrackProps {}
  export interface MediaListProps extends GalleryViewerMediaList.Props {}
  export interface MediaListItemProps extends GalleryViewerMediaList.ItemProps {}
  export interface MediaListLayoutProps extends GalleryViewerMediaListLayout.Props {}
  export interface ThumbnailListProps extends GalleryViewerThumbnailList.Props {}
  export interface ThumbnailProps extends GalleryViewerThumbnailList.ItemProps {}
  export interface ThumbnailButtonProps extends GalleryViewerThumbnailList.ButtonItemProps {}

  export interface Props extends Omit<GalleryViewerDialog.Props, 'title'> {
    /** The title rendered as the gallery viewer's heading */
    title: ReactNode
  }
}

/**
 * The gallery viewer component allows users to browse and view all media files
 * (images, videos, virtual tours, etc) attached to a property.
 */
export function GalleryViewer({ children, title, ...rest }: GalleryViewer.Props) {
  return (
    <GalleryViewerDialog {...rest}>
      <GalleryViewerDialog.Header>{title}</GalleryViewerDialog.Header>
      <GalleryViewerDialog.Content>{children}</GalleryViewerDialog.Content>
    </GalleryViewerDialog>
  )
}

GalleryViewer.Caption = GalleryViewerMediaItemCaption
GalleryViewer.Carousel = GalleryViewerCarousel
GalleryViewer.CarouselButton = GalleryViewerCarousel.Button
GalleryViewer.CarouselItem = GalleryViewerCarousel.Item
GalleryViewer.CarouselLayout = GalleryViewerCarouselLayout
GalleryViewer.CarouselTrack = GalleryViewerCarousel.Track
GalleryViewer.MediaList = GalleryViewerMediaList
GalleryViewer.MediaListLayout = GalleryViewerMediaListLayout
GalleryViewer.MediaListItem = GalleryViewerMediaList.Item
GalleryViewer.ThumbnailList = GalleryViewerThumbnailList
GalleryViewer.Thumbnail = GalleryViewerThumbnailList.Item
GalleryViewer.ThumbnailButton = GalleryViewerThumbnailList.ButtonItem
