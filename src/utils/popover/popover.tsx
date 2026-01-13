import { AnchorPositioning } from '#src/utils/anchor-positioning'
import { cx } from '@linaria/core'
import { elPopover } from './styles'
import { getClosestPopoverElement } from './get-closest-popover-element'
import { getPopoverTriggerProps } from './get-popover-trigger-props'

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

// We omit these ID props because Popover accepts them via different names.
type AttributesToOmit = 'anchorElementId' | 'position' | 'positionedElementId'

export namespace Popover {
  export interface Props
    extends Omit<AnchorPositioning.PositioningProps, AttributesToOmit>, HTMLAttributes<HTMLDivElement> {
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
     * Popover ID. Required for the trigger's `popovertarget` attribute.
     */
    id: string
    /**
     * Maximum height. Accepts any valid CSS length. Defaults to content height.
     * Prefer `--size-*` variables.
     */
    maxHeight?: string
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
    /**
     * The position of the popover. Must be absolute or fixed. Default is absolute.
     */
    position?: AnchorPositioning.Props['position']
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
  alignSelf,
  anchorId,
  borderRadius,
  children,
  className,
  bottom,
  elevation = 'none',
  gap,
  id,
  justifySelf,
  left,
  maxHeight,
  maxWidth,
  minWidth,
  placement,
  position = 'absolute',
  positionTryFallbacks,
  popover = 'auto',
  right,
  style,
  top,
  ...rest
}: Popover.Props) {
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
      <AnchorPositioning
        anchorElementId={anchorId}
        alignSelf={alignSelf}
        bottom={bottom}
        gap={gap}
        justifySelf={justifySelf}
        left={left}
        maxWidth={maxWidth}
        minWidth={minWidth}
        placement={placement}
        position={position}
        positionedElementId={id}
        positionTryFallbacks={positionTryFallbacks}
        right={right}
        top={top}
      />
      {children}
    </div>
  )
}

Popover.getTriggerProps = getPopoverTriggerProps
Popover.getClosestPopoverElement = getClosestPopoverElement
