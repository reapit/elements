import { styled } from "@linaria/react";

import { isWidthAtOrAbove } from "#src/utils/breakpoints/conditions";

export const ElFilterBarRightContent = styled.div`
  @layer elements.main {
    display: flex;
    align-items: center;
    justify-content: start;
    flex-flow: row nowrap;
    gap: var(--spacing-3);

    @media screen and (${isWidthAtOrAbove("SM")}) {
      justify-content: end;
    }
  }
`;
