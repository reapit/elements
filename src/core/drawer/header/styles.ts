import { DRAWER_CSS_CONTAINER_NAME, DRAWER_WIDTH_MD_2XL } from '../constants'
import { ElDrawerFooter } from '../footer'
import { font } from '../../text'
import { styled } from '@linaria/react'

export const DRAWER_HEADER_CSS_CONTAINER_NAME = 'drawer-header'

export const ElDrawerHeader = styled.div`
  position: sticky;
  inset-block-start: 0;

  background: var(--fill-white);

  container-type: scroll-state;
  container-name: ${DRAWER_HEADER_CSS_CONTAINER_NAME};

  /* When the drawer has a footer, the header should NOT be sticky. */
  &:has(~ ${ElDrawerFooter}) {
    position: static;
  }
`

export const ElDrawerHeaderTabsContainer = styled.div`
  grid-area: tabs;

  width: 100%;

  /* This negative margin is used to make the tabs border overlap the drawer header's border. */
  margin-block-end: calc(0px - var(--border-default));

  padding-inline-start: var(--spacing-5);

  @container ${DRAWER_CSS_CONTAINER_NAME} (width >= ${DRAWER_WIDTH_MD_2XL}) {
    padding-inline-start: var(--spacing-8);
  }
`

export const ElDrawerHeaderContentContainer = styled.div`
  display: grid;
  grid-area: header;
  grid-template:
    'main' minmax(0, auto)
    'tabs' minmax(0, auto) / 100%;

  /* If the browser does not support scroll-state queries, we always show a border when there's no footer. */
  @supports not (container-type: scroll-state) {
    &:not(:has(~ ${ElDrawerFooter})) {
      border-block-end: var(--border-default) solid var(--outline-default);
    }
  }

  /* If the browser supports scroll-state queries, we only show a border when the header is stuck to the top of
   * the drawer. This only happens when the header is sticky positioned, which only occurs when there's no footer. */
  @supports (container-type: scroll-state) {
    @container ${DRAWER_HEADER_CSS_CONTAINER_NAME} scroll-state(stuck: top) {
      border-block-end: var(--border-default) solid var(--outline-default);
    }
  }

  /* When the drawer has tabs, we need to add a border to this container (at all times) because the tabs own
   * border will not stretch to the left edge of the drawer. */
  &:has(> ${ElDrawerHeaderTabsContainer}) {
    border-block-end: var(--border-default) solid var(--outline-default);
  }
`

export const ElDrawerHeaderTitleContainer = styled.div`
  display: grid;
  grid-area: main;
  grid-template:
    'overline close' minmax(0, auto)
    /* We need to use minmax for the title row because min-content and auto will consider the close button's size,
     * which will result in a larger track height when the close button is present than when it is not. */
    'title close' minmax(0, auto)
    'supplementary-info supplementary-info' minmax(0, auto) / auto min-content;
  align-items: center;

  padding-block: var(--spacing-3);
  padding-inline: var(--spacing-5) var(--spacing-3);

  @container ${DRAWER_CSS_CONTAINER_NAME} (width >= ${DRAWER_WIDTH_MD_2XL}) {
    padding-block: var(--spacing-5);
    padding-inline: var(--spacing-8) var(--spacing-5);
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

  ${font('xl', 'bold')}

  margin: 0;
  padding: 0;
`

export const ElDrawerHeaderSupplementaryInfo = styled.div`
  grid-area: supplementary-info;

  color: var(--text-secondary);
  padding-block-start: var(--spacing-1);

  ${font('base', 'regular')}
`
