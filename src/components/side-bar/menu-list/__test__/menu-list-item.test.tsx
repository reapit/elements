import { render, screen } from '@testing-library/react'
import { SideBarMenuListItem } from '../menu-list-item'

test('renders an <a> element as child of a <li>', () => {
  render(
    <SideBarMenuListItem href="/" icon="😎">
      Item
    </SideBarMenuListItem>,
  )
  const listItem = screen.getByRole('listitem')
  const anchor = screen.getByRole('link', { name: 'Item' })

  expect(listItem).toBeVisible()
  expect(anchor).toBeVisible()
  expect(listItem.firstChild).toBe(anchor)
})

test('<a> element has `aria-current="page"` attribute present when `isActive`', () => {
  render(
    <SideBarMenuListItem href="/" icon="😎" isActive>
      Item
    </SideBarMenuListItem>,
  )
  expect(screen.getByRole('link', { name: 'Item' })).toHaveAttribute('aria-current', 'page')
})
