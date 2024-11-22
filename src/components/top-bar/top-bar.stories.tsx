import { Meta, StoryObj } from '@storybook/react'
import { ElAvatar } from '../avatar'
import { ElAvatarButton } from '../avatar-button'
import { ButtonGroup } from '../button-group'
import { Icon } from '../icon'
import { ElButtonNavIconItem, NavIconItem } from '../nav-icon-item'
import { ElNavItemAnchor, ElNavItemLabelContainer } from '../nav-item'
import {
  ElNavSearchButton,
  ElNavSearchButtonContainer,
  ElNavSearchButtonIcon,
  ElNavSearchButtonPlaceholder,
  ElNavSearchButtonShortcutText,
} from '../nav-search-button/styles'
import MenuIcon from './icons/menu.svg?react'
import {
  elAvatarContainer,
  ElSearchContainer,
  ElTopBarContainer,
  ElTopBarLeftContentContainer,
  ElTopBarMenuButtonContainer,
  ElTopBarRightContentContainer,
} from './styles'
import { TopBar } from './top-bar'

export default {
  title: 'Components/Top bar',
  component: TopBar,
} as Meta<typeof TopBar>

export const StylesOnlyUsage: StoryObj<typeof TopBar> = {
  render: () => {
    return (
      <nav>
        <ElTopBarContainer
          style={{
            containerType: 'inline-size',
            containerName: 'top-bar',
          }}
        >
          <ElTopBarLeftContentContainer>
            <ElNavItemAnchor href="#">
              <ElNavItemLabelContainer>Button 1</ElNavItemLabelContainer>
            </ElNavItemAnchor>
            <ElNavItemAnchor href="#">
              <ElNavItemLabelContainer>Button 2</ElNavItemLabelContainer>
            </ElNavItemAnchor>
            <ElNavItemAnchor href="#">
              <ElNavItemLabelContainer>Button 3</ElNavItemLabelContainer>
            </ElNavItemAnchor>
            <ElNavItemAnchor href="#">
              <ElNavItemLabelContainer>Button 4</ElNavItemLabelContainer>
            </ElNavItemAnchor>
            <ElNavItemAnchor href="#">
              <ElNavItemLabelContainer>Button 5</ElNavItemLabelContainer>
            </ElNavItemAnchor>
          </ElTopBarLeftContentContainer>
          <ElTopBarRightContentContainer>
            <ElSearchContainer>
              <ElNavSearchButtonContainer>
                <NavIconItem icon={<Icon icon="search" fontSize="1rem" />} aria-label="nav-icon-item-example" />
                <ElNavSearchButton>
                  <ElNavSearchButtonIcon aria-hidden="true" />
                  <ElNavSearchButtonPlaceholder>Search</ElNavSearchButtonPlaceholder>
                  <ElNavSearchButtonShortcutText>Ctrl + K</ElNavSearchButtonShortcutText>
                </ElNavSearchButton>
              </ElNavSearchButtonContainer>
            </ElSearchContainer>

            <ButtonGroup>
              <ElButtonNavIconItem data-state={undefined}>
                <Icon icon="star" />
              </ElButtonNavIconItem>
              <ElButtonNavIconItem data-state={undefined}>
                <Icon icon="star" />
              </ElButtonNavIconItem>
              <ElButtonNavIconItem data-state={undefined}>
                <Icon icon="star" />
              </ElButtonNavIconItem>
            </ButtonGroup>

            <ElTopBarMenuButtonContainer>
              <ElButtonNavIconItem data-state={undefined}>
                <MenuIcon />
              </ElButtonNavIconItem>
            </ElTopBarMenuButtonContainer>

            <ElAvatarButton className={elAvatarContainer} aria-label="user navigation menu">
              <ElAvatar data-size="small" data-shape="circle" data-colour="purple">
                AD
              </ElAvatar>
            </ElAvatarButton>
          </ElTopBarRightContentContainer>
        </ElTopBarContainer>
      </nav>
    )
  },
}
export const ReactUsage: StoryObj<typeof TopBar> = {
  args: {
    leftContent: {
      appSwitcherProps: 'app-switcher-props',
      mainNavigationsProps: [
        { href: '/', 'aria-label': 'Button 1', children: 'Button 1' },
        { href: '/', 'aria-label': 'Button 2', children: 'Button 2' },
        { href: '/', 'aria-label': 'Button 3', children: 'Button 3' },
        { href: '/', 'aria-label': 'Button 4', children: 'Button 4' },
        { href: '/', 'aria-label': 'Button 5', children: 'Button 5' },
        { href: '/', 'aria-label': 'Button 6', children: 'Button 6' },
        { href: '/', 'aria-label': 'Button 7', children: 'Button 7' },
      ],
    },
    rightContent: {
      avatarProps: {
        label: 'AD',
        onClick: console.log,
      },
      secondaryNavigationsProps: [
        {
          onClick: console.log,
          icon: <Icon icon="star" />,
          'aria-label': 'example 1',
        },
        {
          onClick: console.log,
          icon: <Icon icon="star" />,
          'aria-label': 'example 2',
        },
        {
          onClick: console.log,
          icon: <Icon icon="star" />,
          'aria-label': 'example 3',
        },
        {
          onClick: console.log,
          icon: <Icon icon="star" />,
          'aria-label': 'example 4',
        },
        {
          onClick: console.log,
          icon: <Icon icon="star" />,
          'aria-label': 'example 5',
          hasBadge: true,
        },
      ],
      searchButtonProps: {
        isShortcutVisible: true,
      },
    },
  },
}
