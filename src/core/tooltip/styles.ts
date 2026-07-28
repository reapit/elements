import { css } from "@linaria/core";

import { font } from "#src/utils/font";

export const elTooltip = css`
  @layer elements.main {
    border-radius: var(--comp-tooltip-border-radius);
    background: var(--comp-tooltip-colour-fill);
    color: var(--comp-tooltip-colour-text);

    padding: var(--spacing-2) var(--spacing-3);
    width: max-content;

    ${font("xs", "regular")}
    text-align: left;
  }
`;
