import { ComboboxOptgroup } from '../optgroup'
import { render, screen } from '@testing-library/react'

test('renders a group element', () => {
  render(<ComboboxOptgroup>Group content</ComboboxOptgroup>)
  expect(screen.getByRole('group')).toBeVisible()
})

test('renders label when provided', () => {
  render(<ComboboxOptgroup label="Test Label">Group content</ComboboxOptgroup>)
  expect(screen.getByRole('group', { name: 'Test Label' })).toBeVisible()
})

test('does not render label element when label is not provided', () => {
  const { container } = render(<ComboboxOptgroup>Group content</ComboboxOptgroup>)

  // Check that no label element exists.
  //
  // NOTE: we can't use ElComboboxOptgroupLabelContainer directly as it won't be interpolated to
  // class name correctly. That only happens when used with Linaria utilities
  const labelElement = container.querySelector('.el-combobox-optgroup-label-container')
  expect(labelElement).toBeNull()
})

test('does not wire-up `aria-labelledby` attribute when `aria-label` is provided', () => {
  render(<ComboboxOptgroup aria-label="test">Group content</ComboboxOptgroup>)
  expect(screen.getByRole('group')).not.toHaveAttribute('aria-labelledby')
})

test('forwards additional props to the group element', () => {
  render(<ComboboxOptgroup data-testid="custom-group">Group content</ComboboxOptgroup>)
  expect(screen.getByTestId('custom-group')).toBeVisible()
})
