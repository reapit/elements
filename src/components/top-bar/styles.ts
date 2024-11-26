import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { isDesktopOrBelow, isMobile, isTabletOrBelow } from '../../styles/media'
import { ElButtonGroup } from '../button-group'
import { ElNavSearchButton } from '../nav-search-button/styles'
import { ElButtonNavIconItem } from '../nav-icon-item'

export const elTopBarAvatar = css`
  display: flex;
  padding: var(--spacing-1, 4px) var(--spacing-none, 0px);
  padding-left: var(--spacing-2, 8px);
  align-items: center;
  gap: 10px;
`

export const ElTopBarMainNav = styled(ElButtonGroup)`
  display: flex;
  padding: var(--spacing-1, 4px) var(--spacing-none, 0px) var(--spacing-1, 4px) var(--spacing-6, 24px);
  align-items: flex-start;
  flex-grow: 1;
`

export const ElTopBarSecondaryNav = styled(ElButtonGroup)`
  flex-wrap: nowrap;
`

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

    // TODO: need to be adjusted once AppSwitcher and Brand/Logo included
    justify-content: flex-end;

    ${ElTopBarMainNav}, ${ElTopBarSecondaryNav} {
      display: none;
    }
  }

  ${isTabletOrBelow} {
    .${elTopBarAvatar} {
      display: none;
    }
  }
`

export const ElTopBarSearchContainer = styled.div`
  padding: var(--spacing-1, 4px) var(--spacing-4, 16px) var(--spacing-1, 4px) var(--spacing-none, 0px);
  ${ElNavSearchButton} {
    width: 216px;
  }

  ${isMobile} {
    padding-right: var(--spacing-spacing-2, 8px);

    ${ElNavSearchButton} {
      display: none;
    }
  }

  ${ElButtonNavIconItem} {
    display: none;

    ${isMobile} {
      display: inline-block;
    }
  }
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
