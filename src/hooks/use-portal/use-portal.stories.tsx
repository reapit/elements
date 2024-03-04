import { Portal } from '.'

export default {
  title: 'Portal',
  component: Portal,
}

export const PortalUsage = {
  render: ({}) => (
    <Portal id="docs-root">
      <div>I am a Portal Example!</div>
    </Portal>
  ),

  name: 'Portal usage',
}
