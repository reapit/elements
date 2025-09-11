import { AppSwitcher } from '../app-switcher'
import { AppSwitcherMenuItem } from '../menu-item'
import { productConfigs } from '../config'
import { useAppSwitcherMenuGroupHasAccessContext } from '../menu-group-has-access-context'

import type { SupportedProductId } from '../config'
import type { ReactNode } from 'react'

export namespace AppSwitcherProductMenuItem {
  // NOTE: We extend AppSwitcherMenuItem.Props to allow overriding the appName, logo, and supplementaryInfo.
  // This is purely an escape hatch for consumers to reach for if they can't upgrade to the latest version
  // of Elements but need to make some UI updates for one or more products.
  export interface Props extends Partial<AppSwitcherMenuItem.Props> {
    productId: SupportedProductId
    href: string
  }
}

/**
 * A menu item for the App Switcher that represents a specific product. It displays the product's name, logo,
 * and supplementary info based on the provided product ID. Ultimately, this is a thin wrapper around the
 * low-level `AppSwitcher.MenuItem` component, but it provides a more convenient interface for consumers to
 * interact with when rendering items based on the currently logged-in user's accessible products.
 *
 * The product's logo (`AppAvatar`) will automatically reflect the user's access to the product based on whether
 * the item is rendered within the `AppSwitcher.YouAppsMenuGroup` or the `AppSwitcher.ExploreMenuGroup`.
 */
export function AppSwitcherProductMenuItem({
  appName: appNameOverride,
  avatar: avatarOverride,
  href,
  productId,
  supplementaryInfo: supplementaryInfoOverride,
}: AppSwitcherProductMenuItem.Props): ReactNode {
  const hasAccess = useAppSwitcherMenuGroupHasAccessContext()
  const { appName, supplementaryInfo } = productConfigs[productId]
  return (
    <AppSwitcher.MenuItem
      appName={appNameOverride ?? appName}
      avatar={avatarOverride ?? <AppSwitcher.AppAvatar hasAccess={hasAccess} productId={productId} />}
      href={href}
      supplementaryInfo={supplementaryInfoOverride ?? supplementaryInfo}
    />
  )
}
