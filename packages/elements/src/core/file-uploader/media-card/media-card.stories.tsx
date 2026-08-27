import preview from "#.storybook/preview";

import { FileUploaderMediaCard } from "./media-card";

const meta = preview.meta({
  title: "Input and selection/FileUploader/MediaCard",
  component: FileUploaderMediaCard,
});

/**
 * To start, the file is considered queued for upload.
 */
export const Example = meta.story({
  args: {
    fileName: "Property-photo.jpg",
    fileSize: 3.6 * 1000 * 1000, // 3.6 MB
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=272&fit=crop",
    status: "queued" as const,
    onRemove: () => {},
  },
  // Since MediaCard fills its container's width by design, we limit it here to avoid it taking up the entire
  // Storybook canvas.
  decorators: [
    (Story) => (
      <div style={{ width: "200px" }}>
        <Story />
      </div>
    ),
  ],
});

/**
 * Once uploading begins, progress can be reported using the `progress` prop, rendered as a circular progress
 * indicator over the thumbnail.
 */
export const Uploading = Example.extend({
  args: {
    status: "uploading",
    progress: 90,
  },
});

/**
 * Upload `progress` is optional as some uploads cannot report it. Omitting the progress percentage renders an
 * indeterminate spinner instead.
 */
export const UploadingIndeterminate = Example.extend({
  name: "Uploading (indeterminate)",
  args: {
    status: "uploading",
  },
});

/**
 * Processing is typically used when media files are being processed or file scanning is being performed. It is
 * always indeterminate.
 */
export const Processing = Example.extend({
  args: {
    status: "processing",
  },
});

/**
 * Once uploaded, the dimming overlay and status icon are removed, leaving a plain thumbnail.
 */
export const Uploaded = Example.extend({
  args: {
    status: "uploaded",
  },
});

/**
 * If an error occurs during the upload process, the file should be marked as errored and an error message
 * displayed, with a red border and centred error icon on the thumbnail.
 */
export const Error = Example.extend({
  args: {
    errorMessage: "File too large",
    status: "error",
  },
});

/**
 * A `duration` shows an overlay badge on the thumbnail, for video files.
 */
export const Video = Example.extend({
  args: {
    duration: "15:39",
    fileName: "Property-tour.mp4",
    status: "uploaded",
  },
});

/**
 * When the title is too long to fit in the available space, it is truncated with an ellipsis.
 */
export const Truncation = Example.extend({
  args: {
    fileName: "Very-long-property-photo-name-for-truncation-testing.jpg",
    onRemove: undefined,
    status: "uploaded",
  },
});

/**
 * Omitting `onRemove` renders a read-only card, with no remove button.
 */
export const ReadOnly = Example.extend({
  name: "Read-only",
  args: {
    onRemove: undefined,
    status: "uploaded",
  },
});

/**
 * `fileName` is optional: omit it to render a card with no name row, useful when the file name isn't
 * meaningful to the end user.
 */
export const NoFileName = Example.extend({
  name: "No file name",
  args: {
    fileName: undefined,
    status: "uploaded",
  },
});

/**
 * The media card will fill the space available to it. Images use `object-fit: cover` to crop and fill the card's
 * thumbnail area.
 */
export const Sizing = meta.story({
  args: {
    fileName: "Living-room.jpg",
    fileSize: 3.6 * 1000 * 1000, // 3.6 MB
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=272&fit=crop",
    status: "uploaded" as const,
    onRemove: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
});

/**
 * In a CSS grid with a defined row height, every card's thumbnail stretches to fill its cell and crops via
 * `object-fit: cover`. The two images shown here have different intrinsic ratios, but end up the same height.
 */
export const Layout = meta.story({
  args: {
    fileName: "Living-room.jpg",
    fileSize: 3.6 * 1000 * 1000, // 3.6 MB
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=272&fit=crop",
    status: "uploaded" as const,
    onRemove: () => {},
  },
  render: (args) => (
    <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(2, 200px)" }}>
      <FileUploaderMediaCard {...args} />
      <FileUploaderMediaCard
        {...args}
        fileName="Kitchen.jpg"
        src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&h=400&fit=crop"
      />
    </div>
  ),
});
