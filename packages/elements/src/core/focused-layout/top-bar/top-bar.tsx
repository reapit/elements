import type { HTMLAttributes, ReactNode } from "react";

import {
  ElFocusedLayoutTopBar,
  ElFocusedLayoutTopBarActions,
  ElFocusedLayoutTopBarContainer,
  ElFocusedLayoutTopBarLogoContainer,
  ElFocusedLayoutTopBarTitle,
  ElFocusedLayoutTopBarTitleContainer,
} from "./styles";

export namespace FocusedLayoutTopBar {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /** The logo element to display in the top bar */
    logo?: ReactNode;
    /** The page title */
    title: string;
  }
}

/**
 * The top bar region of a FocusedLayout. Contains the logo, page title, and action buttons.
 * On larger breakpoints (MD+), action buttons should be passed as children to this component.
 * On smaller breakpoints (XS/SM), actions move to the BottomBar.
 */
export function FocusedLayoutTopBar({ children, logo, title, ...rest }: FocusedLayoutTopBar.Props) {
  return (
    <ElFocusedLayoutTopBar {...rest}>
      <ElFocusedLayoutTopBarContainer>
        {logo && <ElFocusedLayoutTopBarLogoContainer>{logo}</ElFocusedLayoutTopBarLogoContainer>}
        <ElFocusedLayoutTopBarTitleContainer>
          <ElFocusedLayoutTopBarTitle>{title}</ElFocusedLayoutTopBarTitle>
        </ElFocusedLayoutTopBarTitleContainer>
      </ElFocusedLayoutTopBarContainer>
      {children && <ElFocusedLayoutTopBarActions>{children}</ElFocusedLayoutTopBarActions>}
    </ElFocusedLayoutTopBar>
  );
}

FocusedLayoutTopBar.displayName = "FocusedLayout.TopBar";
