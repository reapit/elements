import type { HTMLAttributes } from "react";

import { TopBarMenuDrawerHeaderCloseButton } from "./close-button";
import { ElTopBarMenuDrawerHeader } from "./styles";

export namespace TopBarMenuDrawerHeader {
  export interface Props extends HTMLAttributes<HTMLElement> {}
}

/**
 * A header for the TopBarMenuDrawer. Contains a built-in close button.
 */
export function TopBarMenuDrawerHeader(props: TopBarMenuDrawerHeader.Props) {
  return (
    <ElTopBarMenuDrawerHeader {...props}>
      <TopBarMenuDrawerHeaderCloseButton />
    </ElTopBarMenuDrawerHeader>
  );
}

TopBarMenuDrawerHeader.displayName = "TopBar.MenuDrawerHeader";
