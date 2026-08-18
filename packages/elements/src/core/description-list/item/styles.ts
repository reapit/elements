import { css } from "@linaria/core";

import { font } from "#src/utils/font";

export const elDescriptionListItem = css`
  @layer elements.main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);

    &,
    &[data-size="base"] {
      ${font("base", "regular")}
    }

    &[data-size="sm"] {
      ${font("sm", "regular")}
    }

    &[data-layout="inline"] {
      display: inline-flex;
      flex-direction: row;
      gap: var(--spacing-3);
    }

    &[data-layout="tabular"] {
      display: grid;
      gap: inherit;
      grid-column: 1 / -1;
      grid: subgrid / subgrid;
    }
  }
`;

export const elDescriptionListItemLabel = css`
  @layer elements.main {
    color: var(--colour-text-secondary);
    white-space: pre-wrap;
    padding: 0;
    margin: 0;

    &,
    [data-size="base"] > & {
      ${font("sm", "regular")}
    }

    [data-size="sm"] > & {
      ${font("xs", "regular")}
    }

    [data-layout="tabular"] > & {
      grid-column: 1;
    }

    [data-layout="inline"] > &,
    [data-layout="tabular"] > & {
      font: inherit;
      letter-spacing: inherit;
    }
  }
`;

export const elDescriptionListItemDescription = css`
  @layer elements.main {
    color: var(--colour-text-primary);
    padding: 0;
    margin: 0;

    font: inherit;
    letter-spacing: inherit;

    [data-layout="tabular"] > & {
      grid-column: 2 / -1;
    }
  }
`;
