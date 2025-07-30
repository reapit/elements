import { MenuDivider } from '../divider'
import { render, screen } from '@testing-library/react'

test('renders a separator element', () => {
  render(<MenuDivider />)
  expect(screen.getByRole('separator')).toBeVisible()
})

test('forwards additional props to the separator element', () => {
  render(<MenuDivider data-testid="my-divider" />)
  expect(screen.getByTestId('my-divider')).toBeVisible()
})
