import { Autocomplete } from '../autocomplete'
import { Combobox } from '#src/core/combobox'
import { render, screen } from '@testing-library/react'

test('renders children inside popup', () => {
  render(
    <Combobox>
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <div data-testid="popup-content">Popup content</div>
      </Autocomplete.Popup>
    </Combobox>,
  )
  expect(screen.getByTestId('popup-content')).toBeInTheDocument()
})

test('renders search input', () => {
  render(
    <Combobox>
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" placeholder="Search..." />}>
        <Autocomplete.Listbox />
      </Autocomplete.Popup>
    </Combobox>,
  )
  expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
})

test('forwards additional props to underlying element', () => {
  render(
    <Combobox>
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />} data-testid="my-popup">
        <Autocomplete.Listbox />
      </Autocomplete.Popup>
    </Combobox>,
  )
  expect(screen.getByTestId('my-popup')).toBeInTheDocument()
})

test('uses auto as default closeOnSelection value', () => {
  render(
    <Combobox>
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox />
      </Autocomplete.Popup>
    </Combobox>,
  )
  expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('data-close-on-selection', 'auto')
})

test('accepts closeOnSelection prop', () => {
  render(
    <Combobox>
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />} closeOnSelection="never">
        <Autocomplete.Listbox />
      </Autocomplete.Popup>
    </Combobox>,
  )
  expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('data-close-on-selection', 'never')
})

test('renders with Autocomplete.Listbox', () => {
  render(
    <Combobox>
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox>
          <Autocomplete.Option value="option1">Option 1</Autocomplete.Option>
          <Autocomplete.Option value="option2">Option 2</Autocomplete.Option>
        </Autocomplete.Listbox>
      </Autocomplete.Popup>
    </Combobox>,
  )
  // Verify component renders without errors - listbox is inside the popup dialog
  expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument()
})
