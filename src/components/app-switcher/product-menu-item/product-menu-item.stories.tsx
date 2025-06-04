import { AppSwitcherProductMenuItem } from './product-menu-item'
import { AppSwitcherMenuGroupHasAccessContext } from '../menu-group-has-access-context'
import { productConfigs } from '../config'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/AppSwitcher/ProductMenuItem',
  component: AppSwitcherProductMenuItem,
  argTypes: {
    productId: {
      control: 'select',
      options: Object.keys(productConfigs),
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
} satisfies Meta<typeof AppSwitcherProductMenuItem>

export default meta

type Story = StoryObj<typeof meta>

/**
 * When the product menu item is rendered as a child of the `AppSwitcher.YourAppsMenuGroup` (or more
 * specifically, when the nearest `HasAccessContext.Provider` has a value of `true`), its logo will
 * automatically reflect the user's access to the product.
 */
export const Example: Story = {
  args: {
    href: globalThis.top?.location.href!,
    productId: 'consoleCloud',
  },
}

/**
 * When the product menu item is rendered as a child of the `AppSwitcher.ExploreMenuGroup` (or more
 * specifically, when the nearest `HasAccessContext.Provider` has a value of `false`), its logo will
 * automatically reflect the user's lack of access to the product.
 */
export const NoAccess: Story = {
  args: {
    ...Example.args,
    productId: 'autoResponder',
  },
  parameters: {
    hasAccessContextValue: false,
  },
}
