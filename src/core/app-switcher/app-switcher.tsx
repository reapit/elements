import { AppAvatar } from './app-avatar'
import { AppSwitcherExploreMenuGroup } from './explore-menu-group'
import { AppSwitcherMenuItem } from './menu-item'
import { AppSwitcherNavIconButton } from './nav-icon-button'
import { AppSwitcherProductMenuItem } from './product-menu-item'
import { AppSwitcherYourAppsMenuGroup } from './your-apps-menu-group'
import { getDisplayableProductsForYourAppsGroup } from './get-displayable-products-for-your-apps-group'
import { getDisplayableProductsForExploreGroup } from './get-displayable-products-for-explore-group'
import { Menu } from '#src/core/menu'
import { useId } from 'react'

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
  const triggerId = useId()
  const menuId = useId()

  return (
    <>
      <AppSwitcherNavIconButton
        {...Menu.getMenuTriggerProps({ id: triggerId, popoverTarget: menuId, popoverTargetAction: 'toggle' })}
      />
      <Menu aria-labelledby={triggerId} id={menuId} placement="bottom-start">
        {children}
      </Menu>
    </>
  )
}

AppSwitcher.AppAvatar = AppAvatar
AppSwitcher.Divider = Menu.Divider
AppSwitcher.ExploreMenuGroup = AppSwitcherExploreMenuGroup
AppSwitcher.MenuItem = AppSwitcherMenuItem
AppSwitcher.ProductMenuItem = AppSwitcherProductMenuItem
AppSwitcher.YourAppsMenuGroup = AppSwitcherYourAppsMenuGroup

AppSwitcher.getDisplayableProductsForExploreGroup = getDisplayableProductsForExploreGroup
AppSwitcher.getDisplayableProductsForYourAppsGroup = getDisplayableProductsForYourAppsGroup
