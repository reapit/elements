import { ComboboxContext } from '../context'
import { ComboboxPopup } from '../combobox-popup'
import { ComboboxPopupDialog } from '../popup-dialog'
import { render, screen } from '@testing-library/react'

test('renders dialog with children', () => {
  render(
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxPopup open variant="popover">
        Test Content
      </ComboboxPopup>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('dialog')).toBeVisible()
})

test('sets aria-labelledby from context comboboxId', () => {
  render(
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxPopup open variant="popover">
        Content
      </ComboboxPopup>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'button-id')
})

test('sets id from context popupId', () => {
  render(
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxPopup open variant="popover">
        Content
      </ComboboxPopup>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('dialog')).toHaveAttribute('id', 'popup-id')
})

test('forwards additional props to dialog element', () => {
  render(
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxPopup data-testid="custom-popup" open>
        Content
      </ComboboxPopup>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('dialog')).toBe(screen.getByRole('dialog'))
})

test('exposes open static method', () => {
  expect(ComboboxPopup.open).toBeDefined()
  expect(ComboboxPopup.open).toBe(ComboboxPopupDialog.open)
})

test('exposes close static method', () => {
  expect(ComboboxPopup.close).toBeDefined()
  expect(ComboboxPopup.close).toBe(ComboboxPopupDialog.close)
})

const defaultContext: ComboboxContext.Value = {
  comboboxId: 'button-id',
  disabled: false,
  listboxId: 'listbox-id',
  multiple: false,
  popupId: 'popup-id',
  required: false,
  size: 'medium',
}
