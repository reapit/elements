import { styled } from '@linaria/react'
import { isWidthAtOrAbove, isWidthBelow } from '#src/utils/breakpoints'

interface ElBreadcrumbsProps {
  'data-overflow'?: 'scroll' | 'truncate'
}

export const ElBreadcrumbs = styled.nav<ElBreadcrumbsProps>`
  width: 100%;

  /* NOTE: Media and container queries come before data-overflow attribute styles to allow
   * the latter to take precedence */
  @media screen and ${isWidthBelow('SM')} {
    /* NOTE: This is generally considered bad practice */
    scrollbar-width: none;
    overflow-x: auto;
  }

  @container ${isWidthBelow('SM')} {
    scrollbar-width: none;
    overflow-x: auto;
  }

  /* NOTE: This container query will override the default media query behaviour above if there's
   * an ancestor is a container. If there's no ancestral container, the media query will behave
   * as defined above. */
  @container ${isWidthAtOrAbove('SM')} {
    scrollbar-width: initial;
    overflow-x: initial;
  }

  &[data-overflow='scroll'] {
    scrollbar-width: none;
    overflow-x: auto;
  }
`

export const ElBreadcrumbsList = styled.ul`
  display: inline-grid;
  grid-auto-flow: column;
  /* NOTE: This helps ensure each item has an equal share of the available space, especially when truncation occurs */
  grid-template-columns: repeat(auto-fill, minmax(0, auto));
  align-items: center;

  list-style: none;

  margin: 0;
  padding: 0;

  width: 100%;

  /* NOTE: Media and container queries come before data-overflow attribute styles to allow
   * the latter to take precedence */
  @media screen and ${isWidthBelow('SM')} {
    width: max-content;
  }

  @container ${isWidthBelow('SM')} {
    width: max-content;
  }

  /* NOTE: This container query will override the default media query behaviour above if there's
   * an ancestor is a container. If there's no ancestral container, the media query will behave
   * as defined above. */
  @container ${isWidthAtOrAbove('SM')} {
    width: 100%;
  }

  [data-overflow='truncate'] > & {
    width: 100%;
  }

  [data-overflow='scroll'] > & {
    width: max-content;
  }
`
