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
import { elNewTopBarAppSwitcher, NavResponsiveAppSwitcher } from '../deprecated-nav'

export default {
  title: 'Components/TopBar',
  component: TopBar,
  argTypes: {
    appSwitcher: {
      control: 'radio',
      options: ['None', 'Legacy App Switcher'],
      mapping: {
        None: null,
        'Legacy App Switcher': (
          <NavResponsiveAppSwitcher
            className={elNewTopBarAppSwitcher}
            options={[
              {
                text: 'AppMarket',
                callback: console.log,
              },
              {
                text: 'DevPortal',
                callback: console.log,
              },
            ]}
          />
        ),
      },
    },
    avatar: {
      control: 'radio',
      options: ['None', 'Avatar Menu'],
      mapping: {
        None: null,
        'Avatar Menu': (
          <Menu data-alignment="right">
            <Menu.Trigger>
              {({ getTriggerProps, isOpen }) => <AvatarButton {...getTriggerProps()} isOpen={isOpen} label="AD" />}
            </Menu.Trigger>
            <Menu.Popover className={elTopBarMenuPopover}>
              <Menu.List>
                <Menu.Item label="User menu 1" />
                <Menu.Item label="User menu 2" />
                <Menu.Item label="User menu 3" />
              </Menu.List>
            </Menu.Popover>
          </Menu>
        ),
      },
    },
    logo: {
      control: false,
    },
    mainNav: {
      control: 'radio',
      options: ['None', 'Few', 'Many'],
      mapping: {
        None: null,
        Few: (
          <>
            <NavItem>Button 1</NavItem>
            <NavItem>Button 2</NavItem>
          </>
        ),
        Many: (
          <>
            <NavItem>Button 1</NavItem>
            <NavItem>Button 2</NavItem>
            <CSSContainerQuery condition={'(width < 500px)'}>
              <NavItem>Button 3</NavItem>
              <NavItem>Button 4</NavItem>
              <NavItem>Button 5</NavItem>
            </CSSContainerQuery>
            <CSSContainerQuery condition={'not (width < 500px)'}>
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
                    <Menu.Item label="Button 3" />
                    <Menu.Item label="Button 4" />
                    <Menu.Item label="Button 5" />
                  </Menu.List>
                </Menu.Popover>
              </Menu>
            </CSSContainerQuery>
          </>
        ),
      },
    },
    menu: {
      control: false,
    },
    search: {
      control: false,
    },
    secondaryNav: {
      control: 'radio',
      options: ['None', 'Some'],
      mapping: {
        None: null,
        Some: (
          <>
            <Menu>
              <Menu.Trigger>
                {({ getTriggerProps }) => <NavIconItem {...getTriggerProps()} icon={<Icon icon="star" />} />}
              </Menu.Trigger>
              <Menu.Popover>
                <Menu.List>
                  <Menu.Item label="Menu item 1" />
                  <Menu.Item label="Menu item 2" />
                  <Menu.Item label="Menu item 3" />
                </Menu.List>
              </Menu.Popover>
            </Menu>
            <NavIconItem aria-label="secondary nav item example" icon={<Icon icon="star" />} />
            <NavIconItem aria-label="secondary nav item example" icon={<Icon icon="star" />} />
          </>
        ),
      },
    },
  },
} satisfies Meta<typeof TopBar>

type Story = StoryObj<typeof TopBar>

export const Example: Story = {
  args: {
    appSwitcher: 'Legacy App Switcher',
    avatar: 'Avatar Menu',
    logo: <ReapitLogo />,
    mainNav: 'Many',
    menu: <NavIconItem aria-label="mobile secondary nav trigger" icon={<MenuIcon className={elIcon} />} />,
    search: <NavSearchButton onClick={() => void 0} />,
    secondaryNav: 'Some',
  },
}
