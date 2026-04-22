import preview from '#.storybook/preview'
import { AppSwitcher } from '../app-switcher'
import { AppSwitcherMenuItem } from './menu-item'
import { AppSwitcherMenuGroupHasAccessContext } from '../menu-group-has-access-context'

import type { SupportedProductId } from '../config'

const meta = preview.meta({
  title: 'Core/AppSwitcher/MenuItem',
  component: AppSwitcherMenuItem,
  argTypes: {
    avatar: {
      control: 'radio',
      options: ['agentBox', 'consoleCloud', 'reapitforms', 'ireWeb'] as const satisfies SupportedProductId[],
      mapping: {
        agentBox: <AppSwitcher.AppAvatar hasAccess productId="agentBox" />,
        consoleCloud: <AppSwitcher.AppAvatar hasAccess productId="consoleCloud" />,
        ireWeb: <AppSwitcher.AppAvatar hasAccess productId="ireWeb" />,
        reapitForms: <AppSwitcher.AppAvatar hasAccess productId="reapitforms" />,
      },
    },
  },
  decorators: [
    (Story, { parameters: { hasAccessContextValue } }) => (
      <AppSwitcherMenuGroupHasAccessContext.Provider value={!!hasAccessContextValue}>
        <Story />
      </AppSwitcherMenuGroupHasAccessContext.Provider>
    ),
  ],
  parameters: {
    hasAccessContextValue: true,
  },
})

/**
 * When the product menu item is rendered as a child of the `AppSwitcher.YourAppsMenuGroup` (or more
 * specifically, when the nearest `HasAccessContext.Provider` has a value of `true`), its logo will
 * automatically reflect the user's access to the product.
 */
export const Example = meta.story({
  args: {
    appName: 'App name',
    avatar: 'consoleCloud',
    supplementaryInfo: 'Supplementary info',
    href: '#',
  },
})

/**
 * If the text content of the menu item is too long for the available space, it will wrap to the next line.
 */
export const Wrapping = Example.extend({
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '180px' }}>
        <Story />
      </div>
    ),
  ],
})

/**
 * If individual words are too long for the available space, mid-word breaks may occur. This ensures no overflow
 * occurs, though this scenario should prove to be a rare occurrence given we have direct control of the product
 * name and supplementary info content.
 */
export const WordBreaks = Example.extend({
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: '150px' }}>
        <Story />
      </div>
    ),
  ],
})
