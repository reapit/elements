import { applyCSSAnchorPositioningPolyfill } from '#src/polyfills/css-anchor-positioning'
import { buildAnchorPositioningCSS } from './build-anchor-positioning-css'
import { cx } from '@linaria/core'
import { elPopover } from './styles'
import { useLayoutEffect, useRef } from 'react'

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import type { PopoverPlacement } from './map-placement-to-css'

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  /** The ID of the element this popover to which this popover should be anchored. */
  anchorId: string
  /**
   * The border radius of the popover. Can be any valid CSS length, though a border radius
   * CSS variable is recommended. By default, the radius will be zero.
   */
  borderRadius?: string
  /** The content of the popover. */
  children: ReactNode
  /** The visual elevation of the popover. Determines how much shadow the popover casts. */
  elevation?: 'none' | 'xl'
  /**
   * The gap between the popover and the anchor. Can be any valid CSS length, though `--spacing-*`
   * CSS variables are recommended. By default, the gap will be zero.
   */
  gap?: string
  /**
   * The ID of this popover. This is mandatory because the popover's trigger will need to reference
   * this in it's `popovertarget` attribute.
   */
  id: string
  /**
   * The maximum height of the popover. Can be any valid CSS length, though `--size-*`
   * CSS variables are recommended. By default, the popover will be as tall as its content requires.
   */
  maxHeight?: string
  /**
   * The maximum width of the popover. Can be any valid CSS length, though `--size-*`
   * CSS variables are recommended. By default, the popover will be as wide as its content requires.
   */
  maxWidth?: string
  /**
   * The "kind" of popover this should be. See
   * [popover](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover)
   * for more details.
   *
   * For browsers that do not support `hint`, they will fallback to `manual`.
   *
   * A special value of `null` allows the popover to not be a popover. This can be useful when you need
   * to display a popover element permanently in the UI (such as in documentation or example code). Just
   * note that the absence of the `popover` attribute means the element will not be displayed within the
   * top-layer, so may be susceptible to z-index issues.
   */
  popover?: 'auto' | 'hint' | 'manual' | null
  /** Where the popover should be placed relative to its anchor. */
  placement: PopoverPlacement
  /**
   * Fallback positions for the popover that should be tried when it would otherwise overflow the viewport.
   * See [position-try-fallbacks](https://developer.mozilla.org/en-US/docs/Web/CSS/position-try-fallbacks)
   * for more details. Note that the [polyfill](https://anchor-positioning.oddbird.net/) we rely on for
   * anchor positioning in some browsers will not play nicely with all available options.
   *
   * Typically, "flip-block", "flip-inline" or both will be sufficient for most use cases.
   * Defaults to "none".
   */
  positionTryFallbacks?: string
}

/**
 * A simple popover that can be positioned relative to an anchor. It is designed to work with the
 * global [popover](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover)
 * attribute. Positioning is facilitated using
 * [CSS Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning),
 * which currently requires a polyfill in some browsers.
 *
 * If custom styles need to be applied to the Popover element itself, it's important to ensure a
 * custom `display` property is only set when the popover is open (via the `:popover-open`
 * pseudo-class), otherwise the custom `display` property will override the browser's default handling
 * of the popover's display.
 *
 * **note:** When working with Popover directly (uncommon) within a React 18 consumer, the
 * `getPopoverTriggerProps` helper will be useful to avoid type errors or development runtime errors
 * about the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) attributes used
 * to show/hide/toggle popovers.
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
  placement,
  positionTryFallbacks = 'none',
  popover = 'auto',
  style,
  ...rest
}: PopoverProps) {
  const styleRef = useRef<HTMLStyleElement>(null)

  // NOTE: The polyfill we're using supports inline styles on elements, however, because React
  // renders content in the DOM dynamically, this would require us to pass the polyfill both DOM
  // elements---the anchor and the positioned element---in order for it to polyfill the CSS anchor
  // positioning styles on-demand. This would result in an API where we need refs for both the anchor
  // and the popover, which is far more awkard than simply relying on element IDs and a simple <style>
  // element that we polyfill on-demand. Given this technical approach, our anchor positioning CSS
  // is a simple string, as produced by `buildAnchorPositioningCSS`.
  //
  // In future, when we no longer need the polyfill, we'll be able to simplify this implementation to
  // rely solely on inline styles (or something equally low-tech).
  const anchorPositioningCSS = buildAnchorPositioningCSS({
    anchorElementId: anchorId,
    positionedElementId: id,
    placement,
    positionTryFallbacks,
    gap,
  })

  useLayoutEffect(function polyfillCSSAnchorPositioning() {
    if (styleRef.current) {
      applyCSSAnchorPositioningPolyfill({ elements: [styleRef.current] })
    }
  }, [])

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
          '--popover-max-width': maxWidth,
        } as CSSProperties
      }
    >
      <style ref={styleRef}>{anchorPositioningCSS}</style>
      {children}
    </div>
  )
}
