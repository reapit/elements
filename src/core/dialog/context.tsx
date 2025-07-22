import { createContext, useContext, useMemo } from 'react'

import type { ReactNode, RefObject } from 'react'

interface DialogContext {
  dialogRef: RefObject<HTMLDialogElement>
  titleId: string
}

interface DialogContextProviderProps extends DialogContext {
  children: ReactNode
}

/**
 * The context available to a Dialog's descendants. Provides access to a single `close` function
 * that can be used to imperatively close the parent dialog.
 */
const DialogContext = createContext<DialogContext | null>(null)

/**
 * Provides the given values over the `DialogContext`. For internal Dialog use only.
 */
export function DialogContextProvider({ children, dialogRef, titleId }: DialogContextProviderProps) {
  const value = useMemo<DialogContext>(
    () => ({
      dialogRef,
      titleId,
    }),
    [dialogRef, titleId],
  )
  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
}

/**
 * Returns the current `DialogContext` value.
 * @throws an error if the context is not defined.
 */
export function useDialogContext(): DialogContext | null {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('DialogContext not defined: useDialogContext can only be used in a child of DialogContext')
  }
  return context
}

export default DialogContext
