import { MediaStateProvider } from '.'
import { MediaMobileExample, AllBreakPointExample } from './media.story-component'

export default {
  title: 'Deprecated/MediaStateProvider',
  component: MediaStateProvider,
}

export const MediaStateProviderUsage = {
  render: ({}) => (
    <MediaStateProvider>
      <MediaMobileExample />
    </MediaStateProvider>
  ),
  name: 'MediaStateProvider usage',
}

export const MediaStateProviderBreakpoints = {
  render: ({}) => (
    <MediaStateProvider>
      <AllBreakPointExample />
    </MediaStateProvider>
  ),
  name: 'MediaStateProvider breakpoints',
}
