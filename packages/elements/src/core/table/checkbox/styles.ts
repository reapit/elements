import { css } from "@linaria/core";

export const elTableCellCheckbox = css`
  @layer elements.main {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    width: 100%;
    min-width: var(--size-10);
    padding: var(--spacing-2);

    /* NOTE: This ensures the checkbox is layered above the table row's primary action */
    z-index: var(--z-index-elevated);
  }
`;
