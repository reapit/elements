import { ElStatusIndicator } from './styles'
import type { HTMLAttributes, ReactNode } from 'react'

// We omit:
// - aria-label and aria-labelledby by because they are prohibited for <strong> elements
//   by the WAI-ARIA guidelines (they should only be used for interactive content).
type AttributesToOmit = 'aria-label' | 'aria-labelledby'

export namespace StatusIndicator {
  export interface Props extends Omit<HTMLAttributes<HTMLElement>, AttributesToOmit> {
    /** The label of the status indicator. */
    children: ReactNode
    /** The variant of the status indicator. */
    variant: 'neutral' | 'success' | 'pending' | 'warning' | 'danger' | 'inactive' | 'accent1' | 'accent2'
  }
}

/**
 * A low-visibility component used to highlight important information.
 */
export function StatusIndicator({ children, variant, ...rest }: StatusIndicator.Props) {
  return (
    <ElStatusIndicator {...rest} data-variant={variant}>
      {children}
    </ElStatusIndicator>
  )
}
