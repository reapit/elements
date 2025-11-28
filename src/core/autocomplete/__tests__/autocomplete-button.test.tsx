import { Autocomplete } from '../autocomplete'
import { Combobox } from '#src/core/combobox'
import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'

vi.mock('#src/core/combobox/popup-dialog')

test('renders a combobox element', () => {
  render(
    <Combobox>
      <Autocomplete.Button />
    </Combobox>,
  )
  expect(screen.getByRole('combobox')).toBeVisible()
})

test('displays default placeholder text when no placeholder is provided', () => {
  render(
    <Combobox>
      <Autocomplete.Button />
    </Combobox>,
  )
  expect(screen.getByRole('combobox')).toHaveTextContent('Search...')
})

test('displays custom placeholder text', () => {
  render(
    <Combobox>
      <Autocomplete.Button placeholder="Find an item..." />
    </Combobox>,
  )
  expect(screen.getByRole('combobox')).toHaveTextContent('Find an item...')
})

test('displays placeholder text in multi-select mode', () => {
  render(
    <Combobox multiple>
      <Autocomplete.Button placeholder="Search items..." />
    </Combobox>,
  )
  expect(screen.getByRole('combobox')).toHaveTextContent('Search items...')
})

test('renders search icon when there is no selection', () => {
  render(
    <Combobox>
      <Autocomplete.Button />
    </Combobox>,
  )
  const button = screen.getByRole('combobox')
  const searchIcon = button.querySelector('svg[aria-hidden="true"]')
  expect(searchIcon).toBeVisible()
})

test('does not render clear button when there is no selection', () => {
  render(
    <Combobox>
      <Autocomplete.Button />
    </Combobox>,
  )
  expect(screen.queryByRole('button', { name: 'Clear selection' })).not.toBeInTheDocument()
})

test('does not render clear button in multi-select mode', () => {
  render(
    <Combobox multiple>
      <Autocomplete.Button />
    </Combobox>,
  )
  expect(screen.queryByRole('button', { name: 'Clear selection' })).not.toBeInTheDocument()
})

test('calls onClick handler when clicked', () => {
  const onClick = vi.fn()
  render(
    <Combobox>
      <Autocomplete.Button onClick={onClick} />
    </Combobox>,
  )

  fireEvent.click(screen.getByRole('combobox'))

  expect(onClick).toHaveBeenCalledTimes(1)
})

test('forwards additional props to underlying element', () => {
  render(
    <Combobox>
      <Autocomplete.Button data-testid="my-autocomplete-button" />
    </Combobox>,
  )
  expect(screen.getByTestId('my-autocomplete-button')).toBeVisible()
})

test('is disabled when Combobox is disabled', () => {
  render(
    <Combobox disabled>
      <Autocomplete.Button />
    </Combobox>,
  )
  expect(screen.getByRole('combobox')).toBeDisabled()
})

test('has correct aria-controls attribute', () => {
  render(
    <Combobox>
      <Autocomplete.Button />
    </Combobox>,
  )
  const combobox = screen.getByRole('combobox')
  expect(combobox).toHaveAttribute('aria-controls')
  expect(combobox.getAttribute('aria-controls')).toMatch(/-popup$/)
})

test('does not have aria-expanded when popup is closed', () => {
  render(
    <Combobox>
      <Autocomplete.Button />
    </Combobox>,
  )
  expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-expanded')
})

test('has aria-required true when Combobox is required', () => {
  render(
    <Combobox required>
      <Autocomplete.Button />
    </Combobox>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true')
})

test('has aria-required false when Combobox is not required', () => {
  render(
    <Combobox>
      <Autocomplete.Button />
    </Combobox>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'false')
})

test('applies small size from context', () => {
  const { container } = render(
    <Combobox size="small">
      <Autocomplete.Button />
    </Combobox>,
  )
  // data-size is on the parent container, not the combobox button itself
  expect(container.querySelector('[data-size="small"]')).toBeInTheDocument()
})

test('applies medium size from context', () => {
  const { container } = render(
    <Combobox size="medium">
      <Autocomplete.Button />
    </Combobox>,
  )
  // data-size is on the parent container, not the combobox button itself
  expect(container.querySelector('[data-size="medium"]')).toBeInTheDocument()
})

test('applies large size from context', () => {
  const { container } = render(
    <Combobox size="large">
      <Autocomplete.Button />
    </Combobox>,
  )
  // data-size is on the parent container, not the combobox button itself
  expect(container.querySelector('[data-size="large"]')).toBeInTheDocument()
})
