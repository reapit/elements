import { GalleryViewerCarousel } from './carousel'
import { GalleryViewerCarouselLayout } from './carousel-layout'
import { GalleryViewerDialog } from './dialog'
import { GalleryViewerDialogContent } from './dialog/content'
import { GalleryViewerDialogHeader } from './dialog/header'
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
  export interface ContentProps extends GalleryViewerDialogContent.Props {}
  export interface HeaderProps extends GalleryViewerDialogHeader.Props {}
  export interface MediaListProps extends GalleryViewerMediaList.Props {}
  export interface MediaListItemProps extends GalleryViewerMediaList.ItemProps {}
  export interface MediaListLayoutProps extends GalleryViewerMediaListLayout.Props {}
  export interface ThumbnailListProps extends GalleryViewerThumbnailList.Props {}
  export interface ThumbnailProps extends GalleryViewerThumbnailList.ItemProps {}
  export interface ThumbnailButtonProps extends GalleryViewerThumbnailList.ButtonItemProps {}

  export interface Props extends GalleryViewerDialog.Props {}
}

/**
 * The gallery viewer component allows users to browse and view all media files
 * (images, videos, virtual tours, etc) attached to a property.
 */
export function GalleryViewer(props: GalleryViewer.Props) {
  return <GalleryViewerDialog {...props} />
}

GalleryViewer.Caption = GalleryViewerMediaItemCaption
GalleryViewer.Carousel = GalleryViewerCarousel
GalleryViewer.CarouselButton = GalleryViewerCarousel.Button
GalleryViewer.CarouselItem = GalleryViewerCarousel.Item
GalleryViewer.CarouselLayout = GalleryViewerCarouselLayout
GalleryViewer.CarouselTrack = GalleryViewerCarousel.Track
GalleryViewer.Content = GalleryViewerDialog.Content
GalleryViewer.Header = GalleryViewerDialog.Header
GalleryViewer.MediaList = GalleryViewerMediaList
GalleryViewer.MediaListLayout = GalleryViewerMediaListLayout
GalleryViewer.MediaListItem = GalleryViewerMediaList.Item
GalleryViewer.ThumbnailList = GalleryViewerThumbnailList
GalleryViewer.Thumbnail = GalleryViewerThumbnailList.Item
GalleryViewer.ThumbnailButton = GalleryViewerThumbnailList.ButtonItem
