import { CompactSelect } from '../compact-select'
import { render, screen } from '@testing-library/react'

test('renders a combobox element', () => {
  render(
    <CompactSelect>
      <CompactSelect.Button />
    </CompactSelect>,
  )
  expect(screen.getByRole('combobox')).toBeVisible()
})

test('displays default placeholder text when no placeholder is provided', () => {
  render(
    <CompactSelect>
      <CompactSelect.Button />
    </CompactSelect>,
  )
  expect(screen.getByRole('combobox')).toHaveTextContent('Select an option')
})

test('displays custom placeholder text', () => {
  render(
    <CompactSelect>
      <CompactSelect.Button placeholder="Find an item..." />
    </CompactSelect>,
  )
  expect(screen.getByRole('combobox')).toHaveTextContent('Find an item...')
})

test('is disabled when Combobox is disabled', () => {
  render(
    <CompactSelect disabled>
      <CompactSelect.Button />
    </CompactSelect>,
  )
  expect(screen.getByRole('combobox')).toBeDisabled()
})

test('has correct aria-controls attribute', () => {
  render(
    <CompactSelect id="my-compact-select">
      <CompactSelect.Button />
    </CompactSelect>,
  )
  const combobox = screen.getByRole('combobox')
  expect(combobox).toHaveAttribute('aria-controls')
  expect(combobox.getAttribute('aria-controls')).toBe('my-compact-select-popup')
})

test('has aria-expanded="false" when popup is closed', () => {
  render(
    <CompactSelect>
      <CompactSelect.Button />
      <CompactSelect.Popup>Child</CompactSelect.Popup>
    </CompactSelect>,
  )
  expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
})

test('applies small size from context', () => {
  const { container } = render(
    <CompactSelect size="small">
      <CompactSelect.Button />
    </CompactSelect>,
  )
  // data-size is on the parent container, not the combobox button itself
  expect(container.querySelector('[data-size="small"]')).toBeInTheDocument()
})

test('applies medium size from context', () => {
  const { container } = render(
    <CompactSelect size="medium">
      <CompactSelect.Button />
    </CompactSelect>,
  )
  // data-size is on the parent container, not the combobox button itself
  expect(container.querySelector('[data-size="medium"]')).toBeInTheDocument()
})

test('applies large size from context', () => {
  const { container } = render(
    <CompactSelect size="large">
      <CompactSelect.Button />
    </CompactSelect>,
  )
  // data-size is on the parent container, not the combobox button itself
  expect(container.querySelector('[data-size="large"]')).toBeInTheDocument()
})

test('forwards additional props to underlying element', () => {
  render(
    <CompactSelect>
      <CompactSelect.Button data-testid="my-CompactSelect-button" />
    </CompactSelect>,
  )
  expect(screen.getByTestId('my-CompactSelect-button')).toBeVisible()
})
