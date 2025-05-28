import { createContext, useContext, useMemo } from 'react'
import type { UseSideBarResult } from './use-side-bar'

interface SideBarContextValue extends UseSideBarResult {
  id: string
}

export const SideBarContext = createContext<SideBarContextValue | undefined>(undefined)

interface SideBarContextPublisherProps extends SideBarContextValue {
  children: React.ReactNode
}

export function SideBarContextPublisher(props: SideBarContextPublisherProps) {
  const contextValue = useMemo(() => {
    const { children: _children, ...contextValue } = props
    return contextValue
  }, [props])

  return <SideBarContext.Provider value={contextValue}>{props.children}</SideBarContext.Provider>
}

export function useSideBarContext(): SideBarContextValue {
  const context = useContext(SideBarContext)
  if (!context) {
    throw new Error('useSideBarContext must be used within a SideBarContext.Provider')
  }
  return context
}
