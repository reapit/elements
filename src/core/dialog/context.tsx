import { createContext, useContext } from 'react'

export namespace DialogContext {
  export interface Value {
    /** The ID used for accessibility labeling of the dialog title */
    titleId: string
  }
}

/**
 * The context available to a Dialog's descendants. Provides access to titleId
 * for proper accessibility labeling.
 */
export const DialogContext = createContext<DialogContext.Value | null>(null)

/**
 * Returns the current `DialogContext` value.
 * @throws an error if the context is not defined.
 */
export function useDialogContext(): DialogContext.Value {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('DialogContext not defined: useDialogContext can only be used in a child of DialogContext')
  }
  return context
}
