import type { Meta, StoryObj } from '@storybook/react'
import { ElAvatar } from '../avatar'
import { ElAvatarButton } from '../avatar-button'
import { elIcon } from '../button'
import { CSSContainerQuery } from '../container-query/container-query'
import { Icon } from '../icon'
import { Menu } from '../menu'
import { NavDropdownButton } from '../nav-dropdown-button'
import { ElButtonNavIconItem, NavIconItem } from '../nav-icon-item'
import { ElNavItemAnchor, ElNavItemLabelContainer, NavItem } from '../nav-item'
import { NavSearchButton } from '../nav-search-button/nav-search-button'
import {
  ElNavSearchButton,
  ElNavSearchButtonContainer,
  ElNavSearchButtonIcon,
  ElNavSearchButtonPlaceholder,
  ElNavSearchButtonShortcutText,
} from '../nav-search-button/styles'
import MenuIcon from './icons/menu-icon.svg?react'
import {
  ElTopBarMainNav,
  ElTopBarSearch,
  ElTopBar,
  ElTopBarMobileNav,
  ElTopBarSecondaryNav,
  ElTopBarProfile,
} from './styles'
import { TopBar } from './top-bar'

export default {
  title: 'Components/Top bar',
  component: TopBar,
} as Meta<typeof TopBar>

// TODO: create mdx file once all settled
// TODO: add example for main nav with menu usage
export const StylesOnlyUsage: StoryObj<typeof TopBar> = {
  render: () => {
    return (
      <nav>
        <ElTopBar>
          <ElTopBarMainNav>
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
          </ElTopBarMainNav>

          <ElTopBarSearch>
            <ElNavSearchButtonContainer>
              <ElButtonNavIconItem>
                <Icon icon="search" />
              </ElButtonNavIconItem>
              <ElNavSearchButton>
                <ElNavSearchButtonIcon aria-hidden="true" />
                <ElNavSearchButtonPlaceholder>Search</ElNavSearchButtonPlaceholder>
                <ElNavSearchButtonShortcutText>Ctrl + K</ElNavSearchButtonShortcutText>
              </ElNavSearchButton>
            </ElNavSearchButtonContainer>
          </ElTopBarSearch>

          <ElTopBarSecondaryNav>
            <ElButtonNavIconItem>
              <Icon icon="star" aria-label="secondary nav item example" />
            </ElButtonNavIconItem>

            <ElButtonNavIconItem>
              <Icon icon="star" aria-label="secondary nav item example" />
            </ElButtonNavIconItem>
            <ElButtonNavIconItem>
              <Icon icon="star" aria-label="secondary nav item example" />
            </ElButtonNavIconItem>
          </ElTopBarSecondaryNav>

          <ElTopBarMobileNav>
            <ElButtonNavIconItem>
              <MenuIcon className={elIcon} />
            </ElButtonNavIconItem>
          </ElTopBarMobileNav>

          <ElAvatarButton className="el-top-bar-profile" aria-label="user navigation menu">
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
        <TopBar.MainNav>
          <NavItem href="/">Button 1</NavItem>
          <NavItem href="/">Button 2</NavItem>
          <NavItem href="/">Button 3</NavItem>
          <NavItem href="/">Button 4</NavItem>
          <CSSContainerQuery condition={'(width < 1004px)'}>
            <NavItem href="/">Button 5</NavItem>
            <NavItem href="/">Button 6</NavItem>
            <NavItem href="/">Button 7</NavItem>
          </CSSContainerQuery>
          <CSSContainerQuery condition={'not (width < 1005px)'}>
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
          </CSSContainerQuery>
        </TopBar.MainNav>
        <TopBar.Search>
          <NavSearchButton />
        </TopBar.Search>

        <TopBar.SecondaryNav>
          <NavIconItem aria-label="secondary nav item example" icon={<Icon icon="star" />} />
          <NavIconItem aria-label="secondary nav item example" icon={<Icon icon="star" />} />
          <NavIconItem aria-label="secondary nav item example" icon={<Icon icon="star" />} />
        </TopBar.SecondaryNav>
        <TopBar.MobileNav>
          <NavIconItem aria-label="mobile secondary nav trigger" icon={<MenuIcon className={elIcon} />} />
        </TopBar.MobileNav>

        <ElTopBarProfile label="AD" />
      </TopBar>
    )
  },
}
