import { CheckOutlineIcon } from '#src/icons/check-outline'
import { ErrorIcon } from '#src/icons/error'
import { InfoOutlineIcon } from '#src/icons/info-outline'
import { WarningOutlineIcon } from '#src/icons/warning-outline'
import { isTimedDuration } from './is-timed-duration'
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
     * Duration in milliseconds. When set, a timeout bar is rendered.
     */
    duration?: number
    /**
     * Time already elapsed in milliseconds, used to resume the timeout bar
     * animation partway through (e.g. after a portal remount). Defaults to `0`.
     */
    elapsed?: number
    /**
     * Icon to display alongside the message. Only used for the `neutral` variant —
     * all other variants render a built-in icon and this prop is silently ignored.
     */
    icon?: ReactNode
    /**
     * When `true`, the timeout bar animation is paused. Use this when the
     * toast's auto-dismiss timer is suspended — for example, while the user
     * hovers or swipes the toast, or while the page is hidden.
     */
    isPaused?: boolean
    /** The visual variant */
    variant: Variant
  }
}

/**
 * A short, non-intrusive notification that appears temporarily to inform the user of an
 * event or outcome. This is a presentation-only component — positioning, stacking, and
 * dismissal are handled by a toast provider.
 */
export function Toast({
  children,
  duration,
  elapsed = 0,
  icon,
  isPaused,
  variant,
  role = 'status',
  ...rest
}: Toast.Props) {
  const isTimed = isTimedDuration(duration)
  const resolvedIcon = variant === 'neutral' ? icon : VARIANT_ICONS[variant]

  const progressStyle: CSSProperties | undefined = isTimed
    ? {
        animationDuration: `${duration}ms`,
        animationDelay: `${-elapsed}ms`,
        animationPlayState: isPaused ? 'paused' : 'running',
      }
    : undefined

  return (
    <ElToast {...rest} data-variant={variant} role={role}>
      {resolvedIcon && <ElToastIconContainer aria-hidden="true">{resolvedIcon}</ElToastIconContainer>}
      <ElToastMessage>{children}</ElToastMessage>
      {isTimed && (
        <div className={elToastTimeoutBar} aria-hidden="true">
          <ElToastTimeoutBarProgress style={progressStyle} />
        </div>
      )}
    </ElToast>
  )
}
