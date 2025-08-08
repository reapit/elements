import { styled } from '@linaria/react'

export const ElFilterBarAppliedFilters = styled.div`
  display: grid;
  align-items: center;
  grid-template: 'chips action' auto / 1fr auto;
  width: 100%;
`

export const ElFilterBarAppliedFiltersChipGroupContainer = styled.div`
  grid-area: chips;
`

export const ElFilterBarAppliedFiltersActionContainer = styled.div`
  grid-area: action;
  margin-inline-start: var(--spacing-3);
`
