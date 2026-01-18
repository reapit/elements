import { CloseIcon } from '#src/icons/close'
import {
  ElAlertBanner,
  ElAlertBannerIconContainer,
  ElAlertBannerDescription,
  ElAlertBannerDismissButton,
  ElAlertBannerActions,
} from './styles'

import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'

type AttributesToOmit = never

export namespace AlertBanner {
  export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, AttributesToOmit> {
    /** Actions to display (typically a ButtonGroup with tertiary buttons) */
    actions?: ReactNode
    /** The description content of the alert banner */
    children: ReactNode
    /** Icon to display */
    icon?: ReactNode
    /** Callback fired when the dismiss button is clicked */
    onDismiss?: MouseEventHandler<HTMLButtonElement>
    /** The variant of the alert banner */
    variant: 'error' | 'warning' | 'info'
  }
}

/**
 * A global message used for product related announcements (outages, major changes, new releases, etc.),
 * displayed at the top of the screen.
 *
 * Alert banners are full-width components that span the entire viewport. They appear above page content
 * and use a bottom border to separate them from the content below.
 *
 * For **dynamic announcements** (shown after user interaction or on a condition), use the appropriate ARIA role:
 * - `role="alert"` for urgent announcements needing immediate attention (outages, critical warnings); or,
 * - `role="status"` for non-urgent updates (new releases, informational announcements).
 *
 * For **static announcements** (present on page load), no role is needed. Screen readers only announce
 * live region updates, not initial content.
 *
 * @example
 * // Static announcement on page load (no role)
 * <AlertBanner variant="info" icon={<InfoIcon />}>
 *   Version 2.0 is now available with new features
 * </AlertBanner>
 *
 * @example
 * // Dynamic critical announcement (use role="alert")
 * {outageMessage && (
 *   <AlertBanner role="alert" variant="error" icon={<ErrorIcon />}>
 *     {outageMessage}
 *   </AlertBanner>
 * )}
 *
 * @example
 * // Dynamic informational announcement (use role="status")
 * {releaseMessage && (
 *   <AlertBanner role="status" variant="info" icon={<InfoIcon />}>
 *     {releaseMessage}
 *   </AlertBanner>
 * )}
 */
export function AlertBanner({ actions, children, icon, onDismiss, variant, ...rest }: AlertBanner.Props) {
  const isDismissable = !!onDismiss
  return (
    <ElAlertBanner {...rest} data-is-dismissable={isDismissable} data-variant={variant}>
      {icon && <ElAlertBannerIconContainer>{icon}</ElAlertBannerIconContainer>}
      <ElAlertBannerDescription>{children}</ElAlertBannerDescription>
      {actions && <ElAlertBannerActions>{actions}</ElAlertBannerActions>}
      {isDismissable && (
        <ElAlertBannerDismissButton
          aria-label="Dismiss announcement"
          iconLeft={<CloseIcon aria-hidden />}
          onClick={onDismiss}
          size="large"
          type="button"
          variant="tertiary"
        />
      )}
    </ElAlertBanner>
  )
}
