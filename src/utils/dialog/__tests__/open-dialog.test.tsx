import { render, screen } from '@testing-library/react'
import { openDialog } from '../open-dialog'

afterEach(() => {
  document.body.innerHTML = ''
})

test('opens dialog element', () => {
  render(<dialog data-testid="test-dialog" />)
  const dialog = screen.getByTestId('test-dialog')

  openDialog(dialog as HTMLDialogElement)

  expect(dialog).toBeVisible()
})

test('opens dialog element by ID', () => {
  render(<dialog open id="test-dialog" data-testid="test-dialog" />)
  openDialog('test-dialog')

  expect(screen.getByTestId('test-dialog')).toBeVisible()
})

test('throws error when element is not found by ID', () => {
  expect(() => openDialog('non-existent')).toThrow('openDialog: Element with ID "non-existent" not found in the DOM')
})

test('throws error when element passed by reference is null', () => {
  expect(() => openDialog(null as unknown as HTMLDialogElement)).toThrow(
    'openDialog: Element (passed by reference) not found in the DOM',
  )
})

test('throws error when element passed by reference is not an HTMLDialogElement', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  expect(() => openDialog(div as unknown as HTMLDialogElement)).toThrow(
    'openDialog: Element (passed by reference) is not an HTMLDialogElement',
  )
})

test('throws error when element is not an HTMLDialogElement (by ID)', () => {
  const div = document.createElement('div')
  div.id = 'test-popup'
  document.body.appendChild(div)

  expect(() => openDialog('test-popup')).toThrow('openDialog: Element with ID "test-popup" is not an HTMLDialogElement')
})
