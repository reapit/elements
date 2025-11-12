import { useMemo } from 'react'
import type { ComboboxSelectedOption } from './use-selected-options'

/**
 * **INTERNAL USE ONLY**
 *
 * Generates a human-readable summary of the current selection state.
 *
 * Returns:
 * - The placeholder when no options are selected
 * - The label of the single selected option when exactly one option is selected
 * - A count string like "2 selected" when multiple options are selected
 *
 * Used internally by `useComboboxButton` to provide display text for button components.
 *
 * @param selections - Array of currently selected options with their labels and values
 * @param placeholder - Text to display when no selections exist
 * @returns Human-readable summary of the selection state
 *
 * @example
 * ```tsx
 * const summary = useComboboxSelectionSummary([], 'Select an option')
 * // summary = 'Select an option'
 *
 * const summary = useComboboxSelectionSummary([{ label: 'Apple', value: 'apple' }], 'Select')
 * // summary = 'Apple'
 *
 * const summary = useComboboxSelectionSummary(
 *   [{ label: 'Apple', value: 'apple' }, { label: 'Banana', value: 'banana' }],
 *   'Select'
 * )
 * // summary = '2 selected'
 * ```
 */
export function useComboboxSelectionSummary(selections: ComboboxSelectedOption[], placeholder: string) {
  const labelText = useMemo(() => {
    if (selections.length > 1) {
      return `${selections.length} selected`
    } else if (selections[0]) {
      return selections[0].label || placeholder
    } else {
      return placeholder
    }
  }, [selections, placeholder])

  return labelText
}
