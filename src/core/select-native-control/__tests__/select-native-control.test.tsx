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

test('is described by the error text via aria-errormessage, when provided', () => {
  render(
    <SelectNativeControl label="Label" helpText="Help text" errorText="Error text" size="medium">
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  expect(screen.getByRole('combobox')).toHaveAccessibleErrorMessage('Error text')
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
  const combobox = screen.getByRole('combobox')
  expect(combobox).toHaveAttribute('aria-describedby')
  expect(combobox).toHaveAccessibleDescription('Help text')
  expect(combobox).not.toHaveAttribute('aria-errormessage')
  expect(combobox).not.toHaveAttribute('aria-invalid')
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

test('sets aria-invalid to true when error text is present', () => {
  render(
    <SelectNativeControl label="Label" errorText="Error text" size="medium">
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
})

test('does not set aria-invalid when error text is not present', () => {
  render(
    <SelectNativeControl label="Label" size="medium">
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-invalid')
})

test('does not set aria-errormessage when error text is not present', () => {
  render(
    <SelectNativeControl label="Label" helpText="Help text" size="medium">
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-errormessage')
})

test('does not set aria-describedby when error text is present', () => {
  render(
    <SelectNativeControl label="Label" helpText="Help text" errorText="Error text" size="medium">
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-describedby')
})

test('sets data-show-validity="true" on the select when error text is present', () => {
  render(
    <SelectNativeControl label="Label" errorText="Error text" size="medium">
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('data-show-validity', 'true')
})

test('does not set data-show-validity="true" on the select when no error text is present', () => {
  render(
    <SelectNativeControl label="Label" size="medium">
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  expect(screen.getByRole('combobox')).not.toHaveAttribute('data-show-validity', 'true')
})

test('respects an explicit showValidity={false} override even when error text is present', () => {
  render(
    <SelectNativeControl label="Label" errorText="Error text" showValidity={false} size="medium">
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('data-show-validity', 'false')
})

test('forwards a ref to the underlying select element', () => {
  const ref = { current: null }
  render(
    <SelectNativeControl label="Label" size="medium" ref={ref}>
      <option value="option1">Option 1</option>
    </SelectNativeControl>,
  )
  expect(ref.current).toBe(screen.getByRole('combobox'))
})
