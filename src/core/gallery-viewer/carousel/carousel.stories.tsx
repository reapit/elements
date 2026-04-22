import preview from '#.storybook/preview'
import { useState } from 'react'
import { GalleryViewerCarousel } from './carousel'
import { GalleryViewerMediaItemCaption } from '../media-item-caption'
import { ChipSelect } from '#src/core/chip-select'
import { Image } from '#src/utils/image'
import { Video } from '#src/utils/video'

import type { ChangeEventHandler } from 'react'

const EXAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
]

const EXAMPLE_VIDEO_SRC = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'

const meta = preview.meta({
  title: 'Core/GalleryViewer/Carousel',
  component: GalleryViewerCarousel,
  argTypes: {
    children: { control: false },
  },
  decorators: (Story) => (
    <div style={{ width: '800px' }}>
      <Story />
    </div>
  ),
})

/**
 * Uncontrolled carousel. Swipe or click the buttons to navigate between items.
 * The buttons scroll the track automatically — no `onClick` handler required.
 * The previous button is hidden on the first item and the next button is hidden on the last.
 */
export const Example = meta.story({
  args: {
    'aria-label': 'Property photos',
    children: (
      <>
        <GalleryViewerCarousel.Button aria-label="Previous" direction="previous" />
        <GalleryViewerCarousel.Track>
          <GalleryViewerCarousel.Item id="item-1">
            <Image alt="Photo 1" height="100%" objectFit="cover" src={EXAMPLE_IMAGES[0]} width="100%" />
            <GalleryViewerMediaItemCaption>Photo 1</GalleryViewerMediaItemCaption>
          </GalleryViewerCarousel.Item>

          <GalleryViewerCarousel.Item id="item-2">
            <Image alt="Photo 2" height="100%" objectFit="cover" src={EXAMPLE_IMAGES[1]} width="100%" />
            <GalleryViewerMediaItemCaption>Photo 2</GalleryViewerMediaItemCaption>
          </GalleryViewerCarousel.Item>

          <GalleryViewerCarousel.Item id="item-3">
            <Image alt="Photo 3" height="100%" objectFit="cover" src={EXAMPLE_IMAGES[2]} width="100%" />
            <GalleryViewerMediaItemCaption>Photo 3</GalleryViewerMediaItemCaption>
          </GalleryViewerCarousel.Item>
        </GalleryViewerCarousel.Track>
        <GalleryViewerCarousel.Button aria-label="Next" direction="next" />
      </>
    ),
    defaultValue: 'item-1',
  },
})

/**
 * Controlled carousel. `value` and `onChange` keep external state in sync with
 * the visible item. The buttons scroll the track automatically — consumers no
 * longer need to wire up `onClick` handlers or track item indices manually.
 */
export const Controlled = meta.story({
  args: {
    'aria-label': 'Property photos',
  },
  render: function Controlled(args) {
    const ids = ['item-1', 'item-2', 'item-3']
    const [value, setValue] = useState('item-1')

    return (
      <GalleryViewerCarousel {...args} onChange={setValue} value={value}>
        <GalleryViewerCarousel.Button aria-label="Previous" direction="previous" />
        <GalleryViewerCarousel.Track>
          {EXAMPLE_IMAGES.map((src, i) => (
            <GalleryViewerCarousel.Item id={ids[i]} key={ids[i]}>
              <Image alt={`Photo ${i + 1}`} height="100%" objectFit="cover" src={src} width="100%" />
              <GalleryViewerMediaItemCaption>
                Photo {i + 1} of {ids.length}
              </GalleryViewerMediaItemCaption>
            </GalleryViewerCarousel.Item>
          ))}
        </GalleryViewerCarousel.Track>
        <GalleryViewerCarousel.Button aria-label="Next" direction="next" />
      </GalleryViewerCarousel>
    )
  },
})

/**
 * A carousel item can contain a `Video` element instead of an `Image`.
 */
export const VideoItem = meta.story({
  args: {
    'aria-label': 'Property media',
    children: (
      <>
        <GalleryViewerCarousel.Button aria-label="Previous" direction="previous" />
        <GalleryViewerCarousel.Track>
          <GalleryViewerCarousel.Item id="photo-1">
            <Image alt="House exterior" height="100%" objectFit="cover" src={EXAMPLE_IMAGES[0]} width="100%" />
            <GalleryViewerMediaItemCaption>Photo</GalleryViewerMediaItemCaption>
          </GalleryViewerCarousel.Item>
          <GalleryViewerCarousel.Item id="video-1">
            <Video controls height="100%" objectFit="contain" src={EXAMPLE_VIDEO_SRC} width="100%" />
          </GalleryViewerCarousel.Item>
        </GalleryViewerCarousel.Track>
        <GalleryViewerCarousel.Button aria-label="Next" direction="next" />
      </>
    ),
    defaultValue: 'video-1',
  },
})

/**
 * If the carousel's `value` is controlled, but no `onChange` handler is provided, the carousel
 * will be "read-only" and prevent scroll interaction.
 */
export const ReadOnly = Example.extend({
  name: 'Read-only',
  args: {
    value: 'item-2',
  },
})

/**
 * The carousel will fill its container while preserving the aspect-ratio of the media items.
 */
export const Sizing = Example.extend({
  decorators: [
    (Story) => (
      <div style={{ border: '1px solid #FA00FF', width: '400px' }}>
        <Story />
      </div>
    ),
  ],
})

/**
 * When an image fails to load, the `Image` component's built-in fallback is
 * displayed inside the carousel item. The second item shows a valid image for
 * comparison.
 */
export const ErrorFallback = meta.story({
  args: {
    'aria-label': 'Property photos',
    children: (
      <>
        <GalleryViewerCarousel.Button aria-label="Previous" direction="previous" />
        <GalleryViewerCarousel.Track>
          <GalleryViewerCarousel.Item id="item-1">
            <Image
              alt="Broken image"
              height="100%"
              objectFit="cover"
              src="https://invalid.example/broken.jpg"
              width="100%"
            />
          </GalleryViewerCarousel.Item>
          <GalleryViewerCarousel.Item id="item-2">
            <Image alt="Front view" height="100%" objectFit="cover" src={EXAMPLE_IMAGES[0]} width="100%" />
          </GalleryViewerCarousel.Item>
        </GalleryViewerCarousel.Track>
        <GalleryViewerCarousel.Button aria-label="Next" direction="next" />
      </>
    ),
    defaultValue: 'item-1',
  },
})

/**
 * Filters applied outside the carousel can add or remove items from the track at any time.
 * When the currently visible item is removed by a filter change, the carousel automatically
 * snaps to the first remaining item. Use the chip select below to toggle between all items,
 * photos only, and videos only.
 */
export const Filtered = meta.story({
  args: {
    'aria-label': 'Property media',
  },
  parameters: {
    docs: { source: { type: 'code' } },
  },
  render: function Filtered(args) {
    const [filter, setFilter] = useState(['all'])
    const [value, setValue] = useState('photo-1')

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const option = event.currentTarget
      setFilter((current) => ChipSelect.determineNextControlledState(current, option))
    }

    const showPhotos = filter.includes('all') || filter.includes('photos')
    const showVideo = filter.includes('all') || filter.includes('videos')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <ChipSelect size="small">
          <ChipSelect.Option checked={filter.includes('all')} onChange={onChange} value="all">
            All
          </ChipSelect.Option>
          <ChipSelect.Option checked={filter.includes('photos')} onChange={onChange} value="photos">
            Photos
          </ChipSelect.Option>
          <ChipSelect.Option checked={filter.includes('videos')} onChange={onChange} value="videos">
            Videos
          </ChipSelect.Option>
        </ChipSelect>

        <GalleryViewerCarousel {...args} onChange={setValue} value={value}>
          <GalleryViewerCarousel.Button aria-label="Previous" direction="previous" />
          <GalleryViewerCarousel.Track>
            {showPhotos && (
              <GalleryViewerCarousel.Item id="photo-1" key="photo-1">
                <Image alt="Photo 1" height="100%" objectFit="cover" src={EXAMPLE_IMAGES[0]} width="100%" />
                <GalleryViewerMediaItemCaption>Photo 1</GalleryViewerMediaItemCaption>
              </GalleryViewerCarousel.Item>
            )}
            {showPhotos && (
              <GalleryViewerCarousel.Item id="photo-2" key="photo-2">
                <Image alt="Photo 2" height="100%" objectFit="cover" src={EXAMPLE_IMAGES[1]} width="100%" />
                <GalleryViewerMediaItemCaption>Photo 2</GalleryViewerMediaItemCaption>
              </GalleryViewerCarousel.Item>
            )}
            {showVideo && (
              <GalleryViewerCarousel.Item id="video-1" key="video-1">
                <Video controls height="100%" objectFit="contain" src={EXAMPLE_VIDEO_SRC} width="100%" />
                <GalleryViewerMediaItemCaption>Video 1</GalleryViewerMediaItemCaption>
              </GalleryViewerCarousel.Item>
            )}
          </GalleryViewerCarousel.Track>
          <GalleryViewerCarousel.Button aria-label="Next" direction="next" />
        </GalleryViewerCarousel>
      </div>
    )
  },
})
