import { MenuItem } from '../item'
import { render, screen } from '@testing-library/react'

test('renders a menuitem element', () => {
  render(<MenuItem>Menu item</MenuItem>)
  expect(screen.getByRole('menuitem')).toBeVisible()
})
