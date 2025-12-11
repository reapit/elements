import { render, screen } from '@testing-library/react'
import { Select } from '../select'

test('renders a combobox element', () => {
  render(
    <Select>
      <Select.Button />
    </Select>,
  )
  expect(screen.getByRole('combobox')).toBeVisible()
})

test('displays default placeholder text when no placeholder is provided', () => {
  render(
    <Select>
      <Select.Button />
    </Select>,
  )
  expect(screen.getByRole('combobox')).toHaveTextContent('Select an option')
})

test('displays custom placeholder text', () => {
  render(
    <Select>
      <Select.Button placeholder="Find an item..." />
    </Select>,
  )
  expect(screen.getByRole('combobox')).toHaveTextContent('Find an item...')
})

test('displays placeholder text in multi-select mode', () => {
  render(
    <Select multiple>
      <Select.Button placeholder="Search items..." />
    </Select>,
  )
  expect(screen.getByRole('combobox')).toHaveTextContent('Search items...')
})

test('displays open popup button when there is no selection', () => {
  render(
    <Select>
      <Select.Button />
    </Select>,
  )
  expect(screen.queryByRole('button', { name: 'Open popup' })).toBeVisible()
})

test('displays clear button when there is a selection', () => {
  render(
    <Select>
      <Select.Button />
      <Select.Popup>
        <Select.Listbox value={['1']}>
          <Select.Option aria-selected value="1">
            Option 1
          </Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </Select>,
  )
  expect(screen.queryByRole('button', { name: 'Clear selection' })).toBeVisible()
})

test('does not render clear button when there is a selection for multi-selects', () => {
  render(
    <Select multiple>
      <Select.Button />
      <Select.Listbox value={['1']}>
        <Select.Option aria-selected value="1">
          Option 1
        </Select.Option>
      </Select.Listbox>
    </Select>,
  )
  expect(screen.queryByRole('button', { name: 'Clear selection' })).not.toBeInTheDocument()
})

test('is disabled when Combobox is disabled', () => {
  render(
    <Select disabled>
      <Select.Button />
    </Select>,
  )
  expect(screen.getByRole('combobox')).toBeDisabled()
})

test('has correct aria-controls attribute', () => {
  render(
    <Select>
      <Select.Button />
    </Select>,
  )
  const combobox = screen.getByRole('combobox')
  expect(combobox).toHaveAttribute('aria-controls')
  expect(combobox.getAttribute('aria-controls')).toMatch(/-popup$/)
})

test('has aria-expanded="false" when popup is closed', () => {
  render(
    <Select>
      <Select.Button />
    </Select>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
})

test('has aria-required true when Combobox is required', () => {
  render(
    <Select required>
      <Select.Button />
    </Select>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true')
})

test('has aria-required false when Combobox is not required', () => {
  render(
    <Select>
      <Select.Button />
    </Select>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'false')
})

test('applies small size from context', () => {
  const { container } = render(
    <Select size="small">
      <Select.Button />
    </Select>,
  )
  // data-size is on the parent container, not the combobox button itself
  expect(container.querySelector('[data-size="small"]')).toBeInTheDocument()
})

test('applies medium size from context', () => {
  const { container } = render(
    <Select size="medium">
      <Select.Button />
    </Select>,
  )
  // data-size is on the parent container, not the combobox button itself
  expect(container.querySelector('[data-size="medium"]')).toBeInTheDocument()
})

test('applies large size from context', () => {
  const { container } = render(
    <Select size="large">
      <Select.Button />
    </Select>,
  )
  // data-size is on the parent container, not the combobox button itself
  expect(container.querySelector('[data-size="large"]')).toBeInTheDocument()
})

test('forwards additional props to underlying element', () => {
  render(
    <Select>
      <Select.Button data-testid="my-Select-button" />
    </Select>,
  )
  expect(screen.getByTestId('my-Select-button')).toBeVisible()
})
