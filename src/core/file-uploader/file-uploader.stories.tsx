import type { ReactNode } from "react";

import preview from "#.storybook/preview";
import { CloudUploadIcon } from "#src/icons/cloud-upload";
import { FileUploadIcon } from "#src/icons/file-upload";

import type { FileUploadQueue } from "./file-upload-queue";
import { FileUploader } from "./file-uploader";

// Storybook's `meta()` can't infer args from a generic component reference — narrow to a concrete
// `TResult` just for the `component:` reference; every story below still uses the real, generic
// `FileUploader` in JSX.
const FileUploaderComponent = FileUploader as (
  props: FileUploader.Props<string>,
) => ReturnType<typeof FileUploader>;

const meta = preview.meta({
  title: "Input and selection/FileUploader",
  component: FileUploaderComponent,
  argTypes: {
    children: {
      control: false,
    },
  },
});

/**
 * `FileUploader.FileList` renders no items of its own — every story wires up this same default
 * rendering (one `FileUploader.File` per item, wrapped in `ElFileUploaderFileList`) via `children`.
 */
function renderFileList() {
  return (items: FileUploadQueue.Item[], queue: FileUploadQueue<any>): ReactNode =>
    items.length > 0
      ? items.map((item) => (
          <FileUploader.File
            key={item.id}
            errorText={
              item.status === "error" ? item.errorMessage : (item.validationError ?? undefined)
            }
            item={item}
            onRemove={() => queue.removeItem(item.id)}
          />
        ))
      : null;
}

/**
 * A common upload experience provides a dropzone for dragged files above a list of uploaded files.
 * The upload here is simulated, reporting fake progress and resolving successfully after a couple
 * of seconds.
 */
export const Example = meta.story({
  args: {
    onUpload: simulateUpload,
  },
  render: (args) => (
    <FileUploader {...args}>
      <FileUploader.DropzoneControl
        accept=".pdf,.doc,.docx"
        helpText="PDF, DOC, or DOCX up to 10MB"
        icon={<CloudUploadIcon />}
        label="Upload documents"
        maxFileSize={10 * 1024 * 1024} // 10 MB
        multiple
        variant="large"
      >
        Drag and drop your files here or <strong>browse files</strong>
      </FileUploader.DropzoneControl>
      <FileUploader.FileList>{renderFileList()}</FileUploader.FileList>
    </FileUploader>
  ),
});

/**
 * A simple button-like trigger can be used. Like the dropzone, it opens the file picker when clicked
 * and acts as a drop target for dragged files.
 */
export const Button = Example.extend({
  args: {
    onUpload: simulateUpload,
  },
  render: (args) => (
    <FileUploader {...args}>
      <FileUploader.ButtonControl
        accept="image/*"
        helpText="PNG or JPG up to 5MB"
        iconLeft={<FileUploadIcon />}
        label="Upload photos"
        maxFileSize={5 * 1024 * 1024} // 5 MB
        multiple
      >
        Select files to upload
      </FileUploader.ButtonControl>
      <FileUploader.FileList variant="media">{renderFileList()}</FileUploader.FileList>
    </FileUploader>
  ),
});

/**
 * When `accept` is restricted to images/videos, `FileUploader.FileList` defaults to `MediaCard`
 * tiles instead of `FileCard` rows.
 */
export const Media = Example.extend({
  args: {
    onUpload: simulateUpload,
  },
  render: (args) => (
    <FileUploader {...args}>
      <FileUploader.DropzoneControl
        accept="image/*"
        helpText="PNG or JPG up to 5MB"
        icon={<CloudUploadIcon />}
        label="Upload photos"
        maxFileSize={5 * 1024 * 1024} // 5 MB
        multiple
        variant="large"
      >
        Drag and drop your photos here or <strong>browse files</strong>
      </FileUploader.DropzoneControl>
      <FileUploader.FileList variant="media">{renderFileList()}</FileUploader.FileList>
    </FileUploader>
  ),
});

/**
 * By default, the file uploader allows a single file to be selected. The file list is still needed to diplay
 * display the uploaded file, but the file picker will only allow one file to be selected at a time.
 */
export const SingleSelect = Example.extend({
  name: "Single-select",
  args: {
    onUpload: simulateUpload,
  },
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <FileUploader {...args}>
        <FileUploader.ButtonControl iconLeft={<CloudUploadIcon />} label="Upload files">
          Browse files
        </FileUploader.ButtonControl>
        <FileUploader.FileList>{renderFileList()}</FileUploader.FileList>
      </FileUploader>
    </div>
  ),
});

/**
 * The file uploader supports a special experience for single-select media uploads via
 * `FileUploader.SingleSelectMediaControl`. It swaps between an empty drag-and-drop prompt and a
 * thumbnail of the selected media item. A replacement can be selected by clicking the thumbnail
 * or dragging a new file over it.
 *
 * The example here is rendered within a width constrained container.
 */
export const SingleSelectMedia = Example.extend({
  name: "Single-select media",
  args: {
    onUpload: simulateUpload,
  },
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <FileUploader {...args}>
        <FileUploader.SingleSelectMediaControl
          accept="image/*"
          icon={<CloudUploadIcon />}
          label="Upload photo"
          maxFileSize={5 * 1024 * 1024} // 5 MB
          required
        >
          Drag and drop a photo here or <strong>browse files</strong>
        </FileUploader.SingleSelectMediaControl>
      </FileUploader>
    </div>
  ),
});

/**
 * The file uploader supports the following constraints: `accept`, `maxFiles`, `maxFileSize`, `maxTotalSize`,
 * `minFiles`, `multiple` and `required`. Only `accept` and `maxFileSize` impact individual selected files;
 * the rest impact the file uploader as a whole.
 *
 * `multiple` implies `maxFiles` > 1, and `required` implies `minFiles` > 0. Explicit constraints for
 * `maxFiles` and `minFiles` take precedence of `multiple` and `required`. It is up to consumers to display
 * an appropriate message for any failed validation constraints to users, either for the specific file that
 * failed the constraint, or for the file uploader itself.
 */
export const Constraints = Example.extend({
  args: {
    onUpload: simulateUpload,
  },
  render: (args) => (
    <FileUploader {...args}>
      <FileUploader.ButtonControl
        iconLeft={<CloudUploadIcon />}
        label="Upload files"
        maxFileSize={5 * 1024 * 1024} // 5 MB
        maxTotalSize={10 * 1024 * 1024} // 10 MB
        multiple
        required
      >
        Browse files
      </FileUploader.ButtonControl>
      <FileUploader.FileList>{renderFileList()}</FileUploader.FileList>
    </FileUploader>
  ),
});

/**
 * The file uploader's error text is intended for validation errors that apply to the file uploader as a whole,
 * rather than to a specific file. Individual files accept their own `errorText` for displaying upload or
 * validation errors specific to that file.
 *
 * In either case, consumers are responsible for displaying an appropriate message to users.
 */
export const WithError = Example.extend({
  name: "With error",
  args: {
    onUpload: simulateUpload,
  },
  render: (args) => (
    <FileUploader {...args}>
      <FileUploader.DropzoneControl
        errorText="At least one document is required"
        icon={<CloudUploadIcon />}
        label="Upload documents"
        multiple
        required
        variant="large"
      >
        Drag and drop your files here or <strong>browse files</strong>
      </FileUploader.DropzoneControl>
      <FileUploader.FileList>{renderFileList()}</FileUploader.FileList>
    </FileUploader>
  ),
});

/**
 * Each `FileUploader.File` with a defined `name` (either directly or via `FileUploader.FileList`'s `name`)
 * will include a hidden input if it's related item is valid and has successfully-uploaded. The value of the
 * input will be set to the item's `fileId`. This enables native `<form>` submission to collect every uploaded
 * file's ID via `FormData`, with no form library required.
 */
export const Forms = Example.extend({
  args: {
    onUpload: simulateUpload,
  },
  render: (args) => {
    const fieldName = "documentIds";
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const ids = new FormData(event.currentTarget).getAll(fieldName);
          globalThis.alert(`Submitted document IDs: ${ids.join(", ") || "(none)"}`);
        }}
      >
        <FileUploader {...args}>
          <FileUploader.DropzoneControl
            icon={<CloudUploadIcon />}
            label="Upload documents"
            multiple
            required
            variant="large"
          >
            Drag and drop your files here or <strong>browse files</strong>
          </FileUploader.DropzoneControl>
          <FileUploader.FileList name={fieldName}>{renderFileList()}</FileUploader.FileList>
        </FileUploader>
        <button style={{ marginTop: "var(--spacing-3)" }} type="submit">
          Submit
        </button>
      </form>
    );
  },
});

function simulateUpload(
  _file: File,
  helpers: { onProgress: (progress: number) => void; signal: AbortSignal },
): Promise<string> {
  return new Promise((resolve, reject) => {
    let progress = 0;
    const interval = globalThis.setInterval(() => {
      progress += 20;
      helpers.onProgress(progress);
      if (progress >= 100) {
        globalThis.clearInterval(interval);
        resolve(crypto.randomUUID());
      }
    }, 300);

    helpers.signal.addEventListener("abort", () => {
      globalThis.clearInterval(interval);
      reject(new DOMException("Upload aborted", "AbortError"));
    });
  });
}
