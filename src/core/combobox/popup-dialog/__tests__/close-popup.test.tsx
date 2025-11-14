import { closeComboboxPopup } from '../close-popup'
import { render, screen } from '@testing-library/react'

afterEach(() => {
  document.body.innerHTML = ''
})

test('hides a dialog element by calling close()', () => {
  render(<dialog open data-testid="test-dialog" />)
  const dialog = screen.getByTestId('test-dialog')

  closeComboboxPopup(dialog as HTMLDialogElement)

  expect(dialog).not.toBeVisible()
})

test('hides a dialog element by ID', () => {
  render(<dialog open id="test-dialog" data-testid="test-dialog" />)
  closeComboboxPopup('test-dialog')

  expect(screen.getByTestId('test-dialog')).not.toBeVisible()
})

test('throws error when element is not found by ID', () => {
  expect(() => closeComboboxPopup('non-existent')).toThrow(
    'closeComboboxPopup: Element with ID "non-existent" not found in the DOM',
  )
})

test('throws error when element is not an HTMLDialogElement (by reference)', () => {
  const div = document.createElement('div')
  div.id = 'test-element'
  document.body.appendChild(div)

  expect(() => closeComboboxPopup(div.id)).toThrow(
    'closeComboboxPopup: Element with ID "test-element" is not an HTMLDialogElement',
  )
})

test('throws error when element is not an HTMLDialogElement (by ID)', () => {
  const div = document.createElement('div')
  div.id = 'test-popup'
  document.body.appendChild(div)

  expect(() => closeComboboxPopup('test-popup')).toThrow(
    'closeComboboxPopup: Element with ID "test-popup" is not an HTMLDialogElement',
  )
})
