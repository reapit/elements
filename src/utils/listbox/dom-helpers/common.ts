/**
 * Custom error class for listbox-related errors.
 * Provides more specific error identification for debugging.
 */
export class ListboxError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ListboxError'
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ListboxError)
    }
  }
}

/**
 * Gets the select element for a listbox by the listbox ID.
 * @param listboxId - The ID of the listbox element
 * @returns The select element within the listbox
 * @throws {ListboxError} if the listbox does not exist or does not contain a select element.
 */
export function getListboxSelectElement(listboxId: string): HTMLSelectElement
/**
 * Gets the select element for a listbox.
 * @param listboxElement - The listbox element
 * @returns The select element within the listbox
 * @throws {ListboxError} if the listbox does not exist or does not contain a select element.
 */
export function getListboxSelectElement(listboxElement: HTMLElement): HTMLSelectElement
export function getListboxSelectElement(listboxIdOrElement: string | HTMLElement): HTMLSelectElement {
  let listboxElement: HTMLElement

  if (typeof listboxIdOrElement === 'string') {
    const element = document.getElementById(listboxIdOrElement)

    if (!element) {
      throw new ListboxError(`Listbox with id "${listboxIdOrElement}" does not exist in the document`)
    }

    listboxElement = element
  } else {
    listboxElement = listboxIdOrElement
  }

  // The select element is, by convention, the first child of the listbox element
  const selectElement = listboxElement.firstElementChild

  if (!(selectElement instanceof HTMLSelectElement)) {
    const description =
      typeof listboxIdOrElement === 'string' ? `Listbox with id "${listboxIdOrElement}"` : 'Listbox element'
    throw new ListboxError(
      `${description} does not contain a select element as its first child. ` +
        `Found: ${selectElement?.constructor.name ?? 'null'}`,
    )
  }

  return selectElement
}

/**
 * Gets an option element from a select element by its value.
 * @param selectElement - The select element to search within
 * @param optionValue - The value of the option to find
 * @returns The option element with the matching value
 * @throws {ListboxError} if the option does not exist.
 */
export function getSelectOptionByValue(selectElement: HTMLSelectElement, optionValue: string): HTMLOptionElement {
  const optionElement = Array.from(selectElement.options).find((option) => option.value === optionValue)

  if (!(optionElement instanceof HTMLOptionElement)) {
    const availableValues = Array.from(selectElement.options)
      .map((opt) => opt.value)
      .join(', ')
    throw new ListboxError(
      `Option with value "${optionValue}" does not exist in select element. ` +
        `Available values: [${availableValues}]`,
    )
  }

  return optionElement
}

/**
 * Dispatches an input event on the select element to notify listeners of changes.
 * @param selectElement - The select element to dispatch the event on
 */
export function dispatchInputEvent(selectElement: HTMLSelectElement): void {
  const inputEvent = new Event('input', { bubbles: true, cancelable: true })
  selectElement.dispatchEvent(inputEvent)
}
