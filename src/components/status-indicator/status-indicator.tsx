import { FC, HTMLAttributes, ReactNode } from 'react'
import { ElStatusIndicator, ElStatusIndicatorShape } from './styles'

export type StatusIndicatorVariant =
  | 'neutral'
  | 'success'
  | 'pending'
  | 'warning'
  | 'danger'
  | 'inactive'
  | 'accent1'
  | 'accent2'

export interface StatusIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The variant of the status indicator, used to highlight important information
   *
   * @default "neutral"
   */
  variant?: StatusIndicatorVariant

  /**
   * The related content associated with the status indicator variant
   */
  children: ReactNode
}

export const StatusIndicator: FC<StatusIndicatorProps> = ({ variant = 'neutral', children, ...rest }) => {
  return (
    <ElStatusIndicator {...rest}>
      <ElStatusIndicatorShape data-variant={variant} />
      {children}
    </ElStatusIndicator>
  )
}
