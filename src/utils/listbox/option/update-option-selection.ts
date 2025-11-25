import { setListboxOptionSelectedState } from '../dom-helpers'

import type { SelectionSetter } from '../dom-helpers'
import type { MouseEvent } from 'react'

/**
 * Valid selection action modes for listbox options.
 *
 * - 'auto': Toggles for multi-select, selects for single-select
 * - 'toggle': Always toggles the selection state
 * - 'select': Always selects the option
 */
export type SelectAction = 'auto' | 'toggle' | 'select'

/**
 * Selection strategies for each action mode.
 */
const selectionStrategies: Record<SelectAction, SelectionSetter> = {
  auto: (selected, selectElement) => {
    return selectElement.multiple ? !selected : true
  },
  toggle: (selected) => !selected,
  select: () => true,
}

/**
 * Validates if a string is a valid SelectAction.
 */
function isValidSelectAction(action: string | undefined): action is SelectAction {
  return action === 'auto' || action === 'toggle' || action === 'select'
}

/**
 * Updates the selection state of a listbox option based on the selectAction setting.
 *
 * Modes:
 * - 'auto': Toggles for multi-select, selects for single-select
 * - 'toggle': Always toggles the selection state
 * - 'select': Always selects the option
 *
 * @param event - The mouse click event from the option button. The button must have:
 *   - `data-listbox-id`: ID of the associated listbox (required)
 *   - `data-select-action`: Selection mode ('auto', 'toggle', or 'select') (required)
 *   - `value`: The option value (required)
 */
export function updateOptionSelection(event: MouseEvent<HTMLButtonElement>) {
  const { listboxId, selectAction } = event.currentTarget.dataset
  const optionValue = event.currentTarget.value

  // Validate required attributes
  // This happens when the `as` component fails to forward props to the underlying <button> element.
  // We use typeof for the optionValue because the option may legitimately have a value of "".
  if (!listboxId || typeof optionValue !== 'string') return

  // Validate and apply the selection action
  if (!isValidSelectAction(selectAction)) return

  // Apply the appropriate selection strategy
  setListboxOptionSelectedState(listboxId, optionValue, selectionStrategies[selectAction])
}
