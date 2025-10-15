import { ChipSelectChip } from './chip'
import { forwardRef } from 'react'
import { useChipSelectContext } from './context'

import type { ComponentProps } from 'react'

type AttributesToOmit = 'isExclusive' | 'form' | 'name' | 'size'

export namespace ChipSelectOption {
  export interface Props extends Omit<ComponentProps<typeof ChipSelectChip>, AttributesToOmit> {}
}

/** @deprecated Use ChipSelectOption.Props instead */
export type ChipSelectOptionProps = ChipSelectOption.Props

/**
 * A thin wrapper around `ChipSelectChip` that respects the `form`, `name`, `size` and selection mode
 * of the `ChipSelect`.
 */
export const ChipSelectOption = forwardRef<HTMLInputElement, ChipSelectOption.Props>(({ required, ...rest }, ref) => {
  const context = useChipSelectContext()
  return (
    <ChipSelectChip
      {...rest}
      isExclusive={!context.multiple}
      form={context.form}
      name={context.name}
      ref={ref}
      required={required ?? context.required}
      size={context.size}
    />
  )
})

ChipSelectOption.displayName = 'ChipSelect.Option'
