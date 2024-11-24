import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { isDesktopOrBelow, isMobile, isTabletOrBelow } from '../../styles/media'
import { ElAvatarButton } from '../avatar-button'
import { ElButtonGroup } from '../button-group'
import { ElNavSearchButton } from '../nav-search-button/styles'

export const ElTopBar = styled.div`
  display: flex;
  height: var(--size-10, 56px);
  padding: var(--spacing-2, 8px) var(--spacing-5, 20px);
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-bottom: var(--border-default, 1px) solid var(--outline-default, #e5e9ed);
  background: var(--fill-white, #fff);

  ${isDesktopOrBelow} {
    padding: var(--spacing-2, 8px) var(--spacing-4, 16px);
  }
`

export const ElTopBarLeftContent = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;

  ${isDesktopOrBelow} {
    ${ElButtonGroup} {
      display: none;
    }
  }
`

export const elMainNavContainer = css`
  display: flex;
  padding: var(--spacing-1, 4px) var(--spacing-none, 0px) var(--spacing-1, 4px) var(--spacing-6, 24px);
  align-items: flex-start;

  /* for container query */
  width: 100%;
`

export const ElTopBarRightContent = styled.div`
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

export const ElSearchContainer = styled.div`
  padding: var(--spacing-1, 4px) var(--spacing-4, 16px) var(--spacing-1, 4px) var(--spacing-none, 0px);
  ${ElNavSearchButton} {
    width: 216px;
  }

  ${isMobile} {
    padding: unset;
    gap: var(--spacing-none, 0px);
  }
`

export const elTopBarAvatar = css`
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
    gap: var(--spacing-none, 0px);
  }
`
