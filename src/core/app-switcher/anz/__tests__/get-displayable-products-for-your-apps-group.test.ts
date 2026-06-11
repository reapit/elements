import { getDisplayableProductsForYourAppsGroup } from '../get-displayable-products-for-your-apps-group'

test('returns product IDs that are accessible by the current user', () => {
  const accessibleProductIds = ['consoleCloud', 'ireWeb']
  const result = getDisplayableProductsForYourAppsGroup(accessibleProductIds)
  expect(result).toContain('consoleCloud')
  expect(result).toContain('ireWeb')
})

test('ignores product IDs that are NOT approved for display', () => {
  const accessibleProductIds = ['myNewProduct', 'consoleCloud']
  const result = getDisplayableProductsForYourAppsGroup(accessibleProductIds)
  expect(result).not.toContain('myNewProduct')
})
