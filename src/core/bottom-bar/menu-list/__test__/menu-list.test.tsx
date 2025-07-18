import { render, screen } from '@testing-library/react'
import { BottomBarMenuList } from '../menu-list'

test('renders a list element', () => {
  render(<BottomBarMenuList>Children</BottomBarMenuList>)
  expect(screen.getByRole('list')).toBeVisible()
})

test('all children are rendered', async () => {
  render(
    <BottomBarMenuList>
      <li>Item 1</li>
      <li>Item 2</li>
    </BottomBarMenuList>,
  )
  const items = await screen.findAllByRole('listitem')

  expect(items).toHaveLength(2)
})
