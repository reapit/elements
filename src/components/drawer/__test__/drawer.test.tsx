import { Drawer } from '../drawer'
import { render, screen, waitFor } from '@testing-library/react'

test('renders a dialog element', async () => {
  render(<Drawer isOpen>Test content</Drawer>)
  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
})

test('has correct accessible name when drawer header is present', () => {
  render(
    <Drawer isOpen>
      <Drawer.Header>Test Title</Drawer.Header>
    </Drawer>,
  )
  expect(screen.getByRole('dialog', { name: 'Test Title' })).toBeVisible()
})

test('shows dialog when `isOpen` is true', async () => {
  render(<Drawer isOpen>Test content</Drawer>)
  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
})

test('hides dialog when `isOpen` is false', () => {
  render(<Drawer isOpen={false}>Test content</Drawer>)
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('hides dialog when `isOpen` is undefined', () => {
  render(<Drawer>Test content</Drawer>)
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('uses provided aria-labelledby when available', () => {
  render(
    <Drawer isOpen aria-labelledby="custom-title">
      <Drawer.Header>
        <span id="custom-title">Test Title</span>
      </Drawer.Header>
    </Drawer>,
  )
  expect(screen.getByRole('dialog', { name: 'Test Title' })).toBeVisible()
})

test('only mounts children when dialog is open', async () => {
  const { rerender } = render(<Drawer isOpen={false}>Test content</Drawer>)
  rerender(<Drawer isOpen>Test content</Drawer>)

  await waitFor(() => expect(screen.getByText('Test content')).toBeVisible())
})

test('unmounts children when dialog closes', async () => {
  const { rerender } = render(<Drawer isOpen>Test content</Drawer>)
  rerender(<Drawer isOpen={false}>Test content</Drawer>)

  await waitFor(() => expect(screen.queryByText('Test content')).not.toBeInTheDocument())
})

test('forwards additional props to the dialog element', () => {
  render(<Drawer data-testid="test-id">Test content</Drawer>)
  expect(screen.getByTestId('test-id')).toBeInTheDocument()
})
