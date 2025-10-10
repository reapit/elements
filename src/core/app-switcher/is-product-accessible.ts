import type { SupportedProductId } from './config'

/**
 * Returns true if the specified product ID is included in the list of accessible product IDs
 * and false otherwise.
 *
 * Comparison of IDs is case-insensitive because Reapit Connect does not require the product
 * IDs assigned to a user to match the casing of the product IDs used by the actual products.
 *
 * @param productId The ID of a product that can be displayed
 * @param accessibleProductIds The list of product IDs that the user has access to
 */
export function isProductAccessible(productId: SupportedProductId, accessibleProductIds: string[]) {
  for (const accessibleProductId of accessibleProductIds) {
    const regex = new RegExp(`^${accessibleProductId}$`, 'i') // Must be case-insensitive
    if (regex.test(productId)) {
      return true
    }
  }
  return false
}
