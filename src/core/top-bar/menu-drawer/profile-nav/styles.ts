import { styled } from '@linaria/react'
import { TOP_BAR_CONTAINER_NAME } from '../../constants'
import { isWidthAtOrAbove } from '#src/utils/breakpoints'
import { ElTopBarMenuDrawerMenuList } from '../menu-list/styles'

export const ElTopBarMenuDrawerProfileNav = styled(ElTopBarMenuDrawerMenuList)`
  @layer elements.main {
    /* Note: profile nav is displayed by default. If the menu drawer is correctly placed as a descendant
     * of the top bar, we'll be able to hide this section on MD breakpoints and up to mirror the behaviour
     * of the ElTopBarAvatarContainer */
    @container ${TOP_BAR_CONTAINER_NAME} ${isWidthAtOrAbove('MD')} {
      display: none;
    }
  }
`
