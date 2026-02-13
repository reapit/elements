import { render, screen } from '@testing-library/react'
import { TopBarMenuDrawerMenuList } from '../menu-list'

test('renders an <ul> element', () => {
  render(<TopBarMenuDrawerMenuList>Children</TopBarMenuDrawerMenuList>)
  expect(screen.getByRole('list')).toBeVisible()
})

test('all children are rendered', async () => {
  render(
    <TopBarMenuDrawerMenuList>
      <li>Item 1</li>
      <li>Item 2</li>
    </TopBarMenuDrawerMenuList>,
  )
  const items = await screen.findAllByRole('listitem')

  expect(items).toHaveLength(2)
})
