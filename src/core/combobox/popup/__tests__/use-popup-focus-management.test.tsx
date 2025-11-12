import { FakeToggleEvent } from './FakeToggleEvent'
import { fireEvent, render, screen } from '@testing-library/react'
import { focusInputOrListbox } from '../focus-input-or-listbox'
import { useComboboxPopupFocusManagement } from '../use-popup-focus-management'

vi.mock('../focus-input-or-listbox')

test('calls focusListboxOrSearchInputChild when popup opens', () => {
  render(<TestComponent />)

  const popup = screen.getByTestId('popup')

  fireEvent(popup, new FakeToggleEvent('toggle', { newState: 'open' }))

  expect(focusInputOrListbox).toHaveBeenCalledTimes(1)
  expect(focusInputOrListbox).toHaveBeenCalledWith(popup)
})

test('returns focus to combobox when popup closes and focus is inside popup', () => {
  render(<TestComponent />)

  const popup = screen.getByTestId('popup')
  const combobox = screen.getByTestId('combobox')
  const listbox = screen.getByRole('listbox')

  // Focus element inside popup
  listbox.focus()
  expect(listbox).toHaveFocus()

  // Close popup
  fireEvent(popup, new FakeToggleEvent('toggle', { newState: 'closed' }))

  expect(combobox).toHaveFocus()
})

test('does not change focus when popup closes and focus is outside popup', () => {
  render(<TestComponent />)

  const popup = screen.getByTestId('popup')
  const combobox = screen.getByTestId('combobox')
  const externalButton = screen.getByTestId('external-button')

  // Focus element outside popup
  externalButton.focus()
  expect(externalButton).toHaveFocus()

  // Close popup
  fireEvent(popup, new FakeToggleEvent('toggle', { newState: 'closed' }))

  expect(externalButton).toHaveFocus()
  expect(combobox).not.toHaveFocus()
})

test('does not call focusListboxOrSearchInputChild when popup element does not exist', () => {
  function ComponentWithNonExistentPopup() {
    useComboboxPopupFocusManagement({ popupId: 'non-existent-popup', buttonId: 'combobox-id' })
    return <div data-testid="combobox" id="combobox-id" />
  }

  render(<ComponentWithNonExistentPopup />)

  // Create a different popup element to fire event on
  const differentPopup = document.createElement('div')
  differentPopup.id = 'different-popup'
  document.body.appendChild(differentPopup)

  fireEvent(differentPopup, new FakeToggleEvent('toggle', { newState: 'open' }))

  expect(focusInputOrListbox).not.toHaveBeenCalled()

  document.body.removeChild(differentPopup)
})

test('does not return focus when combobox element does not exist', () => {
  function ComponentWithNonExistentCombobox() {
    useComboboxPopupFocusManagement({ popupId: 'popup-id', buttonId: 'non-existent-combobox' })
    return (
      <div id="popup-id" data-testid="popup">
        <div role="listbox" tabIndex={-1} />
      </div>
    )
  }

  render(<ComponentWithNonExistentCombobox />)

  const popup = screen.getByTestId('popup')
  const listbox = screen.getByRole('listbox')

  listbox.focus()
  expect(listbox).toHaveFocus()

  fireEvent(popup, new FakeToggleEvent('toggle', { newState: 'closed' }))

  expect(listbox).toHaveFocus()
})

test('handles multiple open and close events', () => {
  render(<TestComponent />)

  const popup = screen.getByTestId('popup')
  const combobox = screen.getByTestId('combobox')
  const listbox = screen.getByRole('listbox')

  // First open
  fireEvent(popup, new FakeToggleEvent('toggle', { newState: 'open' }))
  expect(focusInputOrListbox).toHaveBeenCalledTimes(1)

  // First close
  listbox.focus()
  fireEvent(popup, new FakeToggleEvent('toggle', { newState: 'closed' }))
  expect(combobox).toHaveFocus()

  // Second open
  fireEvent(popup, new FakeToggleEvent('toggle', { newState: 'open' }))
  expect(focusInputOrListbox).toHaveBeenCalledTimes(2)

  // Second close
  listbox.focus()
  fireEvent(popup, new FakeToggleEvent('toggle', { newState: 'closed' }))
  expect(combobox).toHaveFocus()
})

test('does not call focusListboxOrSearchInputChild when popup closes', () => {
  render(<TestComponent />)

  const popup = screen.getByTestId('popup')

  vi.mocked(focusInputOrListbox).mockClear()

  fireEvent(popup, new FakeToggleEvent('toggle', { newState: 'closed' }))

  expect(focusInputOrListbox).not.toHaveBeenCalled()
})

test('does not return focus to combobox when active element is outside popup', () => {
  render(<TestComponent />)

  const popup = screen.getByTestId('popup')
  const combobox = screen.getByTestId('combobox')

  // Focus the combobox itself (outside popup)
  combobox.focus()
  const focusSpy = vi.spyOn(combobox, 'focus')

  // Close popup
  fireEvent(popup, new FakeToggleEvent('toggle', { newState: 'closed' }))

  // Focus should not have been called since focus was already outside
  expect(focusSpy).not.toHaveBeenCalled()
  expect(combobox).toHaveFocus()
})

function TestComponent() {
  useComboboxPopupFocusManagement({ popupId: 'popup-id', buttonId: 'combobox-id' })

  return (
    <>
      <input id="combobox-id" data-testid="combobox" />
      <div id="popup-id" data-testid="popup">
        <div role="listbox" tabIndex={-1} />
      </div>
      <button data-testid="external-button">External Button</button>
    </>
  )
}
