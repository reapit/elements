import preview from '#.storybook/preview'
import { GalleryViewerMediaItemCaption } from '../media-item-caption'
import { GalleryViewer } from '../gallery-viewer'
import { Image } from '#src/utils/image'
import { Video } from '#src/utils/video'

const EXAMPLE_IMAGE_1 = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
const EXAMPLE_IMAGE_2 = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
const EXAMPLE_IMAGE_3 = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
const EXAMPLE_VIDEO_SRC = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'

const meta = preview.meta({
  title: 'Core/GalleryViewer/MediaList',
  component: GalleryViewer.MediaList,
  argTypes: {
    children: { control: false },
  },
})

export const Example = meta.story({
  args: {
    children: (
      <>
        <GalleryViewer.MediaList.Item id="item-1">
          <Image alt="Front view" height="100%" objectFit="cover" src={EXAMPLE_IMAGE_1} width="100%" />
          <GalleryViewerMediaItemCaption>Front view</GalleryViewerMediaItemCaption>
        </GalleryViewer.MediaList.Item>
        <GalleryViewer.MediaList.Item id="item-2">
          <Image alt="Garden view" height="100%" objectFit="cover" src={EXAMPLE_IMAGE_2} width="100%" />
          <GalleryViewerMediaItemCaption>Garden view</GalleryViewerMediaItemCaption>
        </GalleryViewer.MediaList.Item>
        <GalleryViewer.MediaList.Item id="item-3">
          <Image alt="Living room" height="100%" objectFit="cover" src={EXAMPLE_IMAGE_3} width="100%" />
        </GalleryViewer.MediaList.Item>
        <GalleryViewer.MediaList.Item id="item-4">
          <Video controls height="100%" objectFit="contain" src={EXAMPLE_VIDEO_SRC} width="100%" />
        </GalleryViewer.MediaList.Item>
      </>
    ),
  },
})
