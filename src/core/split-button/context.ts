import { createContext, useContext } from 'react'

import type { ComponentProps } from 'react'
import type { SplitButton } from './split-button'

export namespace SplitButtonContext {
  export interface Value {
    /** Whether the main action button, menu button, or neither, is busy. */
    busy: 'action' | 'menu-item' | undefined
    /** The size of the main action and menu buttons. */
    size: ComponentProps<typeof SplitButton>['size']
    /** The variant used by the main action and menu buttons. */
    variant: ComponentProps<typeof SplitButton>['variant']
  }
}

/**
 * The context available to a SplitButton's descendants. Provides access to shared
 * state including busy status, size, and variant for consistent styling.
 */
export const SplitButtonContext = createContext<SplitButtonContext.Value | null>(null)

/**
 * Returns the current SplitButtonContext value.
 * @throws an error if the context is not defined.
 */
export function useSplitButtonContext(): SplitButtonContext.Value {
  const context = useContext(SplitButtonContext)
  if (!context) {
    throw new Error('useSplitButtonContext must be used within a SplitButton')
  }
  return context
}
