import { styled } from '@linaria/react'
import { isMobile } from '#src/styles/media'

interface ElBreadcrumbsProps {
  'data-overflow'?: 'scroll' | 'truncate'
}

export const ElBreadcrumbs = styled.nav<ElBreadcrumbsProps>`
  width: 100%;

  ${isMobile} {
    /* NOTE: This is generally considered bad practice */
    scrollbar-width: none;
    overflow-x: auto;
  }

  &[data-overflow='scroll'] {
    scrollbar-width: none;
    overflow-x: auto;
  }
`

export const ElBreadcrumbsList = styled.ul`
  all: unset;
  box-sizing: border-box;

  display: inline-grid;
  grid-auto-flow: column;
  /* NOTE: This helps ensure each item has an equal share of the available space, especially when truncation occurs */
  grid-template-columns: repeat(auto-fill, minmax(0, auto));
  align-items: center;

  width: 100%;

  ${isMobile} {
    width: max-content;
  }

  [data-overflow='truncate'] > & {
    width: 100%;
  }

  [data-overflow='scroll'] > & {
    width: max-content;
  }
`
