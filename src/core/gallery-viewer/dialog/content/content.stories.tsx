import preview from '#.storybook/preview'
import { GalleryViewerDialogContent } from './content'

const meta = preview.meta({
  title: 'Core/GalleryViewer/Dialog/Content',
  component: GalleryViewerDialogContent,
  argTypes: {
    children: {
      control: 'text',
    },
  },
  globals: {
    backgrounds: {
      value: 'light',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ containerType: 'inline-size', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
})

export const Example = meta.story({
  args: {
    children: 'Content area',
  },
})
