import { SelectNative } from '../select-native'
import { render, screen, fireEvent } from '@testing-library/react'

test('renders a select element', () => {
  render(
    <SelectNative {...defaultProps}>
      <option value="">Select portfolio</option>
      <option value="portfolio1">Portfolio 1</option>
    </SelectNative>,
  )
  expect(screen.getByRole('combobox')).toBeVisible()
})

test('defaults autocomplete attribute to `off`', () => {
  render(
    <SelectNative {...defaultProps} size="large">
      <option value="">Select portfolio</option>
    </SelectNative>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('autocomplete', 'off')
})

test('accepts explicit autocomplete values', () => {
  render(
    <SelectNative {...defaultProps} autoComplete="on" size="large">
      <option value="">Select portfolio</option>
    </SelectNative>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('autocomplete', 'on')
})

test('defaults data-show-validity to `false`', () => {
  render(
    <SelectNative {...defaultProps} size="large">
      <option value="">Select portfolio</option>
    </SelectNative>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('data-show-validity', 'false')
})

test('applies correct data-show-validity attribute', () => {
  render(
    <SelectNative {...defaultProps} showValidity size="large">
      <option value="">Select portfolio</option>
    </SelectNative>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('data-show-validity', 'true')
})

test('applies correct data-size attribute', () => {
  render(
    <SelectNative {...defaultProps} size="large">
      <option value="">Select portfolio</option>
    </SelectNative>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('data-size', 'large')
})

test('options are accessible', () => {
  render(
    <SelectNative {...defaultProps}>
      <option value="">Select portfolio</option>
      <option value="portfolio1">Portfolio 1</option>
      <option value="portfolio2">Portfolio 2</option>
    </SelectNative>,
  )

  expect(screen.getByRole('option', { name: 'Select portfolio' })).toBeVisible()
  expect(screen.getByRole('option', { name: 'Portfolio 1' })).toBeVisible()
  expect(screen.getByRole('option', { name: 'Portfolio 2' })).toBeVisible()
})

test('option groups are accessible', () => {
  render(
    <SelectNative {...defaultProps}>
      <option value="">Select portfolio</option>
      <optgroup label="Personal">
        <option value="personal1">Personal 1</option>
      </optgroup>
      <optgroup label="Business">
        <option value="business1">Business 1</option>
      </optgroup>
    </SelectNative>,
  )

  expect(screen.getByRole('group', { name: 'Personal' })).toBeVisible()
  expect(screen.getByRole('group', { name: 'Business' })).toBeVisible()
})

test("the select's default value can be specified", () => {
  render(
    <SelectNative {...defaultProps} defaultValue="portfolio1">
      <option value="">Select portfolio</option>
      <option value="portfolio1">Portfolio 1</option>
      <option value="portfolio2">Portfolio 2</option>
    </SelectNative>,
  )
  expect(screen.getByRole('combobox')).toHaveValue('portfolio1')
})

test('handles changes to the selected value when uncontrolled', () => {
  const handleChange = vi.fn()

  render(
    <SelectNative {...defaultProps} onChange={handleChange}>
      <option value="">Select portfolio</option>
      <option value="portfolio1">Portfolio 1</option>
      <option value="portfolio2">Portfolio 2</option>
    </SelectNative>,
  )

  const select = screen.getByRole('combobox')
  fireEvent.change(select, { target: { value: 'portfolio2' } })

  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(select).toHaveValue('portfolio2')
})

test("the select's value can be controlled", () => {
  const handleChange = vi.fn()

  render(
    <SelectNative {...defaultProps} onChange={handleChange} value="portfolio1">
      <option value="">Select portfolio</option>
      <option value="portfolio1">Portfolio 1</option>
      <option value="portfolio2">Portfolio 2</option>
    </SelectNative>,
  )

  const select = screen.getByRole('combobox')
  // The value is pinned to "Portfolio 1" so selecting a different option should not change the selected value.
  fireEvent.change(select, { target: { value: 'portfolio2' } })

  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(select).toHaveValue('portfolio1')
})

test('can be disabled', () => {
  render(
    <SelectNative {...defaultProps} disabled>
      <option value="">Select portfolio</option>
    </SelectNative>,
  )
  expect(screen.getByRole('combobox')).toBeDisabled()
})

test('forwards `className` to the root container element', () => {
  const { container } = render(
    <SelectNative {...defaultProps} className="my-class">
      <option value="">Select portfolio</option>
    </SelectNative>,
  )
  expect(container.firstElementChild).toHaveClass('my-class')
  expect(screen.getByRole('combobox')).not.toHaveClass('my-class')
})

test('forwards `style` to the root container element', () => {
  const { container } = render(
    <SelectNative {...defaultProps} style={{ color: 'red' }}>
      <option value="">Select portfolio</option>
    </SelectNative>,
  )
  expect(container.firstElementChild).toHaveStyle({ color: 'red' })
})

test('forwards ref to select element', () => {
  const ref = vi.fn()

  render(
    <SelectNative {...defaultProps} ref={ref}>
      <option value="">Select portfolio</option>
    </SelectNative>,
  )

  expect(ref).toHaveBeenCalledWith(expect.any(HTMLSelectElement))
})

test('forwards additional props to select element', () => {
  render(
    <SelectNative {...defaultProps} data-testid="custom-select">
      <option value="">Select portfolio</option>
    </SelectNative>,
  )
  expect(screen.getByTestId('custom-select')).toBeVisible()
})

test('renders chevron icon', () => {
  const { container } = render(
    <SelectNative {...defaultProps}>
      <option value="">Select portfolio</option>
    </SelectNative>,
  )
  expect(container.querySelector('svg')).toBeVisible()
})

const defaultProps = {
  size: 'small',
} as const
