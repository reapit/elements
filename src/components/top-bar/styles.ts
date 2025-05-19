import { styled } from '@linaria/react'
import { isTablet, isDesktop, isWideScreen } from '../../styles/media'
import { ElButtonGroup } from '../button-group'
import { css } from '@linaria/core'

export const ElTopBarAppSwitcherContainer = styled.div`
  grid-area: app-switcher;

  display: none;
  padding-inline-end: var(--spacing-4);
  ${isTablet} {
    display: block;
  }
  ${isWideScreen} {
    padding-inline-end: var(--spacing-5);
  }
`

export const ElTopBarLogoContainer = styled.div`
  grid-area: logo;
  display: flex;
  align-items: center;
  padding-block: var(--spacing-2);
  padding-inline: 0 var(--spacing-2);
`

export const ElTopBarAvatarContainer = styled.div`
  grid-area: profile;
  padding-block: var(--spacing-1);

  display: none;
  ${isDesktop} {
    display: flex;
  }
`

export const ElTopBarMainNavContainer = styled(ElButtonGroup)`
  grid-area: main-nav;
  padding-inline-start: var(--spacing-6);
  padding-block: var(--spacing-1);
  width: 100%;

  display: none;
  ${isWideScreen} {
    display: flex;
  }

  /* Required to enable individual nav items to be displayed (or not) using container queries */
  container-type: inline-size;
`

export const ElTopBarSecondaryNavContainer = styled(ElButtonGroup)`
  grid-area: secondary-nav;
  flex-wrap: nowrap;
  padding-right: var(--spacing-2);

  display: none;
  ${isWideScreen} {
    display: block;
  }
`

export const ElTopBar = styled.nav`
  display: grid;
  align-items: center;
  grid-template-areas: 'app-switcher logo main-nav search secondary-nav mobile-nav profile';
  grid-template-columns: min-content min-content 1fr auto auto auto auto;
  height: var(--size-14);

  padding-block: var(--spacing-2);
  padding-inline: var(--spacing-4) var(--spacing-2);
  ${isTablet} {
    padding-inline: var(--spacing-4);
  }
  ${isWideScreen} {
    padding-inline: var(--spacing-5);
  }

  border-bottom: var(--comp-navigation-border-width-top_bar) solid var(--comp-navigation-colour-border-top_bar);
  background: var(--comp-navigation-colour-fill-top_bar);
`

export const ElTopBarSearchContainer = styled.div`
  grid-area: search;

  width: var(--size-12);
  padding-inline: 0 var(--spacing-2);
  ${isTablet} {
    width: var(--size-52);
    padding-block: var(--spacing-1);
    padding-inline-end: var(--spacing-4);
  }
`

export const ElTopBarMenuContainer = styled.div`
  grid-area: mobile-nav;

  display: block;
  padding-inline-end: 0;
  ${isDesktop} {
    padding-inline-end: var(--spacing-2);
  }
  ${isWideScreen} {
    display: none;
  }
`

export const elTopBarMenuPopover = css`
  // To adjust the menu popover's Y offset so it appears below the top bar instead of directly below the button.
  // The "important" rule is used to override the Menu's auto-anchor yOffset.
  top: var(--spacing-10) !important;
`
