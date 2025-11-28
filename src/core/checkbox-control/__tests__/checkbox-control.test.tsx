import { CheckboxControl } from '../checkbox-control'
import { render, screen } from '@testing-library/react'

test('renders a checkbox', () => {
  render(<CheckboxControl label="Label" />)
  expect(screen.getByRole('checkbox')).toBeInTheDocument()
})

test('displays error text, when provided', () => {
  render(<CheckboxControl label="Label" supplementaryInfo="Additional info" errorText="Error text" />)
  expect(screen.getByText('Error text')).toBeVisible()
})

test('is described by the error text via aria-errormessage, when provided', () => {
  render(<CheckboxControl label="Label" supplementaryInfo="Additional info" errorText="Error text" />)
  expect(screen.getByRole('checkbox')).toHaveAccessibleErrorMessage('Error text')
})

test('forwards additional attributes to the checkbox', () => {
  render(<CheckboxControl data-testid="test-id" label="Label" value="test-value" />)
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('checkbox'))
})

test('sets aria-invalid to true when error text is present', () => {
  render(<CheckboxControl label="Label" errorText="Error text" />)
  expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true')
})

test('does not set aria-invalid when error text is not present', () => {
  render(<CheckboxControl label="Label" />)
  expect(screen.getByRole('checkbox')).not.toHaveAttribute('aria-invalid')
})

test('does not set aria-errormessage when error text is not present', () => {
  render(<CheckboxControl label="Label" />)
  expect(screen.getByRole('checkbox')).not.toHaveAttribute('aria-errormessage')
})
