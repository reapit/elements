import { render, screen } from '@testing-library/react'
import { GalleryViewerThumbnailButton } from '../thumbnail-button'

test('renders as a button element', () => {
  render(
    <GalleryViewerThumbnailButton
      aria-pressed={false}
      aria-label="View image 1"
      src="https://fake.url/for/image.jpg"
    />,
  )
  expect(screen.getByRole('button')).toBeVisible()
})

test('defaults to type="button" to avoid accidental form submission', () => {
  render(
    <GalleryViewerThumbnailButton
      aria-pressed={false}
      aria-label="View image 1"
      src="https://fake.url/for/image.jpg"
    />,
  )
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
})

test('sets aria-pressed="true" when selected', () => {
  render(
    <GalleryViewerThumbnailButton aria-pressed={true} aria-label="View image 1" src="https://fake.url/for/image.jpg" />,
  )
  expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
})

test('sets aria-pressed="false" when not selected', () => {
  render(
    <GalleryViewerThumbnailButton
      aria-pressed={false}
      aria-label="View image 1"
      src="https://fake.url/for/image.jpg"
    />,
  )
  expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
})

test('renders the image with the provided src', () => {
  const { container } = render(
    <GalleryViewerThumbnailButton aria-pressed={false} aria-label="View image 1" src="https://example.com/house.jpg" />,
  )
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  expect(container.querySelector('img')).toHaveAttribute('src', 'https://example.com/house.jpg')
})

test('renders a video overlay when isVideo is true', () => {
  render(
    <GalleryViewerThumbnailButton
      aria-pressed={false}
      aria-label="View image 1"
      isVideo
      src="https://example.com/house.jpg"
    />,
  )
  expect(screen.getByTestId('video-overlay')).toBeInTheDocument()
})

test('does not render a video overlay when isVideo is false', () => {
  const { container } = render(
    <GalleryViewerThumbnailButton
      aria-pressed={false}
      aria-label="View image 1"
      isVideo={false}
      src="https://example.com/house.jpg"
    />,
  )
  expect(container.firstElementChild).toBeVisible()
})

test('forwards additional props to the button element', () => {
  render(
    <GalleryViewerThumbnailButton
      aria-pressed={false}
      aria-label="View image 1"
      src="https://fake.url/for/image.jpg"
      data-testid="thumbnail-button"
      className="custom-class"
    />,
  )
  expect(screen.getByTestId('thumbnail-button')).toBeVisible()
  expect(screen.getByTestId('thumbnail-button')).toHaveClass('custom-class')
})
