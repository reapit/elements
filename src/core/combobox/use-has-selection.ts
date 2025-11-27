import { useListboxSelectionObserver } from '#src/utils/listbox'
import { useState } from 'react'

/**
 * Tracks the whether a combobox listbox has any selected options.
 *
 * This hook observes selection changes in the listbox element identified by `listboxId` and
 * maintains a simple boolean state.
 *
 * @param listboxId - The ID of the listbox element to observe for selection changes
 * @returns true when there is at least one selected option; false otherwise
 *
 * @example
 * ```tsx
 * const hasSelection = useComboboxHasSelection('my-listbox-id')
 * // hasSelection = true
 * ```
 */
export function useComboboxHasSelection(listboxId: string): boolean {
  const [hasSelection, setHasSelection] = useState<boolean>(false)

  useListboxSelectionObserver(listboxId, (_, listboxState) => {
    setHasSelection(listboxState.length > 0)
  })

  return hasSelection
}
