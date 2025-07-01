import { isTablet } from '#src/styles/media'
import { styled } from '@linaria/react'

export const ElBottomBarContainer = styled.div`
  position: sticky;
  bottom: 0;

  width: 100%;
  contain: layout;
  container-type: inline-size;

  display: block;
  @supports not (container-type: inline-size) {
    ${isTablet} {
      display: none;
    }
  }
  @supports (container-type: inline-size) {
    /* NOTE: This is equivalent to the SM breakpoint */
    @container (width >= 768px) {
      display: none;
    }
  }
`

export const ElBottomBarNav = styled.nav`
  padding: var(--spacing-2);
  border-top: var(--comp-navigation-border-width-bottom_bar) solid var(--comp-navigation-colour-border-bottom_bar);
  background: var(--comp-navigation-colour-fill-bottom_bar);
  width: 100%;

  transition:
    transform 0.3s ease-in-out,
    visibility 0.3s ease-in-out;

  &[data-is-open='true'] {
    transform: translateY(0);
    visibility: visible;
  }

  &[data-is-open='false'] {
    transform: translateY(100%);
    visibility: hidden;
  }
`
