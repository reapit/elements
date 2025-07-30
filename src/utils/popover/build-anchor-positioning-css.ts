import { mapPlacementToCSS } from './map-placement-to-css'

import type { PopoverPlacement } from './map-placement-to-css'

interface BuildAnchorPositioningCSSInput {
  anchorElementId: string
  gap: string
  placement: PopoverPlacement
  positionedElementId: string
  positionTryFallbacks: string
}

/**
 * Returns a CSS string that contains styles for an anchor and its positioned element via the
 * specified element IDs. The IDs are escaped using
 * [CSS.escape](https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape_static).
 */
export function buildAnchorPositioningCSS({
  anchorElementId,
  placement,
  positionedElementId,
  positionTryFallbacks,
  gap,
}: BuildAnchorPositioningCSSInput): string {
  // NOTE: the anchor and positioned element IDs may include reserved CSS characters
  // like `:` (especially IDs generated via `useId`). Thus, we need to escape them
  // before using them in our CSS.
  const anchorName = `--${CSS.escape(anchorElementId)}`
  const positioningCSS = mapPlacementToCSS(placement, gap)

  return `
    #${CSS.escape(anchorElementId)} {
      anchor-name: ${anchorName};
    }

    #${CSS.escape(positionedElementId)} {
      position-anchor: ${anchorName};
      position-try-fallbacks: ${positionTryFallbacks};
      ${positioningCSS}
    }
  `
}
