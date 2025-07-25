import { AnchorMenuItem } from '../anchor-item'
import { render, screen } from '@testing-library/react'

test('renders a link element', () => {
  render(<AnchorMenuItem href="https://www.google.com">Menu item</AnchorMenuItem>)
  expect(screen.getByRole('link')).toBeVisible()
})
