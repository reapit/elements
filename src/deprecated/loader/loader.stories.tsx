import preview from '#.storybook/preview'
import { Loader } from './index'

const meta = preview.meta({
  title: 'Deprecated/Loader',
  component: Loader,
})

export default meta

export const Inline = meta.story({
  render: () => <Loader />,
})

export const WithALabel = meta.story({
  render: () => <Loader label="Loading" />,
  name: 'With a label',
})

export const FullPageLoader = meta.story({
  render: () => <p>This loader is fixed to the center of the screen</p>,
  name: 'Full page loader',
})
