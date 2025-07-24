import { MenuItem } from '../item'
import { render, screen } from '@testing-library/react'

test('renders a button element', () => {
  render(<MenuItem>Menu item</MenuItem>)
  expect(screen.getByRole('button')).toBeVisible()
})
