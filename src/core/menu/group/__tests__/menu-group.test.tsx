import { MenuGroup } from '../menu-group'
import { render, screen } from '@testing-library/react'

test('renders a group element', () => {
  render(<MenuGroup>Group content</MenuGroup>)
  expect(screen.getByRole('group')).toBeVisible()
})

test('renders label when provided', () => {
  render(<MenuGroup label="Test Label">Group content</MenuGroup>)
  expect(screen.getByRole('group', { name: 'Test Label' })).toBeVisible()
})

test('does not render label element when label is not provided', () => {
  const { container } = render(<MenuGroup>Group content</MenuGroup>)

  // Check that no label element exists.
  //
  // NOTE: we can't use ElMenuGroupLabelContainer directly as it won't be interpolated to
  // class name correctly. That only happens when used with Linaria utilities
  const labelElement = container.querySelector('.el-menu-group-label-container')
  expect(labelElement).toBeNull()
})

test('does not wire-up `aria-labelledby` attribute when `aria-label` is provided', () => {
  render(<MenuGroup aria-label="test">Group content</MenuGroup>)
  expect(screen.getByRole('group')).not.toHaveAttribute('aria-labelledby')
})

test('forwards additional props to the group element', () => {
  render(<MenuGroup data-testid="custom-group">Group content</MenuGroup>)
  expect(screen.getByTestId('custom-group')).toBeVisible()
})

test('allows role override', () => {
  render(<MenuGroup role="list">Group content</MenuGroup>)
  expect(screen.getByRole('list')).toBeVisible()
})
