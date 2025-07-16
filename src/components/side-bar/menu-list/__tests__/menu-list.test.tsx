import { render, screen } from '@testing-library/react'
import { SideBarMenuList } from '../menu-list'

test('renders an <ul> element', () => {
  render(<SideBarMenuList>Children</SideBarMenuList>)
  expect(screen.getByRole('list')).toBeVisible()
})

test('all children are rendered', async () => {
  render(
    <SideBarMenuList>
      <li>Item 1</li>
      <li>Item 2</li>
    </SideBarMenuList>,
  )
  const items = await screen.findAllByRole('listitem')

  expect(items).toHaveLength(2)
})
