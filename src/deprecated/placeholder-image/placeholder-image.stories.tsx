import preview from '#.storybook/preview'
import { PlaceholderImage } from './index'

const meta = preview.meta({
  title: 'Deprecated/PlaceholderImage',
  component: PlaceholderImage,
})

export const BasicUsage = meta.story({
  render: () => <PlaceholderImage placeholder="placeholderSmall" size={120} />,
})

export const FillAvailableSpace = meta.story({
  render: () => <PlaceholderImage placeholder="placeholderSmall" size={120} fillAvailable />,
})
