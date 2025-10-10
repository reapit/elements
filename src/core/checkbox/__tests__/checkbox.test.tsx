import { Checkbox } from '../checkbox'
import { render, screen } from '@testing-library/react'

test('renders a checkbox', () => {
  render(<Checkbox label="Label" />)
  expect(screen.getByRole('checkbox', { name: 'Label' })).toBeVisible()
})

test('displays a required indicator when required', () => {
  render(<Checkbox label="Label" required />)
  expect(screen.getByRole('checkbox', { name: 'Label (Required)' })).toBeVisible()
})

test('checkbox is described by the supplementary info, when provided', () => {
  render(<Checkbox label="Label" supplementaryInfo="Description" />)
  expect(screen.getByRole('checkbox')).toHaveAccessibleDescription('Description')
})

test('forwards additional props to the checkbox', () => {
  render(<Checkbox data-testid="my-checkbox" label="Label" />)
  expect(screen.getByRole('checkbox')).toHaveAttribute('data-testid', 'my-checkbox')
})
