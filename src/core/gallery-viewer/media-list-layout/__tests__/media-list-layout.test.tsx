import { render, screen } from '@testing-library/react'
import { GalleryViewerMediaListLayout } from '../media-list-layout'

test('renders a <div> as the root element', () => {
  const { container } = render(
    <GalleryViewerMediaListLayout>
      <p>Child</p>
    </GalleryViewerMediaListLayout>,
  )
  expect(container.firstElementChild).toBeInstanceOf(HTMLDivElement)
})

test('renders children', () => {
  render(
    <GalleryViewerMediaListLayout>
      <p>Child content</p>
    </GalleryViewerMediaListLayout>,
  )
  expect(screen.getByText('Child content')).toBeVisible()
})

test('forwards additional HTML attributes to the root element', () => {
  render(
    <GalleryViewerMediaListLayout data-testid="layout">
      <p>Child</p>
    </GalleryViewerMediaListLayout>,
  )
  expect(screen.getByTestId('layout')).toBeVisible()
})

test('applies a custom className to the root element', () => {
  const { container } = render(
    <GalleryViewerMediaListLayout className="custom">
      <p>Child</p>
    </GalleryViewerMediaListLayout>,
  )
  expect(container.firstElementChild).toHaveClass('custom')
})
