import type { RefObject } from 'react'

/**
 * Transfers focus after a `FileUploader.File` item is removed from the list. Called synchronously
 * in the remove button's click handler — after the consumer's `onRemove` has queued a re-render
 * but before React has flushed it — so all sibling `<li>` elements, including our own, are still
 * in the DOM and can be queried.
 *
 * Focus order: next sibling's remove button → previous sibling's remove button → upload trigger.
 *
 * @param listRef     - Ref to the `<ul>` element from `FileUploaderFileListContext`.
 * @param listItemRef - Ref to this item's own `<li>` element, used to locate its position among
 *                      siblings so "next" and "previous" are computed relative to the removed item.
 * @param triggerId   - The `id` shared by all trigger components, used as the focus fallback when
 *                      the list will be empty after the removal.
 */
export function transferFocusAfterRemoval(
  listRef: RefObject<HTMLUListElement>,
  listItemRef: RefObject<HTMLLIElement>,
  triggerId: string,
): void {
  const list = listRef.current
  const listItem = listItemRef.current

  if (!list || !listItem) return

  const items = Array.from(list.querySelectorAll<HTMLLIElement>(':scope > li'))
  const ownIndex = items.indexOf(listItem)

  // Pick next sibling, else previous sibling (ownIndex - 1 handles the "was last" case).
  const candidate = items[ownIndex + 1] ?? items[ownIndex - 1]
  const removeButton = candidate?.querySelector<HTMLButtonElement>('[data-remove-button]')

  if (removeButton) {
    removeButton.focus()
  } else {
    // List will be empty after this removal — fall back to the upload trigger.
    document.getElementById(triggerId)?.focus()
  }
}
