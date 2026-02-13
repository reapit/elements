import { render, screen } from '@testing-library/react'
import { TopBarMenuDrawerMenuListItemButton } from '../menu-list-item-button'

test('renders a <button> element as child of a <li>', () => {
  render(<TopBarMenuDrawerMenuListItemButton>Item</TopBarMenuDrawerMenuListItemButton>)
  const listItem = screen.getByRole('listitem')
  const button = screen.getByRole('button', { name: 'Item' })

  expect(listItem).toBeVisible()
  expect(button).toBeVisible()
  expect(listItem.firstChild).toBe(button)
})

test('forwards additional props to the underlying `TopBarMenuDrawerMenuItemButton`', () => {
  render(
    <TopBarMenuDrawerMenuListItemButton aria-label="Custom label" data-testid="custom-button">
      Item
    </TopBarMenuDrawerMenuListItemButton>,
  )
  const button = screen.getByRole('button', { name: 'Custom label' })
  expect(button).toHaveAttribute('data-testid', 'custom-button')
})
