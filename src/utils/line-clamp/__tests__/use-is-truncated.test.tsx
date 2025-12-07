import { renderHook, waitFor } from '@testing-library/react'
import { useIsHeightTruncated } from '../use-is-truncated'

afterEach(() => {
  document.body.innerHTML = ''
})

test('returns false initially when element does not exist', () => {
  const { result } = renderHook(() => useIsHeightTruncated('non-existent-id'))
  expect(result.current).toBe(false)
})

test('returns false when element is not truncated', async () => {
  const element = createElementWithHeights('test-element', 100, 100)
  document.body.appendChild(element)

  const { result } = renderHook(() => useIsHeightTruncated('test-element'))

  await waitFor(() => {
    expect(result.current).toBe(false)
  })
})

test('returns true when element is truncated', async () => {
  const element = createElementWithHeights('test-element', 150, 100)
  document.body.appendChild(element)

  const { result } = renderHook(() => useIsHeightTruncated('test-element'))

  await waitFor(() => {
    expect(result.current).toBe(true)
  })
})

test('observes element with ResizeObserver', () => {
  const element = createElementWithHeights('test-element', 100, 100)
  document.body.appendChild(element)

  const observeSpy = vi.spyOn(ResizeObserver.prototype, 'observe')

  renderHook(() => useIsHeightTruncated('test-element'))

  expect(observeSpy).toHaveBeenCalledWith(element)
  observeSpy.mockRestore()
})

test('re-evaluates truncation when dependencies change', async () => {
  const element = createElementWithHeights('test-element', 100, 100)
  document.body.appendChild(element)

  const { result, rerender } = renderHook(({ deps }) => useIsHeightTruncated('test-element', deps), {
    initialProps: { deps: ['initial'] },
  })

  await waitFor(() => {
    expect(result.current).toBe(false)
  })

  // Change element height
  Object.defineProperty(element, 'scrollHeight', {
    configurable: true,
    value: 200,
  })

  // Trigger re-evaluation by changing dependencies
  rerender({ deps: ['changed'] })

  await waitFor(() => {
    expect(result.current).toBe(true)
  })
})

test('disconnects observer on cleanup', () => {
  const element = createElementWithHeights('test-element', 100, 100)
  document.body.appendChild(element)

  const disconnectSpy = vi.spyOn(ResizeObserver.prototype, 'disconnect')

  const { unmount } = renderHook(() => useIsHeightTruncated('test-element'))

  unmount()

  expect(disconnectSpy).toHaveBeenCalled()
  disconnectSpy.mockRestore()
})

test('handles element ID changes', async () => {
  const element1 = createElementWithHeights('element-1', 150, 100)
  const element2 = createElementWithHeights('element-2', 100, 100)
  document.body.appendChild(element1)
  document.body.appendChild(element2)

  const { result, rerender } = renderHook(({ id }) => useIsHeightTruncated(id), { initialProps: { id: 'element-1' } })

  await waitFor(() => {
    expect(result.current).toBe(true)
  })

  rerender({ id: 'element-2' })

  await waitFor(() => {
    expect(result.current).toBe(false)
  })
})

test('does not observe when element does not exist', () => {
  const observeSpy = vi.spyOn(ResizeObserver.prototype, 'observe')

  renderHook(() => useIsHeightTruncated('non-existent-element'))

  expect(observeSpy).not.toHaveBeenCalled()
  observeSpy.mockRestore()
})

function createElementWithHeights(id: string, scrollHeight: number, clientHeight: number): HTMLElement {
  const element = document.createElement('div')
  element.id = id

  Object.defineProperty(element, 'scrollHeight', {
    configurable: true,
    value: scrollHeight,
  })

  Object.defineProperty(element, 'clientHeight', {
    configurable: true,
    value: clientHeight,
  })

  return element
}
