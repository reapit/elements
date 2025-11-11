import { render, screen } from '@testing-library/react'
import { showComboboxPopup } from '../show-popup'

afterEach(() => {
  document.body.innerHTML = ''
})

test('shows dialog element', () => {
  render(<dialog data-testid="test-dialog" />)
  const dialog = screen.getByTestId('test-dialog')

  showComboboxPopup(dialog)

  expect(dialog).toBeVisible()
})

test('shows dialog element by ID', () => {
  render(<dialog open id="test-dialog" data-testid="test-dialog" />)
  showComboboxPopup('test-dialog')

  expect(screen.getByTestId('test-dialog')).toBeVisible()
})

test('shows a popover element', () => {
  // HappyDOM doesn't support the popover API, so we have to mock it.
  const div = document.createElement('div')
  div.showPopover = vi.fn()

  showComboboxPopup(div)

  expect(div.showPopover).toHaveBeenCalledTimes(1)
})

test('shows a popover element by ID', () => {
  // HappyDOM doesn't support the popover API, so we have to mock it.
  const div = document.createElement('div')
  div.id = 'test-popup'
  div.showPopover = vi.fn()
  document.body.appendChild(div)

  showComboboxPopup('test-popup')

  expect(div.showPopover).toHaveBeenCalledTimes(1)
})

test('throws error when element is not found by ID', () => {
  expect(() => showComboboxPopup('non-existent')).toThrow(
    'showPopup: Element with ID "non-existent" not found in the DOM',
  )
})
