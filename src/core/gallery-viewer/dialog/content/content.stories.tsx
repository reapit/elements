import preview from '#.storybook/preview'
import { GalleryViewerDialog } from '../dialog'

const meta = preview.meta({
  title: 'Core/GalleryViewer/Dialog/Content',
  component: GalleryViewerDialog.Content,
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
