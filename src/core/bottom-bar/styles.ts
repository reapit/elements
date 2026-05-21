import { styled } from '@linaria/react'

export const ElBottomBarContainer = styled.div`
  @layer elements.main {
    background: var(--colour-fill-white);
    contain: layout;
  }
`

interface ElBottomBarNavProps {
  'data-state'?: 'extended' | 'retracted'
}

export const ElBottomBarNav = styled.nav<ElBottomBarNavProps>`
  @layer elements.main {
    contain: layout;
    padding: var(--spacing-2);
    border-top: var(--comp-navigation-border-width-bottom_bar) solid var(--comp-navigation-colour-border-bottom_bar);
    background: var(--comp-navigation-colour-fill-bottom_bar);
    width: 100%;

    transition:
      transform 0.3s ease-in-out,
      visibility 0.3s ease-in-out;

    &[data-state='extended'] {
      transform: translateY(0);
      visibility: visible;
    }

    &[data-state='retracted'] {
      transform: translateY(100%);
      visibility: hidden;
    }
  }
`
