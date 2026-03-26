import { render, screen } from '@testing-library/react'
import { GalleryViewerDialogContext } from '../../context'
import { GalleryViewerDialogHeader } from '../header'
import type { ReactNode } from 'react'

interface WrapperProps {
  children?: ReactNode
}

function Wrapper({ children }: WrapperProps) {
  return (
    <GalleryViewerDialogContext.Provider value={{ titleId: 'test-title-id' }}>
      {children}
    </GalleryViewerDialogContext.Provider>
  )
}

test('renders a banner element', () => {
  render(<GalleryViewerDialogHeader>Test Title</GalleryViewerDialogHeader>, { wrapper: Wrapper })
  expect(screen.getByRole('banner')).toBeVisible()
})

test('renders the children as a heading', () => {
  render(<GalleryViewerDialogHeader>Test Title</GalleryViewerDialogHeader>, { wrapper: Wrapper })
  const heading = screen.getByRole('heading', { level: 2 })
  expect(heading).toBeVisible()
  expect(heading).toHaveTextContent('Test Title')
})

test('renders the close button', () => {
  render(<GalleryViewerDialogHeader>Title</GalleryViewerDialogHeader>, {
    wrapper: Wrapper,
  })
  expect(screen.getByRole('button', { name: 'Close' })).toBeVisible()
})

test('applies ID from context to heading', () => {
  render(<GalleryViewerDialogHeader>Title</GalleryViewerDialogHeader>, {
    wrapper: Wrapper,
  })
  expect(screen.getByRole('heading')).toHaveAttribute('id', 'test-title-id')
})

test('forwards className to the underlying element', () => {
  const { container } = render(<GalleryViewerDialogHeader className="custom-class">Title</GalleryViewerDialogHeader>, {
    wrapper: Wrapper,
  })
  expect(container.firstElementChild).toHaveClass('custom-class')
})

test('throws error when rendered outside context', () => {
  // Suppress React boundary error logging for this expected failure
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
  expect(() => {
    render(<GalleryViewerDialogHeader>Dummy Title</GalleryViewerDialogHeader>)
  }).toThrow('useGalleryViewerDialogContext requires a GalleryViewerDialog ancestor')
  consoleError.mockRestore()
})
