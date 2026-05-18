import { ChipSelectContext, useChipSelectContext } from './context'
import { ChipSelectOption } from './chip-select-option'
import { determineNextControlledState } from './determine-next-controlled-state'
import { ElChipSelect } from './styles'
import { syncGroupRequired } from './sync-group-required'
import { useEffect, useMemo, useRef } from 'react'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace ChipSelect {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The chip select items. */
    children: ReactNode
    /**
     * The ID of the form the chip select's options should be associated with. Will be automatically passed
     * to each option included in the chip select.
     *
     * An explicit value is only necessary if the chip select is not a descendant of a form element; if it
     * is, it will be automatically associated with that ancestral form.
     */
    form?: string
    /** Whether the chip select wraps. */
    flow?: 'wrap' | 'nowrap'
    /** Whether the chip select allows multiple selections. */
    multiple?: boolean
    /**
     * The name each option in the chip select should use. Will be automatically passed to each option.
     * Used to group the options for form submission.
     */
    name?: string
    /** The overflow behaviour of the chip select. */
    overflow?: 'auto' | 'visible'
    /**
     * Whether at least one option must remain selected. Silently prevents deselection of the
     * last selected chip and applies the HTML `required` attribute to the group, so the form
     * fails validation until at least one chip is selected.
     */
    required?: boolean
    /** The size of the chip select's options. */
    size?: 'small' | 'medium' | 'large'
  }
}

/** @deprecated Use ChipSelect.Props instead */
export type ChipSelectProps = ChipSelect.Props

/**
 * The chip select allows the user to select one or more options from a list of items. It supports
 * both single-select and multi-select modes depending on the use case. In controlled scenarios
 * (where the checked state of each option is managed by the consumer), single-select behaviour
 * must be handled by the consumer.
 *
 * See [ChipSelect x Formik](https://codesandbox.io/p/sandbox/eloquent-julien-hkgfgy)
 * and [ChipSelect x React Hook Form](https://codesandbox.io/p/sandbox/strange-lederberg-thzzwv)
 * for integration examples with popular form state management libraries.
 */
export function ChipSelect({
  children,
  form,
  flow = 'wrap',
  multiple = false,
  name,
  overflow = 'visible',
  required,
  size = 'medium',
  ...rest
}: ChipSelect.Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const context = useMemo(
    () => ({ containerRef, form, multiple, name, required, size }),
    [form, multiple, name, required, size],
  )

  // Sync `required` across every chip after each render. Without this, controlled state changes
  // (or `defaultChecked` initial states) leave individual chips with stale `required` attributes
  // — every unchecked chip would carry `required` independently, so native form validation would
  // fail even when one chip is checked. Running on every render keeps the group constraint
  // reflected on a single input: when any chip is checked, no chip is `required`.
  useEffect(() => {
    const container = containerRef.current
    if (container) syncGroupRequired(container, required ?? false)
  })

  return (
    <ElChipSelect {...rest} ref={containerRef} data-flow={flow} data-overflow={overflow} role="group">
      <ChipSelectContext.Provider value={context}>{children}</ChipSelectContext.Provider>
    </ElChipSelect>
  )
}

ChipSelect.Option = ChipSelectOption
ChipSelect.determineNextControlledState = determineNextControlledState

ChipSelect.Context = ChipSelectContext
ChipSelect.useContext = useChipSelectContext
