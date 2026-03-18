import { GalleryViewerThumbnail } from './thumbnail'
import { GalleryViewerThumbnailButton } from './thumbnail-button'

import type { Meta, StoryObj } from '@storybook/react-vite'

const EXAMPLE_IMAGE_SRC = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=176&h=112&fit=crop'

const meta: Meta<typeof GalleryViewerThumbnail> = {
  title: 'Core/GalleryViewer/Thumbnail',
  component: GalleryViewerThumbnail,
  argTypes: {
    'aria-current': {
      control: 'radio',
      options: ['page', false],
    },
    isVideo: {
      control: 'boolean',
    },
    src: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-current': false,
    'aria-label': 'View photo of the pool',
    href: '#',
    isVideo: false,
    src: EXAMPLE_IMAGE_SRC,
  },
}

/**
 * When `aria-current="page"` is set, the thumbnail displays a highlighted border
 * to indicate the currently selected item.
 */
export const Selected: Story = {
  args: {
    ...Example.args,
    'aria-current': 'page',
  },
}

/**
 * When `isVideo` is `true`, a play icon overlay is displayed over the thumbnail
 * image to indicate that the item is a video.
 */
export const Video: Story = {
  args: {
    ...Example.args,
    'aria-label': 'View video walkthrough',
    isVideo: true,
  },
}

/**
 * When the image fails to load, the thumbnail displays a neutral placeholder via the `Image` utility's
 * built-in fallback. A custom fallback can be provided using the thumbnail's `fallback` prop.
 */
export const Fallback: Story = {
  args: {
    ...Example.args,
    src: 'https://invalid.example/does-not-exist.jpg',
  },
}

/**
 * `GalleryViewer.ThumbnailButton` renders as a `<button>` element and uses
 * `aria-pressed` to convey the selected state. Use this variant when managing
 * selection via a click handler rather than URL navigation.
 */
export const Button: StoryObj<typeof GalleryViewerThumbnailButton> = {
  render: (args) => <GalleryViewerThumbnailButton {...args} />,
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
}
