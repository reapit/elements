import { GalleryViewerMediaItemCaption } from '../media-item-caption'
import { GalleryViewerMediaList } from './media-list'
import { Image } from '#src/utils/image'
import { Video } from '#src/utils/video'

import type { Meta, StoryObj } from '@storybook/react-vite'

const EXAMPLE_IMAGE_1 = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
const EXAMPLE_IMAGE_2 = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
const EXAMPLE_IMAGE_3 = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
const EXAMPLE_VIDEO_SRC = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'

const meta = {
  title: 'Core/GalleryViewer/MediaList',
  component: GalleryViewerMediaList,
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof GalleryViewerMediaList>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    children: (
      <>
        <GalleryViewerMediaList.Item id="item-1">
          <Image alt="Front view" height="100%" objectFit="cover" src={EXAMPLE_IMAGE_1} width="100%" />
          <GalleryViewerMediaItemCaption>Front view</GalleryViewerMediaItemCaption>
        </GalleryViewerMediaList.Item>
        <GalleryViewerMediaList.Item id="item-2">
          <Image alt="Garden view" height="100%" objectFit="cover" src={EXAMPLE_IMAGE_2} width="100%" />
          <GalleryViewerMediaItemCaption>Garden view</GalleryViewerMediaItemCaption>
        </GalleryViewerMediaList.Item>
        <GalleryViewerMediaList.Item id="item-3">
          <Image alt="Living room" height="100%" objectFit="cover" src={EXAMPLE_IMAGE_3} width="100%" />
        </GalleryViewerMediaList.Item>
        <GalleryViewerMediaList.Item id="item-4">
          <Video controls height="100%" objectFit="contain" src={EXAMPLE_VIDEO_SRC} width="100%" />
        </GalleryViewerMediaList.Item>
      </>
    ),
  },
}
