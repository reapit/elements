import { GalleryViewerThumbnailList } from './thumbnail-list'

import type { Meta, StoryObj } from '@storybook/react-vite'

const EXAMPLE_IMAGE_SRC = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=176&h=112&fit=crop'
const EXAMPLE_IMAGE_SRC_2 = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=176&h=112&fit=crop'
const EXAMPLE_IMAGE_SRC_3 = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=176&h=112&fit=crop'
const EXAMPLE_IMAGE_SRC_4 = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=176&h=112&fit=crop'
const EXAMPLE_IMAGE_SRC_5 = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=176&h=112&fit=crop'
const EXAMPLE_IMAGE_SRC_6 = 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=176&h=112&fit=crop'
const EXAMPLE_IMAGE_SRC_7 = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=176&h=112&fit=crop'

const meta: Meta<typeof GalleryViewerThumbnailList> = {
  title: 'Core/GalleryViewer/ThumbnailList',
  component: GalleryViewerThumbnailList,
  argTypes: {
    children: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * The default usage with anchor-based thumbnails. Wrap in a `<nav
 * aria-label="…">` when the list represents a navigation landmark.
 */
export const Example: Story = {
  args: {
    children: (
      <>
        <GalleryViewerThumbnailList.Item
          aria-current="page"
          aria-label="View photo 1"
          href="#1"
          src={EXAMPLE_IMAGE_SRC}
        />
        <GalleryViewerThumbnailList.Item
          aria-current={false}
          aria-label="View photo 2"
          href="#2"
          src={EXAMPLE_IMAGE_SRC_2}
        />
        <GalleryViewerThumbnailList.Item
          aria-current={false}
          aria-label="View photo 3"
          href="#3"
          src={EXAMPLE_IMAGE_SRC_3}
        />
        <GalleryViewerThumbnailList.Item
          aria-current={false}
          aria-label="View photo 4"
          href="#4"
          src={EXAMPLE_IMAGE_SRC_4}
        />
        <GalleryViewerThumbnailList.Item
          aria-current={false}
          aria-label="View photo 5"
          href="#5"
          src={EXAMPLE_IMAGE_SRC_5}
        />
        <GalleryViewerThumbnailList.Item
          aria-current={false}
          aria-label="View photo 6"
          href="#6"
          src={EXAMPLE_IMAGE_SRC_6}
        />
        <GalleryViewerThumbnailList.Item
          aria-current={false}
          aria-label="View video walkthrough"
          href="#7"
          isVideo
          src={EXAMPLE_IMAGE_SRC_7}
        />
      </>
    ),
  },
}

/**
 * Use `GalleryViewerThumbnailList.ButtonItem` when managing selection via a
 * click handler rather than URL navigation.
 */
export const Button: Story = {
  args: {
    children: (
      <>
        <GalleryViewerThumbnailList.ButtonItem aria-pressed={true} aria-label="View photo 1" src={EXAMPLE_IMAGE_SRC} />
        <GalleryViewerThumbnailList.ButtonItem
          aria-pressed={false}
          aria-label="View photo 2"
          src={EXAMPLE_IMAGE_SRC_2}
        />
        <GalleryViewerThumbnailList.ButtonItem
          aria-pressed={false}
          aria-label="View photo 3"
          src={EXAMPLE_IMAGE_SRC_3}
        />
        <GalleryViewerThumbnailList.ButtonItem
          aria-pressed={false}
          aria-label="View photo 4"
          src={EXAMPLE_IMAGE_SRC_4}
        />
        <GalleryViewerThumbnailList.ButtonItem
          aria-pressed={false}
          aria-label="View photo 5"
          src={EXAMPLE_IMAGE_SRC_5}
        />
        <GalleryViewerThumbnailList.ButtonItem
          aria-pressed={false}
          aria-label="View photo 6"
          src={EXAMPLE_IMAGE_SRC_6}
        />
        <GalleryViewerThumbnailList.ButtonItem
          aria-pressed={false}
          aria-label="View video walkthrough"
          isVideo
          src={EXAMPLE_IMAGE_SRC_7}
        />
      </>
    ),
  },
}

export const Layout: Story = {
  args: {
    ...Example.args,
  },
  decorators: (Story) => (
    <div style={{ boxSizing: 'content-box', width: 'var(--size-64)', border: '1px solid #FF00FA' }}>
      <Story />
    </div>
  ),
}
