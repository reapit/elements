import { render, screen } from '@testing-library/react'
import { SideBarSubmenu } from '../submenu'

test('renders an <ul> element', () => {
  render(<SideBarSubmenu>Children</SideBarSubmenu>)
  expect(screen.getByRole('list')).toBeVisible()
})

test('all children are rendered', async () => {
  render(
    <SideBarSubmenu>
      <li>Item 1</li>
      <li>Item 2</li>
    </SideBarSubmenu>,
  )
  const items = await screen.findAllByRole('listitem')

  expect(items).toHaveLength(2)
})
