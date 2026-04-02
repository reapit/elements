import { render, screen } from '@testing-library/react'
import { GalleryViewerCarousel } from '../carousel'
import { GalleryViewerCarouselItem } from '../carousel-item'
import { GalleryViewerCarouselTrack } from '../carousel-track'
import { setupBrowserStubs } from './stubs'

const { getIntersectionCallback } = setupBrowserStubs()

function fireIntersection(target: Element, intersectionRatio: number) {
  getIntersectionCallback()?.(
    [{ target, isIntersecting: true, intersectionRatio } as unknown as IntersectionObserverEntry],
    {} as IntersectionObserver,
  )
}

test('removes inert from the item that enters view', () => {
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
  fireIntersection(screen.getByTestId('item-2'), 0.6)
  expect(screen.getByTestId('item-2')).not.toHaveAttribute('inert')
})

test('sets inert on items not in view', () => {
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
  fireIntersection(screen.getByTestId('item-2'), 0.6)
  expect(screen.getByTestId('item-1')).toHaveAttribute('inert')
})

test('does not fire onChange when intersection ratio is below threshold', () => {
  const onChange = vi.fn()
  render(
    <GalleryViewerCarousel aria-label="Property photos" onChange={onChange}>
      <GalleryViewerCarouselTrack>
        <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
          Content
        </GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  )
  fireIntersection(screen.getByTestId('item-1'), 0.4)
  expect(onChange).not.toHaveBeenCalled()
})

test('calls onChange with the item id when a new item enters view', () => {
  const onChange = vi.fn()
  render(
    <GalleryViewerCarousel aria-label="Property photos" onChange={onChange} value="item-1">
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
  fireIntersection(screen.getByTestId('item-2'), 0.6)
  expect(onChange).toHaveBeenCalledWith('item-2')
})

test('does not call onChange when the already-active item is re-observed', () => {
  const onChange = vi.fn()
  render(
    <GalleryViewerCarousel aria-label="Property photos" onChange={onChange} value="item-1">
      <GalleryViewerCarouselTrack>
        <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
          Content
        </GalleryViewerCarouselItem>
      </GalleryViewerCarouselTrack>
    </GalleryViewerCarousel>,
  )
  fireIntersection(screen.getByTestId('item-1'), 1.0)
  expect(onChange).not.toHaveBeenCalled()
})

test('does not scroll when defaultValue changes after mount', () => {
  const scrollIntoView = vi.fn()

  function Carousel({ defaultValue }: { defaultValue: string }) {
    return (
      <GalleryViewerCarousel aria-label="Property photos" defaultValue={defaultValue}>
        <GalleryViewerCarouselTrack>
          <GalleryViewerCarouselItem id="item-1" data-testid="item-1">
            Content 1
          </GalleryViewerCarouselItem>
          <GalleryViewerCarouselItem id="item-2" data-testid="item-2">
            Content 2
          </GalleryViewerCarouselItem>
        </GalleryViewerCarouselTrack>
      </GalleryViewerCarousel>
    )
  }

  const { rerender } = render(<Carousel defaultValue="item-1" />)

  screen.getByTestId('item-1').scrollIntoView = scrollIntoView
  screen.getByTestId('item-2').scrollIntoView = scrollIntoView

  rerender(<Carousel defaultValue="item-2" />)

  expect(scrollIntoView).not.toHaveBeenCalled()
})

test('calls onChange exactly once when the observer fires', () => {
  const onChange = vi.fn()
  render(
    <GalleryViewerCarousel aria-label="Property photos" onChange={onChange} value="item-1">
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
  fireIntersection(screen.getByTestId('item-2'), 0.8)
  expect(onChange).toHaveBeenCalledTimes(1)
})
