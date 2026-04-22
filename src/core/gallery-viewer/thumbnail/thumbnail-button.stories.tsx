import preview from '#.storybook/preview'
import { GalleryViewerThumbnailButton } from './thumbnail-button'

const EXAMPLE_IMAGE_SRC = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=176&h=112&fit=crop'

const meta = preview.meta({
  title: 'Core/GalleryViewer/Thumbnail',
  component: GalleryViewerThumbnailButton,
  decorators: (Story) => (
    <div style={{ width: '120px' }}>
      <Story />
    </div>
  ),
})

/**
 * `GalleryViewer.ThumbnailButton` renders as a `<button>` element and uses
 * `aria-pressed` to convey the selected state. Use this variant when managing
 * selection via a click handler rather than URL navigation.
 */
export const Button = meta.story({
  args: {
    'aria-pressed': false,
    'aria-label': 'View photo of the pool',
    isVideo: false,
    src: EXAMPLE_IMAGE_SRC,
  },
  argTypes: {
    'aria-pressed': {
      control: 'boolean',
    },
    isVideo: {
      control: 'boolean',
    },
    src: {
      control: 'text',
    },
  },
})
