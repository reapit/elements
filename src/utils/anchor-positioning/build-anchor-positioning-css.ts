import { mapInsetPositionToCSS } from './map-inset-position-to-css'
import { mapPlacementToCSS } from './map-placement-to-css'

export namespace buildAnchorPositioningCSS {
  export interface Input extends mapInsetPositionToCSS.Input, mapPlacementToCSS.Input {
    /** ID of the anchor element. */
    anchorElementId: string
    /**
     * Maximum width of the positioned element. Accepts any valid CSS length, including the special
     * [anchor-size](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/anchor-size).
     * Defaults to content width. Prefer `--size-*` variables.
     */
    maxWidth?: string
    /**
     * Minimum width of the positioned element. Accepts any valid CSS length, including the special
     * [anchor-size](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/anchor-size).
     * Defaults to content width. Prefer `--size-*` variables.
     */
    minWidth?: string
    /**
     * The position of the element. Must be absolute or fixed. Default is fixed.
     */
    position?: 'absolute' | 'fixed'
    /**
     * Positioned element ID.
     */
    positionedElementId: string
    /**
     * Fallback positions when the positioned element overflows the viewport. See
     * [position-try-fallbacks](https://developer.mozilla.org/en-US/docs/Web/CSS/position-try-fallbacks).
     * The [polyfill](https://anchor-positioning.oddbird.net/) limits available options.
     *
     * Use "flip-block", "flip-inline", or both. Defaults to "none".
     */
    positionTryFallbacks?: string
  }
}

/**
 * Generates CSS styles to position an element relative to an anchor, using the specified element IDs.
 * Escapes IDs with [CSS.escape](https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape_static).
 *
 * The `placement` property takes priority over inset properties when specified.
 */
export function buildAnchorPositioningCSS({
  alignSelf,
  anchorElementId,
  bottom,
  gap,
  justifySelf,
  left,
  maxWidth,
  minWidth,
  placement,
  // NOTE: position="absolute" leads to scrolling on the document when a popup is
  // open in, for example, a drawer that itself has scrolled. Using fixed positioning
  // avoids this, hence it's the default.
  position = 'fixed',
  positionedElementId,
  positionTryFallbacks = 'none',
  right,
  top,
}: buildAnchorPositioningCSS.Input): string {
  // NOTE: Anchor and positioned element IDs include reserved CSS characters like `:`
  // (especially from `useId`). Escape them before use.
  const anchorName = `--${CSS.escape(anchorElementId)}`

  // `placement` takes priority when it's specified
  const positioningCSS = placement
    ? mapPlacementToCSS({ gap, placement })
    : mapInsetPositionToCSS({
        alignSelf,
        bottom,
        justifySelf,
        left,
        right,
        top,
      })

  return `
    #${CSS.escape(anchorElementId)} {
      anchor-name: ${anchorName};
    }

    #${CSS.escape(positionedElementId)} {
      position: ${position};
      position-anchor: ${anchorName};
      position-try-fallbacks: ${positionTryFallbacks};
      ${maxWidth ? `max-width: ${maxWidth};` : ''}
      ${minWidth ? `min-width: ${minWidth};` : ''}
      ${positioningCSS}
    }
  `
}
