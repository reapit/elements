import { FocusedLayoutProductLogo, supportedProductLogos } from './product-logo'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/FocusedLayout/ProductLogo',
  component: FocusedLayoutProductLogo,
  argTypes: {
    product: {
      control: 'select',
      options: supportedProductLogos,
    },
  },
} satisfies Meta<typeof FocusedLayoutProductLogo>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default story showcases the ProductLogo component with the Reapit product.
 * The component renders SVG device icons at a consistent 24x24 size.
 */
export const Example: Story = {
  args: {
    product: 'Reapit',
  },
}

/**
 * This story demonstrates all supported product logos.
 */
export const AllProducts: StoryObj = {
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', alignItems: 'start', flexDirection: 'row', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      {supportedProductLogos.map((product) => (
        <FocusedLayoutProductLogo key={product} product={product} />
      ))}
    </>
  ),
}
