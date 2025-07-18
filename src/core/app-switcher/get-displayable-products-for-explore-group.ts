import { productDisplayOrder_DO_NOT_ADD_PRODUCTS_TO_THIS_UNLESS_APPROVED_FOR_DISPLAY_AND_SSO_CAPABLE } from './config'

import type { SupportedProductId } from './config'

/**
 * Returns the product IDs that should be displayed in the "Explore" menu group of the app switcher. These will
 * be the products that the user DOES NOT have access to according to Reapit Connect. If the list includes product
 * IDs that are not supported by, or approved for display in, the app switcher, those IDs will be silently ignored.
 */
export function getDisplayableProductsForExploreGroup(accessibleProductIds: string[]): SupportedProductId[] {
  return productDisplayOrder_DO_NOT_ADD_PRODUCTS_TO_THIS_UNLESS_APPROVED_FOR_DISPLAY_AND_SSO_CAPABLE.filter(
    (productId) => !accessibleProductIds.includes(productId),
  )
}
