import type { HTMLAttributes } from 'react'
import React from 'react'
import { Menu } from '../menu'
import { AppSwitcherAccessibleAppsMenuGroup } from './app-switcher-accessible-apps-menu-group'
import { AppSwitcherInaccessibleAppsMenuGroup } from './app-switcher-inaccessible-menu-group'
import AutoResponderMenuItem from './app-switcher-menu-items/app-switcher-auto-responder-menu-item'
import KeyWhereMenuItem from './app-switcher-menu-items/app-switcher-keyWhere-menu-item'
import ReapitFormsMenuItem from './app-switcher-menu-items/app-switcher-reapit-forms-menu-item'
import ReapitLettingMenuItem from './app-switcher-menu-items/app-switcher-reapit-letting-menu-item'
import ReapitPMMenuItem from './app-switcher-menu-items/app-switcher-reapit-pm-menu-item'
import ReapitProposalsMenuItem from './app-switcher-menu-items/app-switcher-reapit-proposal-menu-item'
import ReapitSalesMenuItem from './app-switcher-menu-items/app-switcher-reapit-sales-menu-item'
import ReapitWebsitesMenuItem from './app-switcher-menu-items/app-switcher-reapit-websites-menu-item'
import AppSwitcherNavIconButton from './app-switcher-nav-icon-button/app-switcher-nav-icon-button'
import { ElAppSwitcherMenuListWrapper, ElAppSwitcherSectionDivider } from './styles'

function AppSwitcher({ children }: HTMLAttributes<HTMLDivElement>) {
  const childrenArray = React.Children.toArray(children)
  // fallback to `null`, which will only show the divider when no components are passed
  const [firstChild = null, secondChild = null] = childrenArray

  return (
    <Menu>
      <Menu.Trigger>{({ getTriggerProps }) => <AppSwitcherNavIconButton {...getTriggerProps()} />}</Menu.Trigger>
      <Menu.Popover>
        <ElAppSwitcherMenuListWrapper>
          <Menu.List>
            {firstChild}
            <ElAppSwitcherSectionDivider />
            {secondChild}
          </Menu.List>
        </ElAppSwitcherMenuListWrapper>
      </Menu.Popover>
    </Menu>
  )
}

AppSwitcher.AccessibleAppsMenuGroup = AppSwitcherAccessibleAppsMenuGroup
AppSwitcher.InaccessibleAppsMenuGroup = AppSwitcherInaccessibleAppsMenuGroup

AppSwitcher.ReapitPMMenuItem = ReapitPMMenuItem
AppSwitcher.ReapitSalesMenuItem = ReapitSalesMenuItem
AppSwitcher.ReapitLettingMenuItem = ReapitLettingMenuItem
AppSwitcher.ReapitFormsMenuItem = ReapitFormsMenuItem
AppSwitcher.ReapitWebsitesMenuItem = ReapitWebsitesMenuItem
AppSwitcher.ReapitProposalsMenuItem = ReapitProposalsMenuItem
AppSwitcher.KeyWhereMenuItem = KeyWhereMenuItem
AppSwitcher.AutoResponderMenuItem = AutoResponderMenuItem

export { AppSwitcher }
