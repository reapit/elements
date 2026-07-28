import type { ComponentProps, ReactNode } from "react";

import { TopBarAvatarAnchor, TopBarAvatarButton } from "./avatar";
import { TopBarAvatarMenu } from "./avatar-menu";
import { BrandLogo } from "./brand-logo";
import { TopBarMainNav } from "./main-nav";
import { TopBarMenu } from "./menu";
import { TopBarNavSearch } from "./nav-search";
import { TopBarSecondaryNav } from "./secondary-nav";
import {
  ElTopBar,
  ElTopBarAppSwitcherContainer,
  ElTopBarAvatarContainer,
  ElTopBarContentContainer,
  ElTopBarLogoContainer,
  ElTopBarMainNavContainer,
  ElTopBarMenuContainer,
  ElTopBarSearchContainer,
  ElTopBarSecondaryNavContainer,
} from "./styles";

export namespace TopBar {
  export interface BrandLogoProps extends BrandLogo.Props {}
  export interface MainNavProps extends TopBarMainNav.Props {}
  export interface NavItemProps extends TopBarMainNav.ItemProps {}
  export interface NavMenuItemProps extends TopBarMainNav.MenuItemProps {}
  export interface SecondaryNavProps extends TopBarSecondaryNav.Props {}
  export interface NavIconItemProps extends TopBarSecondaryNav.ItemProps {}
  export interface NavIconItemButtonProps extends TopBarSecondaryNav.ItemButtonProps {}
  export interface NavIconMenuItemProps extends TopBarSecondaryNav.MenuItemProps {}
  export interface NavSearchProps extends TopBarNavSearch.Props {}
  export interface NavSearchButtonProps extends TopBarNavSearch.ButtonProps {}
  export interface NavSearchIconItemProps extends TopBarNavSearch.IconItemProps {}
  export interface AvatarAnchorProps extends TopBarAvatarAnchor.Props {}
  export interface AvatarButtonProps extends TopBarAvatarButton.Props {}
  export interface AvatarMenuProps extends TopBarAvatarMenu.Props {}
  export interface MenuProps extends TopBarMenu.Props {}
  export interface MenuContentProps extends TopBarMenu.ContentProps {}
  export interface MenuMainNavProps extends TopBarMenu.MainNavProps {}
  export interface MenuSecondaryNavProps extends TopBarMenu.SecondaryNavProps {}
  export interface MenuProfileNavProps extends TopBarMenu.ProfileNavProps {}
  export interface MenuListProps extends TopBarMenu.MenuListProps {}
  export interface MenuItemProps extends TopBarMenu.MenuItemProps {}
  export interface MenuItemButtonProps extends TopBarMenu.MenuItemButtonProps {}
  export interface MenuGroupProps extends TopBarMenu.MenuGroupProps {}
  export interface MenuGroupSummaryProps extends TopBarMenu.MenuGroupSummaryProps {}
  export interface SubmenuProps extends TopBarMenu.SubmenuProps {}
  export interface SubmenuItemProps extends TopBarMenu.SubmenuItemProps {}
  export interface SubmenuItemButtonProps extends TopBarMenu.SubmenuItemButtonProps {}

  export interface Props extends Omit<ComponentProps<typeof ElTopBar>, "children"> {
    /**
     * Typically an `AppSwitcher` component.
     */
    appSwitcher?: ReactNode;
    /**
     * The user's profile menu. Typically an `AvatarMenu`.
     */
    avatar?: ReactNode;
    /**
     * The product's logo.
     */
    logo: ReactNode;
    /**
     * The main navigation region, typically containing `NavItem`'s for the product's top-level pages.
     */
    mainNav?: ReactNode;
    /**
     * The overflow menu for all navigation items in the Top Bar. Usually, each section of the Top Bar will
     * collapse into this menu as the viewport narrows.
     */
    menu?: ReactNode;
    /**
     * The "global" search entry point for the product. Typically a `NavSeachButton`.
     */
    search?: ReactNode;
    /**
     * The secondary navigation region, typically containing `NavIconItem`'s for the product's secondary pages.
     */
    secondaryNav?: ReactNode;
  }
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
 * - **Menu:** [TopBar.Menu](/docs/core-topbar-menu--docs) and friends
 * - **Search:** [TopBar.NavSearch](/docs/core-topbar-navsearch--docs),
 *   [TopBar.NavSearchButton](/docs/core-topbar-navsearchbutton--docs),
 *   [TopBar.NavSearchIconItem](/docs/core-topbar-navsearchiconitem--docs)
 * - **Secondary navigation:** [TopBar.SecondaryNav](/docs/core-topbar-secondarynav--docs),
 *   [TopBar.NavIconItem](/docs/core-topbar-naviconitem--docs),
 *   [TopBar.NavIconMenuItem](/docs/core-topbar-naviconmenuitem--docs)
 */
export function TopBar({
  appSwitcher,
  avatar,
  logo,
  mainNav,
  menu,
  search,
  secondaryNav,
  ...rest
}: TopBar.Props) {
  return (
    <ElTopBar {...rest}>
      <ElTopBarContentContainer>
        {/* NOTE: The order here defines the "source order" of the DOM content. For a11y, it's important this
         * matches the visual order defined by ElTopBar's CSS grid layout. */}
        {appSwitcher && <ElTopBarAppSwitcherContainer>{appSwitcher}</ElTopBarAppSwitcherContainer>}
        <ElTopBarLogoContainer>{logo}</ElTopBarLogoContainer>
        {mainNav && <ElTopBarMainNavContainer>{mainNav}</ElTopBarMainNavContainer>}
        {search && <ElTopBarSearchContainer>{search}</ElTopBarSearchContainer>}
        {secondaryNav && (
          <ElTopBarSecondaryNavContainer>{secondaryNav}</ElTopBarSecondaryNavContainer>
        )}
        {menu && <ElTopBarMenuContainer>{menu}</ElTopBarMenuContainer>}
        <ElTopBarAvatarContainer>{avatar}</ElTopBarAvatarContainer>
      </ElTopBarContentContainer>
    </ElTopBar>
  );
}

TopBar.BrandLogo = BrandLogo;

TopBar.MainNav = TopBarMainNav;
TopBar.NavItem = TopBarMainNav.Item;
TopBar.NavMenuItem = TopBarMainNav.MenuItem;

TopBar.SecondaryNav = TopBarSecondaryNav;
TopBar.NavIconItem = TopBarSecondaryNav.Item;
TopBar.NavIconItemButton = TopBarSecondaryNav.ItemButton;
TopBar.NavIconMenuItem = TopBarSecondaryNav.MenuItem;

TopBar.NavSearch = TopBarNavSearch;
TopBar.NavSearchButton = TopBarNavSearch.Button;
TopBar.NavSearchIconItem = TopBarNavSearch.IconItem;

TopBar.AvatarAnchor = TopBarAvatarAnchor;
TopBar.AvatarButton = TopBarAvatarButton;
TopBar.AvatarMenu = TopBarAvatarMenu;

TopBar.Menu = TopBarMenu;
TopBar.MenuContent = TopBarMenu.Content;
TopBar.MenuMainNav = TopBarMenu.MainNav;
TopBar.MenuSecondaryNav = TopBarMenu.SecondaryNav;
TopBar.MenuProfileNav = TopBarMenu.ProfileNav;
TopBar.MenuList = TopBarMenu.MenuList;
TopBar.MenuItem = TopBarMenu.MenuItem;
TopBar.MenuItemButton = TopBarMenu.MenuItemButton;
TopBar.MenuGroup = TopBarMenu.MenuGroup;
TopBar.MenuGroupSummary = TopBarMenu.MenuGroupSummary;
TopBar.MenuSubmenu = TopBarMenu.Submenu;
TopBar.MenuSubmenuItem = TopBarMenu.SubmenuItem;
TopBar.MenuSubmenuItemButton = TopBarMenu.SubmenuItemButton;
