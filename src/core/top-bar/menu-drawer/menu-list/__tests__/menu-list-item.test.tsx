import { render, screen } from '@testing-library/react'
import { TopBarMenuDrawerMenuListItem } from '../menu-list-item'

test('renders an <a> element as child of a <li>', () => {
  render(
    <TopBarMenuDrawerMenuListItem aria-current={false} href="/">
      Item
    </TopBarMenuDrawerMenuListItem>,
  )
  const listItem = screen.getByRole('listitem')
  const anchor = screen.getByRole('link', { name: 'Item' })

  expect(listItem).toBeVisible()
  expect(anchor).toBeVisible()
  expect(listItem.firstChild).toBe(anchor)
})

test('forwards additional props to the underlying `TopBarMenuDrawerMenuItem`', () => {
  render(
    <TopBarMenuDrawerMenuListItem aria-current="page" href="/">
      Item
    </TopBarMenuDrawerMenuListItem>,
  )
  expect(screen.getByRole('link', { name: 'Item' })).toHaveAttribute('aria-current', 'page')
})
