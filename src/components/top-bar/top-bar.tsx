import { FC } from 'react'
import { AvatarButton, AvatarButtonProps } from '../avatar-button'
import { NavIconItemProps } from '../nav-icon-item'
import { NavItemProps } from '../nav-item'
import { NavSearchButton } from '../nav-search-button/nav-search-button'
import { elTopBarAvatar, ElSearchContainer, ElTopBar, ElTopBarLeftContent, ElTopBarRightContent } from './styles'
import { MainNavigations, SecondaryNavigations } from './top-bar.molecules'

export interface TopBarProps {
  leftContent: {
    appSwitcherProps?: string
    mainNavigationsProps: NavItemProps[]
  }
  rightContent: {
    avatarProps: AvatarButtonProps
    secondaryNavigationsProps: NavIconItemProps[]
    searchButtonProps?: NavSearchButton
  }
}

export const TopBar: FC<TopBarProps> = ({ leftContent, rightContent }) => {
  return (
    <nav>
      <ElTopBar
        style={{
          containerType: 'inline-size',
          containerName: 'top-bar',
        }}
      >
        <ElTopBarLeftContent>
          {/* TODO: add app switcher */}
          {/* TODO: add app brand/logo */}
          <MainNavigations mainNavigationsProps={leftContent.mainNavigationsProps} />
        </ElTopBarLeftContent>
        <ElTopBarRightContent>
          {!!rightContent.searchButtonProps && (
            <ElSearchContainer>
              <NavSearchButton {...rightContent.searchButtonProps} />{' '}
            </ElSearchContainer>
          )}

          <SecondaryNavigations secondaryNavigationsProps={rightContent.secondaryNavigationsProps} />

          <AvatarButton className={elTopBarAvatar} label="AD" />
        </ElTopBarRightContent>
      </ElTopBar>
    </nav>
  )
}
