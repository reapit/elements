import { AppAvatar } from './app-avatar'
import { productConfigs } from '../config'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SupportedProductId } from '../config'

const productIds = Object.keys(productConfigs) as SupportedProductId[]

const meta: Meta<typeof AppAvatar> = {
  title: 'Components/AppSwitcher/AppAvatar',
  component: AppAvatar,
  argTypes: {
    productId: {
      control: { type: 'select' },
      description: 'Visual style of the avatars',
      options: productIds,
    },
  },
} satisfies Meta<typeof AppAvatar>

export default meta

type Story = StoryObj<typeof meta>

/**
 * When the user has access to the product, the avatar will appear in the primary colour.
 */
export const Example: Story = {
  args: {
    productId: 'consoleCloud',
    hasAccess: true,
  },
}

/**
 * When the user does not have access to the product, the avatar will be greyed out.
 */
export const Inaccessible: Story = {
  args: {
    ...Example.args,
    hasAccess: false,
  },
}

/**
 * All supported products are displayed here. Each product has two avatars: one for when the user has access
 * and one for when they do not.
 */
export const AllProducts: Story = {
  argTypes: {
    productId: {
      control: false,
    },
  },
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars -- if we don't have args here, our code
   * snippet for this story will be borked. */
  render: (_args) => (
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
        <AppAvatar key={`${productId}-has-access`} productId={productId} hasAccess={true} />,
        <AppAvatar key={`${productId}-has-no-access`} productId={productId} hasAccess={false} />,
      ])}
    </div>
  ),
}
