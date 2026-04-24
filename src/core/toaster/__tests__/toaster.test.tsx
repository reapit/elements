import { render, screen, act, fireEvent } from '@testing-library/react'
import { toast } from '../toast-fn'
import { toastStore } from '../store'
import { Toaster } from '../toaster'

afterEach(() => {
  for (const entry of toastStore.getSnapshot()) {
    toastStore.remove(entry.id)
  }
})

beforeEach(() => {
  if (!HTMLElement.prototype.showPopover) {
    HTMLElement.prototype.showPopover = () => undefined
  }
  if (!HTMLElement.prototype.hidePopover) {
    HTMLElement.prototype.hidePopover = () => undefined
  }
})

test('renders a list element when there are toasts', () => {
  toast('Hello')
  render(<Toaster />)
  expect(screen.getByRole('list')).toBeVisible()
})

test('applies the position as a data attribute, defaulting to bottom-center', () => {
  toast('Hello')
  render(<Toaster />)
  expect(screen.getByRole('list')).toHaveAttribute('data-position', 'bottom-center')
})

test('applies a custom position as a data attribute', () => {
  toast('Hello')
  render(<Toaster position="top-right" />)
  expect(screen.getByRole('list')).toHaveAttribute('data-position', 'top-right')
})

test('renders toasts from the store', () => {
  toast('Store toast')
  render(<Toaster />)
  expect(screen.getByText('Store toast')).toBeVisible()
})

test('renders multiple toasts', () => {
  toast('First')
  toast('Second')
  render(<Toaster />)
  expect(screen.getByText('First')).toBeVisible()
  expect(screen.getByText('Second')).toBeVisible()
})

test('sets data-state="visible" on a newly added toast', () => {
  toast('Idle toast')
  render(<Toaster />)
  const item = screen.getByText('Idle toast').closest('li')
  expect(item).toHaveAttribute('data-state', 'visible')
})

test('sets data-state="dismissing" after toast.dismiss() and keeps it in the DOM until transitionend', () => {
  const id = toast('Dismissing toast')
  render(<Toaster />)

  act(() => {
    toast.dismiss(id)
  })

  const item = screen.getByText('Dismissing toast').closest('li')
  expect(item).toHaveAttribute('data-state', 'dismissing')
  // Still in the DOM — waiting for transitionend
  expect(item).toBeVisible()
})

test('removes a toast from the DOM after transitionend fires', () => {
  const id = toast('Removable')
  render(<Toaster />)

  act(() => {
    toast.dismiss(id)
  })

  const item = screen.getByText('Removable').closest('li')

  // Simulate the CSS transition completing (jsdom does not run real transitions).
  act(() => {
    fireEvent.transitionEnd(item!)
  })

  expect(screen.queryByText('Removable')).toBeNull()
})

test('clears the store when the Toaster unmounts', () => {
  toast('First')
  toast('Second')
  const { unmount } = render(<Toaster />)

  expect(toastStore.getSnapshot()).toHaveLength(2)

  unmount()

  expect(toastStore.getSnapshot()).toHaveLength(0)
})
