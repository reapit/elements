import preview from '#.storybook/preview'
import { AlertBanner } from '../alert-banner'
import { AlertBannerOutlet } from '../outlet'
import { AlertBannerPortal } from './portal'
import { InfoIcon } from '#src/icons/info'

const meta = preview.meta({
  title: 'Core/AlertBanner/Portal',
  component: AlertBannerPortal,
  argTypes: {
    children: {
      control: false,
    },
    outletId: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ containerType: 'inline-size', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
})

export const Example = meta.story({
  args: {
    children: (
      <AlertBanner variant="info" icon={<InfoIcon />}>
        This banner is rendered via AlertBannerPortal
      </AlertBanner>
    ),
    outletId: 'example-portal',
  },
  decorators: [
    (Story, { args }) => (
      <>
        <AlertBannerOutlet id={args.outletId} />
        <Story />
      </>
    ),
  ],
})
