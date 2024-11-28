import { styled } from '@linaria/react'
import { isDesktop, isDesktopOrBelow, isTablet, isTabletOrBelow } from '../../styles/media'
import { ElButtonGroup } from '../button-group'
import { AvatarButton } from '../avatar-button'

export const ElTopBarProfile = styled(AvatarButton)`
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
    ${ElTopBarProfile} {
      display: none;
    }
  }
`

export const ElTopBarSearch = styled.div`
  padding-right: var(--spacing-spacing-2, 8px);
  ${isTablet} {
    width: 216px;
    padding: var(--spacing-1, 4px) var(--spacing-4, 16px) var(--spacing-1, 4px) var(--spacing-none, 0px);
  }
`

export const ElTopBarMobileNav = styled.div`
  display: inline-block;
  ${isDesktop} {
    display: none;
  }
`
