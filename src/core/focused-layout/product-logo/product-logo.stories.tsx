import preview from '#.storybook/preview'
import { FocusedLayoutProductLogo, supportedProductLogos } from './product-logo'

const meta = preview.meta({
  title: 'Core/FocusedLayout/ProductLogo',
  component: FocusedLayoutProductLogo,
  argTypes: {
    product: {
      control: 'select',
      options: supportedProductLogos,
    },
  },
})

/**
 * The default story showcases the ProductLogo component with the Reapit product.
 * The component renders SVG device icons at a consistent 24x24 size.
 */
export const Example = meta.story({
  args: {
    product: 'Reapit',
  },
})

/**
 * This story demonstrates all supported product logos.
 */
export const AllProducts = meta.story({
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
})
