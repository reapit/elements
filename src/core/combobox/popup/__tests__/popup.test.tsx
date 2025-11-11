import { ComboboxPopup } from '../popup'
import { fireEvent, render, screen } from '@testing-library/react'
import { FakeToggleEvent } from './FakeToggleEvent'

test('renders a dialog element for the popover variant', () => {
  render(
    <ComboboxPopup aria-labelledby="label-id" id="popup-id" variant="popover">
      Content
    </ComboboxPopup>,
  )
  expect(screen.getByRole('dialog')).toBeVisible()
})

test('renders a dialog element for the drawer variant', () => {
  render(
    <ComboboxPopup aria-labelledby="label-id" id="popup-id" variant="drawer">
      Content
    </ComboboxPopup>,
  )
  expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument()
})

test('renders children content in popover variant', () => {
  render(
    <ComboboxPopup aria-labelledby="label-id" id="popup-id" variant="popover">
      Test Content
    </ComboboxPopup>,
  )
  expect(screen.getByText('Test Content')).toBeInTheDocument()
})

// TODO: unskip this test when the combobox has it's own drawer-based popup that doesn't unmount children
// when it is closed.
test.skip('renders children content in drawer variant', () => {
  render(
    <ComboboxPopup aria-labelledby="label-id" id="popup-id" variant="drawer">
      Drawer Content
    </ComboboxPopup>,
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
    <ComboboxPopup
      aria-labelledby="label-id"
      id="popup-id"
      variant="popover"
      data-testid="custom-popup"
      className="custom-class"
    >
      Content
    </ComboboxPopup>,
  )
  expect(screen.getByTestId('custom-popup')).toBeVisible()
  expect(screen.getByTestId('custom-popup')).toHaveClass('custom-class')
})

test('focuses child element when popup opens', () => {
  render(
    <ComboboxPopup aria-labelledby="label-id" id="popup-id" variant="popover" data-testid="popup">
      <div role="listbox" tabIndex={-1} data-testid="listbox" />
    </ComboboxPopup>,
  )

  const popup = screen.getByTestId('popup')
  fireEvent(popup, new FakeToggleEvent('toggle', { newState: 'open' }))

  expect(screen.getByTestId('listbox')).toHaveFocus()
})

test('does not focus child element when popup closes', () => {
  render(
    <ComboboxPopup aria-labelledby="label-id" id="popup-id" variant="popover" data-testid="popup">
      <div role="listbox" tabIndex={-1} data-testid="listbox" />
    </ComboboxPopup>,
  )

  const popup = screen.getByTestId('popup')
  fireEvent(popup, new FakeToggleEvent('toggle', { newState: 'closed' }))

  expect(screen.getByTestId('listbox')).not.toHaveFocus()
})
