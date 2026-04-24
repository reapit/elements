import { render, act } from '@testing-library/react'
import { outletStack } from '../outlet-stack'
import { toastStore } from '../store'
import { ToastOutlet } from '../toast-outlet'

beforeEach(() => {
  if (!HTMLElement.prototype.showPopover) {
    HTMLElement.prototype.showPopover = () => undefined
  }
  if (!HTMLElement.prototype.hidePopover) {
    HTMLElement.prototype.hidePopover = () => undefined
  }
})

afterEach(() => {
  for (const entry of toastStore.getSnapshot()) {
    toastStore.remove(entry.id)
  }
})

test('registers itself on the outlet stack when mounted', () => {
  expect(outletStack.getSnapshot()).toBeNull()

  const { unmount } = render(<ToastOutlet />)

  expect(outletStack.getSnapshot()).toBeInstanceOf(HTMLElement)

  unmount()
})

test('removes itself from the outlet stack when unmounted', () => {
  const { unmount } = render(<ToastOutlet />)
  expect(outletStack.getSnapshot()).not.toBeNull()

  unmount()

  expect(outletStack.getSnapshot()).toBeNull()
})

test('the most recently mounted outlet is at the top of the stack', () => {
  const { unmount: unmountFirst } = render(<ToastOutlet />)
  const first = outletStack.getSnapshot()

  const { unmount: unmountSecond } = render(<ToastOutlet />)
  const second = outletStack.getSnapshot()

  expect(second).not.toBe(first)

  act(() => {
    unmountSecond()
  })

  expect(outletStack.getSnapshot()).toBe(first)

  unmountFirst()
})

test('calls showPopover when it is the active outlet and toasts exist', () => {
  const showSpy = vi.spyOn(HTMLElement.prototype, 'showPopover')

  const { unmount } = render(<ToastOutlet />)

  act(() => {
    toastStore.add({ variant: 'neutral', message: 'Hello' })
  })

  expect(showSpy).toHaveBeenCalled()

  showSpy.mockRestore()
  unmount()
})

test('calls hidePopover when toasts are removed', () => {
  const hideSpy = vi.spyOn(HTMLElement.prototype, 'hidePopover')

  const id = toastStore.add({ variant: 'neutral', message: 'Hello' })
  const { unmount } = render(<ToastOutlet />)

  hideSpy.mockClear()

  act(() => {
    toastStore.remove(id)
  })

  expect(hideSpy).toHaveBeenCalled()

  hideSpy.mockRestore()
  unmount()
})

test('does not call showPopover when it is not the active outlet', () => {
  const showSpy = vi.spyOn(HTMLElement.prototype, 'showPopover')

  const { unmount: unmountFirst } = render(<ToastOutlet />)
  const { unmount: unmountSecond } = render(<ToastOutlet />)

  showSpy.mockClear()

  act(() => {
    toastStore.add({ variant: 'neutral', message: 'Hello' })
  })

  // showPopover should only be called once — on the active (second) outlet
  expect(showSpy).toHaveBeenCalledTimes(1)

  showSpy.mockRestore()
  unmountSecond()
  unmountFirst()
})
