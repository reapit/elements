import { createContext, useContext, useMemo } from 'react'
import type { ReactNode, RefObject } from 'react'

type CloseDrawerFn = () => void

interface DrawerContext {
  close: CloseDrawerFn
}

interface DrawerContextProviderProps {
  children: ReactNode
  dialogElementRef: RefObject<HTMLDialogElement>
}

/**
 * The context available to a Drawer's descendants. Provides access to a single `close` function
 * that can be used to imperatively close the parent drawer.
 */
const DrawerContext = createContext<DrawerContext | null>(null)

export function DrawerContextProvider({ children, dialogElementRef }: DrawerContextProviderProps) {
  const value = useMemo<DrawerContext>(
    () => ({
      close: () => dialogElementRef.current?.close(),
    }),
    [dialogElementRef],
  )
  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
}

/** Returns a function that will close the parent drawer. */
export function useCloseDrawer(): CloseDrawerFn {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('DrawerContext not defined: useCloseDrawer can only be used in a child of DrawerContext')
  }
  return context.close
}

export default DrawerContext
