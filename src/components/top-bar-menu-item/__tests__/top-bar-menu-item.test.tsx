import { render, screen } from '@testing-library/react'
import { TopBarMenuItem } from '../top-bar-menu-item'

it('should render as a link', () => {
  render(<TopBarMenuItem label="Contact" href="#item-1" />)
  expect(screen.getByRole('link')).toHaveTextContent('Contact')
})

it('should render as a button', () => {
  render(<TopBarMenuItem label="Contact" onClick={vi.fn()} />)
  expect(screen.getByRole('button')).toHaveTextContent('Contact')
})
