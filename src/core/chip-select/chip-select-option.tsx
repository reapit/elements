import { ChipSelectChip } from './chip'
import { deselectOtherOptions } from './deselect-other-options'
import { forwardRef, useCallback } from 'react'
import { useChipSelectContext } from './context'

import type { ChangeEventHandler, ComponentProps } from 'react'

type AttributesToOmit = 'form' | 'name' | 'size'

export namespace ChipSelectOption {
  export interface Props extends Omit<ComponentProps<typeof ChipSelectChip>, AttributesToOmit> {}
}

/** @deprecated Use ChipSelectOption.Props instead */
export type ChipSelectOptionProps = ChipSelectOption.Props

/**
 * A thin wrapper around `ChipSelectChip` that respects the `form`, `name`, `size` and selection mode
 * of the `ChipSelect`. Owns group-level coordination — in particular, deselecting other options
 * when an exclusive chip is checked.
 */
export const ChipSelectOption = forwardRef<HTMLInputElement, ChipSelectOption.Props>(
  ({ onChange, required, ...rest }, ref) => {
    const context = useChipSelectContext()

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (event) => {
        const { containerRef, multiple } = context

        if (event.currentTarget.checked && !multiple) {
          const container = containerRef.current
          if (container) deselectOtherOptions(container, event.currentTarget)
        }

        onChange?.(event)
      },
      [context, onChange],
    )

    return (
      <ChipSelectChip
        {...rest}
        data-exclusive={!context.multiple}
        form={context.form}
        name={context.name}
        onChange={handleChange}
        ref={ref}
        required={required ?? context.required}
        size={context.size}
      />
    )
  },
)

ChipSelectOption.displayName = 'ChipSelect.Option'
