import { CompactSelectNative } from '../compact-select-native'
import { render, screen, fireEvent } from '@testing-library/react'

test('renders a select element', () => {
  render(
    <CompactSelectNative {...defaultProps}>
      <option value="">Select portfolio</option>
      <option value="portfolio1">Portfolio 1</option>
    </CompactSelectNative>,
  )
  expect(screen.getByRole('combobox')).toBeVisible()
})

test('applies correct data-size attribute', () => {
  render(
    <CompactSelectNative {...defaultProps} size="large">
      <option value="">Select portfolio</option>
    </CompactSelectNative>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('data-size', 'large')
})

test('options are accessible', () => {
  render(
    <CompactSelectNative {...defaultProps}>
      <option value="">Select portfolio</option>
      <option value="portfolio1">Portfolio 1</option>
      <option value="portfolio2">Portfolio 2</option>
    </CompactSelectNative>,
  )

  expect(screen.getByRole('option', { name: 'Select portfolio' })).toBeVisible()
  expect(screen.getByRole('option', { name: 'Portfolio 1' })).toBeVisible()
  expect(screen.getByRole('option', { name: 'Portfolio 2' })).toBeVisible()
})

test('option groups are accessible', () => {
  render(
    <CompactSelectNative {...defaultProps}>
      <option value="">Select portfolio</option>
      <optgroup label="Personal">
        <option value="personal1">Personal 1</option>
      </optgroup>
      <optgroup label="Business">
        <option value="business1">Business 1</option>
      </optgroup>
    </CompactSelectNative>,
  )

  expect(screen.getByRole('group', { name: 'Personal' })).toBeVisible()
  expect(screen.getByRole('group', { name: 'Business' })).toBeVisible()
})

test("the select's default value can be specified", () => {
  render(
    <CompactSelectNative {...defaultProps} defaultValue="portfolio1">
      <option value="">Select portfolio</option>
      <option value="portfolio1">Portfolio 1</option>
      <option value="portfolio2">Portfolio 2</option>
    </CompactSelectNative>,
  )
  expect(screen.getByRole('combobox')).toHaveValue('portfolio1')
})

test('handles changes to the selected value when uncontrolled', () => {
  const handleChange = vi.fn()

  render(
    <CompactSelectNative {...defaultProps} onChange={handleChange}>
      <option value="">Select portfolio</option>
      <option value="portfolio1">Portfolio 1</option>
      <option value="portfolio2">Portfolio 2</option>
    </CompactSelectNative>,
  )

  const select = screen.getByRole('combobox')
  fireEvent.change(select, { target: { value: 'portfolio2' } })

  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(select).toHaveValue('portfolio2')
})

test("the select's value can be controlled", () => {
  const handleChange = vi.fn()

  render(
    <CompactSelectNative {...defaultProps} onChange={handleChange} value="portfolio1">
      <option value="">Select portfolio</option>
      <option value="portfolio1">Portfolio 1</option>
      <option value="portfolio2">Portfolio 2</option>
    </CompactSelectNative>,
  )

  const select = screen.getByRole('combobox')
  // The value is pinned to "Portfolio 1" so selecting a different option should not change the selected value.
  fireEvent.change(select, { target: { value: 'portfolio2' } })

  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(select).toHaveValue('portfolio1')
})

test('can be disabled', () => {
  render(
    <CompactSelectNative {...defaultProps} disabled>
      <option value="">Select portfolio</option>
    </CompactSelectNative>,
  )
  expect(screen.getByRole('combobox')).toBeDisabled()
})

test('forwards ref to select element', () => {
  const ref = vi.fn()

  render(
    <CompactSelectNative {...defaultProps} ref={ref}>
      <option value="">Select portfolio</option>
    </CompactSelectNative>,
  )

  expect(ref).toHaveBeenCalledWith(expect.any(HTMLSelectElement))
})

test('forwards additional props to select element', () => {
  render(
    <CompactSelectNative {...defaultProps} data-testid="custom-select">
      <option value="">Select portfolio</option>
    </CompactSelectNative>,
  )
  expect(screen.getByTestId('custom-select')).toBeVisible()
})

test('renders chevron icon', () => {
  const { container } = render(
    <CompactSelectNative {...defaultProps}>
      <option value="">Select portfolio</option>
    </CompactSelectNative>,
  )
  expect(container.querySelector('svg')).toBeVisible()
})

const defaultProps = {
  'aria-label': 'Select portfolio',
  size: 'small',
} as const
