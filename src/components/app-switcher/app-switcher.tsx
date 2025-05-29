import type { HTMLAttributes } from 'react'
import { Menu } from '../menu'
import { AppSwitcherExploreMenuGroup } from './explore-menu-group'
import AutoResponderMenuItem from './menu-items/auto-responder-menu-item'
import KeyWhereMenuItem from './menu-items/keyWhere-menu-item'
import ReapitFormsMenuItem from './menu-items/reapit-forms-menu-item'
import ReapitLettingMenuItem from './menu-items/reapit-letting-menu-item'
import ReapitPMMenuItem from './menu-items/reapit-pm-menu-item'
import ReapitProposalsMenuItem from './menu-items/reapit-proposal-menu-item'
import ReapitSalesMenuItem from './menu-items/reapit-sales-menu-item'
import ReapitWebsitesMenuItem from './menu-items/reapit-websites-menu-item'
import AppSwitcherNavIconButton from './nav-icon-button/nav-icon-button'
import { AppSwitcherYourAppsMenuGroup } from './your-apps-menu-group'

function AppSwitcher({ children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <Menu>
      <Menu.Trigger>{({ getTriggerProps }) => <AppSwitcherNavIconButton {...getTriggerProps()} />}</Menu.Trigger>
      <Menu.Popover>
        <Menu.List>{children}</Menu.List>
      </Menu.Popover>
    </Menu>
  )
}

AppSwitcher.YourAppsMenuGroup = AppSwitcherYourAppsMenuGroup
AppSwitcher.ExploreMenuGroup = AppSwitcherExploreMenuGroup

AppSwitcher.ReapitPMMenuItem = ReapitPMMenuItem
AppSwitcher.ReapitSalesMenuItem = ReapitSalesMenuItem
AppSwitcher.ReapitLettingMenuItem = ReapitLettingMenuItem
AppSwitcher.ReapitFormsMenuItem = ReapitFormsMenuItem
AppSwitcher.ReapitWebsitesMenuItem = ReapitWebsitesMenuItem
AppSwitcher.ReapitProposalsMenuItem = ReapitProposalsMenuItem
AppSwitcher.KeyWhereMenuItem = KeyWhereMenuItem
AppSwitcher.AutoResponderMenuItem = AutoResponderMenuItem

export { AppSwitcher }
