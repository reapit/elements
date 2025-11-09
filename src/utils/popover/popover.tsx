import { applyCSSAnchorPositioningPolyfill } from '#src/polyfills/css-anchor-positioning'
import { buildAnchorPositioningCSS } from './build-anchor-positioning-css'
import { cx } from '@linaria/core'
import { elPopover } from './styles'
import { getClosestPopoverElement } from './get-closest-popover-element'
import { getPopoverTriggerProps } from './get-popover-trigger-props'
import { useLayoutEffect, useRef } from 'react'

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import type { PopoverPlacement } from './map-placement-to-css'

export namespace Popover {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** ID of the element to anchor this popover to. */
    anchorId: string
    /**
     * Border radius. Accepts any valid CSS length. Defaults to zero. Prefer CSS variables.
     */
    borderRadius?: string
    /** Popover content. */
    children: ReactNode
    /** Visual elevation. Determines shadow depth. */
    elevation?: 'none' | 'xl'
    /**
     * Gap between popover and anchor. Accepts any valid CSS length. Defaults to zero.
     * Prefer `--spacing-*` variables. Only applies to predefined placements.
     */
    gap?: string
    /**
     * Popover ID. Required for the trigger's `popovertarget` attribute.
     */
    id: string
    /**
     * Maximum height. Accepts any valid CSS length. Defaults to content height.
     * Prefer `--size-*` variables.
     */
    maxHeight?: string
    /**
     * Maximum width. Accepts any valid CSS length, including the special
     * [anchor-size](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/anchor-size).
     * Defaults to content width. Prefer `--size-*` variables.
     */
    maxWidth?: string
    /**
     * Minimum width. Accepts any valid CSS length, including the special
     * [anchor-size](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/anchor-size).
     * Defaults to content width. Prefer `--size-*` variables.
     */
    minWidth?: string
    /**
     * Popover type. See
     * [popover](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover).
     *
     * Browsers without `hint` support fall back to `manual`.
     *
     * Use `null` to display the popover permanently (for documentation or examples). Without the
     * `popover` attribute, the element won't render in the top layer and may encounter z-index issues.
     */
    popover?: 'auto' | 'hint' | 'manual' | null
    /** Placement relative to anchor. */
    placement: PopoverPlacement
    /**
     * Fallback positions when the popover overflows the viewport. See
     * [position-try-fallbacks](https://developer.mozilla.org/en-US/docs/Web/CSS/position-try-fallbacks).
     * The [polyfill](https://anchor-positioning.oddbird.net/) limits available options.
     *
     * Use "flip-block", "flip-inline", or both. Defaults to "none".
     */
    positionTryFallbacks?: string
  }
}

/**
 * @deprecated Use `Popover.Props` instead.
 */
export type PopoverProps = Popover.Props

/**
 * A popover positioned relative to an anchor using
 * [CSS Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)
 * and the [popover](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover)
 * attribute. Requires a polyfill in some browsers.
 *
 * Custom `display` properties must use the `:popover-open` pseudo-class to avoid overriding
 * the browser's default popover display handling.
 *
 * **Note:** React 18 users should use `getPopoverTriggerProps` to avoid type and runtime errors
 * with [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) attributes.
 */
export function Popover({
  anchorId,
  borderRadius,
  children,
  className,
  elevation = 'none',
  gap = '0',
  id,
  maxHeight,
  maxWidth,
  minWidth,
  placement,
  positionTryFallbacks = 'none',
  popover = 'auto',
  style,
  ...rest
}: Popover.Props) {
  const styleRef = useRef<HTMLStyleElement>(null)

  // NOTE: The polyfill supports inline styles, but React's dynamic rendering would require passing
  // both the anchor and positioned element refs to the polyfill. This creates an awkward API requiring
  // refs for both elements. Element IDs with a polyfilled <style> element provide a simpler approach.
  // `buildAnchorPositioningCSS` generates the anchor positioning CSS string.
  //
  // Once the polyfill becomes unnecessary, we can simplify to inline styles.
  const anchorPositioningCSS = buildAnchorPositioningCSS({
    anchorElementId: anchorId,
    gap,
    maxWidth,
    minWidth,
    placement,
    positionedElementId: id,
    positionTryFallbacks,
  })

  useLayoutEffect(
    function polyfillCSSAnchorPositioning() {
      if (styleRef.current) {
        applyCSSAnchorPositioningPolyfill({ elements: [styleRef.current] })
      }
    },
    [anchorPositioningCSS],
  )

  return (
    <div
      {...rest}
      className={cx(elPopover, className)}
      data-elevation={elevation}
      id={id}
      // @ts-expect-error -- React 18 does not have types for the popover attribute
      popover={popover}
      style={
        {
          ...style,
          '--popover-border-radius': borderRadius,
          '--popover-max-height': maxHeight,
        } as CSSProperties
      }
    >
      <style ref={styleRef}>{anchorPositioningCSS}</style>
      {children}
    </div>
  )
}

Popover.getTriggerProps = getPopoverTriggerProps
Popover.getClosestPopoverElement = getClosestPopoverElement
