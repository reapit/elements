import { render, screen } from '@testing-library/react'
import { openComboboxPopup } from '../open-popup'

afterEach(() => {
  document.body.innerHTML = ''
})

test('opens dialog element', () => {
  render(<dialog data-testid="test-dialog" />)
  const dialog = screen.getByTestId('test-dialog')

  openComboboxPopup(dialog as HTMLDialogElement)

  expect(dialog).toBeVisible()
})

test('opens dialog element by ID', () => {
  render(<dialog open id="test-dialog" data-testid="test-dialog" />)
  openComboboxPopup('test-dialog')

  expect(screen.getByTestId('test-dialog')).toBeVisible()
})

test('throws error when element is not found by ID', () => {
  expect(() => openComboboxPopup('non-existent')).toThrow(
    'openComboboxPopup: Element with ID "non-existent" not found in the DOM',
  )
})

test('throws error when element passed by reference is null', () => {
  expect(() => openComboboxPopup(null as unknown as HTMLDialogElement)).toThrow(
    'openComboboxPopup: Element (passed by reference) not found in the DOM',
  )
})

test('throws error when element passed by reference is not an HTMLDialogElement', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  expect(() => openComboboxPopup(div as unknown as HTMLDialogElement)).toThrow(
    'openComboboxPopup: Element (passed by reference) is not an HTMLDialogElement',
  )
})

test('throws error when element is not an HTMLDialogElement (by ID)', () => {
  const div = document.createElement('div')
  div.id = 'test-popup'
  document.body.appendChild(div)

  expect(() => openComboboxPopup('test-popup')).toThrow(
    'openComboboxPopup: Element with ID "test-popup" is not an HTMLDialogElement',
  )
})
