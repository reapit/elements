import { createContext, useContext } from 'react'

export namespace FocusedLayoutContext {
  export interface Value {
    /** The background style of the focused layout */
    background: 'light' | 'dark'
  }
}

/**
 * Context that FocusedLayout provides to descendants. Exposes the background style
 * for consistent styling of child components.
 */
export const FocusedLayoutContext = createContext<FocusedLayoutContext.Value | null>(null)

/**
 * Returns FocusedLayoutContext.Value from the nearest FocusedLayout ancestor.
 * @throws Error when called outside a FocusedLayout component.
 */
export function useFocusedLayoutContext(): FocusedLayoutContext.Value {
  const context = useContext(FocusedLayoutContext)
  if (!context) {
    throw new Error('useFocusedLayoutContext requires a FocusedLayout ancestor')
  }
  return context
}
