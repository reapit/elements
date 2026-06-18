import { NumberControl } from '../number-control'
import { render, screen } from '@testing-library/react'

test('renders a text input with inputMode="decimal"', () => {
  render(<NumberControl label="Amount" />)
  const input = screen.getByRole('textbox')
  expect(input).toHaveAttribute('type', 'text')
  expect(input).toHaveAttribute('inputMode', 'decimal')
})

test('forwards inputMode="numeric" to the underlying input', () => {
  render(<NumberControl label="Quantity" inputMode="numeric" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('inputMode', 'numeric')
})

test('displays formatted text in an overlay when a value is provided', () => {
  const { container } = render(<NumberControl label="Amount" value="1234567" locale="en-GB" />)
  const overlay = container.querySelector('[data-formatted-overlay]')
  expect(overlay).toHaveTextContent('1,234,567')
})

test('associates the label with the input', () => {
  render(<NumberControl label="Amount" />)
  expect(screen.getByLabelText('Amount')).toBe(screen.getByRole('textbox'))
})

test('displays error text, when provided', () => {
  render(<NumberControl label="Amount" helpText="Help text" errorText="Error text" />)
  expect(screen.getByText('Error text')).toBeVisible()
})

test('is described by the error text via aria-errormessage, when provided', () => {
  render(<NumberControl label="Amount" helpText="Help text" errorText="Error text" />)
  expect(screen.getByRole('textbox')).toHaveAccessibleErrorMessage('Error text')
})

test('displays help text, when provided and no error is present', () => {
  render(<NumberControl label="Amount" helpText="Help text" />)
  expect(screen.getByText('Help text')).toBeVisible()
})

test('is described by the help text, when provided and no error is present', () => {
  render(<NumberControl label="Amount" helpText="Help text" />)
  const input = screen.getByRole('textbox')
  expect(input).toHaveAccessibleDescription('Help text')
  expect(input).not.toHaveAttribute('aria-errormessage')
  expect(input).not.toHaveAttribute('aria-invalid')
})

test('does not display help text when error text is present', () => {
  render(<NumberControl label="Amount" helpText="Help text" errorText="Error text" />)
  expect(screen.queryByText('Help text')).not.toBeInTheDocument()
})

test('forwards additional attributes to the input', () => {
  render(<NumberControl data-testid="test-id" label="Amount" placeholder="0.00" />)
  const input = screen.getByTestId('test-id')
  expect(input).toBe(screen.getByRole('textbox'))
  expect(input).toHaveAttribute('placeholder', '0.00')
})

test('applies the required attribute to the input', () => {
  render(<NumberControl label="Amount" required />)
  expect(screen.getByRole('textbox')).toBeRequired()
})

test('uses provided id for the input', () => {
  render(<NumberControl id="custom-id" label="Amount" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id')
})

test('generates an id when none is provided', () => {
  render(<NumberControl label="Amount" />)
  const input = screen.getByRole('textbox')
  expect(input.getAttribute('id')).toBeTruthy()
})

test('sets aria-invalid to true when error text is present', () => {
  render(<NumberControl label="Amount" errorText="Error text" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
})

test('does not set aria-invalid when error text is not present', () => {
  render(<NumberControl label="Amount" />)
  expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid')
})

test('sets data-show-validity="true" on the input when error text is present', () => {
  render(<NumberControl label="Amount" errorText="Error text" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('data-show-validity', 'true')
})

test('does not set data-show-validity="true" on the input when no error text is present', () => {
  render(<NumberControl label="Amount" />)
  expect(screen.getByRole('textbox')).not.toHaveAttribute('data-show-validity', 'true')
})

test('respects an explicit showValidity={false} override even when error text is present', () => {
  render(<NumberControl label="Amount" errorText="Error text" showValidity={false} />)
  expect(screen.getByRole('textbox')).toHaveAttribute('data-show-validity', 'false')
})

test('forwards a ref to the underlying input element', () => {
  const ref = { current: null }
  render(<NumberControl label="Amount" ref={ref} />)
  expect(ref.current).toBe(screen.getByRole('textbox'))
})

test('forwards NumberInput-specific props', () => {
  const { container } = render(
    <NumberControl label="Amount" value="1234.5" locale="de-DE" formatOptions={{ minimumFractionDigits: 2 }} />,
  )
  const overlay = container.querySelector('[data-formatted-overlay]')
  expect(overlay).toHaveTextContent('1.234,50')
})
