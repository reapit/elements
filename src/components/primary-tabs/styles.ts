import { styled } from '@linaria/react'

interface ElPrimaryTabsProps {
  'data-overflow'?: 'scroll' | 'visible'
}

export const ElPrimaryTabs = styled.nav<ElPrimaryTabsProps>`
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

  /* NOTE: We use a pseudo-element to draw the bottom border of the menu element, as this
   * provides the simplest and most reliable way to draw a border that can be overlapped by
   * the list items' borders. */
  &::after {
    content: '';
    position: absolute;
    inset-inline: 0;
    inset-block-end: 0;
    width: 100%;
    height: var(--border-width-default);
    background-color: var(--comp-tab-colour-border-group);
    z-index: -1;
  }
`

export const ElPrimaryTabsListItem = styled.li`
  display: flex;
  align-items: center;
`
