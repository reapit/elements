import { createContext, useContext } from 'react'

import type { ComponentProps, ReactNode } from 'react'
import type { ChipSelectChip } from './chip'

export interface ChipSelectContextType {
  /** The ID of the form to associate chip select options with. */
  form?: string
  /** Whether the chip select allows multiple selections. */
  multiple: boolean
  /** The name each chip select option should have. */
  name?: string
  /** The size of options in the chip select. */
  size: ComponentProps<typeof ChipSelectChip>['size']
}

export const ChipSelectContext = createContext<ChipSelectContextType | null>(null)

interface ChipSelectContextProviderProps extends ChipSelectContextType {
  children: ReactNode
}

export function ChipSelectContextProvider({ children, form, multiple, name, size }: ChipSelectContextProviderProps) {
  return <ChipSelectContext.Provider value={{ form, multiple, name, size }}>{children}</ChipSelectContext.Provider>
}

export function useChipSelectContext() {
  const context = useContext(ChipSelectContext)
  if (!context) {
    throw new Error('useChipSelectContext must be used within a ChipSelect')
  }
  return context
}
