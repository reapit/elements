import { ElBadge, ElBadgeLabelContainer, ElBadgeIconContainer } from './styles'
import { Tooltip } from '#src/core/tooltip'

import type { BadgeColour } from './styles'
import { useId, type HTMLAttributes, type ReactNode } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** The label for the badge. This is considered mandatory for icon-only badges. */
  'aria-label'?: string
  /** The badge label. */
  children?: ReactNode
  /** The colour of the badge. */
  colour: BadgeColour
  /** The left icon of the badge. */
  iconLeft?: ReactNode
  /** The right icon of the badge. */
  iconRight?: ReactNode
  /** Whether the badge is reversed. */
  variant?: 'default' | 'reversed'
}

/**
 * Badges are visual indicators that appear for new notifications, numeric counts, statuses, or some other metadata.
 */
export function Badge({
  'aria-label': ariaLabel,
  children,
  colour,
  iconLeft,
  iconRight,
  id,
  variant = 'default',
  ...rest
}: BadgeProps) {
  // It's an icon-only badge if there's no label text and only one icon
  const isIconOnly = !children && (iconLeft || iconRight) && !(iconLeft && iconRight)
  const useTooltip = isIconOnly && ariaLabel

  const badgeId = id ?? useId()
  const tooltipId = useId()

  // For icon-only badges, the `aria-label` will be used as the tooltip's text rather than the
  // badge's `aria-label` label because the tooltip will label the badge via `aria-labelledby`.
  // For badges with textual content, we just pass the `aria-label` through untouched.
  //
  // NOTE: Yes, it's a bit weird to be using `aria-label` for a visual label. There's also some
  // awkwardness here with `aria-labelledby`. If the consumer provides it when we're using a
  // tooltip, it'll be nuked by the `aria-labelledby` value we get from
  // `Tooltip.getTooltipTriggerProps`. 🤷‍♂️
  const a11yProps = useTooltip
    ? Tooltip.getTriggerProps({ id: badgeId, tooltipId, tooltipPurpose: 'label' })
    : {
        'aria-label': ariaLabel,
        id: badgeId,
      }

  return (
    <ElBadge {...rest} {...a11yProps} data-colour={colour} data-variant={variant}>
      {iconLeft && <ElBadgeIconContainer aria-hidden>{iconLeft}</ElBadgeIconContainer>}
      {children && <ElBadgeLabelContainer>{children}</ElBadgeLabelContainer>}
      {iconRight && <ElBadgeIconContainer aria-hidden>{iconRight}</ElBadgeIconContainer>}
      {useTooltip && (
        <Tooltip triggerId={badgeId} id={tooltipId} placement="top">
          {ariaLabel}
        </Tooltip>
      )}
    </ElBadge>
  )
}
