import { DateTimeControl } from '../date-time-control'
import { render, screen } from '@testing-library/react'

test('renders a date input by default', () => {
  render(<DateTimeControl label="Label" />)
  expect(screen.getByLabelText('Label')).toBeVisible()
  expect(screen.getByLabelText('Label')).toHaveAttribute('type', 'date')
})

test('supports different input types', () => {
  const { rerender } = render(<DateTimeControl label="Time" type="time" />)
  expect(screen.getByLabelText('Time')).toHaveAttribute('type', 'time')

  rerender(<DateTimeControl label="Datetime" type="datetime-local" />)
  expect(screen.getByLabelText('Datetime')).toHaveAttribute('type', 'datetime-local')
})

test('displays error text, when provided', () => {
  render(<DateTimeControl label="Label" helpText="Help text" errorText="Error text" />)
  expect(screen.getByText('Error text')).toBeVisible()
})

test('is described by the error text, when provided', () => {
  render(<DateTimeControl label="Label" helpText="Help text" errorText="Error text" />)
  expect(screen.getByLabelText('Label')).toHaveAccessibleDescription('Error text')
})

test('displays help text, when provided and no error is present', () => {
  render(<DateTimeControl label="Label" helpText="Help text" />)
  expect(screen.getByText('Help text')).toBeVisible()
})

test('is described by the help text, when provided and no error is present', () => {
  render(<DateTimeControl label="Label" helpText="Help text" />)
  expect(screen.getByLabelText('Label')).toHaveAccessibleDescription('Help text')
})

test('does not display help text when error text is present', () => {
  render(<DateTimeControl label="Label" helpText="Help text" errorText="Error text" />)
  expect(screen.queryByText('Help text')).not.toBeInTheDocument()
})

test('uses provided id for the input', () => {
  render(<DateTimeControl id="custom-id" label="Label" />)
  expect(screen.getByLabelText('Label')).toHaveAttribute('id', 'custom-id')
})

test('generates an id when none is provided', () => {
  render(<DateTimeControl label="Label" />)
  expect(screen.getByLabelText('Label')).toHaveAttribute('id')
})

test('forwards additional attributes to the input', () => {
  render(<DateTimeControl data-testid="test-id" label="Label" placeholder="Enter text" />)
  const input = screen.getByTestId('test-id')
  expect(input).toBe(screen.getByLabelText('Label'))
  expect(input).toHaveAttribute('placeholder', 'Enter text')
})
