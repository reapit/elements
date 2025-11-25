import { getOptionLabel } from './option'
import { useCallback, useState } from 'react'
import { useListboxSelectionObserver } from '#src/utils/listbox'

export interface ComboboxSelectedOption {
  /** The option's label text as returned by `Combobox.getOptionLabel` */
  label: string
  /** The option's value */
  value: string
}

/**
 * Tracks the currently selected options in a combobox listbox and returns them as an array.
 *
 * **Do not use when the listbox options change dynamically (such as when a search input is
 * used to filter the displayed options dynamically).**
 *
 * This hook observes selection changes in the listbox element identified by `listboxId` and
 * maintains state with the label and value of each selected option.
 *
 * Used internally by `useComboboxButton` to provide selection state to button components.
 *
 * @param listboxId - The ID of the listbox element to observe for selection changes
 * @returns Array of selected options with their labels and values
 *
 * @example
 * ```tsx
 * const selections = useComboboxSelectedOptions('my-listbox-id')
 * // selections = [{ label: 'Option 1', value: 'option-1' }]
 * ```
 */
export function useComboboxSelectedOptions(listboxId: string): ComboboxSelectedOption[] {
  const [selections, setSelections] = useState<ComboboxSelectedOption[]>([])

  useListboxSelectionObserver(
    listboxId,
    useCallback((selectedOptions) => {
      setSelections(
        selectedOptions.map((option) => ({
          label: getOptionLabel(option),
          value: option.value,
        })),
      )
    }, []),
  )

  return selections
}
