import { render, screen } from '@testing-library/react'

import { TopBarMenuItem } from '../top-bar-menu-item'

it('should render as a link', () => {
  render(<TopBarMenuItem href="#item-1">Contact</TopBarMenuItem>)
  expect(screen.getByRole('link')).toHaveTextContent('Contact')
})

it('should render as a button', () => {
  render(<TopBarMenuItem onClick={vi.fn()}>Contact</TopBarMenuItem>)
  expect(screen.getByRole('button')).toHaveTextContent('Contact')
})
