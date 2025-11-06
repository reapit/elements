import { createContext, useContext } from 'react'

export namespace ListboxContext {
  export interface Value {
    /** Listbox element ID */
    listboxId: string
    /** Allows multiple option selection */
    multiple: boolean
    /** Whether to toggle or select the option when clicked */
    selectAction: 'select' | 'toggle'
    /** Currently selected option values from the hidden select element */
    selectValue: readonly string[]
  }
}

/**
 * Provides configuration and state to Listbox descendants for managing
 * listbox behavior, selection, and form integration.
 */
export const ListboxContext = createContext<ListboxContext.Value | null>(null)

/**
 * Returns the current ListboxContext value.
 * @returns The listbox context containing configuration and state
 * @throws {Error} when used outside a Listbox
 */
export function useListboxContext(): ListboxContext.Value {
  const context = useContext(ListboxContext)
  if (!context) {
    throw new Error('useListboxContext must be used within a Listbox')
  }
  return context
}
