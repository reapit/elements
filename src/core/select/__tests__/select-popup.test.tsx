import { Select } from '../select'
import { render, screen } from '@testing-library/react'

test('renders children inside popup', () => {
  render(
    <Select>
      <Select.Popup>
        <div data-testid="popup-content">Popup content</div>
      </Select.Popup>
    </Select>,
  )
  expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument()
})

test('uses auto as default closeOnSelection value', () => {
  render(
    <Select>
      <Select.Popup>
        <Select.Listbox />
      </Select.Popup>
    </Select>,
  )
  expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('data-close-on-selection', 'auto')
})

test('accepts closeOnSelection prop', () => {
  render(
    <Select>
      <Select.Popup closeOnSelection="never">
        <Select.Listbox />
      </Select.Popup>
    </Select>,
  )
  expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('data-close-on-selection', 'never')
})

test('forwards additional props to underlying element', () => {
  render(
    <Select>
      <Select.Popup data-testid="my-popup">
        <Select.Listbox />
      </Select.Popup>
    </Select>,
  )
  expect(screen.getByTestId('my-popup')).toBe(screen.getByRole('dialog', { hidden: true }))
})
