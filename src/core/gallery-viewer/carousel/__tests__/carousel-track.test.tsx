import { render, screen } from '@testing-library/react'
import { GalleryViewerCarousel } from '../carousel'
import { GalleryViewerCarouselItem } from '../carousel-item'
import { GalleryViewerCarouselTrack } from '../carousel-track'
import { setupBrowserStubs } from './stubs'

setupBrowserStubs()

test('renders a div element', () => {
  render(
    <GalleryViewerCarousel aria-label="Property photos">
      <GalleryViewerCarouselTrack data-testid="track">
        <GalleryViewerCarouselItem id="item-1">Content</GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  )
  expect(screen.getByTestId('track').tagName).toBe('DIV')
})

test('is a child of the carousel container', () => {
  const { container } = render(
    <GalleryViewerCarousel aria-label="Property photos">
      <GalleryViewerCarouselTrack data-testid="track">
        <GalleryViewerCarouselItem id="item-1">Content</GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  )
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  expect(container.firstElementChild).toContainElement(screen.getByTestId('track'))
})

test('forwards className', () => {
  render(
    <GalleryViewerCarousel aria-label="Property photos">
      <GalleryViewerCarouselTrack className="custom-track" data-testid="track">
        <GalleryViewerCarouselItem id="item-1">Content</GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  )
  expect(screen.getByTestId('track')).toHaveClass('custom-track')
})

test('throws when rendered outside GalleryViewerCarousel', () => {
  expect(() => {
    render(
      <GalleryViewerCarouselTrack>
        <GalleryViewerCarouselItem id="item-1">Content</GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>,
    )
  }).toThrow('useGalleryViewerCarouselContext requires a GalleryViewerCarousel ancestor')
})

test('does not set data-read-only in uncontrolled mode', () => {
  render(
    <GalleryViewerCarousel aria-label="Property photos" defaultValue="item-1">
      <GalleryViewerCarouselTrack data-testid="track">
        <GalleryViewerCarouselItem id="item-1">Content</GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  )
  expect(screen.getByTestId('track')).not.toHaveAttribute('data-read-only')
})

test('does not set data-read-only when value and onChange are both provided', () => {
  render(
    <GalleryViewerCarousel aria-label="Property photos" value="item-1" onChange={() => {}}>
      <GalleryViewerCarouselTrack data-testid="track">
        <GalleryViewerCarouselItem id="item-1">Content</GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  )
  expect(screen.getByTestId('track')).not.toHaveAttribute('data-read-only')
})

test('sets data-read-only when value is provided but onChange is not', () => {
  render(
    <GalleryViewerCarousel aria-label="Property photos" value="item-1">
      <GalleryViewerCarouselTrack data-testid="track">
        <GalleryViewerCarouselItem id="item-1">Content</GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  )
  expect(screen.getByTestId('track')).toHaveAttribute('data-read-only')
})
