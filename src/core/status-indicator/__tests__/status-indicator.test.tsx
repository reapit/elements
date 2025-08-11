import { render, screen } from '@testing-library/react'
import { StatusIndicator } from '../status-indicator'

test('renders as a strong element', () => {
  render(<StatusIndicator variant="neutral">Status</StatusIndicator>)
  expect(screen.getByRole('strong')).toBeVisible()
})

test('applies the correct data-variant attribute', () => {
  render(<StatusIndicator variant="success">Status</StatusIndicator>)
  expect(screen.getByRole('strong')).toHaveAttribute('data-variant', 'success')
})

test('forwards additional props to the strong element', () => {
  render(
    <StatusIndicator data-testid="test-id" variant="success">
      Status
    </StatusIndicator>,
  )
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('strong'))
})
