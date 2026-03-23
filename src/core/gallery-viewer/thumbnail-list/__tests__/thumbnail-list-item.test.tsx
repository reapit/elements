import { render, screen } from '@testing-library/react'
import { GalleryViewerThumbnailListItem } from '../thumbnail-list-item'

test('renders an <a> element as child of a <li>', () => {
  render(
    <GalleryViewerThumbnailListItem
      aria-current={false}
      aria-label="View photo 1"
      href="/gallery?image=1"
      src="https://fake.url/for/image.jpg"
    />,
  )
  const listItem = screen.getByRole('listitem')
  const anchor = screen.getByRole('link', { name: 'View photo 1' })

  expect(listItem).toBeVisible()
  expect(anchor).toBeVisible()
  expect(listItem.firstChild).toBe(anchor)
})

test('forwards additional props to the underlying GalleryViewerThumbnail', () => {
  render(
    <GalleryViewerThumbnailListItem
      aria-current="page"
      aria-label="View photo 1"
      href="/gallery?image=1"
      src="https://fake.url/for/image.jpg"
    />,
  )
  expect(screen.getByRole('link', { name: 'View photo 1' })).toHaveAttribute('aria-current', 'page')
})
