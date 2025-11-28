import { Autocomplete } from '../autocomplete'
import { render, screen } from '@testing-library/react'

test('renders a combobox', () => {
  render(
    <Autocomplete>
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox />
      </Autocomplete.Popup>
    </Autocomplete>,
  )
  expect(screen.getByRole('combobox')).toBeVisible()
})

test('renders with dialog', () => {
  render(
    <Autocomplete>
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox />
      </Autocomplete.Popup>
    </Autocomplete>,
  )
  expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument()
})

test('renders with listbox', () => {
  render(
    <Autocomplete>
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox />
      </Autocomplete.Popup>
    </Autocomplete>,
  )
  expect(screen.getByRole('listbox', { hidden: true })).toBeInTheDocument()
})

test('can be disabled', () => {
  render(
    <Autocomplete disabled>
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox />
      </Autocomplete.Popup>
    </Autocomplete>,
  )
  expect(screen.getByRole('combobox')).toBeDisabled()
})

test('can be required', () => {
  render(
    <Autocomplete required>
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox />
      </Autocomplete.Popup>
    </Autocomplete>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true')
})

test('supports small size', () => {
  const { container } = render(
    <Autocomplete size="small">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox />
      </Autocomplete.Popup>
    </Autocomplete>,
  )
  expect(container.querySelector('[data-size="small"]')).toBeVisible()
})

test('supports medium size', () => {
  const { container } = render(
    <Autocomplete size="medium">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox />
      </Autocomplete.Popup>
    </Autocomplete>,
  )
  expect(container.querySelector('[data-size="medium"]')).toBeVisible()
})

test('supports large size', () => {
  const { container } = render(
    <Autocomplete size="large">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox />
      </Autocomplete.Popup>
    </Autocomplete>,
  )
  expect(container.querySelector('[data-size="large"]')).toBeVisible()
})

test('forwards additional props to underlying element', () => {
  render(
    <Autocomplete data-testid="my-autocomplete" className="custom-class">
      <Autocomplete.Button />
      <Autocomplete.Popup search={<Autocomplete.SearchInput aria-label="Search" />}>
        <Autocomplete.Listbox />
      </Autocomplete.Popup>
    </Autocomplete>,
  )
  expect(screen.getByTestId('my-autocomplete')).toBeVisible()
  expect(screen.getByTestId('my-autocomplete')).toHaveClass('custom-class')
})

test('exposes Button component', () => {
  expect(Autocomplete.Button).toBeDefined()
})

test('exposes Divider component', () => {
  expect(Autocomplete.Divider).toBeDefined()
})

test('exposes Listbox component', () => {
  expect(Autocomplete.Listbox).toBeDefined()
})

test('exposes Option component', () => {
  expect(Autocomplete.Option).toBeDefined()
})

test('exposes OptionAdditionalInfo component', () => {
  expect(Autocomplete.OptionAdditionalInfo).toBeDefined()
})

test('exposes Optgroup component', () => {
  expect(Autocomplete.Optgroup).toBeDefined()
})

test('exposes Placeholder component', () => {
  expect(Autocomplete.Placeholder).toBeDefined()
})

test('exposes Popup component', () => {
  expect(Autocomplete.Popup).toBeDefined()
})

test('exposes SearchInput component', () => {
  expect(Autocomplete.SearchInput).toBeDefined()
})

test('exposes SelectionChips component', () => {
  expect(Autocomplete.SelectionChips).toBeDefined()
})

test('exposes getValue utility function', () => {
  expect(Autocomplete.getValue).toBeDefined()
})

test('exposes getListboxId utility function', () => {
  expect(Autocomplete.getListboxId).toBeDefined()
})

test('exposes getPopupId utility function', () => {
  expect(Autocomplete.getPopupId).toBeDefined()
})

test('exposes useState hook', () => {
  expect(Autocomplete.useState).toBeDefined()
})
