import { styled } from '@linaria/react'

export interface ElPrimaryTabsProps {
  'data-overflow': 'scroll' | 'visible'
}

export const ElPrimaryTabs = styled.nav<ElPrimaryTabsProps>`
  border-bottom: var(--border-width-default) solid var(--comp-tab-colour-border-group);
  width: 100%;

  &,
  &[data-overflow='visible'] {
    overflow-x: visible;
  }

  &[data-overflow='scroll'] {
    overflow-x: auto;
  }
`

export const ElPrimaryTabsList = styled.menu`
  position: relative;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: var(--spacing-8);
  list-style: none;

  margin: 0;
  padding: 0;
`

export const ElPrimaryTabsListItem = styled.li`
  display: flex;
  align-items: center;
`
