import { FC, HTMLAttributes, ReactNode } from 'react'
import { ElBadge, ElBadgeLabel } from './styles'

type BadgeVariant = 'neutral' | 'success' | 'pending' | 'warning' | 'danger' | 'inactive' | 'accent_1' | 'accent_2'

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  reversed?: boolean
  variant?: BadgeVariant
  iconLeft?: ReactNode
  iconRight?: ReactNode
  'aria-label'?: string
  className?: string
}

export const Badge: FC<BadgeProps> = ({ 
  children, 
  reversed = false, 
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
      data-reversed={reversed}
      className={className}
      aria-label={ariaLabel}
      role="status"
      {...(rest as HTMLAttributes<HTMLDivElement>)}
    >
      {iconLeft}
      {children && <ElBadgeLabel>{children}</ElBadgeLabel>}
      {iconRight}
    </ElBadge>
  )
}
