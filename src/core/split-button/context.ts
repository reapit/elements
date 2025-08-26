import { createContext, useContext } from 'react'

import type { ComponentProps } from 'react'
import type { SplitButton } from './split-button'

export interface SplitButtonContextType {
  /** Whether the main action button, menu button, or neither, is busy. */
  busy: 'action' | 'menu-item' | undefined
  /** The size of the main action and menu buttons. */
  size: ComponentProps<typeof SplitButton>['size']
  /** The variant used by the main action and menu buttons. */
  variant: ComponentProps<typeof SplitButton>['variant']
}

export const SplitButtonContext = createContext<SplitButtonContextType | null>(null)

export function useSplitButtonContext() {
  const context = useContext(SplitButtonContext)
  if (!context) {
    throw new Error('useSplitButtonContext must be used within a SplitButton')
  }
  return context
}
