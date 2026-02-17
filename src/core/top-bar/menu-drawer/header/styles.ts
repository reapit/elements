import { styled } from '@linaria/react'

export const ElTopBarMenuDrawerHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);

  background: var(--comp-navigation-colour-fill-top_bar, var(--colour-fill-white));
  border-block-end: var(--border-width-default) solid var(--comp-navigation-colour-border-mobile_nav);

  padding-block: var(--spacing-2);
  padding-inline: var(--spacing-4);
`
