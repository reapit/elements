import { css } from "@linaria/core";

import { font } from "#src/utils/font";

export const elFormLayoutTitle = css`
  @layer elements.main {
    ${font("xl", "bold")}
    margin: 0;
  }
`;
