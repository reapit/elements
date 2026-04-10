import { render, screen, waitFor } from '@testing-library/react'
import { GalleryViewer } from '../gallery-viewer'
import { GalleryViewerCarousel } from '../carousel/carousel'
import { GalleryViewerCarouselButton } from '../carousel/carousel-button'
import { GalleryViewerCarouselItem } from '../carousel/carousel-item'
import { GalleryViewerCarouselLayout } from '../carousel-layout/carousel-layout'
import { GalleryViewerCarouselTrack } from '../carousel/carousel-track'
import { GalleryViewerMediaItemCaption } from '../media-item-caption/media-item-caption'
import { GalleryViewerMediaList } from '../media-list/media-list'
import { GalleryViewerMediaListItem } from '../media-list/media-list-item'
import { GalleryViewerMediaListLayout } from '../media-list-layout/media-list-layout'
import { GalleryViewerThumbnailList } from '../thumbnail-list/thumbnail-list'
import { GalleryViewerThumbnailListButtonItem } from '../thumbnail-list/thumbnail-list-button-item'
import { GalleryViewerThumbnailListItem } from '../thumbnail-list/thumbnail-list-item'

test('renders a dialog element when open', async () => {
  render(
    <GalleryViewer isOpen title="Test gallery">
      Test content
    </GalleryViewer>,
  )
  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
})

test('exposes GalleryViewer.Caption', () => {
  expect(GalleryViewer.Caption).toBe(GalleryViewerMediaItemCaption)
})

test('exposes GalleryViewer.Carousel', () => {
  expect(GalleryViewer.Carousel).toBe(GalleryViewerCarousel)
})

test('exposes GalleryViewer.CarouselButton', () => {
  expect(GalleryViewer.CarouselButton).toBe(GalleryViewerCarouselButton)
})

test('exposes GalleryViewer.CarouselItem', () => {
  expect(GalleryViewer.CarouselItem).toBe(GalleryViewerCarouselItem)
})

test('exposes GalleryViewer.CarouselLayout', () => {
  expect(GalleryViewer.CarouselLayout).toBe(GalleryViewerCarouselLayout)
})

test('exposes GalleryViewer.CarouselTrack', () => {
  expect(GalleryViewer.CarouselTrack).toBe(GalleryViewerCarouselTrack)
})

test('exposes GalleryViewer.MediaList', () => {
  expect(GalleryViewer.MediaList).toBe(GalleryViewerMediaList)
})

test('exposes GalleryViewer.MediaListItem', () => {
  expect(GalleryViewer.MediaListItem).toBe(GalleryViewerMediaListItem)
})

test('exposes GalleryViewer.MediaListLayout', () => {
  expect(GalleryViewer.MediaListLayout).toBe(GalleryViewerMediaListLayout)
})

test('exposes GalleryViewer.ThumbnailList', () => {
  expect(GalleryViewer.ThumbnailList).toBe(GalleryViewerThumbnailList)
})

test('exposes GalleryViewer.Thumbnail', () => {
  expect(GalleryViewer.Thumbnail).toBe(GalleryViewerThumbnailListItem)
})

test('exposes GalleryViewer.ThumbnailButton', () => {
  expect(GalleryViewer.ThumbnailButton).toBe(GalleryViewerThumbnailListButtonItem)
})
