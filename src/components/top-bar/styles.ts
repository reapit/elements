import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { isDesktopOrBelow, isMobile, isTabletOrBelow } from '../../styles/media'
import { ElButtonGroup } from '../button-group'
import { ElNavSearchButton } from '../nav-search-button/styles'
import { ElButtonNavIconItem } from '../nav-icon-item'

export const elTopBarAvatar = css`
  padding: var(--spacing-1, 4px) var(--spacing-none, 0px);
  padding-left: var(--spacing-2, 8px);
`

export const ElTopBarMainNav = styled(ElButtonGroup)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: var(--spacing-6, 24px);
  flex-grow: 1;
`

export const ElTopBarSecondaryNav = styled(ElButtonGroup)`
  flex-wrap: nowrap;
`

export const ElTopBar = styled.div`
  display: flex;
  justify-content: flex-end; /* can remove this once brand/logo added */
  align-items: center;
  height: var(--size-10, 56px);
  padding: var(--spacing-2, 8px) var(--spacing-5, 20px);
  border-bottom: var(--border-default, 1px) solid var(--outline-default, #e5e9ed);
  background: var(--fill-white, #fff);

  ${isDesktopOrBelow} {
    padding: var(--spacing-2, 8px) var(--spacing-4, 16px);

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

export const ElTopBarSearch = styled.div`
  padding: var(--spacing-1, 4px) var(--spacing-4, 16px) var(--spacing-1, 4px) var(--spacing-none, 0px);
  width: 216px;

  ${isMobile} {
    width: auto;
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

export const ElTopBarMobileNav = styled.div`
  display: none;

  ${isDesktopOrBelow} {
    display: inline-block;
  }
`
