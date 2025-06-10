import {
  ElTopBar,
  ElTopBarAppSwitcherContainer,
  ElTopBarLogoContainer,
  ElTopBarMainNavContainer,
  ElTopBarMenuContainer,
  ElTopBarAvatarContainer,
  ElTopBarSearchContainer,
  ElTopBarSecondaryNavContainer,
} from './styles'
import { TopBarAvatarButton } from './avatar-button'
import { TopBarMainNav } from './main-nav'
import { TopBarNavSearch } from './nav-search'
import { TopBarSecondaryNav } from './secondary-nav'

import type { ComponentProps, ReactNode } from 'react'

interface TopBarProps extends Omit<ComponentProps<typeof ElTopBar>, 'children'> {
  /**
   * Typically an `AppSwitcher` component.
   */
  appSwitcher?: ReactNode
  /**
   * The user's profile menu. Typically an `AvatarButton`.
   */
  avatar?: ReactNode
  /**
   * The product's logo.
   */
  logo: ReactNode
  /**
   * The main navigation region, typically containing `NavItem`'s for the product's top-level pages.
   */
  mainNav?: ReactNode
  /**
   * The overflow menu for all navigation items in the Top Bar. Usually, each section of the Top Bar will
   * collapse into this menu as the viewport narrows.
   */
  menu?: ReactNode
  /**
   * The "global" search entry point for the product. Typically a `NavSeachButton`.
   */
  search?: ReactNode
  /**
   * The secondary navigation region, typically containing `NavIconItem`'s for the product's secondary pages.
   */
  secondaryNav?: ReactNode
}

/**
 * A responsive navigation bar that contains the product's app switcher, logo, main navigation, secondary navigation,
 * search entry point, and user profile menu.
 */
export function TopBar({ appSwitcher, avatar, logo, mainNav, menu, search, secondaryNav, ...rest }: TopBarProps) {
  return (
    <ElTopBar {...rest}>
      {/* NOTE: The order here defines the "source order" of the DOM content. For a11y, it's important this
       * matches the visual order defined by ElTopBar's CSS grid layout. */}
      {appSwitcher && <ElTopBarAppSwitcherContainer>{appSwitcher}</ElTopBarAppSwitcherContainer>}
      <ElTopBarLogoContainer>{logo}</ElTopBarLogoContainer>
      {mainNav && <ElTopBarMainNavContainer>{mainNav}</ElTopBarMainNavContainer>}
      {search && <ElTopBarSearchContainer>{search}</ElTopBarSearchContainer>}
      {secondaryNav && <ElTopBarSecondaryNavContainer>{secondaryNav}</ElTopBarSecondaryNavContainer>}
      {menu && <ElTopBarMenuContainer>{menu}</ElTopBarMenuContainer>}
      <ElTopBarAvatarContainer>{avatar}</ElTopBarAvatarContainer>
    </ElTopBar>
  )
}

TopBar.AvatarButton = TopBarAvatarButton

TopBar.MainNav = TopBarMainNav
TopBar.NavItem = TopBarMainNav.Item
TopBar.NavMenuItem = TopBarMainNav.MenuItem

TopBar.SecondaryNav = TopBarSecondaryNav
TopBar.NavIconItem = TopBarSecondaryNav.Item
TopBar.NavIconMenuItem = TopBarSecondaryNav.MenuItem

TopBar.NavSearch = TopBarNavSearch
TopBar.NavSearchButton = TopBarNavSearch.Button
TopBar.NavSearchIconItem = TopBarNavSearch.IconItem
