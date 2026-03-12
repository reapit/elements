import { fireEvent, render, screen } from '@testing-library/react'
import { Image } from '../image'
import { elImage } from '../styles'

test('renders the default fallback UI when the image fails to load', () => {
  render(<Image alt="A test image" src="https://picsum.photos/200/300" />)

  const image = screen.getByRole('img')
  fireEvent.error(image)

  expect(screen.getByRole('status')).toHaveTextContent('The image could not be loaded: A test image')
  expect(screen.getByRole('img', { hidden: true })).toHaveAttribute('aria-hidden', 'true')
  expect(screen.getByRole('img', { hidden: true })).toHaveClass(elImage) // provides opacity: 0 styles
})

test('keeps fallback non-announcing for decorative images', () => {
  render(<Image alt="" src="https://picsum.photos/200/300" />)

  fireEvent.error(screen.getByRole('presentation'))

  expect(screen.queryByRole('status')).toBeNull()
  expect(screen.getByText('The image could not be loaded')).toBeVisible()
})

test('renders custom fallback content when provided', () => {
  render(<Image alt="A test image" fallback={<p>Custom fallback</p>} src="https://picsum.photos/200/300" />)

  fireEvent.error(screen.getByRole('img', { hidden: true }))

  expect(screen.getByText('Custom fallback')).toBeVisible()
  expect(screen.queryByRole('status')).toBeNull()
})

test('calls onError when the image fails to load', () => {
  const onError = vi.fn()

  render(<Image alt="A test image" onError={onError} src="https://picsum.photos/200/300" />)
  fireEvent.error(screen.getByRole('img', { hidden: true }))

  expect(onError).toHaveBeenCalledTimes(1)
})

test('keeps fallback visible until a subsequent load event', () => {
  const { rerender } = render(<Image alt="A test image" src="https://example.com/invalid-a.jpg" />)

  fireEvent.error(screen.getByRole('img', { hidden: true }))
  expect(screen.getByText('The image could not be loaded: A test image')).toBeVisible()

  rerender(<Image alt="A test image" src="https://example.com/valid-b.jpg" />)
  expect(screen.getByText('The image could not be loaded: A test image')).toBeVisible()

  fireEvent.load(screen.getByRole('img', { hidden: true }))
  expect(screen.queryByText('The image could not be loaded: A test image')).toBeNull()
  expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/valid-b.jpg')
  expect(screen.getByRole('img')).not.toHaveAttribute('aria-hidden')
})

test('clears error state on image load', () => {
  render(<Image alt="A test image" src="https://example.com/image.jpg" />)

  fireEvent.error(screen.getByRole('img', { hidden: true }))
  expect(screen.getByText('The image could not be loaded: A test image')).toBeVisible()

  fireEvent.load(screen.getByRole('img', { hidden: true }))
  expect(screen.queryByText('The image could not be loaded: A test image')).toBeNull()
})

test('calls onLoad when the image loads', () => {
  const onLoad = vi.fn()

  render(<Image alt="A test image" onLoad={onLoad} src="https://example.com/image.jpg" />)
  fireEvent.load(screen.getByRole('img', { hidden: true }))

  expect(onLoad).toHaveBeenCalledTimes(1)
})
