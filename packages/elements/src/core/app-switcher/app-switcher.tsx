import { useId } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Menu } from "#src/core/menu";

import { AppAvatar } from "./anz/app-avatar";
import { getDisplayableProductsForExploreGroup } from "./anz/get-displayable-products-for-explore-group";
import { getDisplayableProductsForYourAppsGroup } from "./anz/get-displayable-products-for-your-apps-group";
import { AppSwitcherProductMenuItem } from "./anz/product-menu-item";
import { AppSwitcherExploreMenuGroup } from "./explore-menu-group";
import { AppSwitcherMenuItem } from "./menu-item";
import { AppSwitcherNavIconButton } from "./nav-icon-button";
import { AppSwitcherYourAppsMenuGroup } from "./your-apps-menu-group";

export namespace AppSwitcher {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The menu groups and their items. Should typically be `AppSwitcher.ExploreMenuGroup`,
     * `AppSwitcher.YourAppsMenuGroup`, and `AppSwitcher.ProductMenuItem` components */
    children: ReactNode;
  }
}

/**
 * The App Switcher is a menu that enables users to switch between, or explore, Reapit products. It shows both
 * the products the current user has access to (in the Your Apps group), and other apps from Reapit (in the
 * Explore group).
 */
export function AppSwitcher({ children, id, ...rest }: AppSwitcher.Props) {
  const triggerId = id ?? useId();
  const menuId = useId();

  return (
    <>
      <AppSwitcherNavIconButton
        {...rest}
        {...Menu.getTriggerProps({
          id: triggerId,
          popoverTarget: menuId,
          popoverTargetAction: "toggle",
        })}
      />
      <Menu aria-labelledby={triggerId} id={menuId} placement="bottom-start">
        {children}
      </Menu>
    </>
  );
}

/** @deprecated Import `AppAvatar` from `@reapit/elements/core/app-switcher/anz` instead. */
AppSwitcher.AppAvatar = AppAvatar;
AppSwitcher.Divider = Menu.Divider;
AppSwitcher.ExploreMenuGroup = AppSwitcherExploreMenuGroup;
AppSwitcher.MenuItem = AppSwitcherMenuItem;
/** @deprecated Import `AppSwitcherProductMenuItem` from `@reapit/elements/core/app-switcher/anz` instead. */
AppSwitcher.ProductMenuItem = AppSwitcherProductMenuItem;
AppSwitcher.YourAppsMenuGroup = AppSwitcherYourAppsMenuGroup;

/** @deprecated Import `getDisplayableProductsForExploreGroup` from `@reapit/elements/core/app-switcher/anz` instead. */
AppSwitcher.getDisplayableProductsForExploreGroup = getDisplayableProductsForExploreGroup;
/** @deprecated Import `getDisplayableProductsForYourAppsGroup` from `@reapit/elements/core/app-switcher/anz` instead. */
AppSwitcher.getDisplayableProductsForYourAppsGroup = getDisplayableProductsForYourAppsGroup;
