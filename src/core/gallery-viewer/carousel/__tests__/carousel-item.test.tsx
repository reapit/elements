import { render, screen } from '@testing-library/react'
import { GalleryViewerCarousel } from '../carousel'
import { GalleryViewerCarouselItem } from '../carousel-item'
import { GalleryViewerCarouselTrack } from '../carousel-track'
import { elGalleryViewerCarouselItem } from '../styles'
import { setupBrowserStubs } from './stubs'

import type { ReactNode } from 'react'

const { getObservedElements } = setupBrowserStubs()

// Provides the required carousel and track context for a single item under test.
function Wrapper({ children }: { children: ReactNode }) {
  return (
    <GalleryViewerCarousel aria-label="Property photos">
      <GalleryViewerCarouselTrack>{children}</GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>
  )
}

test('renders a figure element', () => {
  const { container } = render(<GalleryViewerCarouselItem id="item-1">Content</GalleryViewerCarouselItem>, {
    wrapper: Wrapper,
  })
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  expect(container.querySelector('figure')).toBeInTheDocument()
})

test('sets the id attribute', () => {
  render(
    <GalleryViewerCarouselItem id="item-1" data-testid="item">
      Content
    </GalleryViewerCarouselItem>,
    {
      wrapper: Wrapper,
    },
  )
  expect(screen.getByTestId('item')).toHaveAttribute('id', 'item-1')
})

test('sets role="group"', () => {
  render(<GalleryViewerCarouselItem id="item-1">Content</GalleryViewerCarouselItem>, { wrapper: Wrapper })
  expect(screen.getByRole('group')).toBeInTheDocument()
})

test('sets aria-roledescription="slide"', () => {
  render(<GalleryViewerCarouselItem id="item-1">Content</GalleryViewerCarouselItem>, { wrapper: Wrapper })
  expect(screen.getByRole('group')).toHaveAttribute('aria-roledescription', 'slide')
})

test('forwards className', () => {
  render(
    <GalleryViewerCarouselItem id="item-1" className="custom" data-testid="item">
      Content
    </GalleryViewerCarouselItem>,
    {
      wrapper: Wrapper,
    },
  )
  expect(screen.getByTestId('item')).toHaveClass('custom')
})

test('forwards additional props', () => {
  render(
    <GalleryViewerCarouselItem id="item-1" data-testid="item">
      Content
    </GalleryViewerCarouselItem>,
    {
      wrapper: Wrapper,
    },
  )
  expect(screen.getByTestId('item')).toBeVisible()
})

test('applies the carousel item class', () => {
  render(
    <GalleryViewerCarouselItem id="item-1" data-testid="item">
      Content
    </GalleryViewerCarouselItem>,
    {
      wrapper: Wrapper,
    },
  )
  expect(screen.getByTestId('item')).toHaveClass(elGalleryViewerCarouselItem)
})

test('registers with the IntersectionObserver', () => {
  render(
    <GalleryViewerCarousel aria-label="Property photos">
      <GalleryViewerCarouselTrack>
        <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
          Content 1
        </GalleryViewerCarouselItem>
        <GalleryViewerCarouselItem id="item-2" data-testid="item-2">
          Content 2
        </GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  )
  expect(getObservedElements()).toHaveLength(2)
  expect(getObservedElements()[0]).toBe(screen.getByTestId('item-1'))
  expect(getObservedElements()[1]).toBe(screen.getByTestId('item-2'))
})
