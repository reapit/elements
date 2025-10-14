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

test('is described by the error text, when provided', () => {
  render(<CheckboxControl label="Label" supplementaryInfo="Additional info" errorText="Error text" />)
  expect(screen.getByRole('checkbox')).toHaveAccessibleDescription('Error text')
})

test('forwards additional attributes to the checkbox', () => {
  render(<CheckboxControl data-testid="test-id" label="Label" value="test-value" />)
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('checkbox'))
})
