import { render, screen, waitFor } from '@testing-library/react'
import { useRef } from 'react'
import { useDialogObserver } from '../use-dialog-observer'
import { useDialogController } from '../use-dialog-controller'

test('returns true when dialog is open', () => {
  render(<TestComponent open />)
  expect(screen.getByTestId('status')).toHaveTextContent('open')
})

test('returns false when dialog is not open', () => {
  render(<TestComponent />)
  expect(screen.getByTestId('status')).toHaveTextContent('closed')
})

test('returns true when dialog opens', async () => {
  const { rerender } = render(<TestComponent />)
  rerender(<TestComponent open />)
  await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('open'))
})

test('returns false when dialog closes', async () => {
  const { rerender } = render(<TestComponent open />)
  rerender(<TestComponent />)
  await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('open'))
})

test('handles null ref gracefully', () => {
  const TestComponent = () => {
    const ref = useRef<HTMLDialogElement>(null)
    const isOpen = useDialogObserver(ref)
    return (
      <div>
        <div data-testid="status">{isOpen ? 'open' : 'closed'}</div>
      </div>
    )
  }

  render(<TestComponent />)
  expect(screen.getByTestId('status')).toHaveTextContent('closed')
})

test('cleans up observer on unmount', () => {
  const disconnectSpy = vi.spyOn(MutationObserver.prototype, 'disconnect')
  const { unmount } = render(<TestComponent />)
  unmount()

  expect(disconnectSpy).toHaveBeenCalled()
})

interface TestComponentProps {
  open?: boolean
}

function TestComponent({ open }: TestComponentProps) {
  const ref = useDialogController(open ?? false)
  const isOpen = useDialogObserver(ref)
  return (
    <>
      <dialog ref={ref} data-testid="dialog">
        Test Dialog
      </dialog>
      <div data-testid="status">{isOpen ? 'open' : 'closed'}</div>
    </>
  )
}
