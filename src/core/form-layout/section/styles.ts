import { css } from '@linaria/core'

export const elFormLayoutSection = css`
  @layer elements.main {
    display: flex;
    flex-flow: column nowrap;
    gap: var(--spacing-6);
    width: 100%;
  }
`
