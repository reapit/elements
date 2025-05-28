import { styled } from '@linaria/react'

interface ElSideBarProps {
  'data-state': 'collapsed' | 'expanded'
}

export const ElSideBar = styled.nav<ElSideBarProps>`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  gap: var(--spacing-3);
  height: 100%;
  width: 100%;

  overflow: auto;

  /* This scroll padding helps ensure content (like menu items) are not cut off when scrolling.
   * - The block-start padding (i.e. top) matches the top padding of the side bar body
   * - The block-end padding (i.e. bottom) matches the height of the side bar footer */
  scroll-padding-block-start: var(--spacing-3);
  scroll-padding-block-end: var(--spacing-16);

  border-right: 1px solid var(--colour-border-light_default);
  background: var(--comp-navigation-colour-fill-sidebar-default);

  &[data-state='collapsed'] {
    max-width: var(--size-16);
  }

  &[data-state='expanded'] {
    min-width: var(--size-48);
    max-width: var(--size-64);
  }
`

export const ElSideBarBody = styled.div`
  width: 100%;
  padding-block-start: var(--spacing-3);
  padding-inline: var(--spacing-3);

  background: var(--comp-navigation-colour-fill-sidebar-default);
`

export const ElSideBarFooter = styled.div`
  position: sticky;
  bottom: 0;
  padding-block-end: var(--spacing-3);
  padding-inline: var(--spacing-3);
  width: 100%;

  background: var(--comp-navigation-colour-fill-sidebar-default);
`
