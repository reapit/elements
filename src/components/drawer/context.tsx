import { createContext, useContext, useMemo } from 'react'

import type { ReactNode, RefObject } from 'react'

interface DrawerContext {
  dialogRef: RefObject<HTMLDialogElement>
  titleId: string
}

interface DrawerContextProviderProps extends DrawerContext {
  children: ReactNode
}

/**
 * The context available to a Drawer's descendants. Provides access to a single `close` function
 * that can be used to imperatively close the parent drawer.
 */
const DrawerContext = createContext<DrawerContext | null>(null)

/**
 * Provides the given values over the `DrawerContext`. For internal Drawer use only.
 */
export function DrawerContextProvider({ children, dialogRef, titleId }: DrawerContextProviderProps) {
  const value = useMemo<DrawerContext>(
    () => ({
      dialogRef,
      titleId,
    }),
    [dialogRef, titleId],
  )
  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
}

/**
 * Returns the current `DrawerContext` value.
 * @throws an error if the context is not defined.
 */
export function useDrawerContext(): DrawerContext | null {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('DrawerContext not defined: useDrawerContext can only be used in a child of DrawerContext')
  }
  return context
}

export default DrawerContext
