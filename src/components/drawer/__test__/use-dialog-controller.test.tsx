import { render, screen, waitFor } from '@testing-library/react'
import { useDialogController } from '../use-dialog-controller'

test('shows dialog when `isOpen` is true', async () => {
  render(<TestComponent isOpen={true} />)
  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeVisible()
  })
})

test('closes dialog when `isOpen` is false', async () => {
  render(<TestComponent isOpen={false} />)
  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

test('does nothing when `isOpen` is undefined', () => {
  render(<TestComponent isOpen={undefined} />)
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('shows dialog when `isOpen` changes from false to true', async () => {
  const { rerender } = render(<TestComponent isOpen={false} />)
  rerender(<TestComponent isOpen={true} />)
  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeVisible()
  })
})

test('closes dialog when `isOpen` changes from true to false', async () => {
  const { rerender } = render(<TestComponent isOpen={true} />)
  rerender(<TestComponent isOpen={false} />)
  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

test('handles null ref gracefully', () => {
  const TestComponent = () => {
    useDialogController(true)
    return 'rendered'
  }

  render(<TestComponent />)
  expect(screen.getByText('rendered')).toBeVisible()
})

interface TestComponentProps {
  isOpen?: boolean
}

function TestComponent({ isOpen }: TestComponentProps) {
  const ref = useDialogController(isOpen)
  return <dialog ref={ref}>Test Dialog</dialog>
}
