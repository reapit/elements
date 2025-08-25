import { Divider } from '../divider'
import { render, screen } from '@testing-library/react'

test('renders a separator element', () => {
  render(<Divider />)
  expect(screen.getByRole('separator')).toBeVisible()
})

test('forwards additional props to the separator element', () => {
  render(<Divider data-testid="my-divider" />)
  expect(screen.getByTestId('my-divider')).toBeVisible()
})
