import { font } from '../../text'
import { DRAWER_WIDTH_MD_2XL } from '../constants'
import { styled } from '@linaria/react'

export const ElDrawerHeader = styled.div`
  background: var(--fill-white);
  border-bottom: var(--border-default) solid var(--outline-default);
  display: grid;
  grid-area: header;
  grid-template-areas: 'main' 'tabs';
  grid-template-columns: 1fr;
  grid-template-rows: minmax(0, auto);

  /* XS-SM container size */
  padding-inline: var(--spacing-5) var(--spacing-3);

  @container (width >= ${DRAWER_WIDTH_MD_2XL}) {
    padding-inline: var(--spacing-8) var(--spacing-5);
  }
`

export const ElDrawerHeaderContentContainer = styled.div`
  display: grid;
  grid-area: main;
  grid-template-areas: 'overline close' 'title close' 'supplementary-info supplementary-info';
  grid-template-columns: auto min-content;
  grid-template-rows: minmax(0, auto) min-content min-content;
  align-items: center;

  /* XS-SM container size */
  padding-block: var(--spacing-3);

  @container (width >= ${DRAWER_WIDTH_MD_2XL}) {
    padding-block: var(--spacing-5);
  }
`

export const ElDrawerHeaderTabsContainer = styled.div`
  grid-area: tabs;
`

export const ElDrawerHeaderAction = styled.div`
  grid-area: close;
  align-self: start;
  color: var(--text-secondary);
`

export const ElDrawerHeaderOverline = styled.div`
  grid-area: overline;

  color: var(--text-secondary);
  padding-block-end: var(--spacing-1);

  ${font('xs', 'regular')}
`

export const ElDrawerHeaderTitle = styled.h2`
  color: var(--text-primary);
  grid-area: title;

  ${font('lg', 'bold')}
`

export const ElDrawerHeaderSupplementaryInfo = styled.div`
  grid-area: supplementary-info;

  color: var(--text-secondary);
  padding-block-start: var(--spacing-1);

  ${font('base', 'regular')}
`
