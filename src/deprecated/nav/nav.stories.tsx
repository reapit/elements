import preview from '#.storybook/preview'
import { cx } from '@linaria/core'
import { DeprecatedNav, DeprecatedNavItem } from './index'
import { elDeprecatedNavItemActive, elDeprecatedNavItemHideDesktop, elDeprecatedNavItemExpanded } from './__styles__'
import { NavStateProvider } from '../use-nav-state'
import { elMlAuto, elMr2 } from '../../styles/deprecated-spacing'
import { DeprecatedNavResponsive } from './nav-responsive'
import { MoreIcon } from '#src/icons/more'

const meta = preview.meta({
  title: 'Deprecated/DeprecatedNav',
  component: DeprecatedNavResponsive,
})

export const BasicExample = meta.story({
  render: () => (
    <DeprecatedNav>
      <DeprecatedNavItem>
        <span>Reapit</span>
        <MoreIcon
          className={cx(elMlAuto, elMr2, elDeprecatedNavItemHideDesktop)}
          onClick={() => console.log('Toggle Menu')}
          color="secondary"
        />
      </DeprecatedNavItem>
      <DeprecatedNavItem className={elDeprecatedNavItemActive} href="https://marketplace.reapit.cloud/apps">
        Apps
      </DeprecatedNavItem>
      <DeprecatedNavItem href="https://developers.reapit.cloud/analytics">Analytics</DeprecatedNavItem>
      <DeprecatedNavItem href="https://marketplace.reapit.cloud">Marketplace</DeprecatedNavItem>
    </DeprecatedNav>
  ),
})

export const BasicExampleMobileMenuOpen = meta.story({
  render: () => (
    <DeprecatedNav>
      <DeprecatedNavItem>
        <span>Reapit</span>
        <MoreIcon
          className={cx(elMlAuto, elMr2, elDeprecatedNavItemHideDesktop)}
          onClick={() => console.log('Toggle Menu')}
          color="secondary"
        />
      </DeprecatedNavItem>
      <DeprecatedNavItem
        className={cx(elDeprecatedNavItemActive, elDeprecatedNavItemExpanded)}
        href="https://marketplace.reapit.cloud/apps"
      >
        Apps
      </DeprecatedNavItem>
      <DeprecatedNavItem
        className={cx(elDeprecatedNavItemExpanded, elDeprecatedNavItemHideDesktop)}
        href="https://marketplace.reapit.cloud"
      >
        Option Hidden In Desktop
      </DeprecatedNavItem>
      <DeprecatedNavItem className={elDeprecatedNavItemExpanded} href="https://developers.reapit.cloud/analytics">
        Analytics
      </DeprecatedNavItem>
      <DeprecatedNavItem className={elDeprecatedNavItemExpanded} href="https://marketplace.reapit.cloud">
        Marketplace
      </DeprecatedNavItem>
    </DeprecatedNav>
  ),
})

export const ReactUsage = meta.story({
  render: () => (
    <NavStateProvider>
      <DeprecatedNavResponsive
        defaultNavIndex={1}
        appSwitcherOptions={[
          {
            text: 'AppMarket',
            callback: () => console.log('Navigating'),
          },
          {
            text: 'DevPortal',
            callback: () => console.log('Navigating'),
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
    </NavStateProvider>
  ),
})

export const ReactUsageWithCustomBrand = meta.story({
  render: () => (
    <NavStateProvider>
      <DeprecatedNavResponsive
        defaultNavIndex={1}
        brandOptions={{
          logoUrl: 'https://uk.payprop.com/res/assets/img/pp_logo.svg',
          callback: () => console.log('Clicking'),
        }}
        appSwitcherOptions={[
          {
            text: 'AppMarket',
            callback: () => console.log('Navigating'),
          },
          {
            text: 'DevPortal',
            callback: () => console.log('Navigating'),
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
    </NavStateProvider>
  ),
})
