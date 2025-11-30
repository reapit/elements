import { ChipGroup } from '#src/core/chip-group'
import { ComboboxSelectionChip } from './selection-chip'
import { ComboboxSelectionChipsContext } from './context'
import { cx } from '@linaria/core'
import { elComboboxSelectionChips } from './styles'
import { useComboboxSelectedOptions } from '../use-selected-options'

import type { ReactNode } from 'react'
import { useComboboxDefaultOptionsContext } from '../default-options-context'

type AttributesToOmit = 'children' | 'variant'

export namespace ComboboxSelectionChips {
  export interface ItemProps extends ComboboxSelectionChip.Props {}

  export interface Props extends Omit<ChipGroup.Props, AttributesToOmit> {
    /** Render-prop function to customise selection chip rendering. */
    children?: (options: readonly useComboboxSelectedOptions.Option[]) => ReactNode
    /** Selected options to be displayed on first render. */
    defaultOptions?: readonly useComboboxSelectedOptions.Option[]
    /** Whether the selection chips are disabled. */
    disabled?: boolean
    /** ID of the combobox listbox */
    listboxId: string
  }
}

/**
 * Renders selection chips for each selected options in a combobox listbox. Clicking a chip deselects
 * the corresponding option. Renders nothing when no options are selected.
 *
 * **Only intended for use in multi-select combobox experiences.**
 */
export function ComboboxSelectionChips({
  children,
  className,
  defaultOptions: defaultOptionsProp,
  listboxId,
  ...rest
}: ComboboxSelectionChips.Props) {
  const defaultOptions = useComboboxDefaultOptionsContext()
  const options = useComboboxSelectedOptions(listboxId, defaultOptionsProp ?? defaultOptions)

  const chips =
    children?.(options) ??
    options.map((option) => (
      <ComboboxSelectionChip key={option.value} value={option.value}>
        {option.label}
      </ComboboxSelectionChip>
    ))

  return (
    options.length > 0 && (
      <ChipGroup {...rest} className={cx(elComboboxSelectionChips, className)} variant="selection">
        <ComboboxSelectionChipsContext.Provider value={{ listboxId }}>{chips}</ComboboxSelectionChipsContext.Provider>
      </ChipGroup>
    )
  )
}

ComboboxSelectionChips.Item = ComboboxSelectionChip
