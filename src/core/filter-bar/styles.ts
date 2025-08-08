import { styled } from '@linaria/react'

// See https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/search
export const ElFilterBar = styled.search`
  display: grid;
  /* NOTE: We only apply a column gap, because we only want a row gap to exist if
   * there are applied filters present. As such, the row gap is handled by the
   * applied filters container, "ElFilterBarAppliedFiltersContainer" */
  column-gap: var(--spacing-4);
  grid-template:
    'left-content right-content' auto
    'applied-filters applied-filters' minmax(0, auto) / 1fr auto;
`

export const ElFilterBarAppliedFiltersContainer = styled.div`
  grid-area: applied-filters;
  margin-block-start: var(--spacing-4);
`

export const ElFilterBarLeftContentContainer = styled.div`
  grid-area: left-content;
`

export const ElFilterBarRightContentContainer = styled.div`
  grid-area: right-content;
`
