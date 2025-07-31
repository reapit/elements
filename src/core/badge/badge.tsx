import { ElBadge, ElBadgeLabelContainer, ElBadgeIconContainer } from './styles'
import { DeprecatedTooltip, useDeprecatedTooltip } from '#src/deprecated/tooltip'

import type { BadgeColour } from './styles'
import type { HTMLAttributes, ReactNode } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** The label for the badge. This should be provided when the badge has no label. */
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
  variant = 'default',
  ...rest
}: BadgeProps) {
  // It's an icon-only badge if there's no label text and only one icon
  const isIconOnly = !children && (iconLeft || iconRight) && !(iconLeft && iconRight)

  const tooltip = useDeprecatedTooltip()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- We don't need the aria-describedby prop
  const { 'aria-describedby': _, ...triggerProps } = tooltip.getTriggerProps(rest)

  return (
    <ElBadge {...(isIconOnly ? triggerProps : rest)} aria-label={ariaLabel} data-colour={colour} data-variant={variant}>
      {iconLeft && <ElBadgeIconContainer aria-hidden>{iconLeft}</ElBadgeIconContainer>}
      {children && <ElBadgeLabelContainer>{children}</ElBadgeLabelContainer>}
      {iconRight && <ElBadgeIconContainer aria-hidden>{iconRight}</ElBadgeIconContainer>}
      {isIconOnly && ariaLabel && (
        <DeprecatedTooltip {...tooltip.getTooltipProps()} description={ariaLabel} position="top" />
      )}
    </ElBadge>
  )
}
