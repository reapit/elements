import type { KeyboardEvent } from 'react'

/**
 * Activates link elements when the Space key is pressed on them. This is useful when facilitating keyboard
 * interaction across a group of items (e.g., menu items in a menu) so that all items, whether they are buttons
 * or links, can be activated with the same keys.
 */
export function handleLinkActivation(event: KeyboardEvent<HTMLElement>) {
  if (event.key !== ' ') {
    return
  }
  // Why do we only handle the Space key for <a> elements? Because the Enter key is handled by the browser for
  // <a>, <button> and <details>' <summary> elements, but the Space key is only handled by the browser for <button>
  // and <details> elements. Thus, we handle it for <a> elements ourselves.
  if (event.target instanceof HTMLAnchorElement) {
    event.target.click()
  }
}
