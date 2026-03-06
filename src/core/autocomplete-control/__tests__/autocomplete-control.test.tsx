import { AutocompleteControl } from '../autocomplete-control'
import { Autocomplete } from '#src/core/autocomplete'
import { render, screen } from '@testing-library/react'

test('renders an autocomplete', () => {
  render(
    <AutocompleteControl label="Label">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.getByRole('combobox')).toBeInTheDocument()
})

test('combobox has aria-labelledby pointing to label', () => {
  render(
    <AutocompleteControl label="Search for a user">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">User 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )

  const combobox = screen.getByRole('combobox')
  const labelledBy = combobox.getAttribute('aria-labelledby')

  expect(labelledBy).toBeTruthy()

  const label = document.getElementById(labelledBy!)
  expect(label).toHaveTextContent('Search for a user')
})

test('displays error text, when provided', () => {
  render(
    <AutocompleteControl label="Label" helpText="Help text" errorText="Error text">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.getByText('Error text')).toBeVisible()
})

test('displays help text, when provided and no error is present', () => {
  render(
    <AutocompleteControl label="Label" helpText="Help text">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.getByText('Help text')).toBeVisible()
})

test('hides help text when error text is present', () => {
  render(
    <AutocompleteControl label="Label" helpText="Help text" errorText="Error text">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.queryByText('Help text')).not.toBeInTheDocument()
})

test('associates the label with the autocomplete button', () => {
  render(
    <AutocompleteControl label="Fruit">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.getByLabelText('Fruit')).toBe(screen.getByRole('combobox'))
})

test('applies the disabled attribute to the autocomplete', () => {
  render(
    <AutocompleteControl label="Label" disabled>
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.getByRole('combobox')).toBeDisabled()
})

test('applies the required attribute to the autocomplete', () => {
  render(
    <AutocompleteControl label="Label" required>
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.getByRole('combobox')).toBeRequired()
})

test('uses provided id for the autocomplete button', () => {
  render(
    <AutocompleteControl id="custom-id" label="Label">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('id', 'custom-id')
})

test('generates an id when none is provided', () => {
  render(
    <AutocompleteControl label="Label">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  const button = screen.getByRole('combobox')
  expect(button.getAttribute('id')).toBeTruthy()
})

test('supports different sizes', () => {
  const { rerender } = render(
    <AutocompleteControl label="Label" size="small">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  const buttonContainer = screen.getByRole('combobox').parentElement
  expect(buttonContainer).toHaveAttribute('data-size', 'small')

  rerender(
    <AutocompleteControl label="Label" size="large">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  const buttonContainerLarge = screen.getByRole('combobox').parentElement
  expect(buttonContainerLarge).toHaveAttribute('data-size', 'large')
})

test('renders correctly when multiple is true', () => {
  render(
    <AutocompleteControl label="Label" multiple>
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.getByRole('combobox')).toBeInTheDocument()
})

test('applies maxWidth to form control', () => {
  const { container } = render(
    <AutocompleteControl label="Label" maxWidth="300px">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  const formControl = container.firstChild as HTMLElement
  expect(formControl).toHaveStyle('max-width: 300px')
})

test('renders without visual label when label prop is not provided', () => {
  const { container } = render(
    <AutocompleteControl>
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.getByRole('combobox')).toBeInTheDocument()
  const label = container.querySelector('label')
  expect(label).not.toBeInTheDocument()
})

test('forwards additional attributes to the autocomplete', () => {
  render(
    <AutocompleteControl data-testid="test-id" label="Label">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  const autocomplete = screen.getByTestId('test-id')
  expect(autocomplete).toContainElement(screen.getByRole('combobox'))
})

test('is described by the help text, when provided and no error is present', () => {
  render(
    <AutocompleteControl label="Label" helpText="Help text">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  const combobox = screen.getByRole('combobox')
  expect(combobox).toHaveAttribute('aria-describedby')
  expect(combobox).toHaveAccessibleDescription('Help text')
  expect(combobox).not.toHaveAttribute('aria-errormessage')
  expect(combobox).not.toHaveAttribute('aria-invalid')
})

test('is described by the error text via aria-errormessage, when provided', () => {
  render(
    <AutocompleteControl label="Label" errorText="Error text">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.getByRole('combobox')).toHaveAccessibleErrorMessage('Error text')
})

test('sets aria-invalid to true when error text is present', () => {
  render(
    <AutocompleteControl label="Label" errorText="Error text">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
})

test('does not set aria-invalid when error text is not present', () => {
  render(
    <AutocompleteControl label="Label">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-invalid')
})

test('does not set aria-errormessage when error text is not present', () => {
  render(
    <AutocompleteControl label="Label" helpText="Help text">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-errormessage')
})

test('does not set aria-describedby when error text is present', () => {
  render(
    <AutocompleteControl label="Label" helpText="Help text" errorText="Error text">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-describedby')
})

test('sets data-show-validity="true" on the autocomplete when error text is present', () => {
  render(
    <AutocompleteControl label="Label" errorText="Error text">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.getByRole('combobox').closest('[data-show-validity]')).toHaveAttribute('data-show-validity', 'true')
})

test('does not set data-show-validity="true" on the autocomplete when no error text is present', () => {
  render(
    <AutocompleteControl label="Label">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.getByRole('combobox').closest('[data-show-validity]')).not.toHaveAttribute('data-show-validity', 'true')
})

test('respects an explicit showValidity={false} override even when error text is present', () => {
  render(
    <AutocompleteControl label="Label" errorText="Error text" showValidity={false}>
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="1">Option 1</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </AutocompleteControl>,
  )
  expect(screen.getByRole('combobox').closest('[data-show-validity]')).toHaveAttribute('data-show-validity', 'false')
})
