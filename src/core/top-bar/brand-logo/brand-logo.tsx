import { ElBrandLogo } from './styles'
import { AppLogo } from './app-logo'

import type { SupportedAppName } from './app-logo'
import type { AnchorHTMLAttributes } from 'react'

interface BrandLogoProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** The name of the app for which to display the logo */
  appName: SupportedAppName
  /** The URL to navigate to when the logo is clicked. Defaults to the root path. */
  href?: string
}

/**
 * A simple component for displaying a product logo in the Reapit brand. Will typically be used
 * via `TopBar.BrandLogo`.
 */
export function BrandLogo({ appName, href = '/', ...rest }: BrandLogoProps) {
  return (
    <ElBrandLogo {...rest} aria-label={`Go to ${appName}`} href={href}>
      <AppLogo appName={appName} />
    </ElBrandLogo>
  )
}
