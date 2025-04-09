import { renderHook } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'

import { useTopNavMenuExpandableState } from '../use-top-nav-menu-expandable-state'

describe('useTopNavMenuExpandableState', () => {
  it('should return the correct state when isActive is true', () => {
    const { result } = renderHook(() => useTopNavMenuExpandableState(true))

    expect(result.current[0]).toBeTruthy()
  })

  it('should return the correct state when isActive is false', () => {
    const { result } = renderHook(() => useTopNavMenuExpandableState(false))

    expect(result.current[0]).toBeFalsy()
  })

  it('should return the correct state when changing state', () => {
    const { result } = renderHook(() => useTopNavMenuExpandableState(true))

    expect(result.current[0]).toBeTruthy()

    act(() => {
      result.current[1](false)
    })

    expect(result.current[0]).toBeFalsy()
  })
})
