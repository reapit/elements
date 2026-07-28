import { dispatchInputEvent, getListboxSelectElement, getSelectOptionByValue } from "./common";

export type SelectionSetter = (selected: boolean, selectElement: HTMLSelectElement) => boolean;

/**
 * Updates a listbox option's selected state and dispatches an input event when the state changes.
 *
 * Modifies the selected state of a specific option in the underlying select element and
 * triggers an input event to notify listeners. Dispatches the event only when the selected
 * state changes.
 *
 * @param listboxId - Listbox element ID
 * @param optionValue - Option value to update
 * @param setter - Receives current selected state and returns new selected state
 * @throws {ListboxError} when the listbox or option does not exist
 *
 * @example
 * // Toggle an option's selected state
 * setListboxOptionSelectedState('my-listbox', 'option1', (selected) => !selected)
 *
 * @example
 * // Always select an option
 * setListboxOptionSelectedState('my-listbox', 'option2', () => true)
 *
 * @example
 * // Always deselect an option
 * setListboxOptionSelectedState('my-listbox', 'option3', () => false)
 */
export function setListboxOptionSelectedState(
  listboxId: string,
  optionValue: string,
  setter: SelectionSetter,
): void {
  const selectElement = getListboxSelectElement(listboxId);
  const optionToSelect = getSelectOptionByValue(selectElement, optionValue);
  const currentState = optionToSelect.selected;
  optionToSelect.selected = setter(optionToSelect.selected, selectElement);

  if (currentState !== optionToSelect.selected) {
    dispatchInputEvent(selectElement);
  }
}
