import { AppAvatar } from '../app-avatar'
import { productConfigs } from '../../config'
import { render } from '@testing-library/react'

import type { SupportedProductId } from '../../config'

const testCases = Object.keys(productConfigs) as SupportedProductId[]

test.each(testCases)('renders %s icon when `hasAccess` is true', (productId) => {
  const { asFragment } = render(<AppAvatar productId={productId} hasAccess={true} />)
  expect(asFragment()).toMatchSnapshot()
})

test.each(testCases)('renders %s icon when `hasAccess` is false', (productId) => {
  const { asFragment } = render(<AppAvatar productId={productId} hasAccess={false} />)
  expect(asFragment()).toMatchSnapshot()
})
