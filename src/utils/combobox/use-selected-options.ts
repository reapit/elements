import { getOptionLabel } from './option'
import { useListboxSelectionObserver } from '#src/utils/listbox'
import { useState } from 'react'

export namespace useComboboxSelectedOptions {
  export interface Option {
    /** The option's label text as returned by `Combobox.getOptionLabel` */
    label: string
    /** The option's value */
    value: string
  }
}

/**
 * Returns currently selected options from the combobox listbox.
 *
 * **Do not use when the listbox options change dynamically (such as when a search input is
 * used to filter the displayed options dynamically).**
 *
 * This hook observes selection changes in the listbox element identified by `listboxId` and
 * maintains state with the label and value of each selected option.
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
export function useComboboxSelectedOptions(
  listboxId: string,
  defaultOptions: readonly useComboboxSelectedOptions.Option[] = [],
): readonly useComboboxSelectedOptions.Option[] {
  const [selections, setSelections] = useState<readonly useComboboxSelectedOptions.Option[]>(() => defaultOptions)

  useListboxSelectionObserver(listboxId, (visibleOptions, listboxState) => {
    setSelections((selections) => {
      // Get the selections whose values are still part of the listbox's state
      const existingSelections = selections.filter((selection) => listboxState.includes(selection.value))

      // Get the visible options that have been newly selected
      const newSelections = visibleOptions
        .filter((option) => !selections.some((selection) => selection.value === option.value))
        .map((option) => ({
          label: getOptionLabel(option),
          value: option.value,
        }))

      return [...existingSelections, ...newSelections]
    })
  })

  return selections
}
