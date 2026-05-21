import { styled } from '@linaria/react'

export const ElBrandLogo = styled.a`
  @layer elements.main {
    display: inline-flex;
    align-items: center;

    &:focus-visible {
      outline: var(--border-width-double) solid var(--colour-border-focus);
      outline-offset: var(--border-width-default);
    }
  }
`
