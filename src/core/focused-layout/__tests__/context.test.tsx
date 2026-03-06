import { FocusedLayoutContext, useFocusedLayoutContext } from '../context'
import { renderHook } from '@testing-library/react'

import type { ReactNode } from 'react'

test('throws when called outside a FocusedLayout', () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
  expect(() => {
    renderHook(() => useFocusedLayoutContext())
  }).toThrow('useFocusedLayoutContext requires a FocusedLayout ancestor')
  consoleError.mockRestore()
})

test('returns the context value', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <FocusedLayoutContext.Provider value={{ background: 'dark' }}>{children}</FocusedLayoutContext.Provider>
  )

  const { result } = renderHook(() => useFocusedLayoutContext(), { wrapper })
  expect(result.current.background).toBe('dark')
})
