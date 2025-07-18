import { render, screen } from '@testing-library/react'
import { BottomBarListItem } from '../menu-list-item'

test('renders an <a> element as child of a <li>', () => {
  render(
    <BottomBarListItem aria-current={false} href="/" icon="😎">
      Item
    </BottomBarListItem>,
  )
  const listItem = screen.getByRole('listitem')
  const anchor = screen.getByRole('link', { name: 'Item' })

  expect(listItem).toBeVisible()
  expect(anchor).toBeVisible()
  expect(listItem.firstChild).toBe(anchor)
})

test('forwards additional props to the underlying `SideBarMenuItem`', () => {
  render(
    <BottomBarListItem aria-current="page" href="/" icon="😎">
      Item
    </BottomBarListItem>,
  )
  expect(screen.getByRole('link', { name: 'Item' })).toHaveAttribute('aria-current', 'page')
})
