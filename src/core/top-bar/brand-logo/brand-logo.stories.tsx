import preview from '#.storybook/preview'
import { BrandLogo } from './brand-logo'
import { supportedAppNames } from './app-logo'

const href = '#'

const meta = preview.meta({
  title: 'Core/TopBar/BrandLogo',
  component: BrandLogo,
  argTypes: {
    appName: {
      control: 'select',
      options: supportedAppNames,
    },
  },
})

/**
 * The default story showcases the BrandLogo component with the Reapit brand.
 * The component renders SVG logos within a styled container, maintaining consistent
 * sizing and layout across all brand variants.
 */
export const Example = meta.story({
  args: {
    appName: 'Reapit',
    href,
  },
})

/**
 * This story demonstrates all supported brand logos.
 */
export const AllBrands = meta.story({
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', alignItems: 'start', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <BrandLogo appName="Reapit" href={href} />
      <BrandLogo appName="Console Owner" href={href} />
      <BrandLogo appName="Console Pay" href={href} />
      <BrandLogo appName="Console Tenant" href={href} />
      <BrandLogo appName="Reapit Connect" href={href} />
      <BrandLogo appName="Reapit Projector" href={href} />
      <BrandLogo appName="Reapit Sales" href={href} />
      <BrandLogo appName="Reapit Lettings" href={href} />
      <BrandLogo appName="Reapit PM" href={href} />
      <BrandLogo appName="PM Demo" href={href} />
      <BrandLogo appName="PM Sales" href={href} />
      <BrandLogo appName="PM Inspect" href={href} />
      <BrandLogo appName="Reapit Forms" href={href} />
      <BrandLogo appName="Reapit Websites" href={href} />
      <BrandLogo appName="Reapit Proposals" href={href} />
      <BrandLogo appName="KeyWhere" href={href} />
      <BrandLogo appName="Auto Responder" href={href} />
    </>
  ),
})
