import preview from '#.storybook/preview'
import { TopBar } from '../top-bar'
import { supportedAppNames } from './app-logo'

const href = '#'

const meta = preview.meta({
  title: 'Navigation/TopBar/BrandLogo',
  component: TopBar.BrandLogo,
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
      <TopBar.BrandLogo appName="Reapit" href={href} />
      <TopBar.BrandLogo appName="Console Owner" href={href} />
      <TopBar.BrandLogo appName="Console Pay" href={href} />
      <TopBar.BrandLogo appName="Console Tenant" href={href} />
      <TopBar.BrandLogo appName="Reapit Connect" href={href} />
      <TopBar.BrandLogo appName="Reapit Projector" href={href} />
      <TopBar.BrandLogo appName="Reapit Sales" href={href} />
      <TopBar.BrandLogo appName="Reapit Lettings" href={href} />
      <TopBar.BrandLogo appName="Reapit PM" href={href} />
      <TopBar.BrandLogo appName="PM Demo" href={href} />
      <TopBar.BrandLogo appName="PM Sales" href={href} />
      <TopBar.BrandLogo appName="PM Inspect" href={href} />
      <TopBar.BrandLogo appName="Reapit Forms" href={href} />
      <TopBar.BrandLogo appName="Reapit Websites" href={href} />
      <TopBar.BrandLogo appName="Reapit Proposals" href={href} />
      <TopBar.BrandLogo appName="KeyWhere" href={href} />
      <TopBar.BrandLogo appName="Auto Responder" href={href} />
    </>
  ),
})
