import { getDisplayableProductsForExploreGroup } from '../get-displayable-products-for-explore-group'

test('returns product IDs that are NOT accessible by the current user', () => {
  const accessibleProductIds = ['consoleCloud', 'ireWeb']
  const result = getDisplayableProductsForExploreGroup(accessibleProductIds)
  expect(result).not.toContain('consoleCloud')
  expect(result).not.toContain('ireWeb')
})

test('ignores product IDs that are NOT approved for display', () => {
  const accessibleProductIds = ['myNewProduct', 'consoleCloud']
  const result = getDisplayableProductsForExploreGroup(accessibleProductIds)
  expect(result).not.toContain('myNewProduct')
})
