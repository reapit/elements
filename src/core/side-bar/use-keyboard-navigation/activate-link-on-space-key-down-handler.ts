import type { KeyboardEvent } from 'react'

/**
 * Handles the Space key down event to activate links. This is necessary to ensure menu items (`<a>` elements) and
 * menu group `<summary>` elements can be activated using the same keys.
 */
export function activateLinkOnSpaceKeyDownHandler(event: KeyboardEvent<HTMLElement>) {
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
