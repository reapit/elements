import type { HTMLAttributes, ReactNode } from "react";

import { BottomBarContext, useBottomBarContext } from "./context";
import { BottomBarItemButton } from "./item";
import { BottomBarMenuList } from "./menu-list";
import { ElBottomBarContainer, ElBottomBarNav } from "./styles";
import { useBottomBarObserver } from "./use-bottom-bar-observer";

export namespace BottomBar {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The children of the bottom bar. **/
    children: ReactNode;
    /** The ID of the scroll container the bottom bar will observe. */
    scrollContainerId?: string;
  }
}

/**
 * A bottom bar component for use on mobile-first applications or small screen sizes (XS breakpoint).
 * Should only have a maximum of five (5) items. The fifth item can be an overflow menu. Will retract
 * and extend based on the direction of scroll in the observed scroll container.
 *
 * Typically placed within a sticky-positioned element within the scroll container being
 * observed, such as the `PageLayout.BottomBarRegion`.
 */
export function BottomBar({
  "aria-label": ariaLabel = "Bottom navigation",
  children,
  scrollContainerId,
  ...rest
}: BottomBar.Props) {
  const state = useBottomBarObserver(scrollContainerId);

  return (
    <ElBottomBarContainer>
      <ElBottomBarNav {...rest} aria-label={ariaLabel} data-state={state}>
        <BottomBarContext.Provider value={{ state }}>{children}</BottomBarContext.Provider>
      </ElBottomBarNav>
    </ElBottomBarContainer>
  );
}

BottomBar.Item = BottomBarMenuList.Item;
BottomBar.ItemButton = BottomBarItemButton;
BottomBar.MenuItem = BottomBarMenuList.MenuItem;
BottomBar.MenuList = BottomBarMenuList;

BottomBar.Context = BottomBarContext;
BottomBar.useContext = useBottomBarContext;

/** @deprecated Use BottomBar.Props instead */
export type BottomBarProps = BottomBar.Props;
