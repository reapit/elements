import { useMatchMedia } from '../index'
import { renderHook, waitFor } from '@testing-library/react'

// NOTE: HappyDOM does not appear to support MediaQueryList change events, so we can't test our
// handling of those events here.

test('returns true when condition matches', () => {
  const { result } = renderHook(() => useMatchMedia('(min-width: 0px)'))
  expect(result.current).toBe(true)
})

test('returns false when condition does not match', () => {
  const { result } = renderHook(() => useMatchMedia('(min-width: 999999px)'))
  expect(result.current).toBe(false)
})

test('updates when condition changes', async () => {
  const { result, rerender } = renderHook(({ condition }) => useMatchMedia(condition), {
    initialProps: { condition: '(min-width: 999999px)' },
  })

  expect(result.current).toBe(false)

  rerender({ condition: '(min-width: 0px)' })

  await waitFor(() => {
    expect(result.current).toBe(true)
  })
})
