import { mapPlacementToCSS } from './map-placement-to-css'

import type { PopoverPlacement } from './map-placement-to-css'

interface BuildAnchorPositioningCSSInput {
  anchorElementId: string
  gap: string
  maxWidth?: string
  minWidth?: string
  placement: PopoverPlacement
  positionedElementId: string
  positionTryFallbacks: string
}

/**
 * Generates CSS styles to position an element relative to an anchor, using the specified element IDs.
 * Escapes IDs with [CSS.escape](https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape_static).
 */
export function buildAnchorPositioningCSS({
  anchorElementId,
  gap,
  maxWidth,
  minWidth,
  placement,
  positionedElementId,
  positionTryFallbacks,
}: BuildAnchorPositioningCSSInput): string {
  // NOTE: Anchor and positioned element IDs include reserved CSS characters like `:`
  // (especially from `useId`). Escape them before use.
  const anchorName = `--${CSS.escape(anchorElementId)}`
  const positioningCSS = mapPlacementToCSS({ gap, placement })

  return `
    #${CSS.escape(anchorElementId)} {
      position: relative;
      anchor-name: ${anchorName};
    }

    #${CSS.escape(positionedElementId)} {
      position-anchor: ${anchorName};
      position-try-fallbacks: ${positionTryFallbacks};
      ${maxWidth ? `max-width: ${maxWidth};` : ''}
      ${minWidth ? `min-width: ${minWidth};` : ''}
      ${positioningCSS}
    }
  `
}
