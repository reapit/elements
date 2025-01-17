import { FC, HTMLAttributes, ReactNode } from 'react'
import { ElBadge, ElBadgeLabel, ElBadgeIcon } from './styles'

type BadgeVariant = 'neutral' | 'success' | 'pending' | 'warning' | 'danger' | 'inactive' | 'accent_1' | 'accent_2'

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  isReversed?: boolean
  variant?: BadgeVariant
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

export const Badge: FC<BadgeProps> = ({
  children,
  isReversed = false,
  variant,
  iconLeft,
  iconRight,
  'aria-label': ariaLabel,
  className,
  ...rest
}) => {
  return (
    <ElBadge
      data-variant={variant}
      data-is-reversed={isReversed}
      className={className}
      aria-label={ariaLabel}
      role="status"
      {...(rest as HTMLAttributes<HTMLDivElement>)}
    >
      {iconLeft && <ElBadgeIcon>{iconLeft}</ElBadgeIcon>}
      {children && <ElBadgeLabel>{children}</ElBadgeLabel>}
      {iconRight && <ElBadgeIcon>{iconRight}</ElBadgeIcon>}
    </ElBadge>
  )
}
