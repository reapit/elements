import { SelectNativeControl } from '../select-native-control'
import { render, screen } from '@testing-library/react'

test('renders a select', () => {
  render(
    <SelectNativeControl label="Label" size="medium">
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  expect(screen.getByRole('combobox', { name: 'Label' })).toBeInTheDocument()
})

test('displays error text, when provided', () => {
  render(
    <SelectNativeControl label="Label" helpText="Help text" errorText="Error text" size="medium">
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  expect(screen.getByText('Error text')).toBeVisible()
})

test('is described by the error text, when provided', () => {
  render(
    <SelectNativeControl label="Label" helpText="Help text" errorText="Error text" size="medium">
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  expect(screen.getByRole('combobox')).toHaveAccessibleDescription('Error text')
})

test('displays help text, when provided and no error is present', () => {
  render(
    <SelectNativeControl label="Label" helpText="Help text" size="medium">
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  expect(screen.getByText('Help text')).toBeVisible()
})

test('is described by the help text, when provided and no error is present', () => {
  render(
    <SelectNativeControl label="Label" helpText="Help text" size="medium">
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  expect(screen.getByRole('combobox')).toHaveAccessibleDescription('Help text')
})

test('does not display help text when error text is present', () => {
  render(
    <SelectNativeControl label="Label" helpText="Help text" errorText="Error text" size="medium">
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  expect(screen.queryByText('Help text')).not.toBeInTheDocument()
})

test('uses provided id for the select', () => {
  render(
    <SelectNativeControl id="custom-id" label="Label" size="medium">
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('id', 'custom-id')
})

test('generates an id when none is provided', () => {
  render(
    <SelectNativeControl label="Label" size="medium">
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('id')
})

test('forwards additional attributes to the select', () => {
  render(
    <SelectNativeControl data-testid="test-id" label="Label" name="portfolio" size="medium">
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  const select = screen.getByTestId('test-id')
  expect(select).toBe(screen.getByRole('combobox'))
  expect(select).toHaveAttribute('name', 'portfolio')
})
