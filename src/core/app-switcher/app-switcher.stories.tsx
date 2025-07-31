import { AppSwitcher } from './app-switcher'
import { productDisplayOrder_DO_NOT_ADD_PRODUCTS_TO_THIS_UNLESS_APPROVED_FOR_DISPLAY_AND_SSO_CAPABLE } from './config'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/AppSwitcher',
  component: AppSwitcher,
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof AppSwitcher>

export default meta

type Story = StoryObj<typeof meta>

const href = globalThis.top?.location.href!

/**
 * The UI for the App Switcher is built by composing subcomponents like `AppSwitcher.ProductMenuItem`,
 * `AppSwitcher.YourAppsMenuGroup`, `AppSwitcher.ExploreMenuGroup`, and `AppSwitcher.Divider`. This composition
 * is manual, but it's important to note that the order of the products in the menu, as well as which products
 * are approved for display is not handled automatically by these subcomponents.
 *
 * Instead, there are two utility functions, `getDisplayableProductsForYourAppsGroup` and
 * `getDisplayableProductsForExploreGroup`, that can be used to obtain the list of product IDs for each group based
 * on the currently logged-in user has access to, according to Reapit Connect. A practical exmaple of how to do this
 * is shown in the "All Accessible" and "None Accessible" stories below.
 */
export const Example: Story = {
  args: {
    children: [
      <AppSwitcher.YourAppsMenuGroup key="1">
        <AppSwitcher.ProductMenuItem href={href} productId="ireWeb" />
      </AppSwitcher.YourAppsMenuGroup>,
      <AppSwitcher.Divider key="2" />,
      <AppSwitcher.ExploreMenuGroup key="3">
        <AppSwitcher.ProductMenuItem href={href} productId="consoleCloud" />
        <AppSwitcher.ProductMenuItem href={href} productId="keywhere" />
      </AppSwitcher.ExploreMenuGroup>,
    ],
  },
}

/**
 * When the user has access to all "displayable" products, they will all be displayed in the Your Apps menu group.
 * A user can have access to more products than those that are supported by the App Switcher, so the list of
 * product for display in the "Your Apps" menu group should be filtered using
 * `getDisplayableProductsForYourAppsGroup`.
 *
 * The following snippet shows how `getDisplayableProductsForYourAppsGroup` can be used to render the Your Apps
 * menu group with the correct products. This is the same logic employed by this story.
 *
 * ```tsx
 * const ids = AppSwitcher.getDisplayableProductsForYourAppsGroup(accessibleProductIds)
 *
 * return ids.length > 0 && (
 *  <AppSwitcher.ExploreMenuGroup>
 *    {ids.map((productId) => (
 *      <AppSwitcher.Product key={productId} productId={productId} url={href} />
 *    ))}
 *  </AppSwitcher.ExploreMenuGroup>
 * )
 * ```
 */
export const AllAccessible: StoryObj<{ accessibleProductIds: string[] }> = {
  args: {
    accessibleProductIds: productDisplayOrder_DO_NOT_ADD_PRODUCTS_TO_THIS_UNLESS_APPROVED_FOR_DISPLAY_AND_SSO_CAPABLE,
  },
  argTypes: {
    accessibleProductIds: {
      control: 'check',
      options: productDisplayOrder_DO_NOT_ADD_PRODUCTS_TO_THIS_UNLESS_APPROVED_FOR_DISPLAY_AND_SSO_CAPABLE,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF' }}>
        <Story />
      </div>
    ),
  ],
  render: ({ accessibleProductIds }) => {
    const displayableProductsForYourAppsGroup = AppSwitcher.getDisplayableProductsForYourAppsGroup(accessibleProductIds)
    const displayableProductsForExploreGroup = AppSwitcher.getDisplayableProductsForExploreGroup(accessibleProductIds)
    return (
      <>
        {displayableProductsForYourAppsGroup.length > 0 && (
          <>
            <AppSwitcher.YourAppsMenuGroup>
              {displayableProductsForYourAppsGroup.map((productId) => (
                <AppSwitcher.ProductMenuItem key={productId} href={href} productId={productId} />
              ))}
            </AppSwitcher.YourAppsMenuGroup>
            <AppSwitcher.Divider />
          </>
        )}
        {displayableProductsForExploreGroup.length > 0 && (
          <AppSwitcher.ExploreMenuGroup>
            {displayableProductsForExploreGroup.map((productId) => (
              <AppSwitcher.ProductMenuItem key={productId} href={href} productId={productId} />
            ))}
          </AppSwitcher.ExploreMenuGroup>
        )}
      </>
    )
  },
}

/**
 * If the user has access to none of the "displayable" products, all displayable products will be shown in
 * the Explore menu group. This scenario should not be encountered in practice, as the `AppSwitcher` should only
 * be visible to users who have access to at least one product that is integrated with Reapit Connect.
 *
 * The following example shows how `getDisplayableProductsForExploreGroup` can be used to render the Your Apps
 * menu group with the correct products. This is the same logic employed by this story.
 *
 * ```tsx
 * const ids = AppSwitcher.getDisplayableProductsForExploreGroup(accessibleProductIds)
 *
 * return ids.length > 0 && (
 *  <AppSwitcher.YourAppsMenuGroup>
 *    {ids.map((productId) => (
 *      <AppSwitcher.Product key={productId} productId={productId} url={href} />
 *    ))}
 *  </AppSwitcher.YourAppsMenuGroup>
 * )
 * ```
 */
export const NoneAccessible: StoryObj<{ accessibleProductIds: string[] }> = {
  ...AllAccessible,
  args: {
    accessibleProductIds: [],
  },
}
