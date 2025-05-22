import type { HTMLAttributes } from 'react'
import React from 'react'
import { Menu } from '../menu'
import { AppSwitcherAccessibleAppsMenuGroup } from './app-switcher-accessible-apps-menu-group'
import { AppSwitcherInaccessibleAppsMenuGroup } from './app-switcher-inaccessible-menu-group'
import { AppSwitcherMenuItem } from './app-switcher-menu-item'
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
AppSwitcher.MenuItem = AppSwitcherMenuItem

export { AppSwitcher }
