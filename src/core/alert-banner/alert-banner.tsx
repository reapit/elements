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
  /** The visual variant of an alert banner, determining its severity level. */
  export type Variant = 'error' | 'warning' | 'info'

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
    variant: Variant
  }
}

/**
 * A global message used for product related announcements (outages, major changes, new releases, etc.),
 * displayed at the top of the screen.
 *
 * Alert banners are full-width components that span the entire viewport. They appear above page content
 * and use a bottom border to separate them from the content below.
 *
 * Use `AlertBannerOutlet` and `AlertBannerPortal` to manage banners effectively:
 *
 * - **`AlertBannerOutlet`**: Place once within `PageLayout.TopBarRegion` at the top of your layout.
 *   It manages multiple banners and displays only the highest priority one (error > warning > info).
 * - **`AlertBannerPortal`**: Render banners from anywhere in the component tree into an outlet.
 *   Useful when banner triggers live deep in the component hierarchy.
 *
 * For **dynamic announcements** (shown after user interaction or on a condition), use the appropriate ARIA role:
 * - `role="alert"` for urgent announcements needing immediate attention (outages, critical warnings); or,
 * - `role="status"` for non-urgent updates (new releases, informational announcements).
 *
 * For **static announcements** (present on page load), no role is needed. Screen readers only announce
 * live region updates, not initial content.
 *
 * @example
 * // Typical setup with outlet and portal
 * // In your layout:
 * <PageLayout>
 *   <PageLayout.TopBarRegion>
 *     <AlertBannerOutlet />
 *   </PageLayout.TopBarRegion>
 *   <PageLayout.BodyRegion>
 *     ...
 *   </PageLayout.BodyRegion>
 * </PageLayout>
 *
 * // Anywhere in your app:
 * <AlertBannerPortal>
 *   <AlertBanner variant="error" icon={<ErrorIcon />}>
 *     Connection lost
 *   </AlertBanner>
 * </AlertBannerPortal>
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
