import { Autocomplete } from '../autocomplete'
import { render, screen } from '@testing-library/react'

test('renders children inside popup', () => {
  render(
    <Autocomplete>
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <div data-testid="popup-content">Popup content</div>
      </Autocomplete.Popup>
    </Autocomplete>,
  )
  expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument()
})

test('renders search input', () => {
  render(
    <Autocomplete>
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" placeholder="Search..." />}>
        <Autocomplete.Listbox />
      </Autocomplete.Popup>
    </Autocomplete>,
  )
  expect(screen.getByRole('textbox', { hidden: true, name: 'Search' })).toBeInTheDocument()
})

test('uses auto as default closeOnSelection value', () => {
  render(
    <Autocomplete>
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox />
      </Autocomplete.Popup>
    </Autocomplete>,
  )
  expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('data-close-on-selection', 'auto')
})

test('accepts closeOnSelection prop', () => {
  render(
    <Autocomplete>
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />} closeOnSelection="never">
        <Autocomplete.Listbox />
      </Autocomplete.Popup>
    </Autocomplete>,
  )
  expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('data-close-on-selection', 'never')
})

test('forwards additional props to underlying element', () => {
  render(
    <Autocomplete>
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />} data-testid="my-popup">
        <Autocomplete.Listbox />
      </Autocomplete.Popup>
    </Autocomplete>,
  )
  expect(screen.getByTestId('my-popup')).toBe(screen.getByRole('dialog', { hidden: true }))
})
