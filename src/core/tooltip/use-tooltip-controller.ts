import { isTooltipNeeded } from './is-tooltip-needed'
import { useEffect } from 'react'

interface UseTooltipControllerInput {
  /** The ID of the tooltip element. Must be a popover (i.e. have the `popover` attribute). */
  tooltipId: string
  /** The ID of the element for which the tooltip is displayed. */
  triggerId: string
  /**
   * The ID of the element to measure for truncation. When supplied, the tooltip will only be
   * shown if this element is currently truncated.
   */
  truncationTargetId?: string
}

/**
 * A React hook that sets up tooltip behavior for an element (the "trigger") using the
 * [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API).
 * This hook automatically shows/hides a tooltip popover when the trigger element is:
 * - Focused/blurred (for keyboard accessibility)
 * - Hovered/unhovered (for mouse interaction)
 */
export function useTooltipController({ tooltipId, triggerId, truncationTargetId }: UseTooltipControllerInput): void {
  useEffect(
    function subscribeToAnchorEvents() {
      // TODO: We are relying on element IDs instead of refs because we want to avoid the
      // complexity of using `forwardRef` in Tooltip. Once we're on React 19 and refs are a normal prop,
      // we'll be able to pass a ref directly to Tooltip without any extra cost.
      //
      // Until then, we simply get the tooltip and trigger elements via their IDs.
      const tooltipElement = document.getElementById(tooltipId)
      const triggerElement = document.getElementById(triggerId)

      // Because we're setting up multiple event listeners, we're using an abort AbortController
      // to unsubscribe them all in the effect's cleanup function.
      const abortController = new AbortController()
      const signal = abortController.signal

      if (tooltipElement instanceof HTMLElement && triggerElement instanceof HTMLElement) {
        // Keyboard accessibility
        triggerElement.addEventListener('focus', () => showTooltipIfNeeded(tooltipElement, truncationTargetId), {
          signal,
        })
        triggerElement.addEventListener('blur', () => tooltipElement.hidePopover(), { signal })

        // Mouse interaction
        triggerElement.addEventListener('mouseenter', () => showTooltipIfNeeded(tooltipElement, truncationTargetId), {
          signal,
        })
        triggerElement.addEventListener(
          'mouseleave',
          () => {
            // NOTE: we only want to hide the tooltip if its trigger doesn't currently have focus
            // from keyboard navigation. We don't care if it's focused due to interaction.
            if (!triggerElement.matches(':focus-visible')) {
              tooltipElement.hidePopover()
            }
          },
          { signal },
        )
      }

      return () => {
        // Clean up all the event listeners in a single hit.
        abortController.abort()
      }
    },
    [triggerId, tooltipId],
  )
}

/**
 * Shows the specified popover if the truncation target has truncated content.
 *
 * @param tooltipElement the popover element to show, if needed.
 * @param truncationTargetId the ID of the element to measure for truncation.
 */
function showTooltipIfNeeded(tooltipElement: HTMLElement, truncationTargetId?: string) {
  if (!isTooltipNeeded(truncationTargetId)) {
    return
  }
  tooltipElement.showPopover()
}
