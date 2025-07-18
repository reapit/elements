import { styled } from '@linaria/react'

interface ElSecondaryTabsProps {
  'data-overflow'?: 'scroll' | 'visible'
}

export const ElSecondaryTabs = styled.nav<ElSecondaryTabsProps>`
  &,
  &[data-overflow='visible'] {
    overflow-x: visible;
  }

  &[data-overflow='scroll'] {
    overflow-x: auto;
  }
`

export const ElSecondaryTabsList = styled.menu`
  position: relative;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  list-style: none;

  margin: 0;
  padding: 0;
`

export const ElSecondaryTabsListItem = styled.li`
  display: flex;
  align-items: center;
`

export const ElSecondaryTabsListItemSeparator = styled.span`
  box-sizing: content-box;

  background-color: var(--comp-divider-colour-border-solid);
  margin-inline: var(--spacing-3);
  height: var(--size-4);
  width: var(--size-px);
  max-width: var(--size-px);

  ${ElSecondaryTabsListItem}:last-child & {
    display: none;
  }
`
