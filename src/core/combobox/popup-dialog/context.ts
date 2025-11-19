import { createContext, useContext } from 'react'

export namespace ComboboxPopupDialogContext {
  export interface Value {
    /**
     * Variant type:
     * - **auto**: Displays as a drawer on XS breakpoint, popover on SM and above
     * - **popover**: Displays as a popover anchored to the combobox button
     * - **drawer**: Displays as a drawer (full-screen modal on mobile)
     */
    variant: 'popover' | 'drawer' | 'auto'
  }
}

/**
 * Context that ComboboxPopupDialog provides to descendants.
 * Exposes the popup dialog's variant so child components can adapt their behavior
 * based on whether the popup is displayed as a popover, drawer, or auto.
 */
export const ComboboxPopupDialogContext = createContext<ComboboxPopupDialogContext.Value | null>(null)

/**
 * Returns ComboboxPopupDialogContext.Value from the nearest ComboboxPopupDialog ancestor.
 * @throws Error when called outside a ComboboxPopupDialog component.
 */
export function useComboboxPopupDialogContext(): ComboboxPopupDialogContext.Value {
  const context = useContext(ComboboxPopupDialogContext)
  if (!context) {
    throw new Error('useComboboxPopupDialogContext requires a ComboboxPopupDialog ancestor')
  }
  return context
}
