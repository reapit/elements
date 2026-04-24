import { render, screen } from '@testing-library/react'
import { toastStore } from '../store'
import { ToastList } from '../toast-list'

afterEach(() => {
  for (const entry of toastStore.getSnapshot()) {
    toastStore.remove(entry.id)
  }
})

test('renders a list element', () => {
  render(<ToastList position="bottom-center" maxItems={3} />)
  expect(screen.getByRole('list')).toBeInTheDocument()
})

test('applies the position as a data attribute', () => {
  render(<ToastList position="top-right" maxItems={3} />)
  expect(screen.getByRole('list')).toHaveAttribute('data-position', 'top-right')
})

test('renders toasts from the store', () => {
  toastStore.add({ variant: 'neutral', message: 'Hello toast' })
  render(<ToastList position="bottom-center" maxItems={3} />)
  expect(screen.getByText('Hello toast')).toBeInTheDocument()
})

test('renders nothing inside the list when the store is empty', () => {
  render(<ToastList position="bottom-center" maxItems={3} />)
  expect(screen.getByRole('list')).toBeEmptyDOMElement()
})

test('toasts beyond maxItems receive data-is-masked', () => {
  toastStore.add({ variant: 'neutral', message: 'Toast 1' })
  toastStore.add({ variant: 'neutral', message: 'Toast 2' })
  toastStore.add({ variant: 'neutral', message: 'Toast 3' })
  toastStore.add({ variant: 'neutral', message: 'Toast 4' })

  render(<ToastList position="bottom-center" maxItems={3} />)

  const items = screen.getAllByRole('listitem')
  // First toast is beyond maxItems — it should be masked
  expect(items[0]).toHaveAttribute('data-is-masked', 'true')
  // The last three are within the limit — they should not be masked
  expect(items[1]).not.toHaveAttribute('data-is-masked')
  expect(items[2]).not.toHaveAttribute('data-is-masked')
  expect(items[3]).not.toHaveAttribute('data-is-masked')
})

test('dismissing toasts are not counted toward maxItems', () => {
  const id1 = toastStore.add({ variant: 'neutral', message: 'Toast 1' })
  toastStore.add({ variant: 'neutral', message: 'Toast 2' })
  toastStore.add({ variant: 'neutral', message: 'Toast 3' })

  // Dismiss the first toast — it is exiting but still in the DOM
  toastStore.dismiss(id1)

  render(<ToastList position="bottom-center" maxItems={3} />)

  const items = screen.getAllByRole('listitem')
  // All three items should be in the DOM; none of the non-dismissing ones masked
  expect(items).toHaveLength(3)
  expect(items[0]).toHaveAttribute('data-state', 'dismissing')
  expect(items[1]).not.toHaveAttribute('data-is-masked')
  expect(items[2]).not.toHaveAttribute('data-is-masked')
})
