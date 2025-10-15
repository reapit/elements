import { TextControl } from '../text-control'
import { render, screen } from '@testing-library/react'

test('renders a text input', () => {
  render(<TextControl label="Label" />)
  expect(screen.getByRole('textbox')).toBeInTheDocument()
})

test('displays error text, when provided', () => {
  render(<TextControl label="Label" helpText="Help text" errorText="Error text" />)
  expect(screen.getByText('Error text')).toBeVisible()
})

test('is described by the error text, when provided', () => {
  render(<TextControl label="Label" helpText="Help text" errorText="Error text" />)
  expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Error text')
})

test('displays help text, when provided and no error is present', () => {
  render(<TextControl label="Label" helpText="Help text" />)
  expect(screen.getByText('Help text')).toBeVisible()
})

test('is described by the help text, when provided and no error is present', () => {
  render(<TextControl label="Label" helpText="Help text" />)
  expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Help text')
})

test('does not display help text when error text is present', () => {
  render(<TextControl label="Label" helpText="Help text" errorText="Error text" />)
  expect(screen.queryByText('Help text')).not.toBeInTheDocument()
})

test('associates the label with the input', () => {
  render(<TextControl label="Name" />)
  expect(screen.getByLabelText('Name')).toBe(screen.getByRole('textbox'))
})

test('forwards additional attributes to the input', () => {
  render(<TextControl data-testid="test-id" label="Label" placeholder="Enter text" />)
  const input = screen.getByTestId('test-id')
  expect(input).toBe(screen.getByRole('textbox'))
  expect(input).toHaveAttribute('placeholder', 'Enter text')
})

test('applies the required attribute to the input', () => {
  render(<TextControl label="Label" required />)
  expect(screen.getByRole('textbox')).toBeRequired()
})

test('supports different input types', () => {
  const { rerender } = render(<TextControl label="Email" type="email" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')

  rerender(<TextControl label="Password" type="password" />)
  expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
})

test('uses provided id for the input', () => {
  render(<TextControl id="custom-id" label="Label" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id')
})

test('generates an id when none is provided', () => {
  render(<TextControl label="Label" />)
  const input = screen.getByRole('textbox')
  expect(input.getAttribute('id')).toBeTruthy()
})
