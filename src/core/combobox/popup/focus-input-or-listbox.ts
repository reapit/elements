/**
 * Focuses the first input or listbox descendant of the popup element.
 * @param element - The popup element to search within.
 */
export function focusInputOrListbox(element: HTMLElement) {
  const child = element.querySelector('input,[role="listbox"]')
  if (child instanceof HTMLElement) {
    child.focus()
  }
}
