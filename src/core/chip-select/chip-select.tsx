import { ChipSelectContextProvider } from './context'
import { ChipSelectOption } from './chip-select-option'
import { determineNextControlledState } from './chip'
import { ElChipSelect } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export interface ChipSelectProps extends HTMLAttributes<HTMLDivElement> {
  /** The chip select items. */
  children: ReactNode
  /**
   * The ID of the form the chip select's options should be associated with. Will be automatically passed
   * to each option included in the chip select. Without an associated form, or a name, single-selection
   * behaviour will not be handled out-of-the-box.
   *
   * An explicit value is only necessary if the chip select is not a descendant of a form element; if it
   * is, it will be automatically associated with that ancestral form.
   */
  form?: string
  /** Whether the chip select should wrap or not. */
  flow?: 'wrap' | 'nowrap'
  /** Whether the chip select should allow multiple selections or not. */
  multiple?: boolean
  /**
   * The name each option in the chip select should use. Will be automatically passed to each option.
   * Without a name, or an associated form, single-selection behaviour will not be handled out-of-the-box.
   */
  name?: string
  /** What overflow behaviour the chip select should exhibit. */
  overflow?: 'auto' | 'visible'
  /** The size of the chip select's options. */
  size: 'small' | 'medium' | 'large'
}

/**
 * The chip select allows the user to select one or more options from a list of items. It supports
 * both single-select and multi-select modes depending on the use case. Importantly, single-select
 * behaviour in controlled scenarios (that is, where the checked state of each option is controlled
 * by the consumer) must be handled by the consumers given they are responsible for the state.
 */
export function ChipSelect({
  children,
  form,
  flow = 'wrap',
  multiple = false,
  name,
  overflow = 'visible',
  size,
  ...rest
}: ChipSelectProps) {
  return (
    <ElChipSelect {...rest} data-flow={flow} data-overflow={overflow}>
      <ChipSelectContextProvider form={form} multiple={multiple} name={name} size={size}>
        {children}
      </ChipSelectContextProvider>
    </ElChipSelect>
  )
}

ChipSelect.Option = ChipSelectOption
ChipSelect.determineNextControlledState = determineNextControlledState
