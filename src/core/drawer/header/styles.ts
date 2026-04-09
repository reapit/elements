import { DRAWER_CSS_CONTAINER_NAME, DRAWER_WIDTH_SM_2XL } from '../constants'
import { ElDrawerFooter } from '../footer/styles'
import { font } from '#src/utils/font'
import { styled } from '@linaria/react'

export const DRAWER_HEADER_CSS_CONTAINER_NAME = 'drawer-header'

export const ElDrawerHeader = styled.header`
  /* The header content container has a bottom border by default. */
  --drawer-header-content-container-border-block-end: var(--border-default) solid
    var(--colour-border-neutral-light_default);

  position: sticky;
  inset-block-start: 0;
  z-index: var(--z-index-sticky);

  background: var(--colour-fill-white);

  container-type: scroll-state;
  container-name: ${DRAWER_HEADER_CSS_CONTAINER_NAME};

  /* When the drawer has a footer, the header is not sticky and has no border. */
  &:has(~ ${ElDrawerFooter}) {
    position: static;
    --drawer-header-content-container-border-block-end: none;
  }
`

export const ElDrawerHeaderTabsContainer = styled.div`
  grid-area: tabs;

  width: 100%;

  /* This negative margin is used to make the tabs border overlap the drawer header's border. */
  margin-block-end: calc(0px - var(--border-default));

  padding-inline-start: var(--spacing-5);

  @container ${DRAWER_CSS_CONTAINER_NAME} (width >= ${DRAWER_WIDTH_SM_2XL}) {
    padding-inline-start: var(--spacing-8);
  }
`

export const ElDrawerHeaderContentContainer = styled.div`
  display: grid;
  grid-area: header;
  grid-template:
    'main' minmax(0, auto)
    'tabs' minmax(0, auto) / 100%;

  border-block-end: var(--drawer-header-content-container-border-block-end);

  /* When there are no tabs, we remove the border for sticky headers when they are not stuck to the top.
   * The header is only sticky when there is no footer. */
  &:not(:has(${ElDrawerHeaderTabsContainer})) {
    @supports (container-type: scroll-state) {
      @container ${DRAWER_HEADER_CSS_CONTAINER_NAME} not scroll-state(stuck: top) {
        --drawer-header-content-container-border-block-end: none;
      }
    }
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

  @container ${DRAWER_CSS_CONTAINER_NAME} (width >= ${DRAWER_WIDTH_SM_2XL}) {
    padding-block: var(--spacing-5);
    padding-inline: var(--spacing-8) var(--spacing-5);
  }
`

export const ElDrawerHeaderAction = styled.div`
  grid-area: close;
  align-self: start;
  color: var(--colour-text-secondary);
`

export const ElDrawerHeaderOverline = styled.div`
  grid-area: overline;

  color: var(--colour-text-secondary);
  padding-block-end: var(--spacing-1);

  ${font('xs', 'regular')}
`

export const ElDrawerHeaderTitle = styled.h2`
  color: var(--colour-text-primary);
  grid-area: title;

  ${font('xl', 'bold')}

  margin: 0;
  padding: 0;
`

export const ElDrawerHeaderSupplementaryInfo = styled.div`
  grid-area: supplementary-info;

  color: var(--colour-text-secondary);
  padding-block-start: var(--spacing-1);

  ${font('base', 'regular')}
`
