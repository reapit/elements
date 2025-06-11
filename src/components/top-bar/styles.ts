import { styled } from '@linaria/react'
import { isTablet, isDesktop, isWideScreen } from '../../styles/media'
import { ElButtonGroup } from '../button-group'
import { css } from '@linaria/core'

export const ElTopBar = styled.header`
  display: grid;
  align-items: center;
  grid-template-areas: 'app-switcher logo main-nav search secondary-nav mobile-nav profile';
  grid-template-columns: min-content min-content 1fr auto auto auto auto;
  height: var(--size-14);
  width: 100%;

  container-name: top-bar;
  container-type: inline-size;

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

export const ElTopBarAppSwitcherContainer = styled.div`
  grid-area: app-switcher;

  display: none;
  padding-inline-end: var(--spacing-4);
  @supports not (container: inline-size) {
    ${isTablet} {
      display: block;
    }
    ${isWideScreen} {
      padding-inline-end: var(--spacing-5);
    }
  }

  @supports (container: inline-size) {
    /* isTablet equivalent inline size; i.e. 768px - 2 * var(--spacing-4) */
    @container top-bar (width >= 736px) {
      display: block;
    }
    /* isWideScreen equivalent inline size; i.e. 1440px - 2 * var(--spacing-5) */
    @container top-bar (width >= 1400px) {
      padding-inline-end: var(--spacing-5);
    }
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

  @supports not (container: inline-size) {
    ${isDesktop} {
      display: flex;
    }
  }

  @supports (container: inline-size) {
    /* isDesktop equivalent inline size; i.e. 1024px - 2 * var(--spacing-4) */
    @container top-bar (width >= 992px) {
      display: flex;
    }
  }
`

export const ElTopBarMainNavContainer = styled.div`
  grid-area: main-nav;

  display: none;

  @supports not (container: inline-size) {
    ${isWideScreen} {
      display: block;
    }
  }

  @supports (container: inline-size) {
    /* isWideScreen equivalent inline size; i.e. 1440px - 2 * var(--spacing-5) */
    @container top-bar (width >= 1400px) {
      display: block;
    }
  }
`

export const ElTopBarSecondaryNavContainer = styled(ElButtonGroup)`
  grid-area: secondary-nav;
  flex-wrap: nowrap;
  padding-right: var(--spacing-2);

  display: none;

  @supports not (container: inline-size) {
    ${isWideScreen} {
      display: flex;
    }
  }

  @supports (container: inline-size) {
    /* isWideScreen equivalent inline size; i.e. 1440px - 2 * var(--spacing-5) */
    @container top-bar (width >= 1400px) {
      display: flex;
    }
  }
`

export const ElTopBarSearchContainer = styled.div`
  grid-area: search;

  width: var(--size-12);
  padding-block: var(--spacing-none);
  padding-inline-end: var(--spacing-2);

  @supports not (container: inline-size) {
    ${isTablet} {
      width: 216px;
      padding-block: var(--spacing-1);
      padding-inline-end: var(--spacing-4);
    }
  }

  @supports (container: inline-size) {
    /* isTablet equivalent inline size; i.e. 768px - 2 * var(--spacing-4) */
    @container top-bar (width >= 736px) {
      width: 216px;
      padding-block: var(--spacing-1);
      padding-inline-end: var(--spacing-4);
    }
  }
`

export const ElTopBarMenuContainer = styled.div`
  grid-area: mobile-nav;

  display: block;
  padding-inline-end: 0;

  @supports not (container: inline-size) {
    ${isDesktop} {
      padding-inline-end: var(--spacing-2);
    }
    ${isWideScreen} {
      display: none;
    }
  }

  @supports (container: inline-size) {
    /* isDesktop equivalent inline size; i.e. 1024px - 2 * var(--spacing-4) */
    @container top-bar (width >= 992px) {
      padding-inline-end: var(--spacing-2);
    }
    /* isWideScreen equivalent inline size; i.e. 1440px - 2 * var(--spacing-5) */
    @container top-bar (width >= 1400px) {
      display: none;
    }
  }
`

export const elTopBarMenuPopover = css`
  // To adjust the menu popover's Y offset so it appears below the top bar instead of directly below the button.
  // The "important" rule is used to override the Menu's auto-anchor yOffset.
  top: var(--spacing-10) !important;
`
