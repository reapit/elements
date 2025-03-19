import { renderHook } from '@testing-library/react'
import {
  useIsSideBarMenuGroupExpandedContext,
  IsSideBarMenuGroupExpandedContext,
} from '../is-side-bar-menu-group-expanded-context'
import { useState } from 'react'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  return (
    <IsSideBarMenuGroupExpandedContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </IsSideBarMenuGroupExpandedContext.Provider>
  )
}

describe('useIsSideBarMenuGroupExpandedContext', () => {
  it('should return context value when used within a provider', () => {
    const { result } = renderHook(() => useIsSideBarMenuGroupExpandedContext(), { wrapper: Wrapper })
    expect(result.current).toHaveProperty('isExpanded', true)
    expect(result.current).toHaveProperty('setIsExpanded')
  })

  it('should throw an error when used outside the provider', () => {
    expect(() => renderHook(() => useIsSideBarMenuGroupExpandedContext())).toThrow(
      'useIsSideBarMenuGroupExpandedContext must be used within a SideBarMenuGroupExpandedContext Provider',
    )
  })
})
