import { css } from '@linaria/core'
import { isWidthAtOrAbove } from '#src/utils/breakpoints'
import { styled } from '@linaria/react'
import { TOP_BAR_CONTAINER_NAME } from './constants'

export const ElTopBar = styled.header`
  height: var(--size-14);
  width: 100%;

  container-name: ${TOP_BAR_CONTAINER_NAME};
  container-type: inline-size;

  border-bottom: var(--comp-navigation-border-width-top_bar) solid var(--comp-navigation-colour-border-top_bar);
  background: var(--comp-navigation-colour-fill-top_bar);
`

export const ElTopBarContentContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-areas: 'app-switcher logo main-nav search secondary-nav mobile-nav profile';
  grid-template-columns: min-content min-content 1fr auto auto auto auto;

  padding-block: var(--spacing-2);
  padding-inline: var(--spacing-4) var(--spacing-2);

  @container ${TOP_BAR_CONTAINER_NAME} ${isWidthAtOrAbove('SM')} {
    padding-inline: var(--spacing-4);
  }

  @container ${TOP_BAR_CONTAINER_NAME} ${isWidthAtOrAbove('LG')} {
    padding-inline: var(--spacing-5);
  }
`

export const ElTopBarAppSwitcherContainer = styled.div`
  grid-area: app-switcher;

  display: none;
  padding-inline-end: var(--spacing-4);

  @container ${TOP_BAR_CONTAINER_NAME} ${isWidthAtOrAbove('SM')} {
    display: block;
  }

  @container ${TOP_BAR_CONTAINER_NAME} ${isWidthAtOrAbove('LG')} {
    padding-inline-end: var(--spacing-5);
  }
`

export const ElTopBarLogoContainer = styled.div`
  grid-area: logo;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-block: var(--spacing-2);
  padding-inline: var(--spacing-none) var(--spacing-2);
`

export const ElTopBarAvatarContainer = styled.div`
  grid-area: profile;
  padding-block: var(--spacing-1);

  display: none;

  @container ${TOP_BAR_CONTAINER_NAME} ${isWidthAtOrAbove('MD')} {
    display: flex;
  }
`

export const ElTopBarMainNavContainer = styled.div`
  grid-area: main-nav;
  padding-inline-start: var(--spacing-6);
  padding-block: var(--spacing-1);

  /* Allows individual nav items to be displayed (or not) using container queries */
  container-name: top-bar-main-nav-container;
  container-type: inline-size;

  display: none;

  @container ${TOP_BAR_CONTAINER_NAME} ${isWidthAtOrAbove('LG')} {
    display: block;
  }
`

export const ElTopBarSecondaryNavContainer = styled.div`
  grid-area: secondary-nav;
  padding-right: var(--spacing-2);

  display: none;

  @container ${TOP_BAR_CONTAINER_NAME} ${isWidthAtOrAbove('LG')} {
    display: block;
  }
`

export const ElTopBarSearchContainer = styled.div`
  grid-area: search;

  width: var(--size-12);
  padding-block: var(--spacing-none);
  padding-inline-end: var(--spacing-2);

  @container ${TOP_BAR_CONTAINER_NAME} ${isWidthAtOrAbove('SM')} {
    width: 216px;
    padding-block: var(--spacing-1);
    padding-inline-end: var(--spacing-4);
  }
`

export const ElTopBarMenuContainer = styled.div`
  grid-area: mobile-nav;

  display: block;
  padding-inline-end: 0;

  @container ${TOP_BAR_CONTAINER_NAME} ${isWidthAtOrAbove('MD')} {
    padding-inline-end: var(--spacing-2);
  }

  @container ${TOP_BAR_CONTAINER_NAME} ${isWidthAtOrAbove('LG')} {
    display: none;
  }
`

export const elTopBarMenuPopover = css`
  /* To adjust the menu popover's Y offset so it appears below the top bar instead of directly below the button.
   * The "important" rule is used to override the Menu's auto-anchor yOffset. */
  top: var(--spacing-10) !important;
`
