import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { usePageVisibility } from '../use-page-visibility'

function dispatchVisibilityChange(hidden: boolean) {
  Object.defineProperty(document, 'hidden', { value: hidden, configurable: true })
  document.dispatchEvent(new Event('visibilitychange'))
}

afterEach(() => {
  Object.defineProperty(document, 'hidden', { value: false, configurable: true })
})

test('calls onChange with true when the tab becomes hidden', () => {
  const onChange = vi.fn()
  renderHook(() => usePageVisibility(onChange))

  act(() => {
    dispatchVisibilityChange(true)
  })

  expect(onChange).toHaveBeenCalledWith(true)
})

test('calls onChange with false when the tab becomes visible', () => {
  const onChange = vi.fn()
  renderHook(() => usePageVisibility(onChange))

  act(() => {
    dispatchVisibilityChange(true)
  })

  act(() => {
    dispatchVisibilityChange(false)
  })

  expect(onChange).toHaveBeenLastCalledWith(false)
})

test('removes the event listener on unmount', () => {
  const onChange = vi.fn()
  const { unmount } = renderHook(() => usePageVisibility(onChange))

  unmount()

  // Clear the call from the initial mount synchronisation.
  onChange.mockClear()

  act(() => {
    dispatchVisibilityChange(true)
  })

  expect(onChange).not.toHaveBeenCalled()
})

test('re-registers the listener when onChange changes', () => {
  const first = vi.fn()
  const second = vi.fn()

  const { rerender } = renderHook(({ cb }) => usePageVisibility(cb), {
    initialProps: { cb: first },
  })

  // Clear calls from the initial mount synchronisation before re-rendering.
  first.mockClear()
  rerender({ cb: second })
  second.mockClear()

  act(() => {
    dispatchVisibilityChange(true)
  })

  expect(first).not.toHaveBeenCalled()
  expect(second).toHaveBeenCalledWith(true)
})
