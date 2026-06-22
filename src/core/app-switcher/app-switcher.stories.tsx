import preview from '#.storybook/preview'
import { AppSwitcher } from './app-switcher'
import { AppSwitcherProductMenuItem } from './anz/product-menu-item'
import { productDisplayOrder_DO_NOT_ADD_PRODUCTS_TO_THIS_UNLESS_APPROVED_FOR_DISPLAY_AND_SSO_CAPABLE } from './anz/config'

import type { SupportedProductId } from './anz/config'

const meta = preview.type<{ args: { accessibleProductIds?: SupportedProductId[] } }>().meta({
  title: 'Navigation/AppSwitcher',
  component: AppSwitcher,
  args: {
    children: undefined,
  },
  argTypes: {
    children: {
      control: false,
    },
  },
})

const href = '#'

/**
 * The UI for the ANZ App Switcher is built by composing `AppSwitcherProductMenuItem` (from
 * `@reapit/elements/core/app-switcher/anz`) with `AppSwitcher.YourAppsMenuGroup`,
 * `AppSwitcher.ExploreMenuGroup`, and `AppSwitcher.Divider`. This composition is manual, but the order
 * of products and which products are approved for display is not handled automatically by these
 * subcomponents.
 *
 * Instead, there are two ANZ-specific utility functions — `getDisplayableProductsForYourAppsGroup` and
 * `getDisplayableProductsForExploreGroup` — available from `@reapit/elements/core/app-switcher/anz` that filter
 * the logged-in user's accessible product IDs into the correct groups. A practical example of how to use these
 * is shown in the "All Accessible" and "None Accessible" stories below.
 */
export const Example = meta.story({
  args: {
    children: [
      <AppSwitcher.YourAppsMenuGroup key="1">
        <AppSwitcherProductMenuItem href={href} productId="ireWeb" />
      </AppSwitcher.YourAppsMenuGroup>,
      <AppSwitcher.Divider key="2" />,
      <AppSwitcher.ExploreMenuGroup key="3">
        <AppSwitcherProductMenuItem href={href} productId="consoleCloud" />
        <AppSwitcherProductMenuItem href={href} productId="keyWhere" />
      </AppSwitcher.ExploreMenuGroup>,
    ],
  },
})

/**
 * When the user has access to all "displayable" ANZ products, they will all be displayed in the Your Apps
 * menu group. A user can have access to more products than those supported by the App Switcher, so the list
 * for the "Your Apps" group should be filtered using `getDisplayableProductsForYourAppsGroup` (available from
 * `@reapit/elements/core/app-switcher/anz`).
 *
 * The following snippet shows how `getDisplayableProductsForYourAppsGroup` can be used to render the Your Apps
 * menu group with the correct products. This is the same logic employed by this story.
 *
 * ```tsx
 * const ids = AppSwitcher.getDisplayableProductsForYourAppsGroup(accessibleProductIds)
 *
 * return ids.length > 0 && (
 *  <>
 *    <AppSwitcher.YourAppsMenuGroup>
 *      {ids.map((productId) => (
 *        <AppSwitcherProductMenuItem key={productId} productId={productId} href={href} />
 *      ))}
 *    </AppSwitcher.YourAppsMenuGroup>
 *    <AppSwitcher.Divider />
 *  </>
 * )
 * ```
 */
export const AllAccessible = meta.story({
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
  render: ({ accessibleProductIds = [] }) => {
    const displayableProductsForYourAppsGroup = AppSwitcher.getDisplayableProductsForYourAppsGroup(accessibleProductIds)
    const displayableProductsForExploreGroup = AppSwitcher.getDisplayableProductsForExploreGroup(accessibleProductIds)
    return (
      <>
        {displayableProductsForYourAppsGroup.length > 0 && (
          <>
            <AppSwitcher.YourAppsMenuGroup>
              {displayableProductsForYourAppsGroup.map((productId) => (
                <AppSwitcherProductMenuItem key={productId} href={href} productId={productId} />
              ))}
            </AppSwitcher.YourAppsMenuGroup>
            <AppSwitcher.Divider />
          </>
        )}
        {displayableProductsForExploreGroup.length > 0 && (
          <AppSwitcher.ExploreMenuGroup>
            {displayableProductsForExploreGroup.map((productId) => (
              <AppSwitcherProductMenuItem key={productId} href={href} productId={productId} />
            ))}
          </AppSwitcher.ExploreMenuGroup>
        )}
      </>
    )
  },
})

/**
 * If the user has access to none of the "displayable" ANZ products, all displayable products will be shown in
 * the Explore menu group. This scenario should not be encountered in practice, as the `AppSwitcher` should only
 * be visible to users who have access to at least one product integrated with Reapit Connect.
 *
 * The following example shows how `getDisplayableProductsForExploreGroup` (available from
 * `@reapit/elements/core/app-switcher/anz`) can be used to render the Explore menu group. This is the same
 * logic employed by this story.
 *
 * ```tsx
 * const ids = AppSwitcher.getDisplayableProductsForExploreGroup(accessibleProductIds)
 *
 * return ids.length > 0 && (
 *  <AppSwitcher.ExploreMenuGroup>
 *    {ids.map((productId) => (
 *      <AppSwitcherProductMenuItem key={productId} productId={productId} href={href} />
 *    ))}
 *  </AppSwitcher.ExploreMenuGroup>
 * )
 * ```
 */
export const NoneAccessible = AllAccessible.extend({
  args: {
    accessibleProductIds: [],
  },
})
