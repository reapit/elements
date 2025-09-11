import { elTooltip } from './styles'
import { getTooltipTriggerProps } from './get-tooltip-trigger-props'
import { Popover } from '#src/utils/popover'
import { useTooltipController } from './use-tooltip-controller'

import type { HTMLAttributes } from 'react'
import type { PopoverPlacement } from '#src/utils/popover'

// NOTE: We omit...
// - role, because the Tooltip's role should always be "menu".
type AttributesToOmit = 'role'

export namespace Tooltip {
  export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, AttributesToOmit> {
    /** The ID of the tooltip. */
    id: string
    /** The maximum width of the menu. By default, the menu will be as wide as its widest item. */
    maxWidth?: `--size-${string}`
    /** Where the popover should be placed relative to its anchor. */
    placement?: PopoverPlacement
    /**
     * The ID of the element described by this tooltip. When this element receives focus or is
     * hovered by the mouse, the tooltip will be displayed.
     */
    triggerId: string
    /**
     * The ID of element to measure for truncation. If supplied, the tooltip will only display
     * if this element's content has been truncated.
     */
    truncationTargetId?: string
  }
}

/**
 * Tooltips are triggered on pointer hover or keyboard focus. They are used to provide additional information
 * about an element. Tooltips leverage the
 * [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) using `popover="hint"`, which
 * falls back to `popover="manual"` in browsers that do not support it.
 *
 * Typically, tooltips are used to describe elements, but in some cases, like icon-only buttons, they can be used
 * to label elements too. To assist with this, `Tooltip.getTooltipTriggerProps` can be used to set the correct
 * ARIA attributes on the trigger based on the tooltip's purpose.
 */
export function Tooltip({
  children,
  id,
  maxWidth = '--size-100',
  placement = 'top',
  triggerId,
  truncationTargetId,
  ...rest
}: Tooltip.Props) {
  useTooltipController({ tooltipId: id, triggerId, truncationTargetId })

  return (
    <Popover
      {...rest}
      anchorId={triggerId}
      className={elTooltip}
      data-truncation-target-id={truncationTargetId}
      elevation="none"
      gap="var(--spacing-1)"
      id={id}
      maxWidth={`var(${maxWidth})`}
      placement={placement}
      positionTryFallbacks="flip-block, flip-inline"
      popover="hint"
      role="tooltip"
    >
      {children}
    </Popover>
  )
}

Tooltip.getTriggerProps = getTooltipTriggerProps

/** @deprecated use Tooltip.Props instead */
export type TooltipProps = Tooltip.Props
