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

test('sets aria-labelledby from context buttonId', () => {
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

test('exposes show static method', () => {
  expect(ComboboxPopup.show).toBeDefined()
  expect(ComboboxPopup.show).toBe(ComboboxPopupDialog.open)
})

test('exposes hide static method', () => {
  expect(ComboboxPopup.hide).toBeDefined()
  expect(ComboboxPopup.hide).toBe(ComboboxPopupDialog.close)
})

const defaultContext: ComboboxContext.Value = {
  buttonId: 'button-id',
  disabled: false,
  listboxId: 'listbox-id',
  popupId: 'popup-id',
  required: false,
  size: 'medium',
}
