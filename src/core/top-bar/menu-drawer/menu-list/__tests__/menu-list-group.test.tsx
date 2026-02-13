import { render, screen } from '@testing-library/react'
import { TopBarMenuDrawerMenuListGroup } from '../menu-list-group'

test('renders a <details> element as the child of a <li>', () => {
  render(<TopBarMenuDrawerMenuListGroup summary={<summary>Item</summary>}>Children</TopBarMenuDrawerMenuListGroup>)
  const listItem = screen.getByRole('listitem')
  const details = screen.getByRole('group')

  expect(listItem).toBeVisible()
  // NOTE: <details> is only considered visible if it has an open attribute
  expect(details).toBeInTheDocument()
  expect(listItem.firstChild).toBe(details)
})

test('forwards props to the underlying TopBarMenuDrawerMenuGroup', () => {
  render(
    <TopBarMenuDrawerMenuListGroup
      summary={<summary>Item</summary>}
      open
      data-testid="menu-group"
      className="custom-class"
    >
      Children
    </TopBarMenuDrawerMenuListGroup>,
  )
  const details = screen.getByRole('group')

  expect(details).toHaveAttribute('open')
  expect(details).toHaveAttribute('data-testid', 'menu-group')
  expect(details).toHaveClass('custom-class')
})
