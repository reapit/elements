import { DateTimeInput } from '../date-time-input'
import { render, screen } from '@testing-library/react'

test('renders an input element in a container div', () => {
  // NOTE: date inputs do not have an implicit role that we can use with getByRole. Instead, we need
  // to use a different query, hence `getByTestId` and the need to provide a `data-testid`
  const { container } = render(<DateTimeInput data-testid="input" />)
  expect(container.firstElementChild?.tagName).toBe('DIV')
  expect(screen.getByTestId('input')).toBeVisible()
  expect(screen.getByTestId('input').parentElement).toBe(container.firstElementChild)
})

test('defaults to a date input', () => {
  render(<DateTimeInput data-testid="input" />)
  expect(screen.getByTestId('input')).toHaveAttribute('type', 'date')
})

test('applies the correct input type', () => {
  render(<DateTimeInput data-testid="input" type="datetime-local" />)
  expect(screen.getByTestId('input')).toHaveAttribute('type', 'datetime-local')
})

test('displays picker button when editable and not busy', () => {
  render(<DateTimeInput type="date" />)
  expect(screen.getByRole('button', { name: 'Show date picker' })).toBeVisible()
})

test('hides picker button when read-only', () => {
  render(<DateTimeInput readOnly type="date" />)
  expect(screen.queryByRole('button', { name: 'Show date picker' })).not.toBeInTheDocument()
})

test('hides picker button when busy', () => {
  render(<DateTimeInput isBusy type="date" />)
  expect(screen.queryByRole('button', { name: 'Show date picker' })).not.toBeInTheDocument()
})
