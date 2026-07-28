import { TopBarMenuDrawerMenuList } from "../menu-list";
import { ElTopBarMenuDrawerMainNav } from "./styles";

export namespace TopBarMenuDrawerMainNav {
  export interface Props extends Omit<TopBarMenuDrawerMenuList.Props, "aria-label"> {
    /**
     * Accessible label for the main navigation menu list.
     *
     * @default "Main navigation"
     */
    "aria-label"?: string;
  }
}

/**
 * A wrapper around `TopBar.MenuList` for main navigation items. Automatically hides when the main navigation is
 * visible in the TopBar (at LG+ breakpoints).
 *
 * Use this component to display main navigation menu items in the mobile drawer that correspond to items shown in the
 * TopBar's main navigation area on larger screens.
 */
export function TopBarMenuDrawerMainNav({
  "aria-label": ariaLabel = "Main navigation",
  children,
  ...rest
}: TopBarMenuDrawerMainNav.Props) {
  return (
    <ElTopBarMenuDrawerMainNav aria-label={ariaLabel} {...rest}>
      {children}
    </ElTopBarMenuDrawerMainNav>
  );
}

TopBarMenuDrawerMainNav.displayName = "TopBar.MenuMainNav";
