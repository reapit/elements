import { renderHook } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'

import { useIsMobileNavItemExpanded } from '../use-is-mobile-nav-item-expanded'

describe('useIsMobileNavExpanded', () => {
  it('should return the correct state when isActive is true', () => {
    const { result } = renderHook(() => useIsMobileNavItemExpanded(true))

    expect(result.current[0]).toBeTruthy()
  })

  it('should return the correct state when isActive is false', () => {
    const { result } = renderHook(() => useIsMobileNavItemExpanded(false))

    expect(result.current[0]).toBeFalsy()
  })

  it('should return the correct state when changing state', () => {
    const { result } = renderHook(() => useIsMobileNavItemExpanded(true))

    expect(result.current[0]).toBeTruthy()

    act(() => {
      result.current[1](false)
    })

    expect(result.current[0]).toBeFalsy()
  })
})
