import preview from "#.storybook/preview";

import { GalleryViewerThumbnail } from "./thumbnail";
import { GalleryViewerThumbnailButton } from "./thumbnail-button";

const EXAMPLE_IMAGE_SRC =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=176&h=112&fit=crop";

const meta = preview.meta({
  title: "Content display/GalleryViewer/Thumbnail",
  component: GalleryViewerThumbnail,
  subcomponents: { ThumbnailButton: GalleryViewerThumbnailButton },
  argTypes: {
    "aria-current": {
      control: "radio",
      options: ["location", false],
    },
    isVideo: {
      control: "boolean",
    },
    src: {
      control: "text",
    },
  },
  decorators: (Story) => (
    <div style={{ width: "120px" }}>
      <Story />
    </div>
  ),
});

export const Example = meta.story({
  args: {
    "aria-current": false,
    "aria-label": "View photo of the pool",
    href: "#",
    isVideo: false,
    src: EXAMPLE_IMAGE_SRC,
  },
});

/**
 * When `aria-current="location"` is set, the thumbnail displays a highlighted border
 * to indicate the currently selected item.
 */
export const Selected = Example.extend({
  args: {
    "aria-current": "location",
  },
});

/**
 * When `isVideo` is `true`, a play icon overlay is displayed over the thumbnail
 * image to indicate that the item is a video.
 */
export const Video = Example.extend({
  args: {
    "aria-label": "View video walkthrough",
    isVideo: true,
  },
});

/**
 * When the image fails to load, the thumbnail displays a neutral placeholder via the `Image` utility's
 * built-in fallback. A custom fallback can be provided using the thumbnail's `fallback` prop.
 */
export const Fallback = Example.extend({
  args: {
    src: "https://invalid.example/does-not-exist.jpg",
  },
});

/**
 * `GalleryViewer.ThumbnailButton` renders as a `<button>` element and uses
 * `aria-pressed` to convey the selected state. Use this variant when managing
 * selection via a click handler rather than URL navigation.
 */
export const Button = meta.story({
  args: {
    "aria-current": false,
    "aria-pressed": false,
    "aria-label": "View photo of the pool",
    href: "#",
    isVideo: false,
    src: EXAMPLE_IMAGE_SRC,
  },
  argTypes: {
    "aria-current": {
      table: { disable: true },
    },
    "aria-pressed": {
      control: "boolean",
    },
    href: {
      table: { disable: true },
    },
    isVideo: {
      control: "boolean",
    },
    src: {
      control: "text",
    },
  },
  render: ({ href: _, "aria-current": __, ...args }) => (
    <GalleryViewerThumbnailButton {...(args as unknown as GalleryViewerThumbnailButton.Props)} />
  ),
});
