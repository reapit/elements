import { fireEvent, render, screen } from '@testing-library/react'
import { useCancelCloseRequests } from '../use-cancel-close-requests'

describe('when `closedBy="closerequest"`', () => {
  test('does not cancel the event`', () => {
    render(<TestComponent closedBy="closerequest" />)

    const cancelEvent = new Event('cancel', { cancelable: true })
    fireEvent(screen.getByRole('dialog'), cancelEvent)

    expect(cancelEvent.defaultPrevented).toBe(false)
  })

  test('calls consumer-supplied `onCancel`', () => {
    const onCancel = vi.fn()
    render(<TestComponent closedBy="closerequest" onCancel={onCancel} />)

    fireEvent(screen.getByRole('dialog'), new Event('cancel'))

    expect(onCancel).toHaveBeenCalledTimes(1)
  })
})

describe('when `closedBy="none"`', () => {
  test('cancels the event', () => {
    render(<TestComponent closedBy="none" />)

    const dialog = screen.getByRole('dialog')
    const cancelEvent = new Event('cancel', { cancelable: true })
    fireEvent(dialog, cancelEvent)

    expect(cancelEvent.defaultPrevented).toBe(true)
  })

  test('does not call `onCancel`', () => {
    const onCancel = vi.fn()
    render(<TestComponent closedBy="none" onCancel={onCancel} />)

    const dialog = screen.getByRole('dialog')
    const cancelEvent = new Event('cancel')
    fireEvent(dialog, cancelEvent)

    expect(onCancel).not.toHaveBeenCalled()
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
