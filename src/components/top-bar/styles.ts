import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import ReapitLogo from '../../../assets/icons/reapitLogo.svg?react'
import { isDesktopOrBelow, isMobile, isTabletOrBelow } from '../../styles/media'
import { ElAvatarButton } from '../avatar-button'
import { ElButtonGroup } from '../button-group'
import { ElNavSearchButton } from '../nav-search-button/styles'

export const ElTopBarContainer = styled.div`
  display: flex;
  height: var(--size-size-10, 56px);
  padding: var(--spacing-2, 8px) var(--spacing-5, 20px);
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  ${isDesktopOrBelow} {
    padding: var(--spacing-spacing-2, 8px) var(--spacing-spacing-4, 16px);
  }

  border-bottom: var(--border-default, 1px) solid var(--outline-default, #e5e9ed);
  background: var(--fill-colour-fill-white, #fff);

  button,
  a {
    cursor: pointer;
  }
`

export const ElTopBarLeftContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;

  ${isDesktopOrBelow} {
    ${ElButtonGroup} {
      display: none;
    }
  }
`

export const ElSearchContainer = styled.div`
  display: flex;
  padding: var(--spacing-1, 4px) var(--spacing-4, 16px) var(--spacing-1, 4px) var(--spacing-none, 0px);
  align-items: flex-start;
  ${ElNavSearchButton} {
    width: 216px;
  }

  ${isMobile} {
    padding: unset;
    gap: var(--spacing-spacing-none, 0px);
  }
`

export const ElTopBarRightContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${ElButtonGroup} {
    flex-wrap: nowrap;
  }

  ${isDesktopOrBelow} {
    ${ElButtonGroup} {
      display: none;
    }
  }

  ${isTabletOrBelow} {
    ${ElAvatarButton} {
      display: none;
    }
  }
`

export const ElAppSwitcherContainer = styled.div`
  display: flex;
  padding-right: var(--spacing-5, 20px);
  align-items: center;
  gap: 10px;
`

export const ElBrandContainer = styled.a`
  display: flex;
  padding: var(--spacing-2, 8px) var(--spacing-2, 8px) var(--spacing-2, 8px) var(--spacing-none, 0px);
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`

export const ElBrandReapit = styled(ReapitLogo)`
  display: flex;
  width: 96px;
  height: 24px;
  padding-right: 0.463px;
  justify-content: center;
  align-items: center;
  gap: 9px;
`

export const elMainNavContainer = css`
  display: flex;
  padding: var(--spacing-1, 4px) var(--spacing-none, 0px) var(--spacing-1, 4px) var(--spacing-6, 24px);
  align-items: flex-start;

  /* for container query */
  width: 100%;
  min-width: 454px;
`
export const elAvatarContainer = css`
  display: flex;
  padding: var(--spacing-1, 4px) var(--spacing-none, 0px);
  padding-left: var(--spacing-2, 8px);
  align-items: center;
  gap: 10px;
`

export const ElTopBarMenuButtonContainer = styled.div`
  display: none;

  ${isDesktopOrBelow} {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-spacing-none, 0px);
  }
`
