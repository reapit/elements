import preview from '#.storybook/preview'
import { FileUploader } from '../file-uploader'
import { FileUploaderContext } from '../context'
import { useSyncExternalStore } from 'react'
import { useFileUploadQueue } from '../use-file-upload-queue'

const meta = preview.meta({
  title: 'Input and selection/FileUploader/Input',
  component: FileUploader.Input,
})

/**
 * `FileUploaderInput` is the wiring layer that connects a native `FileInput` to a `FileUploadQueue`.
 * Used standalone here, it renders no label, help/error text, or item UI of its own: a consumer
 * creates the `queue` and is responsible for rendering its items. See `FileUploader.Control`'s
 * stories for the labelled composition, and
 * `FileUploader`'s own stories for the full compound composition — `FileUploader.Control` and
 * `FileUploader.FileList` together, sourcing the queue and constraints from a shared `FileUploader`
 * ancestor instead of explicit props.
 */
export const Example = meta.story({
  args: {
    accept: undefined,
    'aria-label': 'Upload a file',
    maxFiles: undefined,
    maxFileSize: undefined,
    maxTotalSize: undefined,
    minFiles: undefined,
    multiple: true,
    required: undefined,
    showValidity: undefined,
  },
  render: function Example(args) {
    const queue = useFileUploadQueue({ onUpload: async () => crypto.randomUUID() })
    const items = useSyncExternalStore(queue.subscribe, queue.getItemsSnapshot)

    return (
      <FileUploaderContext.Provider value={{ queue }}>
        <div style={{ display: 'flex', flexFlow: 'column nowrap', gap: 'var(--spacing-2)', alignItems: 'flex-start' }}>
          <FileUploader.Input {...args} />
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
        </div>
      </FileUploaderContext.Provider>
    )
  },
})
