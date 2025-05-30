import { render, screen } from '@testing-library/react'
import { SideBarSubmenuListItem } from '../submenu-list-item'

test('renders a link as child of a list item', () => {
  render(<SideBarSubmenuListItem href="/">Item</SideBarSubmenuListItem>)
  const listItem = screen.getByRole('listitem')
  const anchor = screen.getByRole('link', { name: 'Item' })

  expect(listItem).toBeVisible()
  expect(anchor).toBeVisible()
  expect(listItem.firstChild).toBe(anchor)
})

test('link `aria-current="page"` attribute present when `isActive`', () => {
  render(
    <SideBarSubmenuListItem href="/" isActive>
      Item
    </SideBarSubmenuListItem>,
  )
  expect(screen.getByRole('link', { name: 'Item' })).toHaveAttribute('aria-current', 'page')
})
