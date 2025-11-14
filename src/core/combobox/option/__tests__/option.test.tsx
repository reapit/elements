import { ComboboxOption } from '../option'
import { render, screen } from '@testing-library/react'

test('renders an option element', () => {
  render(<ComboboxOption value="test-value">Option text</ComboboxOption>)
  expect(screen.getByRole('option', { name: 'Option text' })).toBeVisible()
})

test('always renders as a button element with type="button"', () => {
  render(<ComboboxOption value="test-value">Option text</ComboboxOption>)
  const option = screen.getByRole('option')
  expect(option.tagName).toBe('BUTTON')
  expect(option).toHaveAttribute('type', 'button')
})

test('can display a badge', () => {
  render(
    <ComboboxOption value="test-value" badge="Badge">
      Option text
    </ComboboxOption>,
  )
  expect(screen.getByText('Badge')).toBeVisible()
})

test('can display additional information', () => {
  render(
    <ComboboxOption additionalInfo="Additional info" value="test-value">
      Option text
    </ComboboxOption>,
  )
  expect(screen.getByText('Additional info')).toBeVisible()
})

test('has an `aria-details` attribute when a badge and/or supplementary info are provided', () => {
  render(
    <ComboboxOption badge="Badge" value="test-value">
      Option text
    </ComboboxOption>,
  )
  expect(screen.getByRole('option')).toHaveAttribute('aria-details')
})

test('has an `aria-details` attribute when additional info is provided', () => {
  render(
    <ComboboxOption additionalInfo="Additional info" value="test-value">
      Option text
    </ComboboxOption>,
  )
  expect(screen.getByRole('option')).toHaveAttribute('aria-details')
})

test('has an `aria-details` attribute when both a badge and additional info are provided', () => {
  render(
    <ComboboxOption badge="Badge" additionalInfo="Additional info" value="test-value">
      Option text
    </ComboboxOption>,
  )
  expect(screen.getByRole('option')).toHaveAttribute('aria-details')
})

test('renders a check icon', () => {
  const { container } = render(<ComboboxOption value="test-value">Option text</ComboboxOption>)

  // Check icon is rendered within an aria-hidden container
  const checkIconContainer = container.querySelector('[aria-hidden="true"]')
  expect(checkIconContainer).toBeInTheDocument()

  // Verify the SVG icon is present
  const icon = checkIconContainer?.querySelector('svg')
  expect(icon).toBeInTheDocument()
})

test('does not render supplementary info container when supplementaryInfo is not provided', () => {
  const { container } = render(<ComboboxOption value="test-value">Option text</ComboboxOption>)

  // Check that no supplementary info container exists
  const supplementaryContainer = container.querySelector('.el-combobox-option-supplementary-info-container')
  expect(supplementaryContainer).toBeNull()
})

test('does not render badge container when badge is not provided', () => {
  const { container } = render(<ComboboxOption value="test-value">Option text</ComboboxOption>)

  // Check that no badge container exists within the label
  const badgeContainer = container.querySelector('.el-combobox-option-badge-container')
  expect(badgeContainer).toBeNull()
})

test('forwards additional props to the option element', () => {
  render(
    <ComboboxOption value="test-value" data-testid="custom-option">
      Option text
    </ComboboxOption>,
  )
  expect(screen.getByTestId('custom-option')).toBe(screen.getByRole('option'))
})
