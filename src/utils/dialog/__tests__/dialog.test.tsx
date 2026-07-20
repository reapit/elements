import { HTMLDialog } from '../dialog'
import { fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { vi } from 'vitest'

test('renders a dialog element', () => {
  render(<HTMLDialog data-testid="test-dialog">Test content</HTMLDialog>)
  expect(screen.getByTestId('test-dialog')).toBeInTheDocument()
  expect(screen.getByTestId('test-dialog').tagName).toBe('DIALOG')
})

test('renders children inside dialog', () => {
  render(<HTMLDialog data-testid="test-dialog">Test content</HTMLDialog>)
  expect(screen.getByText('Test content')).toBeInTheDocument()
})

test('forwards ref to dialog element', () => {
  const ref = createRef<HTMLDialogElement>()
  render(
    <HTMLDialog ref={ref} data-testid="test-dialog">
      Test
    </HTMLDialog>,
  )
  expect(ref.current).toBeInstanceOf(HTMLDialogElement)
})

test('applies closedBy attribute with default value', () => {
  render(<HTMLDialog data-testid="test-dialog">Test</HTMLDialog>)
  const dialog = screen.getByTestId('test-dialog')
  expect(dialog).toHaveAttribute('closedby', 'closerequest')
})

test('renders closedby="closerequest" when closedBy="any" (consumeBackdropClick defaults to true)', () => {
  render(
    <HTMLDialog closedBy="any" data-testid="test-dialog">
      Test
    </HTMLDialog>,
  )
  const dialog = screen.getByTestId('test-dialog')
  expect(dialog).toHaveAttribute('closedby', 'closerequest')
})

test('renders closedby="any" when closedBy="any" and consumeBackdropClick is false', () => {
  render(
    <HTMLDialog closedBy="any" consumeBackdropClick={false} data-testid="test-dialog">
      Test
    </HTMLDialog>,
  )
  const dialog = screen.getByTestId('test-dialog')
  expect(dialog).toHaveAttribute('closedby', 'any')
})

test('closes the dialog on backdrop click when closedBy="any" (consumeBackdropClick defaults to true)', () => {
  render(
    <HTMLDialog open closedBy="any" data-testid="test-dialog">
      <button>Inside</button>
    </HTMLDialog>,
  )
  const dialog = screen.getByTestId('test-dialog') as HTMLDialogElement
  const closeSpy = vi.spyOn(dialog, 'close').mockImplementation(() => {})

  fireEvent.click(dialog)

  expect(closeSpy).toHaveBeenCalledTimes(1)
})

test('does not close the dialog on backdrop click when consumeBackdropClick is false and closedBy is natively supported', () => {
  const originalDescriptor = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'closedBy')
  Object.defineProperty(HTMLDialogElement.prototype, 'closedBy', { value: 'any', configurable: true })

  try {
    render(
      <HTMLDialog open closedBy="any" consumeBackdropClick={false} data-testid="test-dialog">
        <button>Inside</button>
      </HTMLDialog>,
    )
    const dialog = screen.getByTestId('test-dialog') as HTMLDialogElement
    const closeSpy = vi.spyOn(dialog, 'close').mockImplementation(() => {})

    fireEvent.click(dialog)

    expect(closeSpy).not.toHaveBeenCalled()
  } finally {
    if (originalDescriptor) {
      Object.defineProperty(HTMLDialogElement.prototype, 'closedBy', originalDescriptor)
    } else {
      delete (HTMLDialogElement.prototype as { closedBy?: unknown }).closedBy
    }
  }
})

test('applies closedBy="none" attribute', () => {
  render(
    <HTMLDialog closedBy="none" data-testid="test-dialog">
      Test
    </HTMLDialog>,
  )
  const dialog = screen.getByTestId('test-dialog')
  expect(dialog).toHaveAttribute('closedby', 'none')
})

test('forwards additional props to dialog element', () => {
  render(
    <HTMLDialog data-testid="test-id" className="custom-class">
      Test
    </HTMLDialog>,
  )
  const dialog = screen.getByTestId('test-id')
  expect(dialog).toBeInTheDocument()
  expect(dialog).toHaveClass('custom-class')
})

test('calls onClick handler when provided', () => {
  const onClick = vi.fn()
  render(
    <HTMLDialog onClick={onClick} data-testid="test-dialog">
      Test
    </HTMLDialog>,
  )
  const dialog = screen.getByTestId('test-dialog')
  fireEvent.click(dialog)
  expect(onClick).toHaveBeenCalledTimes(1)
})

test('calls onCancel handler when provided', () => {
  const onCancel = vi.fn()
  render(
    <HTMLDialog onCancel={onCancel} data-testid="test-dialog">
      Test
    </HTMLDialog>,
  )
  const dialog = screen.getByTestId('test-dialog') as HTMLDialogElement

  // Simulate cancel event
  const cancelEvent = new Event('cancel', { bubbles: false, cancelable: true })
  dialog.dispatchEvent(cancelEvent)

  expect(onCancel).toHaveBeenCalledTimes(1)
})

test('calls onClose handler when provided', () => {
  const onClose = vi.fn()
  render(
    <HTMLDialog onClose={onClose} data-testid="test-dialog">
      Test
    </HTMLDialog>,
  )
  const dialog = screen.getByTestId('test-dialog') as HTMLDialogElement

  // Simulate close event
  const closeEvent = new Event('close', { bubbles: false })
  dialog.dispatchEvent(closeEvent)

  expect(onClose).toHaveBeenCalledTimes(1)
})

test('stops close event propagation automatically', () => {
  const outerClose = vi.fn()
  const innerClose = vi.fn()

  render(
    <HTMLDialog onClose={outerClose} data-testid="outer-dialog">
      <HTMLDialog onClose={innerClose} data-testid="inner-dialog">
        Inner
      </HTMLDialog>
    </HTMLDialog>,
  )

  const innerDialog = screen.getByTestId('inner-dialog') as HTMLDialogElement

  // Simulate close event on inner dialog
  const closeEvent = new Event('close', { bubbles: true })
  innerDialog.dispatchEvent(closeEvent)

  // Only inner handler should be called, propagation stopped
  expect(innerClose).toHaveBeenCalledTimes(1)
  expect(outerClose).not.toHaveBeenCalled()
})

test('prevents cancel event when closedBy="none"', () => {
  const onCancel = vi.fn()
  render(
    <HTMLDialog closedBy="none" onCancel={onCancel} data-testid="test-dialog">
      Test
    </HTMLDialog>,
  )
  const dialog = screen.getByTestId('test-dialog') as HTMLDialogElement

  // Simulate cancel event
  const cancelEvent = new Event('cancel', { bubbles: false, cancelable: true })
  const preventDefaultSpy = vi.spyOn(cancelEvent, 'preventDefault')
  dialog.dispatchEvent(cancelEvent)

  expect(preventDefaultSpy).toHaveBeenCalled()
  expect(onCancel).not.toHaveBeenCalled()
})

test('allows cancel event when closedBy="closerequest"', () => {
  const onCancel = vi.fn()
  render(
    <HTMLDialog closedBy="closerequest" onCancel={onCancel} data-testid="test-dialog">
      Test
    </HTMLDialog>,
  )
  const dialog = screen.getByTestId('test-dialog') as HTMLDialogElement

  // Simulate cancel event
  const cancelEvent = new Event('cancel', { bubbles: false, cancelable: true })
  const preventDefaultSpy = vi.spyOn(cancelEvent, 'preventDefault')
  dialog.dispatchEvent(cancelEvent)

  expect(preventDefaultSpy).not.toHaveBeenCalled()
  expect(onCancel).toHaveBeenCalledTimes(1)
})

test('allows cancel event when closedBy="any"', () => {
  const onCancel = vi.fn()
  render(
    <HTMLDialog closedBy="any" onCancel={onCancel} data-testid="test-dialog">
      Test
    </HTMLDialog>,
  )
  const dialog = screen.getByTestId('test-dialog') as HTMLDialogElement

  // Simulate cancel event
  const cancelEvent = new Event('cancel', { bubbles: false, cancelable: true })
  const preventDefaultSpy = vi.spyOn(cancelEvent, 'preventDefault')
  dialog.dispatchEvent(cancelEvent)

  expect(preventDefaultSpy).not.toHaveBeenCalled()
  expect(onCancel).toHaveBeenCalledTimes(1)
})
