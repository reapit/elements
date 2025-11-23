import { createContext, useContext } from 'react'

// NOTE: This context shares attributes between multiple Combobox subcomponents
// (e.g., disabled affects both ComboboxButton and ComboboxListbox). Define
// attributes used by only one subcomponent on that subcomponent's interface instead.

export namespace ComboboxContext {
  /**
   * Configuration shared between Combobox subcomponents.
   * Only includes attributes used by multiple subcomponents.
   */
  export interface Value {
    /** Button element ID */
    buttonId: string
    /** Whether the combobox is disabled */
    disabled: boolean
    /** Listbox element ID */
    listboxId: string
    /** Whether multiple selections are allowed */
    multiple: boolean
    /** Popup element ID */
    popupId: string
    /** Whether the combobox is required */
    required: boolean
    /** Size of the combobox */
    size: 'small' | 'medium' | 'large'
  }
}

/**
 * Provides configuration to Combobox descendants for managing listbox behaviour.
 */
export const ComboboxContext = createContext<ComboboxContext.Value | null>(null)

/**
 * Returns the current ComboboxContext value.
 * @returns The combobox context
 * @throws {Error} when used outside a Combobox
 */
export function useComboboxContext(): ComboboxContext.Value {
  const context = useContext(ComboboxContext)
  if (!context) {
    throw new Error('useComboboxContext requires a Combobox ancestor')
  }
  return context
}
