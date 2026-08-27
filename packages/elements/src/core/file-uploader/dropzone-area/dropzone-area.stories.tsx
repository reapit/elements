import preview from "#.storybook/preview";
import { CloudUploadIcon } from "#src/icons/cloud-upload";

import { FileUploaderDropzoneArea } from "./dropzone-area";

const meta = preview.meta({
  title: "Input and selection/FileUploader/DropzoneArea",
  component: FileUploaderDropzoneArea,
  argTypes: {
    children: {
      control: "text",
    },
    secondaryText: {
      control: "text",
    },
    variant: {
      control: "select",
      options: ["compact", "large"],
    },
  },
});

/**
 * `FileUploaderDropzoneArea` is the internal trigger button shared by `FileUploader.DropzoneInput`
 * and `FileUploader.SingleSelectMediaInput`'s empty state. It has no knowledge of `FileInput` or
 * the upload queue; see those components' own stories for the full composition.
 */
export const Example = meta.story({
  args: {
    children: (
      <>
        Drag and drop your file here or <strong>browse files</strong>
      </>
    ),
    icon: <CloudUploadIcon />,
    secondaryText: "Up to 10MB",
    variant: "large",
  },
});

/**
 * `variant="compact"` is a smaller, fixed-height dropzone with no secondary text line.
 */
export const Compact = Example.extend({
  args: {
    variant: "compact",
  },
});

/**
 * Reflects whether a dragged file is currently over the dropzone, driven by `FileInput`'s
 * `isDraggingOver` render prop in its real callers.
 */
export const DraggingOver = Example.extend({
  args: {
    isDraggingOver: true,
  },
});

/**
 * The disabled state, matching the native `<button>` attribute.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
});
