import { createContext, useContext, useMemo } from 'react'

import type { ReactNode } from 'react'

interface BottomBarContextValue {
  isOpen: boolean
}

interface BottomBarContextProviderProps extends BottomBarContextValue {
  children: ReactNode
}

/**
 * The context available to a BottomBar's descendants. Provides access to a single `isOpen` boolean
 * that allows them to be aware of the BottomBar's open state.
 */
export const BottomBarContext = createContext<BottomBarContextValue | null>(null)

/**
 * Provides the given values over the `BottomBarContext`. For internal BottomBar use only.
 */
export function BottomBarContextProvider({ children, isOpen }: BottomBarContextProviderProps) {
  const value = useMemo<BottomBarContextValue>(() => ({ isOpen }), [isOpen])
  return <BottomBarContext.Provider value={value}>{children}</BottomBarContext.Provider>
}

/**
 * Returns the current `BottomBarContext` value.
 * @throws an error if the context is not defined.
 */
export function useBottomBarContext(): BottomBarContextValue {
  const context = useContext(BottomBarContext)
  if (!context) {
    throw new Error('BottomBarContext not defined: useBottomBarContext can only be used in a child of BottomBarContext')
  }
  return context
}
