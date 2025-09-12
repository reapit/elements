import { createContext, useContext } from 'react'

import type { ChipSelectChip } from './chip'
import type { ComponentProps } from 'react'

export namespace ChipSelectContext {
  export interface Value {
    /** The ID of the form to associate chip select options with. */
    form?: string
    /** Whether the chip select allows multiple selections. */
    multiple: boolean
    /** The name each chip select option should have. */
    name?: string
    /** The size of options in the chip select. */
    size: ComponentProps<typeof ChipSelectChip>['size']
  }
}

export const ChipSelectContext = createContext<ChipSelectContext.Value | null>(null)

export function useChipSelectContext(): ChipSelectContext.Value {
  const context = useContext(ChipSelectContext)
  if (!context) {
    throw new Error('useChipSelectContext must be used within a ChipSelect')
  }
  return context
}
