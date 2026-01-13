import { applyCSSAnchorPositioningPolyfill } from '#src/polyfills/css-anchor-positioning'
import { buildAnchorPositioningCSS } from './build-anchor-positioning-css'
import { useLayoutEffect, useRef } from 'react'

import type { HTMLAttributes } from 'react'

export namespace AnchorPositioning {
  export interface PositioningProps extends buildAnchorPositioningCSS.Input {}
  export interface Props extends buildAnchorPositioningCSS.Input, HTMLAttributes<HTMLStyleElement> {}
}

/**
 * A CSS utility component that allows an element, the _positioned element_, to be tethered to
 * another element, the _anchor element_, using
 * [CSS Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning).
 * Polyfills the anchor positioning in browsers that do not natively support it.
 *
 * Renders a <style> element containing a stylesheet with the anchor positioning styles. This
 * stylesheet will be modified by the polyfill if it is applied.
 */
export function AnchorPositioning({
  alignSelf,
  anchorElementId,
  bottom,
  gap = '0',
  justifySelf,
  left,
  maxWidth,
  minWidth,
  placement,
  position,
  positionedElementId,
  positionTryFallbacks = 'none',
  right,
  top,
}: AnchorPositioning.Props) {
  const styleRef = useRef<HTMLStyleElement>(null)

  // The polyfill supports inline styles, but React's dynamic rendering would require passing both
  // the anchor and positioned element refs to the polyfill. This creates an awkward API requiring
  // refs for both elements. Element IDs with a polyfilled <style> element provide a simpler approach.
  // `buildAnchorPositioningCSS` generates the anchor positioning CSS string.
  //
  // Once the polyfill becomes unnecessary, we can use inline styles.
  const anchorPositioningCSS = buildAnchorPositioningCSS({
    alignSelf,
    anchorElementId,
    bottom,
    gap,
    justifySelf,
    left,
    maxWidth,
    minWidth,
    placement,
    position,
    positionedElementId,
    positionTryFallbacks,
    right,
    top,
  })

  // Apply the polyfill if needed; `applyCSSAnchorPositioningPolyfill` is a no-op if the browser
  // natively supports anchor positioning.
  useLayoutEffect(
    function polyfillCSSAnchorPositioning() {
      if (styleRef.current) {
        applyCSSAnchorPositioningPolyfill({ elements: [styleRef.current] })
      }
    },
    [anchorPositioningCSS],
  )

  return <style ref={styleRef}>{anchorPositioningCSS}</style>
}
