import { render, screen } from '@testing-library/react'
import { SideBarMenuListGroup } from '../menu-list-group'

test('renders a <details> element as the child of a <li>', () => {
  render(<SideBarMenuListGroup summary={<summary>Item</summary>}>Children</SideBarMenuListGroup>)
  const listItem = screen.getByRole('listitem')
  const details = screen.getByRole('group')

  expect(listItem).toBeVisible()
  // NOTE: <details> is only considered visible if it has an open attribute
  expect(details).toBeInTheDocument()
  expect(listItem.firstChild).toBe(details)
})
