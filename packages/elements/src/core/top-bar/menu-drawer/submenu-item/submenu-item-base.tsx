import type { ReactNode } from "react";

import { ElTopBarMenuDrawerMenuItemBadge } from "../menu-item/styles";
import { ElTopBarMenuDrawerSubmenuItemLabel } from "./styles";

export namespace TopBarMenuDrawerSubmenuItemBase {
  export interface Props {
    children: ReactNode;
    hasBadge?: boolean;
  }
}

/**
 * Base component for menu drawer submenu items. Provides shared label structure.
 * Not exported publicly - used internally by anchor and button variants.
 */
export function TopBarMenuDrawerSubmenuItemBase({
  children,
  hasBadge,
}: TopBarMenuDrawerSubmenuItemBase.Props) {
  return (
    <>
      <ElTopBarMenuDrawerSubmenuItemLabel>{children}</ElTopBarMenuDrawerSubmenuItemLabel>
      {hasBadge && <ElTopBarMenuDrawerMenuItemBadge aria-hidden />}
    </>
  );
}
