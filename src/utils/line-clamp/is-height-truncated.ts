/**
 * Determines whether the element's content is truncated.
 *
 * @param truncationTargetElement - The DOM element to check for text truncation
 * @returns `true` if the element's content is overflowing vertically, `false` otherwise
 */
export function isHeightTruncated(truncationTargetElement: HTMLElement | null): boolean {
  // Fallback mechanism: If the target element is not found in the DOM, return `false`.
  if (!truncationTargetElement) return false

  // We can detect truncated content in an element by comparing its scroll height with its client
  // height. If the scroll height is greater than the client height, the content of the element is
  // truncated and we therefore want the tooltip to display as normal.
  return truncationTargetElement.scrollHeight > truncationTargetElement.clientHeight
}
