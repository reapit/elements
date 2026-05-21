import { styled } from '@linaria/react'

export const ElFocusedLayoutBottomBar = styled.footer`
  @layer elements.main {
    position: sticky;
    bottom: 0;
    z-index: var(--z-index-sticky);

    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-4);

    padding: var(--spacing-3) var(--spacing-5);

    background: var(--comp-focused_overlay-colour-fill-bottom_bar);
    border-top: var(--comp-focused_overlay-border-width-bottom_bar) solid
      var(--comp-focused_overlay-colour-border-bottom_bar);
  }
`
