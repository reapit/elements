import preview from '#.storybook/preview'
import { useState } from 'react'
import { GalleryViewer } from '../gallery-viewer'
import { ChipSelect } from '#src/core/chip-select'
import { Image } from '#src/utils/image'
import { Video } from '#src/utils/video'

import type { ChangeEventHandler } from 'react'

const EXAMPLE_VIDEO_SRC = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'

const ITEMS = [
  {
    id: 'photo-1',
    type: 'photo',
    label: 'Front view',
    src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
  },
  {
    id: 'photo-2',
    type: 'photo',
    label: 'Garden view',
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
  },
  {
    id: 'photo-3',
    type: 'photo',
    label: 'Living room',
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  },
  { id: 'video-1', type: 'video', label: 'Video walkthrough', src: EXAMPLE_VIDEO_SRC },
] as const

function imageSrc(baseSrc: string, width: number, height: number) {
  return `${baseSrc}?w=${width}&h=${height}&fit=crop`
}

const meta = preview.meta({
  title: 'Content display/GalleryViewer/CarouselLayout',
  component: GalleryViewer.CarouselLayout,
  argTypes: {
    main: { control: false },
    sidebar: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '500px', border: '1px solid var(--colour-border-neutral-light-default)' }}>
        <Story />
      </div>
    ),
  ],
})

export const Example = meta.story({
  args: {
    main: null,
    sidebar: null,
  },
  parameters: {
    docs: { source: { type: 'code' } },
  },
  render: function Example() {
    const [filter, setFilter] = useState(['all'])
    const [value, setValue] = useState<string>(ITEMS[0].id)

    const onFilterChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const option = event.currentTarget
      setFilter((current) => ChipSelect.determineNextControlledState(current, option))
    }

    const showPhotos = filter.includes('all') || filter.includes('photos')
    const showVideos = filter.includes('all') || filter.includes('videos')

    const visibleItems = ITEMS.filter(
      (item) => (item.type === 'photo' && showPhotos) || (item.type === 'video' && showVideos),
    )

    return (
      <GalleryViewer.CarouselLayout
        main={
          <GalleryViewer.Carousel aria-label="Property media" onChange={setValue} value={value}>
            <GalleryViewer.Carousel.Button aria-label="Previous" direction="previous" />
            <GalleryViewer.Carousel.Track>
              {visibleItems.map((item) => (
                <GalleryViewer.Carousel.Item id={item.id} key={item.id}>
                  {item.type === 'photo' ? (
                    <Image
                      alt={item.label}
                      height="100%"
                      objectFit="cover"
                      src={imageSrc(item.src, 800, 600)}
                      width="100%"
                    />
                  ) : (
                    <Video controls height="100%" objectFit="contain" src={item.src} width="100%" />
                  )}
                  <GalleryViewer.Caption>{item.label}</GalleryViewer.Caption>
                </GalleryViewer.Carousel.Item>
              ))}
            </GalleryViewer.Carousel.Track>
            <GalleryViewer.Carousel.Button aria-label="Next" direction="next" />
          </GalleryViewer.Carousel>
        }
        sidebar={
          <>
            <ChipSelect size="small">
              <ChipSelect.Option checked={filter.includes('all')} onChange={onFilterChange} value="all">
                All
              </ChipSelect.Option>
              <ChipSelect.Option checked={filter.includes('photos')} onChange={onFilterChange} value="photos">
                Photos
              </ChipSelect.Option>
              <ChipSelect.Option checked={filter.includes('videos')} onChange={onFilterChange} value="videos">
                Videos
              </ChipSelect.Option>
            </ChipSelect>
            <GalleryViewer.ThumbnailList>
              {visibleItems.map((item) => (
                <GalleryViewer.ThumbnailList.ButtonItem
                  aria-label={`View ${item.label.toLowerCase()}`}
                  aria-pressed={value === item.id}
                  isVideo={item.type === 'video'}
                  key={item.id}
                  onClick={() => setValue(item.id)}
                  src={item.type === 'photo' ? imageSrc(item.src, 176, 112) : imageSrc(ITEMS[0].src, 176, 112)}
                />
              ))}
            </GalleryViewer.ThumbnailList>
          </>
        }
      />
    )
  },
})
