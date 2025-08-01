import type { KeyboardEvent } from 'react'

interface HandleArrowNavigationOptions {
  /**
   * A string containing one or more selectors to match. This string must be a valid CSS
   * selector string; if it isn't, a SyntaxError exception is thrown. Defaults to selecting
   * all `<a>` and `<button>` elements.
   */
  selectors?: string
}

/**
 * Handles arrow key events in order to move focus between a collection of elements. Elements that are
 * focused are also scrolled into view. Focus will not be moved beyond the first or last element in the
 * collection.
 *
 * The `currentTarget` of the event is assumed to be the common ancestor of the navigable elements.
 */
export function handleArrowNavigation(
  event: KeyboardEvent<HTMLElement>,
  // By default, we'll navigate all descendant anchors and buttons.
  { selectors = 'a, button' }: HandleArrowNavigationOptions = {},
) {
  const key = event.key

  // If the key is not one of the supported arrow keys, we can return early.
  if (!isArrowKey(key)) {
    return
  }

  // If one of the arrow keys is pressed, we need to find the active element and focus the next or previous item.
  const commonAncestor = event.currentTarget
  const elementsToNavigate = commonAncestor.querySelectorAll(selectors)
  const indexOfActiveElement = findIndexOfActiveListItem(elementsToNavigate)

  // If we can't find the active element among our list items, something weird has happened and we bail.
  if (indexOfActiveElement === null) {
    return
  }

  // If focus is on the first item of the list and the user is trying to navigate upwards, we bail. This allows
  // an ancestor to handle the event if they so choose.
  if (indexOfActiveElement === 0 && (key === 'ArrowUp' || key === 'ArrowLeft')) {
    return
  }

  // Likewise, if focus is on the last item of the list and the user is trying to navigate downwards, we also bail.
  if (indexOfActiveElement === elementsToNavigate.length - 1 && (key === 'ArrowDown' || key === 'ArrowRight')) {
    return
  }

  // Now that we know we're going to handle the key event, we can prevent the default action. This stops the browser
  // from scrolling the page when the ArrowUp, ArrowDown, or Space key are pressed.
  event.preventDefault()

  const indexOfElementToFocus = getIndexOfElementToFocus(key, indexOfActiveElement)
  const elementToFocus = elementsToNavigate.item(indexOfElementToFocus)

  // NOTE: only HTMLElement's can be focused; Element's cannot.
  if (elementToFocus instanceof HTMLElement) {
    elementToFocus.focus()
    elementToFocus.scrollIntoView({ block: 'nearest' })
  }
}

/**
 * @param key the key pressed by the user
 * @returns true if key is one of ArrowUp, ArrowDown, ArrowRight, ArrowLeft
 */
function isArrowKey(key: string): key is 'ArrowUp' | 'ArrowDown' | 'ArrowRight' | 'ArrowLeft' {
  return ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].includes(key)
}

/**
 * @param key the value of the key pressed by the user. See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
 * @param indexOfActiveElement the index of the element that is currently focused.
 * @returns the index of the element to focus next.
 */
function getIndexOfElementToFocus(
  key: 'ArrowUp' | 'ArrowDown' | 'ArrowRight' | 'ArrowLeft',
  indexOfActiveElement: number,
): number {
  switch (key) {
    case 'ArrowUp':
    case 'ArrowLeft': {
      return indexOfActiveElement - 1
    }
    case 'ArrowDown':
    case 'ArrowRight': {
      return indexOfActiveElement + 1
    }
  }
}

/**
 * @param listItems the list of items to search through
 * @returns the index of the active element in the given list, or null if not found.
 */
function findIndexOfActiveListItem(listItems: NodeListOf<Element>): number | null {
  let indexOfActiveElement: number | null = null
  listItems.forEach((item, index) => {
    if (item === document.activeElement) {
      indexOfActiveElement = index
    }
  })
  return indexOfActiveElement
}
