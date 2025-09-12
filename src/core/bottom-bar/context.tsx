import { createContext, useContext } from 'react'

export namespace BottomBarContext {
  export interface Value {
    isOpen: boolean
  }
}

/**
 * The context available to a BottomBar's descendants. Provides access to a single `isOpen` boolean
 * that allows them to be aware of the BottomBar's open state.
 */
export const BottomBarContext = createContext<BottomBarContext.Value | null>(null)

/**
 * Returns the current `BottomBarContext` value.
 * @throws an error if the context is not defined.
 */
export function useBottomBarContext(): BottomBarContext.Value {
  const context = useContext(BottomBarContext)
  if (!context) {
    throw new Error('BottomBarContext not defined: useBottomBarContext can only be used in a child of BottomBarContext')
  }
  return context
}
