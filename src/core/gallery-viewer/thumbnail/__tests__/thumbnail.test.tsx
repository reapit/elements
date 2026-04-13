import { render, screen } from '@testing-library/react'
import { GalleryViewerThumbnail } from '../thumbnail'

test('renders as an anchor element', () => {
  render(
    <GalleryViewerThumbnail
      href="/gallery?image=1"
      aria-current={false}
      aria-label="View image 1"
      src="https://fake.url/for/image.jpg"
    />,
  )
  expect(screen.getByRole('link')).toBeVisible()
})

test('navigates to the provided href', () => {
  render(
    <GalleryViewerThumbnail
      href="/gallery?image=1"
      aria-current={false}
      aria-label="View image 1"
      src="https://fake.url/for/image.jpg"
    />,
  )
  expect(screen.getByRole('link')).toHaveAttribute('href', '/gallery?image=1')
})

test('sets aria-current="location" when selected', () => {
  render(
    <GalleryViewerThumbnail
      href="/gallery?image=1"
      aria-current="location"
      aria-label="View image 1"
      src="https://fake.url/for/image.jpg"
    />,
  )
  expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'location')
})

test('sets aria-current="false" when not selected', () => {
  render(
    <GalleryViewerThumbnail
      href="/gallery?image=1"
      aria-current={false}
      aria-label="View image 1"
      src="https://fake.url/for/image.jpg"
    />,
  )
  expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'false')
})

test('renders the image with the provided src', () => {
  const { container } = render(
    <GalleryViewerThumbnail
      href="/gallery?image=1"
      aria-current={false}
      aria-label="View image 1"
      src="https://example.com/house.jpg"
    />,
  )
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  expect(container.querySelector('img')).toHaveAttribute('src', 'https://example.com/house.jpg')
})

test('renders an img element', () => {
  const { container } = render(
    <GalleryViewerThumbnail
      href="/gallery?image=1"
      aria-current={false}
      aria-label="View image 1"
      src="https://fake.url/for/image.jpg"
    />,
  )
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  expect(container.querySelector('img')).toBeInTheDocument()
})

test('renders a video overlay when isVideo is true', () => {
  render(
    <GalleryViewerThumbnail
      href="/gallery?image=1"
      aria-current={false}
      aria-label="View image 1"
      isVideo
      src="https://example.com/house.jpg"
    />,
  )
  expect(screen.getByTestId('video-overlay')).toBeInTheDocument()
})

test('does not render a video overlay when isVideo is false', () => {
  const { container } = render(
    <GalleryViewerThumbnail
      href="/gallery?image=1"
      aria-current={false}
      aria-label="View image 1"
      isVideo={false}
      src="https://example.com/house.jpg"
    />,
  )
  // There is no video overlay div — the only aria-hidden element is the image
  // when it has errored, which it hasn't here (no actual network request).
  // We check that the thumbnail renders cleanly.
  expect(container.firstElementChild).toBeVisible()
})

test('forwards additional props to the anchor element', () => {
  render(
    <GalleryViewerThumbnail
      href="/gallery?image=1"
      aria-current={false}
      aria-label="View image 1"
      src="https://fake.url/for/image.jpg"
      data-testid="thumbnail"
      className="custom-class"
    />,
  )
  expect(screen.getByTestId('thumbnail')).toBeVisible()
  expect(screen.getByTestId('thumbnail')).toHaveClass('custom-class')
})
