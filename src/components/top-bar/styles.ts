import { styled } from '@linaria/react'
import { isBelowWideScreen, isTablet, isBelowDesktop, isWideScreen } from '../../styles/media'
import { ElButtonGroup } from '../button-group'
import { css } from '@linaria/core'
import { ElNavResponsiveAppSwitcherIconWrap } from '../nav'

export const ElTopBarAppSwitcher = styled.a`
  padding-right: var(--spacing-4);

  ${isWideScreen} {
    padding-right: var(--spacing-5);
  }

  // TODO: can be removed once new app-switcher ready
  ${ElNavResponsiveAppSwitcherIconWrap} {
    margin-right: 0;
    padding: var(--spacing-half);
    box-sizing: content-box;
  }
`

export const ElTopBarLogo = styled.a`
  padding-right: var(--spacing-2);
  display: inline-flex;
`

export const ElTopBarProfile = styled.div`
  padding: var(--spacing-1) var(--spacing-none);
`

export const ElTopBarMainNav = styled(ElButtonGroup)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: var(--spacing-6);
  flex-grow: 1;
  container-type: inline-size;
`

export const ElTopBarSecondaryNav = styled(ElButtonGroup)`
  flex-wrap: nowrap;
  padding-right: var(--spacing-2);
`

export const ElTopBar = styled.div`
  display: flex;
  align-items: center;
  height: var(--size-14);
  padding: var(--spacing-2) var(--spacing-5);
  border-bottom: var(--border-default) solid var(--outline-default);
  background: var(--fill-white);

  ${isBelowWideScreen} {
    padding: var(--spacing-2) var(--spacing-4);

    ${ElTopBarLogo} {
      margin-right: auto;
    }

    ${ElTopBarMainNav}, ${ElTopBarSecondaryNav} {
      display: none;
    }
  }

  ${isBelowDesktop} {
    ${ElTopBarProfile} {
      display: none;
    }
  }
`

export const ElTopBarSearch = styled.div`
  padding-right: var(--spacing-2);

  ${isTablet} {
    width: 216px;
    padding: var(--spacing-1) var(--spacing-4) var(--spacing-1) var(--spacing-none);
  }
`

export const ElTopBarMobileNav = styled.div`
  display: inline-block;
  padding-right: var(--spacing-2);

  ${isWideScreen} {
    display: none;
  }
`

export const elTopBarMenuPopover = css`
  // To adjust the menu popover's Y offset so it appears below the top bar instead of directly below the button.
  // The "important" rule is used to override the Menu's auto-anchor yOffset.
  top: var(--spacing-10) !important;
`
