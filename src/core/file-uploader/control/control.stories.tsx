import preview from '#.storybook/preview'
import { FileUploader } from '../file-uploader'
import { useSyncExternalStore } from 'react'
import { useFileUploadQueue } from '../use-file-upload-queue'
import { FileUploaderContext } from '../context'

const meta = preview.meta({
  title: 'Input and selection/FileUploader/Control',
  component: FileUploader.Control,
  argTypes: {
    errorText: {
      control: 'text',
    },
    helpText: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['button', 'compact', 'large'],
    },
  },
})

/**
 * `FileUploaderControl` composes `FormControl` chrome (label/help text/error text) with
 * `FileUploader.Input`. Used standalone here, it renders no item list of its own: a consumer
 * creates the `queue` and is responsible for
 * rendering its items. See `FileUploader`'s own stories for the full compound composition —
 * `FileUploader.Control` and `FileUploader.FileList` together, sourcing the queue and constraints
 * from a shared `FileUploader` ancestor instead of explicit props.
 */
export const Example = meta.story({
  args: {
    label: 'Upload a file',
    multiple: true,
    variant: 'button',
  },
  render: function Example(args) {
    const queue = useFileUploadQueue({ onUpload: async () => 'file-id' })
    const items = useSyncExternalStore(queue.subscribe, queue.getItemsSnapshot)

    return (
      <div style={{ display: 'flex', flexFlow: 'column nowrap', gap: 'var(--spacing-2)', alignItems: 'flex-start' }}>
        <FileUploaderContext.Provider value={{ queue }}>
          <FileUploader.Control {...args} />
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
 * Error text renders directly below the input, taking the help text's place — this is the layout
 * `FileUploader` itself couldn't produce before `FileUploaderControl` existed, since it used to
 * wrap the whole compound composition (input and file list together) in one `FormControl`.
 *
 * `showValidity` defaults to whether `errorText` is supplied, but can be passed explicitly — e.g.
 * `false`, from a form library that only wants validity communicated once a field has been
 * touched, even though `errorText` (and so `aria-invalid`) is already present.
 */
export const WithError = Example.extend({
  name: 'With error',
  args: {
    errorText: 'At least one file is required',
  },
})
