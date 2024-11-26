import type { Meta, StoryObj } from '@storybook/react'
import { ElAvatar } from '../avatar'
import { AvatarButton, ElAvatarButton } from '../avatar-button'
import { elIcon } from '../button'
import { ContainerQuery } from '../container-query/container-query'
import { Icon } from '../icon'
import { Menu } from '../menu'
import { NavDropdownButton } from '../nav-dropdown-button'
import { ElButtonNavIconItem, NavIconItem } from '../nav-icon-item'
import { ElNavItemAnchor, ElNavItemLabelContainer, NavItem } from '../nav-item'
import { NavSearchButton } from '../nav-search-button/nav-search-button'
import {
  ElNavSearchButton,
  ElNavSearchButtonIcon,
  ElNavSearchButtonPlaceholder,
  ElNavSearchButtonShortcutText,
} from '../nav-search-button/styles'
import MenuIcon from './icons/menu-icon.svg?react'
import {
  ElMainNavContainer,
  ElSearchContainer,
  ElTopBar,
  elTopBarAvatar,
  ElTopBarMenuButtonContainer,
  ElTopBarSecondaryNavContainer,
} from './styles'
import { TopBar } from './top-bar'

export default {
  title: 'Components/Top bar',
  component: TopBar,
} as Meta<typeof TopBar>

// TODO: add example for main nav with menu usage
export const StylesOnlyUsage: StoryObj<typeof TopBar> = {
  render: () => {
    return (
      <nav>
        <ElTopBar>
          <ElMainNavContainer>
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
          </ElMainNavContainer>

          <ElSearchContainer>
            <NavIconItem icon={<Icon icon="search" />} aria-label="nav-icon-item-example" />
            <ElButtonNavIconItem>
              <Icon icon="search" />
            </ElButtonNavIconItem>
            <ElNavSearchButton>
              <ElNavSearchButtonIcon aria-hidden="true" />
              <ElNavSearchButtonPlaceholder>Search</ElNavSearchButtonPlaceholder>
              <ElNavSearchButtonShortcutText>Ctrl + K</ElNavSearchButtonShortcutText>
            </ElNavSearchButton>
          </ElSearchContainer>

          <ElTopBarSecondaryNavContainer>
            <ElButtonNavIconItem>
              <Icon icon="star" />
            </ElButtonNavIconItem>
            <ElButtonNavIconItem>
              <Icon icon="star" />
            </ElButtonNavIconItem>
            <ElButtonNavIconItem>
              <Icon icon="star" />
            </ElButtonNavIconItem>
          </ElTopBarSecondaryNavContainer>

          <ElTopBarMenuButtonContainer>
            <ElButtonNavIconItem>
              <MenuIcon className={elIcon} />
            </ElButtonNavIconItem>
          </ElTopBarMenuButtonContainer>

          <ElAvatarButton className={elTopBarAvatar} aria-label="user navigation menu">
            <ElAvatar data-size="small" data-shape="circle" data-colour="purple">
              AD
            </ElAvatar>
          </ElAvatarButton>
        </ElTopBar>
      </nav>
    )
  },
}
export const ReactUsage: StoryObj<typeof TopBar> = {
  render: () => {
    return (
      <TopBar>
        <TopBar.MainNavigations
          style={{
            containerName: 'main-nav',
            containerType: 'inline-size',
          }}
        >
          <NavItem href="/">Button 1</NavItem>
          <NavItem href="/">Button 2</NavItem>
          <NavItem href="/">Button 3</NavItem>
          <NavItem href="/">Button 4</NavItem>
          <ContainerQuery conditions={'(width < 1000px)'} containerName="main-nav">
            <NavItem href="/">Button 5</NavItem>
            <NavItem href="/">Button 6</NavItem>
            <NavItem href="/">Button 7</NavItem>
          </ContainerQuery>
          <ContainerQuery not conditions={'(width < 1000px)'} containerName="main-nav">
            <Menu>
              <Menu.Trigger>
                {({ getTriggerProps }) => <NavDropdownButton {...getTriggerProps()}>More</NavDropdownButton>}
              </Menu.Trigger>
              <Menu.Popover>
                <Menu.List>
                  <Menu.Item href="/">Button 5</Menu.Item>
                  <Menu.Item href="/">Button 6</Menu.Item>
                  <Menu.Item href="/">Button 7</Menu.Item>
                </Menu.List>
              </Menu.Popover>
            </Menu>
          </ContainerQuery>
        </TopBar.MainNavigations>
        <TopBar.SearchContainer>
          <NavIconItem icon={<Icon icon="search" />} aria-label="nav-icon-item-example" />
          <NavSearchButton />
        </TopBar.SearchContainer>

        <TopBar.SecondaryNavigations>
          <NavIconItem aria-label="example" icon={<Icon icon="star" />} />
          <NavIconItem aria-label="example" icon={<Icon icon="star" />} />
          <NavIconItem aria-label="example" icon={<Icon icon="star" />} />
        </TopBar.SecondaryNavigations>
        <TopBar.MenuButtonContainer>
          <NavIconItem aria-label="mobile secondary nav trigger" icon={<MenuIcon className={elIcon} />} />
        </TopBar.MenuButtonContainer>

        <AvatarButton className={elTopBarAvatar} label="AD" />
      </TopBar>
    )
  },
}
