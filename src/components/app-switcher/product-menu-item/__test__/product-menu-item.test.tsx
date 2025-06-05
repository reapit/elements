import { AppSwitcherProductMenuItem } from '../product-menu-item'
import { render, screen } from '@testing-library/react'
import { productConfigs, SupportedProductId } from '../../config'

const productIds = Object.keys(productConfigs) as SupportedProductId[]

test.each(productIds)('renders %s product menu item with the expected app name and supplementary info', (productId) => {
  const expectedAppName = productConfigs[productId].appName
  const expectedSupplementaryInfo = productConfigs[productId].supplementaryInfo

  render(<AppSwitcherProductMenuItem productId={productId} href="https://fake.url" />)

  const link = screen.getByRole('link', { name: expectedAppName })
  expect(link).toBeVisible()
  expect(link).toHaveAccessibleDescription(expectedSupplementaryInfo)
})

test('link has specified href', () => {
  render(<AppSwitcherProductMenuItem productId="consoleCloud" href="https://fake.url" />)
  expect(screen.getByRole('link')).toHaveAttribute('href', 'https://fake.url')
})

test('allows app name to be overridden', () => {
  render(<AppSwitcherProductMenuItem appName="Bob" productId="consoleCloud" href="https://fake.url" />)
  expect(screen.getByRole('link', { name: 'Bob' })).toBeVisible()
})

test('allows supplementary info to be overridden', () => {
  render(
    <AppSwitcherProductMenuItem
      supplementaryInfo="Your property management tool"
      productId="consoleCloud"
      href="https://fake.url"
    />,
  )
  expect(screen.getByRole('link')).toHaveAccessibleDescription('Your property management tool')
})

test('allows avatar to be overridden', () => {
  render(<AppSwitcherProductMenuItem avatar="😎" productId="consoleCloud" href="https://fake.url" />)
  expect(screen.getByText('😎')).toBeVisible()
})
