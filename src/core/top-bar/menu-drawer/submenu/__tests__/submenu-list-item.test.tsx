import { render, screen } from '@testing-library/react'
import { TopBarMenuDrawerSubmenuListItem } from '../submenu-list-item'

test('wraps children in a list item', () => {
  render(
    <ul>
      <TopBarMenuDrawerSubmenuListItem href="/test" aria-current={false}>
        Test
      </TopBarMenuDrawerSubmenuListItem>
    </ul>,
  )

  const link = screen.getByRole('link')
  expect(link.parentElement?.tagName).toBe('LI')
})
