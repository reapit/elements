import preview from '#.storybook/preview'
import { AppSwitcher } from './app-switcher'
import { productDisplayOrder_DO_NOT_ADD_PRODUCTS_TO_THIS_UNLESS_APPROVED_FOR_DISPLAY_AND_SSO_CAPABLE } from './config'

import type { SupportedProductId } from './config'

const href = '#'

const meta = preview.type<{ args: { accessibleProductIds: SupportedProductId[]; children?: never } }>().meta({
  title: 'Core/AppSwitcher',
  component: AppSwitcher,
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
})

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
 *  <>
 *    <AppSwitcher.ExploreMenuGroup>
 *      {ids.map((productId) => (
 *        <AppSwitcher.Product key={productId} productId={productId} url={href} />
 *      ))}
 *    </AppSwitcher.ExploreMenuGroup>
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
})

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
 *  <AppSwitcher.ExploreMenuGroup>
 *    {ids.map((productId) => (
 *      <AppSwitcher.Product key={productId} productId={productId} url={href} />
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
