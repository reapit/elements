import { isWidthAtOrAbove, isWidthBelow } from '#src/utils/breakpoints'
import { styled } from '@linaria/react'

export const ElBottomBarContainer = styled.div`
  position: sticky;
  bottom: 0;

  width: 100%;
  contain: layout;
  container-type: inline-size;

  display: block;

  @media screen and ${isWidthAtOrAbove('SM')} {
    display: none;
  }

  @container ${isWidthAtOrAbove('SM')} {
    display: none;
  }

  /* NOTE: This container query will override the default media query behaviour above if there's
   * an ancestor is a container. If there's no ancestral container, the media query will behave
   * as defined above. */
  @container ${isWidthBelow('SM')} {
    display: block;
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
