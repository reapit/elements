import preview from "#.storybook/preview";
import { CloudUploadIcon } from "#src/icons/cloud-upload";
import { FileUploadIcon } from "#src/icons/file-upload";

import { FileUploaderContext } from "../context";
import { FileUploader } from "../file-uploader";
import { useFileUploadQueue } from "../use-file-upload-queue";

const meta = preview.meta({
  title: "Input and selection/FileUploader/SingleSelectMediaControl",
  component: FileUploader.SingleSelectMediaControl,
  argTypes: {
    children: {
      control: "text",
    },
    errorText: {
      control: "text",
    },
    helpText: {
      control: "text",
    },
    icon: {
      control: "select",
      options: ["none", "cloud-upload", "file-upload"],
      mapping: {
        none: null,
        "cloud-upload": <CloudUploadIcon />,
        "file-upload": <FileUploadIcon />,
      },
    },
    label: {
      control: "text",
    },
    secondaryText: {
      control: "text",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ maxWidth: "400px" }}>
          <Story />
        </div>
      );
    },
  ],
});

/**
 * `FileUploader.SingleSelectMediaControl` swaps between the empty drag-and-drop prompt and a full-bleed media
 * card in place, once a file is selected — no separate item list is rendered alongside it, unlike
 * `FileUploader.DropzoneControl`/`FileUploader.FileList`. Hover, focus, or drag a file over the filled card to
 * reveal its "Replace" affordance.
 */
export const Example = meta.story({
  args: {
    accept: "image/*,video/*",
    children: (
      <>
        Drag and drop or <strong>browse files</strong>
      </>
    ),
    disabled: false,
    icon: "cloud-upload",
    label: "Property photo",
    size: "medium",
  },
  render: function Example(args) {
    const queue = useFileUploadQueue({ onUpload: async () => "file-id" });

    return (
      <FileUploaderContext.Provider value={{ queue, triggerId: "trigger" }}>
        <FileUploader.SingleSelectMediaControl {...args} />
      </FileUploaderContext.Provider>
    );
  },
});

/**
 * Error text renders directly below the input.
 */
export const Invalid = Example.extend({
  args: {
    errorText: "A property photo is required",
  },
});

/**
 * `disabled` prevents replacing or removing a selected file.
 */
export const Disabled = Example.extend({
  args: {
    disabled: true,
  },
});
