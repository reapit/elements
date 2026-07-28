import preview from "#.storybook/preview";

import { FileUploaderRemoveButton } from "./remove-button";

const meta = preview.meta({
  title: "Input and selection/FileUploader/RemoveButton",
  component: FileUploaderRemoveButton,
  globals: {
    backgrounds: {
      value: "light",
    },
  },
});

export const Example = meta.story({
  args: {
    "aria-label": "Remove Invoice.pdf",
  },
});
