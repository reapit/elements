import { styled } from "@linaria/react";

import { isWidthAtOrAbove, isWidthBelow } from "#src/utils/breakpoints";

export const ElPageLayoutBottomBarRegion = styled.div`
  @layer elements.main {
    grid-area: bottom-bar;
    container-type: inline-size;

    position: sticky;
    bottom: 0;

    @media screen and ${isWidthAtOrAbove("SM")} {
      display: none;
    }

    @container ${isWidthAtOrAbove("SM")} {
      display: none;
    }

    /* NOTE: This container query will override the default media query behaviour above if there's
       * an ancestor is a container. If there's no ancestral container, the media query will behave
       * as defined above. */
    @container ${isWidthBelow("SM")} {
      display: block;
    }
  }
`;
