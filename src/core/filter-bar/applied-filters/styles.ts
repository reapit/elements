import { styled } from "@linaria/react";

export const ElFilterBarAppliedFilters = styled.div`
  @layer elements.main {
    display: grid;
    align-items: start;
    grid-template: "chips action" auto / 1fr auto;
    width: 100%;
  }
`;

export const ElFilterBarAppliedFiltersChipGroupContainer = styled.div`
  @layer elements.main {
    grid-area: chips;
  }
`;

export const ElFilterBarAppliedFiltersActionContainer = styled.div`
  @layer elements.main {
    grid-area: action;
    margin-inline-start: var(--spacing-3);
  }
`;
