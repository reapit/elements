import { fireEvent, render, screen } from '@testing-library/react'
import { useCancelCloseRequests } from '../use-cancel-close-requests'

describe('when `closedBy="closerequest"`', () => {
  test('does not cancel the event', () => {
    render(<TestComponent closedBy="closerequest" />)

    const cancelEvent = new Event('cancel', { cancelable: true, bubbles: true })
    fireEvent(screen.getByRole('dialog'), cancelEvent)

    expect(cancelEvent.defaultPrevented).toBe(false)
  })

  test('stops event propagation', () => {
    render(<TestComponent closedBy="closerequest" />)

    const cancelEvent = new Event('cancel', { cancelable: true, bubbles: true })
    const stopPropagationSpy = vi.spyOn(cancelEvent, 'stopPropagation')
    fireEvent(screen.getByRole('dialog'), cancelEvent)

    expect(stopPropagationSpy).toHaveBeenCalled()
  })

  test('calls consumer-supplied `onCancel`', () => {
    const onCancel = vi.fn()
    render(<TestComponent closedBy="closerequest" onCancel={onCancel} />)

    fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: true }))

    expect(onCancel).toHaveBeenCalledTimes(1)
  })
})

describe('when `closedBy="none"`', () => {
  test('cancels the event when target matches currentTarget', () => {
    render(<TestComponent closedBy="none" />)

    const dialog = screen.getByRole('dialog')
    const cancelEvent = new Event('cancel', { cancelable: true, bubbles: true })
    fireEvent(dialog, cancelEvent)

    expect(cancelEvent.defaultPrevented).toBe(true)
  })

  test('stops event propagation', () => {
    render(<TestComponent closedBy="none" />)

    const dialog = screen.getByRole('dialog')
    const cancelEvent = new Event('cancel', { cancelable: true, bubbles: true })
    const stopPropagationSpy = vi.spyOn(cancelEvent, 'stopPropagation')
    fireEvent(dialog, cancelEvent)

    expect(stopPropagationSpy).toHaveBeenCalled()
  })

  test('does not call `onCancel` when target matches currentTarget', () => {
    const onCancel = vi.fn()
    render(<TestComponent closedBy="none" onCancel={onCancel} />)

    const dialog = screen.getByRole('dialog')
    const cancelEvent = new Event('cancel', { bubbles: true })
    fireEvent(dialog, cancelEvent)

    expect(onCancel).not.toHaveBeenCalled()
  })

  test('does not cancel the event when it bubbles from a child element', () => {
    render(<TestComponentWithChild closedBy="none" />)

    const childDialog = screen.getByTestId('child-dialog')
    const cancelEvent = new Event('cancel', { cancelable: true, bubbles: true })
    fireEvent(childDialog, cancelEvent)

    expect(cancelEvent.defaultPrevented).toBe(false)
  })

  test('calls `onCancel` when event bubbles from a child element', () => {
    const onCancel = vi.fn()
    render(<TestComponentWithChild closedBy="none" onCancel={onCancel} />)

    const childDialog = screen.getByTestId('child-dialog')
    const cancelEvent = new Event('cancel', { bubbles: true })
    fireEvent(childDialog, cancelEvent)

    expect(onCancel).toHaveBeenCalledTimes(1)
  })
})

interface TestComponentProps {
  closedBy?: 'closerequest' | 'none'
  onCancel?: React.EventHandler<React.SyntheticEvent<HTMLDialogElement>>
}

function TestComponent({ closedBy = 'closerequest', onCancel }: TestComponentProps) {
  const handleCancel = useCancelCloseRequests(closedBy, onCancel)

  return (
    <dialog open onCancel={handleCancel} data-testid="dialog">
      Test Dialog
    </dialog>
  )
}

function TestComponentWithChild({ closedBy = 'closerequest', onCancel }: TestComponentProps) {
  const handleCancel = useCancelCloseRequests(closedBy, onCancel)

  return (
    <dialog open onCancel={handleCancel} data-testid="dialog">
      <dialog data-testid="child-dialog">Child Dialog</dialog>
    </dialog>
  )
}
