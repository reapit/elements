import { GalleryViewerMediaItem } from './media-item'
import { GalleryViewerMediaItemCaption } from './media-item-caption'
import { Image } from '#src/utils/image'
import { Video } from '#src/utils/video'

import type { Meta, StoryObj } from '@storybook/react-vite'

const EXAMPLE_IMAGE = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
const EXAMPLE_VIDEO_SRC = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'

const meta = {
  title: 'Core/GalleryViewer/MediaItem',
  component: GalleryViewerMediaItem,
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof GalleryViewerMediaItem>

export default meta
type Story = StoryObj<typeof meta>

/**
 * A media item containing an image. The item fills the full width and height
 * of the scroll track.
 */
export const Example: Story = {
  args: {
    id: 'item-1',
  },
  render: (args) => (
    <GalleryViewerMediaItem {...args}>
      <Image alt="Front view" height="100%" objectFit="cover" src={EXAMPLE_IMAGE} width="100%" />
    </GalleryViewerMediaItem>
  ),
}

/**
 * A caption pill can be placed inside the item using `GalleryViewerMediaItemCaption`.
 * It is positioned absolutely at the bottom-left of the item.
 */
export const WithCaption: Story = {
  args: {
    ...Example.args,
  },
  render: (args) => (
    <GalleryViewerMediaItem {...args}>
      <Image alt="Front view" height="100%" objectFit="cover" src={EXAMPLE_IMAGE} width="100%" />
      <GalleryViewerMediaItemCaption>Front view</GalleryViewerMediaItemCaption>
    </GalleryViewerMediaItem>
  ),
}

/**
 * A media item can contain a `Video` element. Use `objectFit="contain"` to
 * letterbox the video within the item.
 */
export const WithVideo: Story = {
  args: {
    ...Example.args,
  },
  render: (args) => (
    <GalleryViewerMediaItem {...args}>
      <Video controls height="100%" objectFit="contain" src={EXAMPLE_VIDEO_SRC} width="100%" />
    </GalleryViewerMediaItem>
  ),
}

/**
 * When an image fails to load, the `Image` component displays a fallback state
 * inside the item. The carousel container's `border-radius` clips the fallback corners.
 */
export const Fallback: Story = {
  args: {
    ...Example.args,
  },
  render: (args) => (
    <GalleryViewerMediaItem {...args}>
      <Image alt="Broken image" height="100%" objectFit="cover" src="https://invalid.example/broken.jpg" width="100%" />
    </GalleryViewerMediaItem>
  ),
}
