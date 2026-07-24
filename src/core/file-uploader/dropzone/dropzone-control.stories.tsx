import preview from '#.storybook/preview'
import { CloudUploadIcon } from '#src/icons/cloud-upload'
import { FileImageIcon } from '#src/icons/file-image'
import { FileUploader } from '../file-uploader'
import { FileUploaderContext } from '../context'
import { FileUploadIcon } from '#src/icons/file-upload'
import { FileVideoIcon } from '#src/icons/file-video'
import { useFileUploadQueue } from '../use-file-upload-queue'
import { useSyncExternalStore } from 'react'

const meta = preview.meta({
  title: 'Input and selection/FileUploader/DropzoneControl',
  component: FileUploader.DropzoneControl,
  argTypes: {
    children: {
      control: 'text',
    },
    errorText: {
      control: 'text',
    },
    helpText: {
      control: 'text',
    },
    icon: {
      control: 'select',
      options: ['none', 'file-upload', 'cloud-upload', 'image', 'video'],
      mapping: {
        none: undefined,
        'file-upload': <FileUploadIcon />,
        'cloud-upload': <CloudUploadIcon />,
        image: <FileImageIcon />,
        video: <FileVideoIcon />,
      },
    },
    label: {
      control: 'text',
    },
    secondaryText: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['compact', 'large'],
    },
  },
})

/**
 * `FileUploader.DropzoneControl` composes `FormControl` chrome (label/help text/error text) with
 * `FileUploader.DropzoneInput`. Used standalone here, it renders no item list of its own: a
 * consumer creates the `queue` and is responsible for rendering its items. See `FileUploader`'s
 * own stories for the full compound composition.
 */
export const Example = meta.story({
  args: {
    children: (
      <>
        Drag and drop your file here or <strong>browse files</strong>
      </>
    ),
    icon: 'cloud-upload',
    label: 'Upload a file',
    multiple: true,
    size: 'medium',
    variant: 'large',
  },
  render: function Example(args) {
    const queue = useFileUploadQueue({ onUpload: async () => 'file-id' })
    const items = useSyncExternalStore(queue.subscribe, queue.getItemsSnapshot)

    return (
      <div style={{ display: 'flex', flexFlow: 'column nowrap', gap: 'var(--spacing-2)', alignItems: 'flex-start' }}>
        <FileUploaderContext.Provider value={{ queue }}>
          <FileUploader.DropzoneControl {...args} />
          {items.length > 0 && (
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  {item.file.name}{' '}
                  <button type="button" onClick={() => queue.removeItem(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </FileUploaderContext.Provider>
      </div>
    )
  },
})

/**
 * `variant="compact"` is a smaller, fixed-height dropzone with no secondary text line.
 */
export const Compact = Example.extend({
  args: {
    variant: 'compact',
  },
})

/**
 * The control's `size` only affects its label/help/error text size.
 * The default is `medium`; `small` and `large` are also available.
 */
export const Sizing = Example.extend({
  argTypes: {
    size: {
      control: false,
    },
  },
  decorators: [
    (Story, context) => (
      <div style={{ display: 'flex', flexFlow: 'row nowrap', gap: 'var(--spacing-10)', alignItems: 'flex-start' }}>
        <Story args={{ ...context.args, size: 'small' }} />
        <Story args={{ ...context.args, size: 'medium' }} />
        <Story args={{ ...context.args, size: 'large' }} />
      </div>
    ),
  ],
})

/**
 * Error text renders directly below the input, taking the help text's place.
 *
 * `showValidity` defaults to whether `errorText` is supplied, but can be passed explicitly — e.g.
 * `false`, from a form library that only wants validity communicated once a field has been
 * touched, even though `errorText` (and so `aria-invalid`) is already present.
 */
export const Invalid = Example.extend({
  args: {
    errorText: 'At least one file is required',
  },
})

/**
 * For cases where you do not want label, help or error text, you can use `FileUploader.DropzoneInput` directly.
 * Ensure an accessible label is still provided via `aria-label` or `aria-labelledby`.
 */
export const Input = Example.extend({
  args: {
    'aria-label': 'Upload a file',
  },
  render: function Input({ size: _, ...args }) {
    const queue = useFileUploadQueue({ onUpload: async () => 'file-id' })
    const items = useSyncExternalStore(queue.subscribe, queue.getItemsSnapshot)

    return (
      <div style={{ display: 'flex', flexFlow: 'column nowrap', gap: 'var(--spacing-2)', alignItems: 'flex-start' }}>
        <FileUploaderContext.Provider value={{ queue }}>
          <FileUploader.DropzoneInput {...args} />
          {items.length > 0 && (
            <ul
              style={{
                border: '1px solid #FA00FF',
                paddingBlock: 'var(--spacing-2)',
                paddingInlineEnd: 'var(--spacing-2)',
              }}
            >
              {items.map((item) => (
                <li key={item.id}>
                  {item.file.name}{' '}
                  <button type="button" onClick={() => queue.removeItem(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </FileUploaderContext.Provider>
      </div>
    )
  },
})
