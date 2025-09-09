import { ChipSelectChip } from './chip'
import { forwardRef } from 'react'
import { useChipSelectContext } from './context'

import type { ComponentProps } from 'react'

type AttributesToOmit = 'isExclusive' | 'form' | 'name' | 'size'

export interface ChipSelectOptionProps extends Omit<ComponentProps<typeof ChipSelectChip>, AttributesToOmit> {}

/**
 * A thin wrapper around `ChipSelectChip` that respects the `form`, `name`, `size` and selection mode
 * of the `ChipSelect`.
 */
export const ChipSelectOption = forwardRef<HTMLInputElement, ChipSelectOptionProps>((props, ref) => {
  const { form, multiple, name, size } = useChipSelectContext()
  return <ChipSelectChip {...props} isExclusive={!multiple} form={form} name={name} ref={ref} size={size} />
})

ChipSelectOption.displayName = 'ChipSelectOption'
