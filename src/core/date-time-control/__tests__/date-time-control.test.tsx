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

test('is described by the error text via aria-errormessage, when provided', () => {
  render(<DateTimeControl label="Label" helpText="Help text" errorText="Error text" />)
  expect(screen.getByLabelText('Label')).toHaveAccessibleErrorMessage('Error text')
})

test('displays help text, when provided and no error is present', () => {
  render(<DateTimeControl label="Label" helpText="Help text" />)
  expect(screen.getByText('Help text')).toBeVisible()
})

test('is described by the help text, when provided and no error is present', () => {
  render(<DateTimeControl label="Label" helpText="Help text" />)
  const input = screen.getByLabelText('Label')
  expect(input).toHaveAttribute('aria-describedby')
  expect(input).toHaveAccessibleDescription('Help text')
  expect(input).not.toHaveAttribute('aria-errormessage')
  expect(input).not.toHaveAttribute('aria-invalid')
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

test('sets aria-invalid to true when error text is present', () => {
  render(<DateTimeControl label="Label" errorText="Error text" />)
  expect(screen.getByLabelText('Label')).toHaveAttribute('aria-invalid', 'true')
})

test('does not set aria-invalid when error text is not present', () => {
  render(<DateTimeControl label="Label" />)
  expect(screen.getByLabelText('Label')).not.toHaveAttribute('aria-invalid')
})

test('does not set aria-errormessage when error text is not present', () => {
  render(<DateTimeControl label="Label" helpText="Help text" />)
  expect(screen.getByLabelText('Label')).not.toHaveAttribute('aria-errormessage')
})

test('does not set aria-describedby when error text is present', () => {
  render(<DateTimeControl label="Label" helpText="Help text" errorText="Error text" />)
  expect(screen.getByLabelText('Label')).not.toHaveAttribute('aria-describedby')
})

test('sets data-show-validity="true" on the input when error text is present', () => {
  render(<DateTimeControl label="Label" errorText="Error text" />)
  expect(screen.getByLabelText('Label')).toHaveAttribute('data-show-validity', 'true')
})

test('does not set data-show-validity="true" on the input when no error text is present', () => {
  render(<DateTimeControl label="Label" />)
  expect(screen.getByLabelText('Label')).not.toHaveAttribute('data-show-validity', 'true')
})

test('respects an explicit showValidity={false} override even when error text is present', () => {
  render(<DateTimeControl label="Label" errorText="Error text" showValidity={false} />)
  expect(screen.getByLabelText('Label')).toHaveAttribute('data-show-validity', 'false')
})

test('forwards a ref to the underlying input element', () => {
  const ref = { current: null }
  render(<DateTimeControl label="Label" ref={ref} />)
  expect(ref.current).toBe(screen.getByLabelText('Label'))
})
