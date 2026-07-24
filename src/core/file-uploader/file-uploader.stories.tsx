import preview from '#.storybook/preview'
import { CloudUploadIcon } from '#src/icons/cloud-upload'
import { FileUploader } from './file-uploader'

import type { FileUploadQueue } from './file-upload-queue'
import type { ReactNode } from 'react'
import { FileUploadIcon } from '#src/icons/file-upload'

// Storybook's `meta()` can't infer args from a generic component reference — narrow to a concrete
// `TResult` just for the `component:` reference; every story below still uses the real, generic
// `FileUploader` in JSX.
const FileUploaderComponent = FileUploader as (props: FileUploader.Props<string>) => ReturnType<typeof FileUploader>

const meta = preview.meta({
  title: 'Input and selection/FileUploader',
  component: FileUploaderComponent,
  argTypes: {
    children: {
      control: false,
    },
  },
})

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
            errorText={item.status === 'error' ? item.errorMessage : undefined}
            item={item}
            onRemove={() => queue.removeItem(item.id)}
          />
        ))
      : null
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
        maxFileSize={10 * 1024 * 1024}
        multiple
        variant="large"
      >
        Drag and drop your files here or <strong>browse files</strong>
      </FileUploader.DropzoneControl>
      <FileUploader.FileList>{renderFileList()}</FileUploader.FileList>
    </FileUploader>
  ),
})

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
        maxFileSize={5 * 1024 * 1024}
        multiple
      >
        Select files to upload
      </FileUploader.ButtonControl>
      <FileUploader.FileList variant="media">{renderFileList()}</FileUploader.FileList>
    </FileUploader>
  ),
})

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
        maxFileSize={5 * 1024 * 1024}
        multiple
        variant="large"
      >
        Drag and drop your photos here or <strong>browse files</strong>
      </FileUploader.DropzoneControl>
      <FileUploader.FileList variant="media">{renderFileList()}</FileUploader.FileList>
    </FileUploader>
  ),
})

/**
 * Error text renders directly between the input and the file list, rather than after both —
 * `FileUploader.DropzoneControl` owns its own `FormControl`, so it never wraps the sibling
 * `FileUploader.FileList`. `required` here maps to a `minFiles` of `1`, reported through the same
 * mechanism an explicit `minFiles` violation would use.
 */
export const WithError = Example.extend({
  name: 'With error',
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
})

/**
 * `FileUploader.FileList`'s `name` prop is shared with every `FileUploader.File` via context, so
 * each one renders its own `<input type="hidden">` for a successfully-uploaded item, valued at its
 * `fileId` — enough for a native `<form>` submission to collect every uploaded file's ID via
 * `FormData`, with no form library required.
 */
export const Forms = Example.extend({
  args: {
    onUpload: simulateUpload,
  },
  render: (args) => {
    const fieldName = 'documentIds'
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault()
          const ids = new FormData(event.currentTarget).getAll(fieldName)
          globalThis.alert(`Submitted document IDs: ${ids.join(', ') || '(none)'}`)
        }}
      >
        <FileUploader {...args}>
          <FileUploader.DropzoneControl icon={<CloudUploadIcon />} label="Upload documents" multiple variant="large">
            Drag and drop your files here or <strong>browse files</strong>
          </FileUploader.DropzoneControl>
          <FileUploader.FileList name={fieldName}>{renderFileList()}</FileUploader.FileList>
        </FileUploader>
        <button style={{ marginTop: 'var(--spacing-3)' }} type="submit">
          Submit
        </button>
      </form>
    )
  },
})

function simulateUpload(
  _file: File,
  helpers: { onProgress: (progress: number) => void; signal: AbortSignal },
): Promise<string> {
  return new Promise((resolve, reject) => {
    let progress = 0
    const interval = globalThis.setInterval(() => {
      progress += 20
      helpers.onProgress(progress)
      if (progress >= 100) {
        globalThis.clearInterval(interval)
        resolve(crypto.randomUUID())
      }
    }, 300)

    helpers.signal.addEventListener('abort', () => {
      globalThis.clearInterval(interval)
      reject(new DOMException('Upload aborted', 'AbortError'))
    })
  })
}
