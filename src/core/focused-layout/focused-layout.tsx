import type { HTMLAttributes, ReactNode } from "react";

import { FocusedLayoutBottomBar } from "./bottom-bar";
import { FocusedLayoutContent } from "./content";
import { FocusedLayoutContext, useFocusedLayoutContext } from "./context";
import { FocusedLayoutProductLogo } from "./product-logo";
import { ElFocusedLayout } from "./styles";
import { FocusedLayoutTopBar } from "./top-bar";

export namespace FocusedLayout {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * The background style of the focused layout.
     * - `light`: White background, suitable for simple forms
     * - `dark`: Light grey background, suitable for complex content with cards
     */
    background?: "light" | "dark";
    /** A top bar, content and optional bottom bar */
    children?: ReactNode;
  }

  export interface TopBarProps extends FocusedLayoutTopBar.Props {}
  export type ContentProps = FocusedLayoutContent.Props | FocusedLayoutContent.DeprecatedProps;
  export interface BottomBarProps extends FocusedLayoutBottomBar.Props {}
  export interface ProductLogoProps extends FocusedLayoutProductLogo.Props {}
}

/**
 * A full-screen layout component for focused user experiences. Provides a structured layout with a
 * top bar (logo, title, actions), content area, and optional bottom bar for actions.
 *
 * Use the compound components to build the layout:
 * - `FocusedLayout.TopBar` - Contains logo, title, and optional action buttons
 * - `FocusedLayout.Content` - The main content area
 * - `FocusedLayout.BottomBar` - Sticky bottom bar for primary actions
 * - `FocusedLayout.ProductLogo` - Product logo icon for use in the top bar
 */
export function FocusedLayout({ background = "light", children, ...rest }: FocusedLayout.Props) {
  return (
    <ElFocusedLayout {...rest} data-background={background}>
      <FocusedLayoutContext.Provider value={{ background }}>
        {children}
      </FocusedLayoutContext.Provider>
    </ElFocusedLayout>
  );
}

FocusedLayout.TopBar = FocusedLayoutTopBar;
FocusedLayout.Content = FocusedLayoutContent;
FocusedLayout.BottomBar = FocusedLayoutBottomBar;
FocusedLayout.ProductLogo = FocusedLayoutProductLogo;

FocusedLayout.Context = FocusedLayoutContext;
FocusedLayout.useContext = useFocusedLayoutContext;
