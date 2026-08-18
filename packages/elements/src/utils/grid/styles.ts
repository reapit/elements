import { css } from "@linaria/core";

export const elGrid = css`
  @layer elements.main {
    display: grid;
  }
`;

export const elGridItem = css`
  @layer elements.main {
    min-width: 0;
  }
`;
