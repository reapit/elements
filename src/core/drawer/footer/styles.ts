import { styled } from "@linaria/react";

import { DRAWER_CSS_CONTAINER_NAME, DRAWER_WIDTH_SM_2XL } from "../constants";

export const ElDrawerFooter = styled.footer`
  @layer elements.main {
    grid-area: footer;

    position: sticky;
    inset-block-end: 0;

    display: inline-grid;
    grid-auto-flow: column;
    gap: var(--spacing-2);
    align-items: center;
    justify-content: end;

    width: 100%;

    background: var(--colour-fill-white);
    border-block-start: var(--border-width-default, 1px) solid
      var(--colour-border-neutral-light_default);

    grid-auto-columns: 1fr;
    padding: var(--spacing-3) var(--spacing-6);

    @container ${DRAWER_CSS_CONTAINER_NAME} (width >= ${DRAWER_WIDTH_SM_2XL}) {
      padding: var(--spacing-3) var(--spacing-8);
      grid-auto-columns: auto;
    }
  }
`;
