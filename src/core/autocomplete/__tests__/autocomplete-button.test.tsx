import { Autocomplete } from '../autocomplete'
import { render, screen } from '@testing-library/react'

test('renders a combobox element', () => {
  render(
    <Autocomplete>
      <Autocomplete.Button />
    </Autocomplete>,
  )
  expect(screen.getByRole('combobox')).toBeVisible()
})

test('sets default aria-placeholder when no placeholder is provided', () => {
  render(
    <Autocomplete>
      <Autocomplete.Button />
    </Autocomplete>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('aria-placeholder', 'Search...')
})

test('sets custom aria-placeholder', () => {
  render(
    <Autocomplete>
      <Autocomplete.Button placeholder="Find an item..." />
    </Autocomplete>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('aria-placeholder', 'Find an item...')
})

test('sets aria-placeholder in multi-select mode', () => {
  render(
    <Autocomplete multiple>
      <Autocomplete.Button placeholder="Search items..." />
    </Autocomplete>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('aria-placeholder', 'Search items...')
})

test('renders search icon when there is no selection', () => {
  render(
    <Autocomplete>
      <Autocomplete.Button />
    </Autocomplete>,
  )
  const button = screen.getByRole('combobox')
  const searchIcon = button.querySelector('svg[aria-hidden="true"]')
  expect(searchIcon).toBeVisible()
})

test('does not render clear button when there is no selection', () => {
  render(
    <Autocomplete>
      <Autocomplete.Button />
    </Autocomplete>,
  )
  expect(screen.queryByRole('button', { name: 'Clear selection' })).not.toBeInTheDocument()
})

test('does not render clear button in multi-select mode', () => {
  render(
    <Autocomplete multiple>
      <Autocomplete.Button />
    </Autocomplete>,
  )
  expect(screen.queryByRole('button', { name: 'Clear selection' })).not.toBeInTheDocument()
})

test('is disabled when Combobox is disabled', () => {
  render(
    <Autocomplete disabled>
      <Autocomplete.Button />
    </Autocomplete>,
  )
  expect(screen.getByRole('combobox')).toBeDisabled()
})

test('has correct aria-controls attribute', () => {
  render(
    <Autocomplete>
      <Autocomplete.Button />
    </Autocomplete>,
  )
  const combobox = screen.getByRole('combobox')
  expect(combobox).toHaveAttribute('aria-controls')
  expect(combobox.getAttribute('aria-controls')).toMatch(/-popup$/)
})

test('has aria-expanded="false" when popup is closed', () => {
  render(
    <Autocomplete>
      <Autocomplete.Button />
    </Autocomplete>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
})

test('has aria-required true when Combobox is required', () => {
  render(
    <Autocomplete required>
      <Autocomplete.Button />
    </Autocomplete>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true')
})

test('has aria-required false when Combobox is not required', () => {
  render(
    <Autocomplete>
      <Autocomplete.Button />
    </Autocomplete>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'false')
})

test('applies small size from context', () => {
  const { container } = render(
    <Autocomplete size="small">
      <Autocomplete.Button />
    </Autocomplete>,
  )
  // data-size is on the parent container, not the combobox button itself
  expect(container.querySelector('[data-size="small"]')).toBeInTheDocument()
})

test('applies medium size from context', () => {
  const { container } = render(
    <Autocomplete size="medium">
      <Autocomplete.Button />
    </Autocomplete>,
  )
  // data-size is on the parent container, not the combobox button itself
  expect(container.querySelector('[data-size="medium"]')).toBeInTheDocument()
})

test('applies large size from context', () => {
  const { container } = render(
    <Autocomplete size="large">
      <Autocomplete.Button />
    </Autocomplete>,
  )
  // data-size is on the parent container, not the combobox button itself
  expect(container.querySelector('[data-size="large"]')).toBeInTheDocument()
})

test('forwards additional props to underlying element', () => {
  render(
    <Autocomplete>
      <Autocomplete.Button data-testid="my-autocomplete-button" />
    </Autocomplete>,
  )
  expect(screen.getByTestId('my-autocomplete-button')).toBeVisible()
})
