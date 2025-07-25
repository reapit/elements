import { AppAvatar } from './app-avatar'
import { AppSwitcherExploreMenuGroup } from './explore-menu-group'
import { AppSwitcherMenuItem } from './menu-item'
import { AppSwitcherNavIconButton } from './nav-icon-button'
import { AppSwitcherProductMenuItem } from './product-menu-item'
import { AppSwitcherYourAppsMenuGroup } from './your-apps-menu-group'
import { ElAppSwitcherSectionDivider } from './styles'
import { getDisplayableProductsForYourAppsGroup } from './get-displayable-products-for-your-apps-group'
import { getDisplayableProductsForExploreGroup } from './get-displayable-products-for-explore-group'
import { DeprecatedMenu } from '#src/deprecated/menu'

import type { ReactNode } from 'react'

interface AppSwitcherProps {
  /**
   * The menu groups and their items. Should typically be `AppSwitcher.ExploreMenuGroup`,
   * `AppSwitcher.YourAppsMenuGroup`, and `AppSwitcher.ProductMenuItem` components */
  children: ReactNode
}

/**
 * The App Switcher is a menu that enables users to switch between, or explore, Reapit products. It shows both
 * the products the current user has access to (in the Your Apps group), and other apps from Reapit (in the
 * Explore group).
 */
export function AppSwitcher({ children }: AppSwitcherProps) {
  return (
    <DeprecatedMenu>
      <DeprecatedMenu.Trigger>
        {({ getTriggerProps }) => <AppSwitcherNavIconButton {...getTriggerProps()} />}
      </DeprecatedMenu.Trigger>
      <DeprecatedMenu.Popover>
        <DeprecatedMenu.List>{children}</DeprecatedMenu.List>
      </DeprecatedMenu.Popover>
    </DeprecatedMenu>
  )
}

AppSwitcher.AppAvatar = AppAvatar
AppSwitcher.Divider = ElAppSwitcherSectionDivider
AppSwitcher.ExploreMenuGroup = AppSwitcherExploreMenuGroup
AppSwitcher.MenuItem = AppSwitcherMenuItem
AppSwitcher.ProductMenuItem = AppSwitcherProductMenuItem
AppSwitcher.YourAppsMenuGroup = AppSwitcherYourAppsMenuGroup

AppSwitcher.getDisplayableProductsForExploreGroup = getDisplayableProductsForExploreGroup
AppSwitcher.getDisplayableProductsForYourAppsGroup = getDisplayableProductsForYourAppsGroup
