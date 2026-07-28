import { styled } from "@linaria/react";

import { isWidthAtOrAbove } from "#src/utils/breakpoints";

import { TOP_BAR_CONTAINER_NAME } from "../../constants";
import { ElTopBarMenuDrawerMenuList } from "../menu-list/styles";

export const ElTopBarMenuDrawerSecondaryNav = styled(ElTopBarMenuDrawerMenuList)`
  @layer elements.main {
    /* Note: secondary nav is displayed by default. If the menu drawer is correctly placed as a descendant
     * of the top bar, we'll be able to hide this section on LG breakpoints and up to mirror the behaviour
     * of the ElTopBarSecondaryNavContainer */
    @container ${TOP_BAR_CONTAINER_NAME} ${isWidthAtOrAbove("LG")} {
      display: none;
    }
  }
`;
