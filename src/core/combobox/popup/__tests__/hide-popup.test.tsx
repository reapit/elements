import { hideComboboxPopup } from '../hide-popup'
import { render, screen } from '@testing-library/react'

afterEach(() => {
  document.body.innerHTML = ''
})

test('hides a dialog element by calling close()', () => {
  render(<dialog open data-testid="test-dialog" />)
  const dialog = screen.getByTestId('test-dialog')

  hideComboboxPopup(dialog)

  expect(dialog).not.toBeVisible()
})

test('hides a dialog element by ID', () => {
  render(<dialog open id="test-dialog" data-testid="test-dialog" />)
  hideComboboxPopup('test-dialog')

  expect(screen.getByTestId('test-dialog')).not.toBeVisible()
})

test('hides a popover element', () => {
  const div = document.createElement('div')
  div.hidePopover = vi.fn()

  hideComboboxPopup(div)

  expect(div.hidePopover).toHaveBeenCalledTimes(1)
})

test('hides a popover element by ID', () => {
  const div = document.createElement('div')
  div.id = 'test-popover'
  div.hidePopover = vi.fn()
  document.body.appendChild(div)

  hideComboboxPopup('test-popover')

  expect(div.hidePopover).toHaveBeenCalledTimes(1)
})

test('throws error when element is not found by ID', () => {
  expect(() => hideComboboxPopup('non-existent')).toThrow(
    'hidePopup: Element with ID "non-existent" not found in the DOM',
  )
})
