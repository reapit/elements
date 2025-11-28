import { ChipGroup } from '#src/core/chip-group'
import { elComboboxSelectionChips } from './styles'
import { setListboxOptionSelectedState } from '#src/utils/listbox'
import { useComboboxSelectedOptions } from '../use-selected-options'
import { cx } from '@linaria/core'

export namespace ComboboxSelectionChips {
  export interface Props extends Omit<ChipGroup.Props, 'children' | 'variant'> {
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
  className,
  disabled,
  listboxId,
  defaultOptions,
  ...rest
}: ComboboxSelectionChips.Props) {
  const options = useComboboxSelectedOptions(listboxId, defaultOptions)
  return (
    options.length > 0 && (
      <ChipGroup {...rest} className={cx(elComboboxSelectionChips, className)} variant="selection">
        {options.map((option) => (
          <ChipGroup.Item
            key={option.value}
            aria-controls={listboxId}
            aria-label={`Remove ${option.label}`}
            disabled={disabled}
            onClick={() => setListboxOptionSelectedState(listboxId, option.value, () => false)}
          >
            {option.label}
          </ChipGroup.Item>
        ))}
      </ChipGroup>
    )
  )
}
