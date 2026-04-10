import { render, screen } from '@testing-library/react'
import { GalleryViewerCarouselLayout } from '../carousel-layout'

test('renders a <div> as the root element', () => {
  const { container } = render(<GalleryViewerCarouselLayout main={<p>Main</p>} sidebar={<p>Sidebar</p>} />)
  expect(container.firstElementChild).toBeInstanceOf(HTMLDivElement)
})

test('renders the main content', () => {
  render(<GalleryViewerCarouselLayout main={<p>Main content</p>} sidebar={<p>Sidebar</p>} />)
  expect(screen.getByText('Main content')).toBeVisible()
})

test('renders the sidebar content', () => {
  render(<GalleryViewerCarouselLayout main={<p>Main</p>} sidebar={<p>Sidebar content</p>} />)
  expect(screen.getByText('Sidebar content')).toBeVisible()
})

test('forwards additional HTML attributes to the root element', () => {
  render(<GalleryViewerCarouselLayout data-testid="layout" main={<p>Main</p>} sidebar={<p>Sidebar</p>} />)
  expect(screen.getByTestId('layout')).toBeVisible()
})

test('applies a custom className to the root element', () => {
  const { container } = render(
    <GalleryViewerCarouselLayout className="custom" main={<p>Main</p>} sidebar={<p>Sidebar</p>} />,
  )
  expect(container.firstElementChild).toHaveClass('custom')
})
