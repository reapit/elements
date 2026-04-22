import { CheckOutlineIcon } from '#src/icons/check-outline'
import { ErrorIcon } from '#src/icons/error'
import { InfoOutlineIcon } from '#src/icons/info-outline'
import { WarningOutlineIcon } from '#src/icons/warning-outline'
import { ElToast, ElToastIconContainer, ElToastMessage, ElToastTimeoutBarProgress, elToastTimeoutBar } from './styles'

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

const VARIANT_ICONS: Record<Exclude<Toast.Variant, 'neutral'>, ReactNode> = {
  error: <ErrorIcon />,
  info: <InfoOutlineIcon />,
  success: <CheckOutlineIcon />,
  warning: <WarningOutlineIcon />,
}

export namespace Toast {
  /** The visual variant of a toast, determining its colour scheme. */
  export type Variant = 'error' | 'info' | 'neutral' | 'success' | 'warning'

  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The toast message */
    children: ReactNode
    /**
     * Duration in milliseconds for the timeout bar animation. When set, a progress bar
     * animates from zero to full width. This is visual only — DOM removal is the
     * responsibility of the provider.
     */
    duration?: number
    /**
     * Icon to display alongside the message. Only used for the `neutral` variant —
     * all other variants render a built-in icon and this prop is silently ignored.
     */
    icon?: ReactNode
    /** The visual variant */
    variant: Variant
  }
}

/**
 * A short, non-intrusive notification that appears temporarily to inform the user of an
 * event or outcome. This is a presentation-only component — positioning, stacking, and
 * dismissal are handled by a toast provider.
 */
export function Toast({ children, duration, icon, variant, role = 'status', style, ...rest }: Toast.Props) {
  const toastStyle: CSSProperties | undefined =
    duration !== undefined ? ({ ...style, '--toast-duration': `${String(duration)}ms` } as CSSProperties) : style

  const resolvedIcon = variant === 'neutral' ? icon : VARIANT_ICONS[variant]

  return (
    <ElToast {...rest} data-variant={variant} role={role} style={toastStyle}>
      {resolvedIcon && <ElToastIconContainer aria-hidden="true">{resolvedIcon}</ElToastIconContainer>}
      <ElToastMessage>{children}</ElToastMessage>
      {duration !== undefined && (
        <div className={elToastTimeoutBar} aria-hidden="true">
          <ElToastTimeoutBarProgress />
        </div>
      )}
    </ElToast>
  )
}
