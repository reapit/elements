import { createContext, useContext } from 'react'

export namespace ComboboxSelectionChipsContext {
  export interface Value {
    /** The ID of the listbox element the chips control */
    listboxId: string
  }
}

/**
 * Context that ComboboxSelectionChips provides to descendants.
 * Exposes listboxId for accessibility labeling and ARIA relationships.
 */
export const ComboboxSelectionChipsContext = createContext<ComboboxSelectionChipsContext.Value | null>(null)

/**
 * Returns ComboboxSelectionChipsContext.Value from the nearest ComboboxSelectionChips ancestor.
 * @throws Error when called outside a ComboboxSelectionChips component.
 */
export function useComboboxSelectionChipsContext(): ComboboxSelectionChipsContext.Value {
  const context = useContext(ComboboxSelectionChipsContext)
  if (!context) {
    throw new Error('useComboboxSelectionChipsContext requires a ComboboxSelectionChips ancestor')
  }
  return context
}
