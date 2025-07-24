import { AppSwitcher } from '../app-switcher'
import { elTopBarMenuPopover } from './styles'
import { HelpIcon } from '#src/icons/help'
import { DeprecatedMenu } from '#src/deprecated/menu'
import { MenuAltIcon } from '#src/icons/menu-alt'
import { NotificationIcon } from '#src/icons/notification'
import { StarIcon } from '#src/icons/star'
import { supportedAppNames } from './brand-logo'
import { TopBar } from './top-bar'
import { TopBarNavIconItemButton } from './nav-icon-item'

import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location.href!

const meta = {
  title: 'Core/TopBar',
  component: TopBar,
  argTypes: {
    appSwitcher: {
      control: 'radio',
      options: ['None', 'App Switcher'],
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
          <DeprecatedMenu data-alignment="right">
            <DeprecatedMenu.Trigger>
              {({ getTriggerProps, isOpen }) => (
                <TopBar.AvatarButton {...getTriggerProps()} isOpen={isOpen}>
                  AD
                </TopBar.AvatarButton>
              )}
            </DeprecatedMenu.Trigger>
            <DeprecatedMenu.Popover className={elTopBarMenuPopover}>
              <DeprecatedMenu.List>
                <DeprecatedMenu.Item label="User menu 1" />
                <DeprecatedMenu.Item label="User menu 2" />
                <DeprecatedMenu.Item label="User menu 3" />
              </DeprecatedMenu.List>
            </DeprecatedMenu.Popover>
          </DeprecatedMenu>
        ),
      },
    },
    logo: {
      control: 'select',
      options: supportedAppNames,
      mapping: {
        Reapit: <TopBar.BrandLogo appName="Reapit" href={href} />,
        'Console Owner': <TopBar.BrandLogo appName="Console Owner" href={href} />,
        'Console Pay': <TopBar.BrandLogo appName="Console Pay" href={href} />,
        'Console Tenant': <TopBar.BrandLogo appName="Console Tenant" href={href} />,
        'Reapit Connect': <TopBar.BrandLogo appName="Reapit Connect" href={href} />,
        'Reapit Projector': <TopBar.BrandLogo appName="Reapit Projector" href={href} />,
        'Reapit Sales': <TopBar.BrandLogo appName="Reapit Sales" href={href} />,
        'Reapit Lettings': <TopBar.BrandLogo appName="Reapit Lettings" href={href} />,
        'Reapit PM': <TopBar.BrandLogo appName="Reapit PM" href={href} />,
        'PM Demo': <TopBar.BrandLogo appName="PM Demo" href={href} />,
        'PM Sales': <TopBar.BrandLogo appName="PM Sales" href={href} />,
        'PM Inspect': <TopBar.BrandLogo appName="PM Inspect" href={href} />,
        'Reapit Forms': <TopBar.BrandLogo appName="Reapit Forms" href={href} />,
        'Reapit Proposals': <TopBar.BrandLogo appName="Reapit Proposals" href={href} />,
        KeyWhere: <TopBar.BrandLogo appName="KeyWhere" href={href} />,
        'Auto Responder': <TopBar.BrandLogo appName="Auto Responder" href={href} />,
      },
    },
    mainNav: {
      control: 'radio',
      options: ['None', 'Some', 'Many'],
      mapping: {
        None: null,
        Some: (
          <TopBar.MainNav>
            <TopBar.MainNav.Item aria-current={false} href={href}>
              Button 1
            </TopBar.MainNav.Item>
            <TopBar.MainNav.Item aria-current="page" href={href}>
              Button 2
            </TopBar.MainNav.Item>
          </TopBar.MainNav>
        ),
        Many: (
          <TopBar.MainNav>
            <TopBar.NavItem aria-current={false} href={href}>
              Button 1
            </TopBar.NavItem>
            <TopBar.NavItem aria-current="page" href={href}>
              Button 2
            </TopBar.NavItem>
            <TopBar.NavItem aria-current={false} href={href}>
              Button 3
            </TopBar.NavItem>
            <TopBar.NavItem aria-current={false} href={href}>
              Button 4
            </TopBar.NavItem>
            <TopBar.NavItem aria-current={false} href={href}>
              Button 5
            </TopBar.NavItem>
            <TopBar.NavMenuItem label="More">
              <Menu.Item label="Button 6" />
              <Menu.Item label="Button 7" />
              <Menu.Item label="Button 8" />
            </TopBar.NavMenuItem>
          </TopBar.MainNav>
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
          <TopBar.SecondaryNav>
            <TopBar.NavIconMenuItem aria-label="Nav icon item 1" icon={<HelpIcon />}>
              <DeprecatedMenu.Item label="Menu item 1" />
              <DeprecatedMenu.Item label="Menu item 2" />
              <DeprecatedMenu.Item label="Menu item 3" />
            </TopBar.NavIconMenuItem>
            <TopBar.NavIconItem
              aria-current={false}
              aria-label="Nav icon item 2"
              href={href}
              icon={<NotificationIcon />}
            />
            <TopBar.NavIconItem aria-current={false} aria-label="Nav icon item 3" href={href} icon={<StarIcon />} />
          </TopBar.SecondaryNav>
        ),
      },
    },
  },
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
} satisfies Meta<typeof TopBar>

export default meta

type Story = StoryObj<typeof meta>

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
    logo: 'Reapit',
    mainNav: 'Many',
    menu: (
      // TODO: replace this with the proper TopBarMenu component when it is available
      <TopBarNavIconItemButton aria-label="Overflow menu" icon={<MenuAltIcon />} onClick={() => void 0} />
    ),
    search: (
      <TopBar.NavSearch
        button={<TopBar.NavSearchButton onClick={() => void 0} shortcut="⌘K" />}
        iconItem={<TopBar.NavSearchIconItem onClick={() => void 0} />}
      />
    ),
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
    ...Tablet.args,
  },
  decorators: [useConstrainedWidthDecorator('1024px')],
}

/**
 * For viewports 1440px and wider, the Top Bar will display all of its regions.
 */
export const WideScreen: Story = {
  args: {
    ...Tablet.args,
  },
  decorators: [useConstrainedWidthDecorator('1440px')],
}
