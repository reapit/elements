import { render, screen } from '@testing-library/react'
import { GalleryViewerCarousel } from '../carousel'
import { GalleryViewerCarouselButton } from '../carousel-button'
import { GalleryViewerCarouselItem } from '../carousel-item'
import { GalleryViewerCarouselTrack } from '../carousel-track'
import { GalleryViewerMediaItemCaption } from '../../media-item/media-item-caption'
import { setupBrowserStubs } from './stubs'

setupBrowserStubs()

test('renders a visible container element', () => {
  const { container } = render(
    <GalleryViewerCarousel aria-label="Property photos">
      <GalleryViewerCarouselTrack>
        <GalleryViewerCarouselItem id="item-1">Content</GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  )
  expect(container.firstElementChild).toBeVisible()
})

test('sets aria-roledescription="carousel" on the container', () => {
  render(
    <GalleryViewerCarousel aria-label="Property photos">
      <GalleryViewerCarouselTrack>
        <GalleryViewerCarouselItem id="item-1">Content</GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  )
  expect(screen.getByRole('region', { name: 'Property photos' })).toHaveAttribute('aria-roledescription', 'carousel')
})

test('applies the aria-label to the container', () => {
  render(
    <GalleryViewerCarousel aria-label="Property photos">
      <GalleryViewerCarouselTrack>
        <GalleryViewerCarouselItem id="item-1">Content</GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  )
  expect(screen.getByRole('region', { name: 'Property photos' })).toBeVisible()
})

test('forwards className to the container', () => {
  const { container } = render(
    <GalleryViewerCarousel aria-label="Property photos" className="custom">
      <GalleryViewerCarouselTrack>
        <GalleryViewerCarouselItem id="item-1">Content</GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  )
  expect(container.firstElementChild).toHaveClass('custom')
})

test('sets data-value to the value prop on the container', () => {
  const { container } = render(
    <GalleryViewerCarousel aria-label="Property photos" value="item-1">
      <GalleryViewerCarouselTrack>
        <GalleryViewerCarouselItem id="item-1">Content</GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  )
  expect(container.firstElementChild).toHaveAttribute('data-value', 'item-1')
})

test('forwards additional props to the container', () => {
  render(
    <GalleryViewerCarousel aria-label="Property photos" data-testid="carousel">
      <GalleryViewerCarouselTrack>
        <GalleryViewerCarouselItem id="item-1">Content</GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  )
  expect(screen.getByTestId('carousel')).toBeVisible()
})

test('exposes GalleryViewerCarousel.Track', () => {
  expect(GalleryViewerCarousel.Track).toBe(GalleryViewerCarouselTrack)
})

test('exposes GalleryViewerCarousel.Item', () => {
  expect(GalleryViewerCarousel.Item).toBe(GalleryViewerCarouselItem)
})

test('exposes GalleryViewerCarousel.ItemCaption', () => {
  expect(GalleryViewerCarousel.ItemCaption).toBe(GalleryViewerMediaItemCaption)
})

test('exposes GalleryViewerCarousel.Button', () => {
  expect(GalleryViewerCarousel.Button).toBe(GalleryViewerCarouselButton)
})
