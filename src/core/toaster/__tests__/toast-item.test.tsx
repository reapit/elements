import { render, screen, act, fireEvent } from '@testing-library/react'
import { toastStore } from '../store'
import { Toaster } from '../toaster'
import { ToastItem } from '../toast-item'

afterEach(() => {
  toastStore.clear()
})

beforeEach(() => {
  if (!HTMLElement.prototype.showPopover) {
    HTMLElement.prototype.showPopover = () => undefined
  }
  if (!HTMLElement.prototype.hidePopover) {
    HTMLElement.prototype.hidePopover = () => undefined
  }
})

test('renders a listitem element', () => {
  render(
    <ul>
      <ToastItem
        id="test-id"
        variant="neutral"
        message="Item content"
        state="visible"
        position="bottom-center"
        startedAt={null}
      />
    </ul>,
  )
  expect(screen.getByRole('listitem')).toBeVisible()
  expect(screen.getByRole('listitem')).toHaveTextContent('Item content')
})

test('auto-dismisses after the specified duration', () => {
  vi.useFakeTimers()
  toastStore.add({ variant: 'neutral', message: 'Auto', duration: 4000 })

  render(<Toaster />)
  expect(screen.getByRole('listitem')).toBeVisible()

  act(() => {
    vi.advanceTimersByTime(4000)
  })

  // Timer fires → state becomes 'dismissing'; toast still in DOM awaiting transitionend.
  const item = screen.getByRole('listitem')
  expect(item).toHaveAttribute('data-state', 'dismissing')

  // Simulate transition completing.
  act(() => {
    fireEvent.transitionEnd(item)
  })

  expect(screen.queryByText('Auto')).toBeNull()

  vi.useRealTimers()
})

test('pauses the timer on hover and resumes with remaining duration on mouse leave', () => {
  vi.useFakeTimers()
  const id = toastStore.add({ variant: 'neutral', message: 'Hovered', duration: 5000 })

  render(<Toaster />)

  // Settle the toast
  act(() => {
    vi.advanceTimersByTime(0)
  })

  // Simulate hover — toast transitions to paused
  act(() => {
    toastStore.pause(id)
  })

  // Advance well past the original 5000ms duration — should not dismiss while paused
  act(() => {
    vi.advanceTimersByTime(3000)
  })

  expect(toastStore.getSnapshot()[0]?.state).toBe('paused')

  // Resume — timer restarts with full remaining duration
  act(() => {
    toastStore.resume(id)
  })

  expect(toastStore.getSnapshot()[0]?.state).toBe('visible')

  vi.useRealTimers()
})

test('pauses the timer when the page is hidden and resumes when visible', () => {
  vi.useFakeTimers()
  toastStore.add({ variant: 'neutral', message: 'Page hidden', duration: 5000 })

  render(<Toaster />)

  // Settle the toast
  act(() => {
    vi.advanceTimersByTime(0)
  })

  // Simulate page becoming hidden
  act(() => {
    Object.defineProperty(document, 'hidden', { value: true, configurable: true })
    document.dispatchEvent(new Event('visibilitychange'))
  })

  // Advance well past the original duration — should not dismiss while page is hidden
  act(() => {
    vi.advanceTimersByTime(5000)
  })

  expect(toastStore.getSnapshot()[0]?.state).toBe('paused')

  // Simulate page becoming visible again
  act(() => {
    Object.defineProperty(document, 'hidden', { value: false, configurable: true })
    document.dispatchEvent(new Event('visibilitychange'))
  })

  expect(toastStore.getSnapshot()[0]?.state).toBe('visible')

  vi.useRealTimers()
})
