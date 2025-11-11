import { render, screen } from '@testing-library/react'
import { toggleComboboxPopup } from '../toggle-popup'

afterEach(() => {
  document.body.innerHTML = ''
})

test('closes an open dialog element', () => {
  render(<dialog open data-testid="test-dialog" />)
  const dialog = screen.getByTestId('test-dialog')

  toggleComboboxPopup(dialog)

  expect(dialog).not.toBeVisible()
})

test('opens a closed dialog element', () => {
  render(<dialog data-testid="test-dialog" />)
  const dialog = screen.getByTestId('test-dialog')

  toggleComboboxPopup(dialog)

  expect(dialog).toBeVisible()
})

test('closes an open dialog element by ID', () => {
  render(<dialog open id="test-dialog" data-testid="test-dialog" />)
  toggleComboboxPopup('test-dialog')

  expect(screen.getByTestId('test-dialog')).not.toBeVisible()
})

test('opens a closed dialog element by ID', () => {
  render(<dialog id="test-dialog" data-testid="test-dialog" />)
  toggleComboboxPopup('test-dialog')

  expect(screen.getByTestId('test-dialog')).toBeVisible()
})

test('toggles a popover element', () => {
  const element = document.createElement('div')
  element.setAttribute('popover', 'auto')
  element.togglePopover = vi.fn()

  toggleComboboxPopup(element)

  expect(element.togglePopover).toHaveBeenCalledTimes(1)
})

test('toggles a popover element by ID', () => {
  const element = document.createElement('div')
  element.id = 'test-popup'
  element.setAttribute('popover', 'auto')
  element.togglePopover = vi.fn()
  document.body.appendChild(element)

  toggleComboboxPopup('test-popup')

  expect(element.togglePopover).toHaveBeenCalledTimes(1)
})

test('throws error when element is not found by ID', () => {
  expect(() => toggleComboboxPopup('non-existent')).toThrow(
    'togglePopup: Element with ID "non-existent" not found in the DOM',
  )
})
