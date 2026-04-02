import { render, screen } from '@testing-library/react'
import { GalleryViewerMediaList } from '../media-list'

test('renders a <ul> element', () => {
  render(<GalleryViewerMediaList />)
  expect(screen.getByRole('list')).toBeVisible()
})

test('renders all children', async () => {
  render(
    <GalleryViewerMediaList>
      <li>Item 1</li>
      <li>Item 2</li>
    </GalleryViewerMediaList>,
  )
  const items = await screen.findAllByRole('listitem')
  expect(items).toHaveLength(2)
})

test('forwards additional props to the <ul> element', () => {
  render(<GalleryViewerMediaList data-testid="media-list" className="custom-class" />)
  expect(screen.getByTestId('media-list')).toBeVisible()
  expect(screen.getByTestId('media-list')).toHaveClass('custom-class')
})

test('exposes GalleryViewerMediaList.Item', () => {
  expect(GalleryViewerMediaList.Item).toBeDefined()
})

test('exposes GalleryViewerMediaList.ItemCaption', () => {
  expect(GalleryViewerMediaList.ItemCaption).toBeDefined()
})
