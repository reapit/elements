import { createContext, useContext } from 'react'

export namespace DrawerContext {
  export interface Value {
    titleId: string
  }
}

/**
 * The context available to a Drawer's descendants. Provides access to a single `close` function
 * that can be used to imperatively close the parent drawer.
 */
export const DrawerContext = createContext<DrawerContext.Value | null>(null)

/**
 * Returns the current `DrawerContext` value.
 * @throws an error if the context is not defined.
 */
export function useDrawerContext(): DrawerContext.Value {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('DrawerContext not defined: useDrawerContext can only be used in a child of DrawerContext')
  }
  return context
}
