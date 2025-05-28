import type { KeyboardEvent } from 'react'

/**
 *
 */
export function activateLinkOnSpaceKeyDownHandler(event: KeyboardEvent<HTMLElement>) {
  if (event.key !== ' ') {
    return
  }

  // Why do we only handle the Space key for <a> elements? Because the Enter key is handled by the browser for
  // <a>, <button> and <details>' <summary> elements, but the Space key is only handled by the browser for <button>
  // and <details> elements. Thus, we handle it for <a> elements ourselves.
  if (document.activeElement instanceof HTMLAnchorElement) {
    document.activeElement.click()
  }
}
