import { PlaceholderImage } from './index'

export default {
  title: 'Deprecated/PlaceholderImage',
  component: PlaceholderImage,
}

export const BasicUsage = {
  render: ({}) => <PlaceholderImage placeholder="placeholderSmall" size={120} />,
}

export const FillAvailableSpace = {
  render: ({}) => <PlaceholderImage placeholder="placeholderSmall" size={120} fillAvailable />,
}
