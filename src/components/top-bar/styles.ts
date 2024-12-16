import { styled } from '@linaria/react'
import { isBelowWideScreen, isTablet, isBelowDesktop, isWideScreen } from '../../styles/media'
import { ElButtonGroup } from '../button-group'
import { css } from '@linaria/core'

export const ElTopBarLogo = styled.a`
  padding-right: var(--spacing-2, 8px);
  display: inline-flex;
`

export const ElTopBarProfile = styled.div`
  padding: var(--spacing-1, 4px) var(--spacing-none, 0px);
`

export const ElTopBarMainNav = styled(ElButtonGroup)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: var(--spacing-6, 24px);
  flex-grow: 1;
  container-type: inline-size;
`

export const ElTopBarSecondaryNav = styled(ElButtonGroup)`
  flex-wrap: nowrap;
  padding-right: var(--spacing-2, 8px);
`

export const ElTopBar = styled.div`
  display: flex;
  align-items: center;
  height: var(--size-14);
  padding: var(--spacing-2, 8px) var(--spacing-5, 20px);
  border-bottom: var(--border-default, 1px) solid var(--outline-default, #e5e9ed);
  background: var(--fill-white, #fff);

  ${isBelowWideScreen} {
    padding: var(--spacing-2, 8px) var(--spacing-4, 16px);

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
  padding-right: var(--spacing-2, 8px);

  ${isTablet} {
    width: 216px;
    padding: var(--spacing-1, 4px) var(--spacing-4, 16px) var(--spacing-1, 4px) var(--spacing-none, 0px);
  }
`

export const ElTopBarMobileNav = styled.div`
  display: inline-block;
  padding-right: var(--spacing-2, 8px);

  ${isWideScreen} {
    display: none;
  }
`

export const elTopBarMenuPopover = css`
  // To adjust the menu popover's Y offset so it appears below the top bar instead of directly below the button.
  // The "important" rule is used to override the Menu's auto-anchor yOffset.
  top: var(--spacing-10) !important;
`
