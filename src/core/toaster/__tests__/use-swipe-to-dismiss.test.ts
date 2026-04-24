import { renderHook, act } from '@testing-library/react'
import { useSwipeToDismiss } from '../use-swipe-to-dismiss'

import type { RefObject } from 'react'
import type { Toaster } from '../toaster'

interface Options {
  contentElRef: RefObject<HTMLDivElement | null>
  position: Toaster.Position
  onDismiss: () => void
  onSwipeStart: () => void
  onSwipeEnd: () => void
}

function createContentRef(): RefObject<HTMLDivElement> {
  const el = document.createElement('div')
  // HappyDOM may not implement setPointerCapture
  el.setPointerCapture ??= () => undefined
  el.releasePointerCapture ??= () => undefined
  return { current: el }
}

function defaultOptions(overrides: Partial<Options> = {}): Options {
  return {
    contentElRef: createContentRef(),
    position: 'bottom-center',
    onDismiss: vi.fn(),
    onSwipeStart: vi.fn(),
    onSwipeEnd: vi.fn(),
    ...overrides,
  }
}

function pointerEvent(clientY: number, overrides: Partial<React.PointerEvent<HTMLDivElement>> = {}) {
  return { clientY, button: 0, pointerId: 1, ...overrides } as React.PointerEvent<HTMLDivElement>
}

test('calls onSwipeStart on pointer down', () => {
  const onSwipeStart = vi.fn()
  const { result } = renderHook(() => useSwipeToDismiss(defaultOptions({ onSwipeStart })))

  act(() => {
    result.current.onPointerDown(pointerEvent(100))
  })

  expect(onSwipeStart).toHaveBeenCalledTimes(1)
})

test('ignores right-clicks', () => {
  const onSwipeStart = vi.fn()
  const { result } = renderHook(() => useSwipeToDismiss(defaultOptions({ onSwipeStart })))

  act(() => {
    result.current.onPointerDown(pointerEvent(100, { button: 2 }))
  })

  expect(onSwipeStart).not.toHaveBeenCalled()
})

test('calls onDismiss when swipe distance exceeds threshold (bottom position)', () => {
  const onDismiss = vi.fn()
  const { result } = renderHook(() => useSwipeToDismiss(defaultOptions({ onDismiss })))

  act(() => {
    result.current.onPointerDown(pointerEvent(100))
    // Swipe down by 50px (exceeds 45px threshold)
    result.current.onPointerMove(pointerEvent(150))
    result.current.onPointerUp()
  })

  expect(onDismiss).toHaveBeenCalledTimes(1)
})

test('calls onDismiss when swipe distance exceeds threshold (top position)', () => {
  const onDismiss = vi.fn()
  const { result } = renderHook(() => useSwipeToDismiss(defaultOptions({ onDismiss, position: 'top-center' })))

  act(() => {
    result.current.onPointerDown(pointerEvent(150))
    // Swipe up by 50px (exceeds 45px threshold for top position)
    result.current.onPointerMove(pointerEvent(100))
    result.current.onPointerUp()
  })

  expect(onDismiss).toHaveBeenCalledTimes(1)
})

test('calls onSwipeEnd when swipe does not meet distance or velocity threshold', () => {
  vi.useFakeTimers()
  const onDismiss = vi.fn()
  const onSwipeEnd = vi.fn()
  const { result } = renderHook(() => useSwipeToDismiss(defaultOptions({ onDismiss, onSwipeEnd })))

  act(() => {
    result.current.onPointerDown(pointerEvent(100))
    // Advance time so velocity stays low (10px / 500ms = 0.02, well below 0.11)
    vi.advanceTimersByTime(500)
    // Swipe only 10px — below 45px threshold
    result.current.onPointerMove(pointerEvent(110))
    result.current.onPointerUp()
  })

  expect(onDismiss).not.toHaveBeenCalled()
  expect(onSwipeEnd).toHaveBeenCalledTimes(1)
  vi.useRealTimers()
})

test('calls onSwipeEnd on pointer cancel', () => {
  const onSwipeEnd = vi.fn()
  const { result } = renderHook(() => useSwipeToDismiss(defaultOptions({ onSwipeEnd })))

  act(() => {
    result.current.onPointerDown(pointerEvent(100))
    result.current.onPointerCancel()
  })

  expect(onSwipeEnd).toHaveBeenCalledTimes(1)
})

test('resets --swipe-offset to 0px on pointer cancel', () => {
  const contentElRef = createContentRef()
  const { result } = renderHook(() => useSwipeToDismiss(defaultOptions({ contentElRef })))

  act(() => {
    result.current.onPointerDown(pointerEvent(100))
    result.current.onPointerMove(pointerEvent(130))
    result.current.onPointerCancel()
  })

  expect(contentElRef.current!.style.getPropertyValue('--swipe-offset')).toBe('0px')
})

test('sets --swipe-offset on the content element during a swipe', () => {
  const contentElRef = createContentRef()
  const { result } = renderHook(() => useSwipeToDismiss(defaultOptions({ contentElRef })))

  act(() => {
    result.current.onPointerDown(pointerEvent(100))
    result.current.onPointerMove(pointerEvent(130))
  })

  expect(contentElRef.current!.style.getPropertyValue('--swipe-offset')).toBe('30px')
})

test('applies dampening when swiping against the dismiss direction', () => {
  const contentElRef = createContentRef()
  const { result } = renderHook(() => useSwipeToDismiss(defaultOptions({ contentElRef })))

  act(() => {
    result.current.onPointerDown(pointerEvent(100))
    // Swipe up (against dismiss direction for bottom position)
    result.current.onPointerMove(pointerEvent(80))
  })

  const offset = Number.parseFloat(contentElRef.current!.style.getPropertyValue('--swipe-offset'))
  // Delta is -20, dampened value should be negative and smaller in magnitude than 20
  expect(offset).toBeLessThan(0)
  expect(Math.abs(offset)).toBeLessThan(20)
})

test('does not call onDismiss when swiping against the dismiss direction past threshold', () => {
  const onDismiss = vi.fn()
  const onSwipeEnd = vi.fn()
  const { result } = renderHook(() => useSwipeToDismiss(defaultOptions({ onDismiss, onSwipeEnd })))

  act(() => {
    result.current.onPointerDown(pointerEvent(100))
    // Swipe up 50px (against dismiss direction for bottom position)
    result.current.onPointerMove(pointerEvent(50))
    result.current.onPointerUp()
  })

  expect(onDismiss).not.toHaveBeenCalled()
  expect(onSwipeEnd).toHaveBeenCalledTimes(1)
})

test('pointer move is ignored when no pointer down has occurred', () => {
  const contentElRef = createContentRef()
  const { result } = renderHook(() => useSwipeToDismiss(defaultOptions({ contentElRef })))

  act(() => {
    result.current.onPointerMove(pointerEvent(150))
  })

  expect(contentElRef.current!.style.getPropertyValue('--swipe-offset')).toBe('')
})
