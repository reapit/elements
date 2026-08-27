import preview from "#.storybook/preview";

import { FileUploaderCircularProgress } from "./circular-progress";

const meta = preview.meta({
  title: "Input and selection/FileUploader/MediaThumbnail/CircularProgress",
  component: FileUploaderCircularProgress,
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
    },
  },
  globals: {
    backgrounds: {
      value: "dark",
    },
  },
});

/**
 * The dark background mimics `FileUploaderMediaThumbnail`'s overlay, the only context this component is
 * used in: its white fill is otherwise invisible on a light background.
 */
export const Example = meta.story({
  args: {
    value: 20,
  },
});

/**
 * Values above `100` are clamped, so out-of-range values are handled safely.
 */
export const Complete = Example.extend({
  args: {
    value: 100,
  },
});
