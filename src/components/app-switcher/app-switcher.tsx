import type { HTMLAttributes } from 'react'
import React from 'react'
import { Menu } from '../menu'
import { AppSwitcherAccessibleAppsMenuGroup } from './accessible-apps-menu-group'
import { AppSwitcherInaccessibleAppsMenuGroup } from './inaccessible-menu-group'
import AutoResponderMenuItem from './menu-items/auto-responder-menu-item'
import KeyWhereMenuItem from './menu-items/keyWhere-menu-item'
import ReapitFormsMenuItem from './menu-items/reapit-forms-menu-item'
import ReapitLettingMenuItem from './menu-items/reapit-letting-menu-item'
import ReapitPMMenuItem from './menu-items/reapit-pm-menu-item'
import ReapitProposalsMenuItem from './menu-items/reapit-proposal-menu-item'
import ReapitSalesMenuItem from './menu-items/reapit-sales-menu-item'
import ReapitWebsitesMenuItem from './menu-items/reapit-websites-menu-item'
import AppSwitcherNavIconButton from './nav-icon-button/nav-icon-button'
import { ElAppSwitcherSectionDivider } from './styles'

function AppSwitcher({ children }: HTMLAttributes<HTMLDivElement>) {
  const childrenArray = React.Children.toArray(children)
  // fallback to `null`, which will only show the divider when no components are passed
  const [firstChild = null, secondChild = null] = childrenArray

  return (
    <Menu>
      <Menu.Trigger>{({ getTriggerProps }) => <AppSwitcherNavIconButton {...getTriggerProps()} />}</Menu.Trigger>
      <Menu.Popover>
        <Menu.List>
          {firstChild}
          {/* // (AA)TODO: Ask kurt - Should this divider vv be a different component that takes the whole width? */}
          <ElAppSwitcherSectionDivider />
          {secondChild}
        </Menu.List>
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
