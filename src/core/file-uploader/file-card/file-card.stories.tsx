import preview from '#.storybook/preview'
import { FileUploaderFileCard } from './file-card'
import { FileUploaderFileCardLeadingElement } from './leading-element/leading-element'

const meta = preview.meta({
  title: 'Input and selection/FileUploader/FileCard',
  component: FileUploaderFileCard,
  argTypes: {
    leadingElement: {
      control: 'radio',
      options: ['file-type', 'image', 'icon'],
      mapping: {
        'file-type': <FileUploaderFileCardLeadingElement type="file-type" label="PDF" />,
        image: (
          <FileUploaderFileCardLeadingElement
            type="image"
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=80&h=80&fit=crop"
          />
        ),
        icon: <FileUploaderFileCardLeadingElement type="icon" />,
      },
    },
  },
})

/**
 * To start, the file is considered queued for upload.
 */
export const Example = meta.story({
  args: {
    fileName: 'File name.pdf',
    fileSize: 3.6 * 1000 * 1000, // 3.6 MB
    status: 'queued' as const,
    leadingElement: 'file-type',
    onRemove: () => {},
  },
})

/**
 * Once uploading begins, progress can be reported using the `progress` prop.
 */
export const Uploading = Example.extend({
  args: {
    status: 'uploading',
    progress: 90,
  },
})

/**
 * Upload `progress` is optional as some uploads cannot report it. Omitting the progress percentage renders an
 * indeterminate progress bar.
 */
export const UploadingIndeterminate = Example.extend({
  name: 'Uploading (indeterminate)',
  args: {
    status: 'uploading',
  },
})

/**
 * Processing is typically used when media files are being processed or file scanning is being performed. It is
 * always indeterminate.
 */
export const Processing = Example.extend({
  args: {
    status: 'processing',
  },
})

/**
 * When the file has been successfully uploaded and processed, it should be marked as uploaded.
 */
export const Uploaded = Example.extend({
  args: {
    leadingElement: 'icon',
    status: 'uploaded',
  },
})

/**
 * If an error occurs during the upload process, the file should be marked as errored and an error message displayed.
 */
export const Error = Example.extend({
  args: {
    errorMessage: 'File too large',
    leadingElement: 'icon',
    status: 'error',
  },
})

/**
 * When the title is too long to fit in the available space, it will be truncated.
 */
export const Truncation = Example.extend({
  args: {
    fileName: 'Very-long-invoice-name-for-truncation-testing.pdf',
    leadingElement: 'icon',
    onRemove: undefined,
    status: 'uploaded',
  },
  decorators: [
    (Story) => (
      <div style={{ border: '1px solid #FA00FF', width: '300px' }}>
        <Story />
      </div>
    ),
  ],
})

/**
 * Omitting `onRemove` renders a read-only card, with no remove button.
 */
export const ReadOnly = Example.extend({
  name: 'Read-only',
  args: {
    leadingElement: 'icon',
    onRemove: undefined,
    status: 'uploaded',
  },
})

/**
 * The leading element can be used to show a thumbnail of the image/video file, an icon, or a file type.
 */
export const LeadingElement = Example.extend({
  name: 'Leading element',
  args: {
    fileName: 'Property-photo.jpg',
    leadingElement: 'image',
    status: 'uploaded',
  },
})
