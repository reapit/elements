import { css } from '@linaria/core'

export const elFormLayoutHeader = css`
  @layer elements.main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
    color: var(--colour-text-primary);
  }
`
