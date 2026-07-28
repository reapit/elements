import { css } from "@linaria/core";

export const elFlex = css`
  @layer elements.main {
    display: flex;
  }
`;

export const elFlexItem = css`
  @layer elements.main {
    min-width: 0;
    min-height: 0;
  }
`;
