import { Dialog } from '../dialog'
import { render, screen, waitFor } from '@testing-library/react'

test('renders a dialog element', async () => {
  render(
    <Dialog isOpen size="small">
      Test content
    </Dialog>,
  )
  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
})

test('has correct accessible name when drawer header is present', () => {
  render(
    <Dialog isOpen size="small">
      <Dialog.Header>Test Title</Dialog.Header>
    </Dialog>,
  )
  expect(screen.getByRole('dialog', { name: 'Test Title' })).toBeVisible()
})

test('shows dialog when `isOpen` is true', async () => {
  render(
    <Dialog isOpen size="small">
      Test content
    </Dialog>,
  )
  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
})

test('hides dialog when `isOpen` is false', () => {
  render(
    <Dialog isOpen={false} size="small">
      Test content
    </Dialog>,
  )
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('hides dialog when `isOpen` is undefined', () => {
  render(<Dialog size="small">Test content</Dialog>)
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('uses provided aria-labelledby when available', () => {
  render(
    <Dialog isOpen aria-labelledby="custom-title" size="small">
      <Dialog.Header>
        <span id="custom-title">Test Title</span>
      </Dialog.Header>
    </Dialog>,
  )
  expect(screen.getByRole('dialog', { name: 'Test Title' })).toBeVisible()
})

test('only mounts children when dialog is open', async () => {
  const { rerender } = render(
    <Dialog isOpen={false} size="small">
      Test content
    </Dialog>,
  )
  rerender(
    <Dialog isOpen size="small">
      Test content
    </Dialog>,
  )

  await waitFor(() => expect(screen.getByText('Test content')).toBeVisible())
})

test('unmounts children when dialog closes', async () => {
  const { rerender } = render(
    <Dialog isOpen size="small">
      Test content
    </Dialog>,
  )
  rerender(
    <Dialog isOpen={false} size="small">
      Test content
    </Dialog>,
  )

  await waitFor(() => expect(screen.queryByText('Test content')).not.toBeInTheDocument())
})

test('forwards additional props to the dialog element', () => {
  render(
    <Dialog data-testid="test-id" size="small">
      Test content
    </Dialog>,
  )
  expect(screen.getByTestId('test-id')).toBeInTheDocument()
})
