import type { ComponentProps } from "react";

import { TopBarNavItem } from "../nav-item";
import { ElTopBarMainNavListItem } from "./styles";

export namespace TopBarMainNavListItem {
  export interface Props extends ComponentProps<typeof TopBarNavItem> {}
}

/**
 * A thin wrapper around `TopBarNavItem` that ensures it is contained within a list item (`<li>`) for
 * correct semantics and accessibility when used with `TopBar.MainNav`.
 *
 * All props are passed through to `TopBarNavItem`.
 */
export function TopBarMainNavListItem(props: TopBarMainNavListItem.Props) {
  return (
    <ElTopBarMainNavListItem>
      <TopBarNavItem {...props} />
    </ElTopBarMainNavListItem>
  );
}

TopBarMainNavListItem.displayName = "TopBar.NavItem";
