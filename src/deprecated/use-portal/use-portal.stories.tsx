import preview from '#.storybook/preview'
import { Portal } from '.'

const meta = preview.meta({
  title: 'Deprecated/Portal',
  component: Portal,
})

export default meta

export const PortalUsage = meta.story({
  render: () => (
    <Portal id="docs-root">
      <div>I am a Portal Example!</div>
    </Portal>
  ),
  name: 'Portal usage',
})
