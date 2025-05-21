import {
  ElTopBar,
  ElTopBarAppSwitcherContainer,
  ElTopBarLogoContainer,
  ElTopBarMainNavContainer,
  ElTopBarMenuContainer,
  ElTopBarAvatarContainer,
  ElTopBarSearchContainer,
  ElTopBarSecondaryNavContainer,
} from './styles'

import type { ComponentProps, ReactNode } from 'react'

interface TopBarProps extends Omit<ComponentProps<typeof ElTopBar>, 'children'> {
  appSwitcher?: ReactNode
  avatar?: ReactNode
  logo: ReactNode
  mainNav?: ReactNode
  menu?: ReactNode
  search?: ReactNode
  secondaryNav?: ReactNode
}

export function TopBar({ appSwitcher, avatar, logo, mainNav, menu, search, secondaryNav, ...props }: TopBarProps) {
  return (
    <ElTopBar {...props}>
      {/* NOTE: The order here defines the "source order" of the DOM content. For a11y, it's important this
       * matches the visual order defined by ElTopBar's CSS grid layout. */}
      {appSwitcher && <ElTopBarAppSwitcherContainer>{appSwitcher}</ElTopBarAppSwitcherContainer>}
      <ElTopBarLogoContainer>{logo}</ElTopBarLogoContainer>
      {mainNav && <ElTopBarMainNavContainer>{mainNav}</ElTopBarMainNavContainer>}
      {search && <ElTopBarSearchContainer>{search}</ElTopBarSearchContainer>}
      {secondaryNav && <ElTopBarSecondaryNavContainer>{secondaryNav}</ElTopBarSecondaryNavContainer>}
      {menu && <ElTopBarMenuContainer>{menu}</ElTopBarMenuContainer>}
      <ElTopBarAvatarContainer>{avatar}</ElTopBarAvatarContainer>
    </ElTopBar>
  )
}
