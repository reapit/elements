/**
 * Determines whether a tooltip should be displayed based on content truncation.
 *
 * @param truncationTargetId - The ID of the DOM element to check for text truncation
 * @returns `true` if tooltip should be shown (content is truncated or fallback conditions apply), `false` otherwise
 */
export function isTooltipNeeded(truncationTargetId?: string): boolean {
  // If no truncation ID is provided, assume a truncation check is not required.
  // In this case, return `true` to ensure the Tooltip is displayed as normal.
  if (!truncationTargetId) return true

  const truncationTargetElement = document.getElementById(truncationTargetId)

  // Fallback mechanism: If the target element is not found in the DOM, return `true` to ensure
  // the Tooltip is displayed as normal.
  if (!truncationTargetElement) return true

  // We can detect truncated content in an element by comparing its scroll width with its client
  // width. If the scroll width is greater than the client width, the content of the element is
  // truncated and we therefore want the tooltip to display as normal.
  return truncationTargetElement.scrollWidth > truncationTargetElement.clientWidth
}
