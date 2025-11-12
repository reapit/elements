import { createContext, useContext } from 'react'

export namespace ComboboxContext {
  export interface Value {
    /** Button element ID */
    buttonId: string
    /** Whether the combobox is disabled */
    disabled: boolean
    /** Listbox element ID */
    listboxId: string
    /** Popup element ID */
    popupId: string
    /** Whether the combobox is required */
    required: boolean
  }
}

/**
 * Provides configuration to Combobox descendants for managing listbox behaviour.
 */
export const ComboboxContext = createContext<ComboboxContext.Value | null>(null)

/**
 * Returns the current ComboboxContext value.
 * @returns The combobox context containing configuration and state
 * @throws {Error} when used outside a Listbox
 */
export function useComboboxContext(): ComboboxContext.Value {
  const context = useContext(ComboboxContext)
  if (!context) {
    throw new Error('useComboboxContext must be used within a Combobox')
  }
  return context
}
