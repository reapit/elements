import { SelectControl } from '../select-control'
import { Select } from '#src/core/select'
import { render, screen } from '@testing-library/react'

test('renders a select', () => {
  render(
    <SelectControl label="Label">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  expect(screen.getByRole('combobox')).toBeInTheDocument()
})

test('combobox has aria-labelledby pointing to label', () => {
  render(
    <SelectControl label="Choose a fruit">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )

  const combobox = screen.getByRole('combobox')
  const labelledBy = combobox.getAttribute('aria-labelledby')

  expect(labelledBy).toBeTruthy()

  const label = document.getElementById(labelledBy!)
  expect(label).toHaveTextContent('Choose a fruit')
})

test('displays error text, when provided', () => {
  render(
    <SelectControl label="Label" helpText="Help text" errorText="Error text">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  expect(screen.getByText('Error text')).toBeVisible()
})

test('is described by the error text via aria-errormessage, when provided', () => {
  render(
    <SelectControl label="Label" helpText="Help text" errorText="Error text">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  expect(screen.getByRole('combobox')).toHaveAccessibleErrorMessage('Error text')
})

test('displays help text, when provided and no error is present', () => {
  render(
    <SelectControl label="Label" helpText="Help text">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  expect(screen.getByText('Help text')).toBeVisible()
})

test('is described by the help text, when provided and no error is present', () => {
  render(
    <SelectControl label="Label" helpText="Help text">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  const combobox = screen.getByRole('combobox')
  expect(combobox).toHaveAttribute('aria-describedby')
  expect(combobox).toHaveAccessibleDescription('Help text')
  expect(combobox).not.toHaveAttribute('aria-errormessage')
  expect(combobox).not.toHaveAttribute('aria-invalid')
})

test('does not display help text when error text is present', () => {
  render(
    <SelectControl label="Label" helpText="Help text" errorText="Error text">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  expect(screen.queryByText('Help text')).not.toBeInTheDocument()
})

test('associates the label with the select button', () => {
  render(
    <SelectControl label="Fruit">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  expect(screen.getByLabelText('Fruit')).toBe(screen.getByRole('combobox'))
})

test('applies the disabled attribute to the select', () => {
  render(
    <SelectControl label="Label" disabled>
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  expect(screen.getByRole('combobox')).toBeDisabled()
})

test('applies the required attribute to the select', () => {
  render(
    <SelectControl label="Label" required>
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  expect(screen.getByRole('combobox')).toBeRequired()
})

test('uses provided id for the select button', () => {
  render(
    <SelectControl id="custom-id" label="Label">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('id', 'custom-id')
})

test('generates an id when none is provided', () => {
  render(
    <SelectControl label="Label">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  const button = screen.getByRole('combobox')
  expect(button.getAttribute('id')).toBeTruthy()
})

test('supports different sizes', () => {
  const { rerender } = render(
    <SelectControl label="Label" size="small">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  const buttonContainer = screen.getByRole('combobox').parentElement
  expect(buttonContainer).toHaveAttribute('data-size', 'small')

  rerender(
    <SelectControl label="Label" size="large">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  const buttonContainerLarge = screen.getByRole('combobox').parentElement
  expect(buttonContainerLarge).toHaveAttribute('data-size', 'large')
})

test('forwards additional attributes to the select', () => {
  render(
    <SelectControl data-testid="test-id" label="Label">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  const select = screen.getByTestId('test-id')
  expect(select).toContainElement(screen.getByRole('combobox'))
})

test('sets aria-invalid to true when error text is present', () => {
  render(
    <SelectControl label="Label" errorText="Error text">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
})

test('does not set aria-invalid when error text is not present', () => {
  render(
    <SelectControl label="Label">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-invalid')
})

test('does not set aria-errormessage when error text is not present', () => {
  render(
    <SelectControl label="Label" helpText="Help text">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-errormessage')
})

test('does not set aria-describedby when error text is present', () => {
  render(
    <SelectControl label="Label" helpText="Help text" errorText="Error text">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-describedby')
})

test('sets data-show-validity="true" on the select when error text is present', () => {
  render(
    <SelectControl label="Label" errorText="Error text">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  expect(screen.getByRole('combobox').closest('[data-show-validity]')).toHaveAttribute('data-show-validity', 'true')
})

test('does not set data-show-validity="true" on the select when no error text is present', () => {
  render(
    <SelectControl label="Label">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  expect(screen.getByRole('combobox').closest('[data-show-validity]')).not.toHaveAttribute('data-show-validity', 'true')
})

test('respects an explicit showValidity={false} override even when error text is present', () => {
  render(
    <SelectControl label="Label" errorText="Error text" showValidity={false}>
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="apple">Apple</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </SelectControl>,
  )
  expect(screen.getByRole('combobox').closest('[data-show-validity]')).toHaveAttribute('data-show-validity', 'false')
})
