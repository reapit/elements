import { cx } from '@linaria/core'
import { Nav, NavItem } from './index'
import { elNavItemActive, elNavItemHideDesktop, elNavItemExpanded } from './__styles__'
import { NavStateProvider } from '../../hooks/use-nav-state'
import { MediaStateProvider } from '../../hooks/use-media-query'
import { Icon } from '../icon'
import { elMlAuto, elMr2 } from '../../styles/spacing'
import { NavResponsive } from './nav-responsive'

export default {
  title: 'Nav',
  component: NavResponsive,
}

export const BasicExample = {
  render: () => (
    <Nav>
      <NavItem>
        <Icon height="24px" width="100px" icon="reapitLogo" />
        <Icon
          className={cx(elMlAuto, elMr2, elNavItemHideDesktop)}
          icon="more"
          intent="default"
          onClick={() => console.log('Toggle Menu')}
        />
      </NavItem>
      <NavItem className={elNavItemActive} href="https://marketplace.reapit.cloud/apps">
        Apps
      </NavItem>
      <NavItem href="https://developers.reapit.cloud/analytics">Analytics</NavItem>
      <NavItem href="https://marketplace.reapit.cloud">Marketplace</NavItem>
    </Nav>
  ),
}

export const BasicExampleMobileMenuOpen = {
  render: () => (
    <Nav>
      <NavItem>
        <Icon height="24px" width="100px" icon="reapitLogo" />
        <Icon
          className={cx(elMlAuto, elMr2, elNavItemHideDesktop)}
          icon="more"
          intent="default"
          onClick={() => console.log('Toggle Menu')}
        />
      </NavItem>
      <NavItem className={cx(elNavItemActive, elNavItemExpanded)} href="https://marketplace.reapit.cloud/apps">
        Apps
      </NavItem>
      <NavItem className={cx(elNavItemExpanded, elNavItemHideDesktop)} href="https://marketplace.reapit.cloud">
        Option Hidden In Desktop
      </NavItem>
      <NavItem className={elNavItemExpanded} href="https://developers.reapit.cloud/analytics">
        Analytics
      </NavItem>
      <NavItem className={elNavItemExpanded} href="https://marketplace.reapit.cloud">
        Marketplace
      </NavItem>
    </Nav>
  ),
}

export const ReactUsage = {
  render: () => (
    <NavStateProvider>
      <MediaStateProvider>
        <NavResponsive
          defaultNavIndex={1}
          appSwitcherOptions={[
            {
              text: 'AppMarket',
              callback: () => console.log('Navigating'),
              iconUrl: <Icon icon="reapitLogoSmall" />,
            },
            {
              text: 'DevPortal',
              callback: () => console.log('Navigating'),
              iconUrl: <Icon icon="reapitLogoSmall" />,
            },
          ]}
          avatarText="JD"
          avatarOptions={[
            {
              text: 'Settings',
              callback: () => console.log('Navigating'),
            },
            {
              text: 'Profile',
              callback: () => console.log('Navigating'),
            },
            {
              text: 'Log Out',
              callback: () => console.log('Navigating'),
            },
          ]}
          options={[
            {
              itemIndex: 0,
              callback: () => console.log('Navigating'),
            },
            {
              itemIndex: 1,
              callback: () => console.log('Navigating'),
              text: 'Apps',

              subItems: [
                {
                  itemIndex: 0,
                  callback: () => console.log('Navigating'),
                  text: 'App List',
                },
                {
                  itemIndex: 1,
                  callback: () => console.log('Navigating'),
                  text: 'Create App',
                },
              ],
            },
            {
              itemIndex: 2,
              callback: () => console.log('Navigating'),
              text: 'Analytics',

              subItems: [
                {
                  itemIndex: 2,
                  callback: () => console.log('Navigating'),
                  text: 'Hits Per Day',
                },
                {
                  itemIndex: 3,
                  callback: () => console.log('Navigating'),
                  text: 'Weekly Hits',
                },
              ],
            },
            {
              itemIndex: 3,
              href: 'https://marketplace.reapit.cloud',
              text: 'Marketplace',
            },
            {
              itemIndex: 4,
              callback: () => console.log('Logging out'),
              text: 'Logout',
            },
          ]}
        />
      </MediaStateProvider>
    </NavStateProvider>
  ),
}

export const ReactUsageWithCustomBrand = {
  render: () => (
    <NavStateProvider>
      <MediaStateProvider>
        <NavResponsive
          defaultNavIndex={1}
          brandOptions={{
            logoUrl: 'https://uk.payprop.com/res/assets/img/pp_logo.svg',
            callback: () => console.log('Clicking'),
          }}
          appSwitcherOptions={[
            {
              text: 'AppMarket',
              callback: () => console.log('Navigating'),
              iconUrl: <Icon icon="reapitLogoSmall" />,
            },
            {
              text: 'DevPortal',
              callback: () => console.log('Navigating'),
              iconUrl: <Icon icon="reapitLogoSmall" />,
            },
          ]}
          avatarText="JD"
          avatarOptions={[
            {
              text: 'Settings',
              callback: () => console.log('Navigating'),
            },
            {
              text: 'Profile',
              callback: () => console.log('Navigating'),
            },
            {
              text: 'Log Out',
              callback: () => console.log('Navigating'),
            },
          ]}
          options={[
            {
              itemIndex: 0,
              callback: () => console.log('Navigating'),
            },
            {
              itemIndex: 1,
              callback: () => console.log('Navigating'),
              text: 'Apps',

              subItems: [
                {
                  itemIndex: 0,
                  callback: () => console.log('Navigating'),
                  text: 'App List',
                },
                {
                  itemIndex: 1,
                  callback: () => console.log('Navigating'),
                  text: 'Create App',
                },
              ],
            },
            {
              itemIndex: 2,
              callback: () => console.log('Navigating'),
              text: 'Analytics',

              subItems: [
                {
                  itemIndex: 2,
                  callback: () => console.log('Navigating'),
                  text: 'Hits Per Day',
                },
                {
                  itemIndex: 3,
                  callback: () => console.log('Navigating'),
                  text: 'Weekly Hits',
                },
              ],
            },
            {
              itemIndex: 3,
              href: 'https://marketplace.reapit.cloud',
              text: 'Marketplace',
            },
            {
              itemIndex: 4,
              callback: () => console.log('Logging out'),
              text: 'Logout',
            },
          ]}
        />
      </MediaStateProvider>
    </NavStateProvider>
  ),
}
