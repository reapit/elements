import { figmaDesignUrls } from '#src/storybook/figma/index'
import type { Meta, StoryObj } from '@storybook/react'
import { AvatarButton } from '../avatar-button'
import { elIcon } from '../button'
import { CSSContainerQuery } from '../container-query/container-query'
import { Icon } from '../icon'
import { Menu } from '../menu'
import { NavDropdownButton } from '../nav-dropdown-button'
import { NavIconItem } from '../nav-icon-item'
import { NavItem } from '../nav-item'
import { NavSearchButton } from '../nav-search-button/nav-search-button'
import { ReapitLogo } from '../reapit-logo'
import MenuIcon from './icons/menu-icon.svg?react'
import { elTopBarMenuPopover } from './styles'
import { TopBar } from './top-bar'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

const viewports: typeof INITIAL_VIEWPORTS = {
  superWideScreen: {
    name: 'Super Wide Screen',
    type: 'desktop',
    styles: {
      width: '1920px',
      height: '1500px',
    },
  },
  wideScreen: {
    name: 'Wide Screen',
    type: 'desktop',
    styles: {
      width: '1440px',
      height: '900px',
    },
  },
  desktop: {
    name: 'Desktop',
    type: 'desktop',
    styles: {
      width: '1024px',
      height: '900px',
    },
  },
  ipad11p: INITIAL_VIEWPORTS.ipad11p,
  iphone14: INITIAL_VIEWPORTS.iphone14,
}

export default {
  title: 'Components/Top bar',
  component: TopBar,
  parameters: {
    viewport: { defaultViewport: 'responsive', viewports },
  },
} as Meta<typeof TopBar>

type Story = StoryObj<typeof TopBar>

export const Default: Story = {
  // NOTE: this version is without `CSSContainerQuery` so the non react user doesn't see it in the docs
  render: () => {
    return (
      <TopBar>
        <TopBar.Logo href="/">
          <ReapitLogo />
        </TopBar.Logo>
        <TopBar.MainNav>
          <NavItem href="/">Button 1</NavItem>
          <NavItem href="/">Button 2</NavItem>
          <Menu>
            <Menu.Trigger>
              {({ getTriggerProps, isOpen }) => (
                <NavDropdownButton {...getTriggerProps()} isOpen={isOpen}>
                  More
                </NavDropdownButton>
              )}
            </Menu.Trigger>
            <Menu.Popover className={elTopBarMenuPopover}>
              <Menu.List>
                <Menu.Item href="/">Button 3</Menu.Item>
                <Menu.Item href="/">Button 4</Menu.Item>
                <Menu.Item href="/">Button 5</Menu.Item>
              </Menu.List>
            </Menu.Popover>
          </Menu>
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

        <TopBar.Profile>
          <Menu data-alignment="right">
            <Menu.Trigger>
              {({ getTriggerProps, isOpen }) => <AvatarButton {...getTriggerProps()} isOpen={isOpen} label="AD" />}
            </Menu.Trigger>
            <Menu.Popover className={elTopBarMenuPopover}>
              <Menu.List>
                <Menu.Item href="/">User menu 1</Menu.Item>
                <Menu.Item href="/">User menu 2</Menu.Item>
                <Menu.Item href="/">User menu 3</Menu.Item>
              </Menu.List>
            </Menu.Popover>
          </Menu>
        </TopBar.Profile>
      </TopBar>
    )
  },
  parameters: {
    design: {
      type: 'figma',
      url: figmaDesignUrls.appBar,
      allowFullscreen: true,
    },
  },
}

export const ResponsiveMainNav: Story = {
  render: () => {
    return (
      <TopBar>
        <TopBar.Logo href="/">
          <ReapitLogo />
        </TopBar.Logo>
        <TopBar.MainNav>
          <NavItem href="/">Button 1</NavItem>
          <NavItem href="/">Button 2</NavItem>
          <CSSContainerQuery condition={'(width < 1004px)'}>
            <NavItem href="/">Button 3</NavItem>
            <NavItem href="/">Button 4</NavItem>
            <NavItem href="/">Button 5</NavItem>
          </CSSContainerQuery>
          <CSSContainerQuery condition={'not (width < 1005px)'}>
            <Menu>
              <Menu.Trigger>
                {({ getTriggerProps, isOpen }) => (
                  <NavDropdownButton {...getTriggerProps()} isOpen={isOpen}>
                    More
                  </NavDropdownButton>
                )}
              </Menu.Trigger>
              <Menu.Popover className={elTopBarMenuPopover}>
                <Menu.List>
                  <Menu.Item href="/">Button 3</Menu.Item>
                  <Menu.Item href="/">Button 4</Menu.Item>
                  <Menu.Item href="/">Button 5</Menu.Item>
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

        <TopBar.Profile>
          <Menu data-alignment="right">
            <Menu.Trigger>
              {({ getTriggerProps, isOpen }) => <AvatarButton {...getTriggerProps()} isOpen={isOpen} label="AD" />}
            </Menu.Trigger>
            <Menu.Popover className={elTopBarMenuPopover}>
              <Menu.List>
                <Menu.Item href="/">User menu 1</Menu.Item>
                <Menu.Item href="/">User menu 2</Menu.Item>
                <Menu.Item href="/">User menu 3</Menu.Item>
              </Menu.List>
            </Menu.Popover>
          </Menu>
        </TopBar.Profile>
      </TopBar>
    )
  },
  parameters: {
    design: {
      type: 'figma',
      url: figmaDesignUrls.appBar,
      allowFullscreen: true,
    },
  },
}

export const Mobile: Story = {
  render: ResponsiveMainNav.render,
  parameters: {
    ...ResponsiveMainNav.parameters,
    viewport: { defaultViewport: 'iphone14' },
  },
}

export const Tablet: Story = {
  render: ResponsiveMainNav.render,
  parameters: {
    ...ResponsiveMainNav.parameters,
    viewport: { defaultViewport: 'ipad11p' },
  },
}
export const Desktop: Story = {
  render: ResponsiveMainNav.render,
  parameters: {
    ...ResponsiveMainNav.parameters,
    viewport: {
      defaultViewport: 'desktop',
    },
  },
}

export const WideScreen: Story = {
  render: ResponsiveMainNav.render,
  parameters: {
    ...ResponsiveMainNav.parameters,
    viewport: {
      defaultViewport: 'wideScreen',
    },
  },
}

export const SuperWideScreen: Story = {
  render: ResponsiveMainNav.render,
  parameters: {
    ...ResponsiveMainNav.parameters,
    viewport: {
      defaultViewport: 'superWideScreen',
    },
  },
}
