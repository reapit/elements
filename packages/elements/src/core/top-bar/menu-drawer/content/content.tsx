import type { HTMLAttributes } from "react";

import { ElTopBarMenuDrawerContent } from "./styles";

export namespace TopBarMenuDrawerContent {
  export interface Props extends HTMLAttributes<HTMLElement> {}
}

/**
 * A navigation element for the TopBarMenuDrawer. Typically wraps the main, secondary, and profile
 * menu lists.
 */
export function TopBarMenuDrawerContent(props: TopBarMenuDrawerContent.Props) {
  return <ElTopBarMenuDrawerContent {...props} />;
}

TopBarMenuDrawerContent.displayName = "TopBar.MenuContent";
