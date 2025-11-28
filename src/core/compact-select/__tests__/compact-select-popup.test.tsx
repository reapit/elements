import { CompactSelect } from '../compact-select'
import { render, screen } from '@testing-library/react'

test('renders children inside popup', () => {
  render(
    <CompactSelect>
      <CompactSelect.Popup>
        <div data-testid="popup-content">Popup content</div>
      </CompactSelect.Popup>
    </CompactSelect>,
  )
  expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument()
})

test('uses auto as default closeOnSelection value', () => {
  render(
    <CompactSelect>
      <CompactSelect.Popup>
        <CompactSelect.Listbox />
      </CompactSelect.Popup>
    </CompactSelect>,
  )
  expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('data-close-on-selection', 'auto')
})

test('accepts closeOnSelection prop', () => {
  render(
    <CompactSelect>
      <CompactSelect.Popup closeOnSelection="never">
        <CompactSelect.Listbox />
      </CompactSelect.Popup>
    </CompactSelect>,
  )
  expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('data-close-on-selection', 'never')
})

test('forwards additional props to underlying element', () => {
  render(
    <CompactSelect>
      <CompactSelect.Popup data-testid="my-popup">
        <CompactSelect.Listbox />
      </CompactSelect.Popup>
    </CompactSelect>,
  )
  expect(screen.getByTestId('my-popup')).toBe(screen.getByRole('dialog', { hidden: true }))
})
