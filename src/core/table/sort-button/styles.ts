import { css } from "@linaria/core";

import { font } from "#src/utils/font";

export const elTableCellSortButton = css`
  @layer elements.main {
    display: inline-grid;
    grid-template-columns: minmax(auto, min-content) min-content;
    grid-template-rows: subgrid;
    align-items: center;
    justify-content: var(--__table-column-justification);
    gap: var(--spacing-1);
    width: 100%;

    border: none;
    border-radius: var(--border-radius-m);
    padding: var(--spacing-2);

    background: transparent;
    color: var(--colour-text-secondary);

    cursor: pointer;

    ${font("2xs", "bold")}
    text-transform: uppercase;

    &:focus-visible {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }

    &:hover {
      background: var(--colour-fill-neutral-lightest);
    }
  }
`;

export const elTableCellSortButtonIcon = css`
  @layer elements.main {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: var(--icon_size-sm);
    height: var(--icon_size-sm);

    color: var(--colour-icon-disabled);

    [value="ascending"] & {
      color: var(--colour-icon-secondary);
      transform: rotate(180deg);
    }

    [value="descending"] & {
      color: var(--colour-icon-secondary);
    }
  }
`;
