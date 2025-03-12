import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useIsSideBarExpandedContext, IsSideBarExpandedContext } from '../is-side-bar-expanded-context'
import { useState } from 'react'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  return (
    <IsSideBarExpandedContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </IsSideBarExpandedContext.Provider>
  )
}

describe('useIsSideBarExpandedContext', () => {
  it('should return context value when used within a provider', () => {
    const { result } = renderHook(() => useIsSideBarExpandedContext(), { wrapper: Wrapper })
    expect(result.current).toHaveProperty('isExpanded', true)
    expect(result.current).toHaveProperty('setIsExpanded')
  })

  it('should throw an error when used outside the provider', () => {
    expect(() => renderHook(() => useIsSideBarExpandedContext())).toThrow(
      'useIsSideBarExpandedContext must be used within a SideBarExpandedContext Provider',
    )
  })
})
