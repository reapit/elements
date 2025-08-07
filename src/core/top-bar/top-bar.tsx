import { BrandLogo } from './brand-logo'
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
import { TopBarAvatarMenu } from './avatar-menu'
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
   * The user's profile menu. Typically an `AvatarMenu`.
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
 * A responsive header that contains the product's app switcher, logo, main navigation, search entry point,
 * secondary navigation, and user avatar. There are specific components designed for use in each region.
 *
 * Only the logo and user avatar are required; all other regions are optional.
 *
 * - **App switcher:** [AppSwitcher](/docs/core-appswitcher--docs)
 * - **Avatar:** [TopBar.AvatarMenu](/docs/core-topbar-avatarmenu--docs)
 * - **Logo:** [TopBar.BrandLogo](/docs/core-topbar-brandlogo--docs)
 * - **Main navigation:** [TopBar.MainNav](/docs/core-topbar-mainnav--docs),
 *   [TopBar.NavItem](/docs/core-topbar-navitem--docs),
 *   [TopBar.NavMenuItem](/docs/core-topbar-navmenuitem--docs)
 * - **Menu:** TODO
 * - **Search:** [TopBar.NavSearch](/docs/core-topbar-navsearch--docs),
 *   [TopBar.NavSearchButton](/docs/core-topbar-navsearchbutton--docs),
 *   [TopBar.NavSearchIconItem](/docs/core-topbar-navsearchiconitem--docs)
 * - **Secondary navigation:** [TopBar.SecondaryNav](/docs/core-topbar-secondarynav--docs),
 *   [TopBar.NavIconItem](/docs/core-topbar-naviconitem--docs),
 *   [TopBar.NavIconMenuItem](/docs/core-topbar-naviconmenuitem--docs)
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

TopBar.BrandLogo = BrandLogo

TopBar.MainNav = TopBarMainNav
TopBar.NavItem = TopBarMainNav.Item
TopBar.NavMenuItem = TopBarMainNav.MenuItem

TopBar.SecondaryNav = TopBarSecondaryNav
TopBar.NavIconItem = TopBarSecondaryNav.Item
TopBar.NavIconMenuItem = TopBarSecondaryNav.MenuItem

TopBar.NavSearch = TopBarNavSearch
TopBar.NavSearchButton = TopBarNavSearch.Button
TopBar.NavSearchIconItem = TopBarNavSearch.IconItem

TopBar.AvatarButton = TopBarAvatarButton
TopBar.AvatarMenu = TopBarAvatarMenu
