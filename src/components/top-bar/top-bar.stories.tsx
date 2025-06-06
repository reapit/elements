import type { Decorator, Meta, StoryObj } from '@storybook/react'
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
import { AppSwitcher } from '../app-switcher'

export default {
  title: 'Components/TopBar',
  component: TopBar,
  argTypes: {
    appSwitcher: {
      control: 'radio',
      options: ['None', 'Legacy App Switcher'],
      mapping: {
        None: null,
        'App Switcher': (
          <AppSwitcher>
            <AppSwitcher.YourAppsMenuGroup>
              {AppSwitcher.getDisplayableProductsForYourAppsGroup(['consoleCloud']).map((productId) => (
                <AppSwitcher.ProductMenuItem
                  key={productId}
                  href={globalThis.top?.location.href!}
                  productId={productId}
                />
              ))}
            </AppSwitcher.YourAppsMenuGroup>
            <AppSwitcher.ExploreMenuGroup>
              {AppSwitcher.getDisplayableProductsForExploreGroup(['consoleCloud']).map((productId) => (
                <AppSwitcher.ProductMenuItem
                  key={productId}
                  href={globalThis.top?.location.href!}
                  productId={productId}
                />
              ))}
            </AppSwitcher.ExploreMenuGroup>
          </AppSwitcher>
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
  parameters: {
    backgrounds: { default: 'light' },
  },
} satisfies Meta<typeof TopBar>

type Story = StoryObj<typeof TopBar>

function useConstrainedWidthDecorator(width: string): Decorator {
  return (Story) => (
    <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width }}>
      <Story />
    </div>
  )
}

/**
 * The Top Bar is responsive to viewport size and will automatically show or hide its various sections based on the
 * available space. For browsers that support then, CSS container queries will be used by each section to determine
 * whether it should be visible or not. For browsers that do not support container queries, this behaviour will fall
 * back to relying on media queries.
 *
 * If viewing this story directly in Storybook, you can change the viewport size to see the responsive behaviour.
 * Alternatively, if you're browser supports container queries, you can see the responsible behaviour in the stories
 * further down.
 */
export const Example: Story = {
  args: {
    appSwitcher: 'App Switcher',
    avatar: 'Avatar Menu',
    logo: <ReapitLogo />,
    mainNav: 'Many',
    menu: <NavIconItem aria-label="mobile secondary nav trigger" icon={<MenuIcon className={elIcon} />} />,
    search: <NavSearchButton onClick={() => void 0} />,
    secondaryNav: 'Some',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '400px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
}

/**
 * For viewports under 768px, very few of the Top Bar's sections will be visible. Most will have collapsed
 * into the overflow menu, except for the product's "global" search entry point, if one is available.
 */
export const Mobile: Story = {
  args: {
    ...Example.args,
  },
  decorators: [useConstrainedWidthDecorator('375px')],
}

/**
 * For viewports under between 768px and 1024px, the App Switcher will be available directly in the Top Bar
 * and the "global" search entry point have more space available to itself. The main navigation, secondary
 * navigation, and user profile menu will still be collapsed into the overflow menu.
 */
export const Tablet: Story = {
  args: {
    ...Example.args,
  },
  decorators: [useConstrainedWidthDecorator('768px')],
}

/**
 * For viewports between 1024px and 1440px, the user's profile menu will become available directly in the Top Bar.
 */
export const Desktop: Story = {
  args: {
    ...Example.args,
  },
  decorators: [useConstrainedWidthDecorator('1024px')],
}

/**
 * For viewports 1440px and wider, the Top Bar will display all of its regions.
 */
export const WideScreen: Story = {
  args: {
    ...Example.args,
  },
  decorators: [useConstrainedWidthDecorator('1440px')],
}
