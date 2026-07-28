/**
 * Clears a search input element's value and dispatches an input event to notify listeners.
 *
 * This allows any onChange/onInput handlers attached to the input to be notified of the change,
 * maintaining consistency with controlled component patterns.
 *
 * @param inputElement The input element to clear
 *
 * @example
 * const input = document.getElementById('my-search')
 * if (input instanceof HTMLInputElement) {
 *   clearSearchInput(input)
 * }
 */
export function clearSearchInput(inputElement: HTMLInputElement): void {
  inputElement.value = "";
  const inputEvent = new Event("input", { bubbles: true, cancelable: true });
  inputElement.dispatchEvent(inputEvent);
}
