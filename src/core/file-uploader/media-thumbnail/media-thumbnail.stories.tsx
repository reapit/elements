import preview from "#.storybook/preview";

import { FileUploaderMediaThumbnail } from "./media-thumbnail";

const meta = preview.meta({
  title: "Input and selection/FileUploader/MediaThumbnail",
  component: FileUploaderMediaThumbnail,
});

/**
 * To start, the file is considered queued for upload.
 */
export const Example = meta.story({
  args: {
    status: "queued",
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=272&fit=crop",
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
 * If an error occurs during the upload process, the thumbnail displays with a centred error icon.
 */
export const Error = Example.extend({
  args: {
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
 * The media card will fill the space available to it. Images use `object-fit: cover` to crop and fill the card's
 * thumbnail area.
 */
export const Sizing = meta.story({
  args: {
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=272&fit=crop",
    status: "uploaded" as const,
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
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=272&fit=crop",
    status: "uploaded",
  },
  render: (args) => (
    <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(2, 200px)" }}>
      <FileUploaderMediaThumbnail {...args} />
      <FileUploaderMediaThumbnail
        {...args}
        src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&h=400&fit=crop"
      />
    </div>
  ),
});
