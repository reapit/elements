import { ComboboxPopup } from '../popup'
import { fireEvent, render, screen } from '@testing-library/react'
import { FakeToggleEvent } from './FakeToggleEvent'
import { ComboboxContext } from '../../context'

test('renders a dialog element for the popover variant', () => {
  render(
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxPopup aria-labelledby="label-id" variant="popover">
        Content
      </ComboboxPopup>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('dialog')).toBeVisible()
})

test('renders a dialog element for the drawer variant', () => {
  render(
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxPopup aria-labelledby="label-id" variant="drawer">
        Content
      </ComboboxPopup>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument()
})

test('renders children content in popover variant', () => {
  render(
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxPopup aria-labelledby="label-id" variant="popover">
        Test Content
      </ComboboxPopup>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByText('Test Content')).toBeInTheDocument()
})

// TODO: unskip this test when the combobox has it's own drawer-based popup that doesn't unmount children
// when it is closed.
test.skip('renders children content in drawer variant', () => {
  render(
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxPopup aria-labelledby="label-id" variant="drawer">
        Drawer Content
      </ComboboxPopup>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByText('Drawer Content')).toBeInTheDocument()
})

test('exposes show method', () => {
  expect(ComboboxPopup.show).toBeDefined()
})

test('exposes hide method', () => {
  expect(ComboboxPopup.hide).toBeDefined()
})

test('exposes toggle method', () => {
  expect(ComboboxPopup.toggle).toBeDefined()
})

test('forwards additional props to popover', () => {
  render(
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxPopup aria-labelledby="label-id" variant="popover" data-testid="custom-popup" className="custom-class">
        Content
      </ComboboxPopup>
    </ComboboxContext.Provider>,
  )
  expect(screen.getByTestId('custom-popup')).toBeVisible()
  expect(screen.getByTestId('custom-popup')).toHaveClass('custom-class')
})

test('focuses child element when popup opens', () => {
  render(
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxPopup aria-labelledby="label-id" variant="popover" data-testid="popup">
        <div role="listbox" tabIndex={-1} data-testid="listbox" />
      </ComboboxPopup>
    </ComboboxContext.Provider>,
  )

  const popup = screen.getByTestId('popup')
  fireEvent(popup, new FakeToggleEvent('toggle', { newState: 'open' }))

  expect(screen.getByTestId('listbox')).toHaveFocus()
})

test('does not focus child element when popup closes', () => {
  render(
    <ComboboxContext.Provider value={defaultContext}>
      <ComboboxPopup aria-labelledby="label-id" variant="popover" data-testid="popup">
        <div role="listbox" tabIndex={-1} data-testid="listbox" />
      </ComboboxPopup>
    </ComboboxContext.Provider>,
  )

  const popup = screen.getByTestId('popup')
  fireEvent(popup, new FakeToggleEvent('toggle', { newState: 'closed' }))

  expect(screen.getByTestId('listbox')).not.toHaveFocus()
})

const defaultContext: ComboboxContext.Value = {
  buttonId: 'button-id',
  disabled: false,
  listboxId: 'listbox-id',
  popupId: 'popup-id',
  required: false,
}
