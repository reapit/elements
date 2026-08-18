import { cx } from "@linaria/core";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { TopBarMenuDrawerMenuItemBase } from "./menu-item-base";
import { elTopBarMenuDrawerMenuItem } from "./styles";

export namespace TopBarMenuDrawerMenuItemButton {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The label of the menu item.
     */
    children: ReactNode;
    /**
     * Whether the menu item has a notification badge.
     */
    hasBadge?: boolean;
  }
}

/**
 * Simple button-based menu item for use in `TopBar.Menu`. Used for actions that don't navigate.
 * Use via `TopBar.MenuItemButton`.
 */
export function TopBarMenuDrawerMenuItemButton({
  children,
  className,
  hasBadge,
  type = "button",
  ...rest
}: TopBarMenuDrawerMenuItemButton.Props) {
  return (
    <button {...rest} type={type} className={cx(elTopBarMenuDrawerMenuItem, className)}>
      <TopBarMenuDrawerMenuItemBase hasBadge={hasBadge}>{children}</TopBarMenuDrawerMenuItemBase>
    </button>
  );
}
