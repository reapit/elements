import { styled } from '@linaria/react'

export const ElDialogFooter = styled.footer`
  @layer elements.main {
    grid-area: footer;

    position: sticky;
    inset-block-end: 0;
    z-index: var(--z-index-sticky);

    background: var(--colour-fill-white);
    border-block-start: var(--border-width-default, 1px) solid var(--colour-border-neutral-light_default);

    width: 100%;

    display: inline-grid;
    grid-auto-flow: column;
    gap: var(--spacing-2);
    align-items: center;
    justify-content: end;

    padding: var(--spacing-5) var(--spacing-6);
    grid-auto-columns: auto;

    [data-size='full-screen'] & {
      padding: var(--spacing-3) var(--spacing-5);
      grid-auto-columns: 1fr;
    }
  }
`
