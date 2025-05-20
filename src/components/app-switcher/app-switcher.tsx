import type { FC, HTMLAttributes } from 'react'
import React from 'react'
import { Menu } from '../menu'
import { AppSwitcherAccessibleAppsMenuGroup } from './app-switcher-menu-groups/app-switcher-my-apps-menu-group'
import { AppSwitcherInaccessibleAppsMenuGroup } from './app-switcher-menu-groups/app-your-apps-menu-group'
import { AppSwitcherMenuItem } from './app-switcher-menu-item'
import AppSwitcherNavIconButton from './app-switcher-nav-icon-button/app-switcher-nav-icon-button'
import { ElAppSwitcherMenuListWrapper, ElAppSwitcherSectionDivider } from './styles'

const AppSwitcher: FC<HTMLAttributes<HTMLDivElement>> & {
  AccessibleAppsMenuGroup: typeof AppSwitcherAccessibleAppsMenuGroup
  InaccessibleAppsMenuGroup: typeof AppSwitcherInaccessibleAppsMenuGroup
  MenuItem: typeof AppSwitcherMenuItem
} = ({ children }) => {
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
