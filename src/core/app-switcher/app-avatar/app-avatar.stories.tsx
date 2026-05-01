import preview from '#.storybook/preview'
import { AppSwitcher } from '../app-switcher'
import { productConfigs } from '../config'

import type { SupportedProductId } from '../config'

const productIds = Object.keys(productConfigs) as SupportedProductId[]

const meta = preview.meta({
  title: 'Core/AppSwitcher/AppAvatar',
  component: AppSwitcher.AppAvatar,
  argTypes: {
    productId: {
      control: { type: 'select' },
      description: 'Visual style of the avatars',
      options: productIds,
    },
  },
})

/**
 * When the user has access to the product, the avatar will appear in the primary colour.
 */
export const Example = meta.story({
  args: {
    productId: 'consoleCloud',
    hasAccess: true,
  },
})

/**
 * When the user does not have access to the product, the avatar will be greyed out.
 */
export const Inaccessible = Example.extend({
  args: {
    hasAccess: false,
  },
})

/**
 * All supported products are displayed here. Each product has two avatars: one for when the user has access
 * and one for when they do not.
 */
export const AllProducts = meta.story({
  argTypes: {
    productId: {
      control: false,
    },
  },
  render: () => (
    <div
      style={{
        alignItems: 'center',
        display: 'grid',
        color: '#FA00FF',
        fontSize: 'var(--font-base-regular-size)',
        gridTemplateColumns: 'max-content min-content min-content',
        gap: 'var(--spacing-5)',
      }}
    >
      {productIds.map((productId) => [
        <p key={productId}>{productConfigs[productId].appName}</p>,
        <AppSwitcher.AppAvatar key={`${productId}-has-access`} productId={productId} hasAccess={true} />,
        <AppSwitcher.AppAvatar key={`${productId}-has-no-access`} productId={productId} hasAccess={false} />,
      ])}
    </div>
  ),
})
