import { fireEvent, render, screen } from '@testing-library/react'
import { Video } from '../video'
import { elVideo } from '../styles'

test('renders a video element with the given src', () => {
  render(<Video height="300px" src="https://example.com/video.mp4" width="200px" />)
  const video = document.querySelector('video')
  expect(video).toHaveAttribute('src', 'https://example.com/video.mp4')
})

test('renders the default fallback UI when the video fails to load', () => {
  render(<Video height="300px" src="https://example.com/video.mp4" width="200px" />)
  const video = document.querySelector('video')!
  fireEvent.error(video)
  expect(screen.getByText('The video could not be loaded')).toBeVisible()
  expect(video).toHaveAttribute('aria-hidden', 'true')
  expect(video).toHaveClass(elVideo)
})

test('default fallback has aria-live, aria-atomic and role="status" so screen readers announce the error', () => {
  render(<Video height="300px" src="https://example.com/video.mp4" width="200px" />)
  const video = document.querySelector('video')!
  fireEvent.error(video)
  const fallback = screen.getByRole('status')
  expect(fallback).toHaveAttribute('aria-live', 'polite')
  expect(fallback).toHaveAttribute('aria-atomic', 'true')
})

test('custom fallback does not receive aria-live or role="status"', () => {
  render(<Video fallback={<p>Custom fallback</p>} height="300px" src="https://example.com/video.mp4" width="200px" />)
  const video = document.querySelector('video')!
  fireEvent.error(video)
  expect(screen.queryByRole('status')).toBeNull()
})

test('renders custom fallback content when provided', () => {
  render(<Video fallback={<p>Custom fallback</p>} height="300px" src="https://example.com/video.mp4" width="200px" />)
  const video = document.querySelector('video')!
  fireEvent.error(video)
  expect(screen.getByText('Custom fallback')).toBeVisible()
  expect(screen.queryByText('The video could not be loaded')).toBeNull()
})

test('calls onError when the video fails to load', () => {
  const onError = vi.fn()
  render(<Video height="300px" onError={onError} src="https://example.com/video.mp4" width="200px" />)
  const video = document.querySelector('video')!
  fireEvent.error(video)
  expect(onError).toHaveBeenCalledTimes(1)
})

test('clears error state when the video loads successfully', () => {
  render(<Video height="300px" src="https://example.com/video.mp4" width="200px" />)
  const video = document.querySelector('video')!
  fireEvent.error(video)
  expect(screen.getByText('The video could not be loaded')).toBeVisible()
  fireEvent.loadedData(video)
  expect(screen.queryByText('The video could not be loaded')).toBeNull()
})

test('calls onLoadedData when the video loads', () => {
  const onLoadedData = vi.fn()
  render(<Video height="300px" onLoadedData={onLoadedData} src="https://example.com/video.mp4" width="200px" />)
  const video = document.querySelector('video')!
  fireEvent.loadedData(video)
  expect(onLoadedData).toHaveBeenCalledTimes(1)
})

test('keeps fallback visible until a subsequent loadedData event', () => {
  const { rerender } = render(<Video height="300px" src="https://example.com/invalid.mp4" width="200px" />)
  const video = document.querySelector('video')!
  fireEvent.error(video)
  expect(screen.getByText('The video could not be loaded')).toBeVisible()

  rerender(<Video height="300px" src="https://example.com/valid.mp4" width="200px" />)
  expect(screen.getByText('The video could not be loaded')).toBeVisible()

  fireEvent.loadedData(document.querySelector('video')!)
  expect(screen.queryByText('The video could not be loaded')).toBeNull()
})

test('applies data-object-fit attribute to the video element', () => {
  render(<Video height="300px" objectFit="cover" src="https://example.com/video.mp4" width="200px" />)
  const video = document.querySelector('video')!
  expect(video).toHaveAttribute('data-object-fit', 'cover')
})

test('defaults objectFit to contain', () => {
  render(<Video height="300px" src="https://example.com/video.mp4" width="200px" />)
  const video = document.querySelector('video')!
  expect(video).toHaveAttribute('data-object-fit', 'contain')
})

test('disables controls when the video errors so keyboard users cannot focus a hidden element', () => {
  render(<Video controls height="300px" src="https://example.com/video.mp4" width="200px" />)
  const video = document.querySelector('video')!
  fireEvent.error(video)
  expect(video).not.toHaveAttribute('controls')
})

test('sets tabIndex to -1 when the video errors to remove it from the tab order', () => {
  render(<Video controls height="300px" src="https://example.com/video.mp4" width="200px" />)
  const video = document.querySelector('video')!
  fireEvent.error(video)
  expect(video).toHaveAttribute('tabindex', '-1')
})

test('sets pointer-events to none when the video errors so the hidden element is not interactive', () => {
  render(<Video controls height="300px" src="https://example.com/video.mp4" width="200px" />)
  const video = document.querySelector('video')!
  fireEvent.error(video)
  expect(video).toHaveStyle({ pointerEvents: 'none' })
})

test('restores controls, tabIndex, and pointer-events when the video recovers from an error', () => {
  render(<Video controls height="300px" src="https://example.com/video.mp4" width="200px" />)
  const video = document.querySelector('video')!
  fireEvent.error(video)
  fireEvent.loadedData(video)
  expect(video).toHaveAttribute('controls')
  expect(video).not.toHaveAttribute('tabindex')
  expect(video).not.toHaveStyle({ pointerEvents: 'none' })
})

test('renders without a src when source children are provided', () => {
  render(
    <Video height="300px" width="200px">
      <source src="https://example.com/video.webm" type="video/webm" />
      <source src="https://example.com/video.mp4" type="video/mp4" />
    </Video>,
  )
  const video = document.querySelector('video')!
  expect(video).not.toHaveAttribute('src')
  expect(video.querySelectorAll('source')).toHaveLength(2)
})

test('shows the fallback when an error event fires on the video element with source children', () => {
  render(
    <Video height="300px" width="200px">
      <source src="https://example.invalid/video.webm" type="video/webm" />
    </Video>,
  )
  const video = document.querySelector('video')!
  fireEvent.error(video)
  expect(screen.getByText('The video could not be loaded')).toBeVisible()
})

test('clears the error state when loadedData fires on a video using source children', () => {
  render(
    <Video height="300px" width="200px">
      <source src="https://example.invalid/video.webm" type="video/webm" />
    </Video>,
  )
  const video = document.querySelector('video')!
  fireEvent.error(video)
  expect(screen.getByText('The video could not be loaded')).toBeVisible()
  fireEvent.loadedData(video)
  expect(screen.queryByText('The video could not be loaded')).toBeNull()
})
