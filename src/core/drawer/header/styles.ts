import { DRAWER_WIDTH_MD_2XL } from '../constants'
import { font } from '../../text'
import { styled } from '@linaria/react'

export const ElDrawerHeader = styled.div`
  background: var(--fill-white);

  /* NOTE: We use a "private" CSS variable to couple the negative margin of the tabs container to this border width */
  --__drawer-header-border-width: var(--border-default);

  border-bottom: var(--__drawer-header-border-width) solid var(--outline-default);

  display: grid;
  grid-area: header;
  grid-template:
    'main' minmax(0, auto)
    'tabs' minmax(0, auto) / 100%;
`

export const ElDrawerHeaderContentContainer = styled.div`
  display: grid;
  grid-area: main;
  grid-template:
    'overline close' minmax(0, auto)
    'title close' min-content
    'supplementary-info supplementary-info' min-content / auto min-content;
  align-items: center;

  /* XS-SM container size */
  padding-block: var(--spacing-3);
  padding-inline: var(--spacing-5) var(--spacing-3);

  @container (width >= ${DRAWER_WIDTH_MD_2XL}) {
    padding-block: var(--spacing-5);
    padding-inline: var(--spacing-8) var(--spacing-5);
  }
`

export const ElDrawerHeaderTabsContainer = styled.div`
  grid-area: tabs;

  width: 100%;

  /* NOTE: This negative margin is used to make the tabs border overlap the drawer header's border. */
  margin-block-end: calc(0px - var(--__drawer-header-border-width));

  /* XS-SM container size */
  padding-inline-start: var(--spacing-5);

  @container (width >= ${DRAWER_WIDTH_MD_2XL}) {
    padding-inline-start: var(--spacing-8);
  }
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
