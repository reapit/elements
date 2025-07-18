import { createContext, useContext } from 'react'

import type { ComponentProps } from 'react'
import type { SplitButton } from './split-button'

interface SplitButtonContextType {
  size: ComponentProps<typeof SplitButton>['size']
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
