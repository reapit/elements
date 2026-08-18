import { css } from "@linaria/core";

export const elFormLayoutSectionHeader = css`
  @layer elements.main {
    display: flex;
    flex-flow: column nowrap;
    gap: var(--spacing-1);
    color: var(--colour-text-primary);
  }
`;
