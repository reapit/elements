import preview from '#.storybook/preview'
import { FileUploader } from '../file-uploader'
import { FileUploaderContext } from '../context'

import type { FileUploadQueue } from '../file-upload-queue'

// `FileUploader.FileList` always subscribes to its queue, even when `children` is a static
// subtree rather than the items render function — so every story still needs a queue in context,
// just not a real, uploading one. This stub satisfies the subscription without a `FileUploadQueue`
// instance or a `FileUploader` ancestor.
const emptyItems: FileUploadQueue.Item[] = []
const queue = {
  subscribe: () => () => {},
  getItemsSnapshot: () => emptyItems,
} as unknown as FileUploadQueue<any>

const meta = preview.meta({
  title: 'Input and selection/FileUploader/FileList',
  component: FileUploader.FileList,
  subcomponents: { File: FileUploader.File },
  argTypes: {
    children: {
      control: false,
    },
    variant: {
      control: 'radio',
      options: ['file', 'media'],
    },
  },
  decorators: [
    (Story) => (
      <FileUploaderContext.Provider value={{ queue, triggerId: 'trigger' }}>
        <Story />
      </FileUploaderContext.Provider>
    ),
  ],
})

/**
 * Files will typically be sourced via the `children` render function. For this example,
 * we just provide a static set. By default, `FileUploader.File` children will render as a file card.
 * This is appropriate when the files can documents and images/videos.
 */
export const Example = meta.story({
  args: {
    children: (
      <>
        <FileUploader.File item={makeItem({ id: '1', status: 'queued' })} onRemove={() => {}} />
        <FileUploader.File
          item={makeItem({ id: '2', status: 'uploading', progress: 45, isLoadingIndicatorVisible: true })}
          onRemove={() => {}}
        />
        <FileUploader.File item={makeItem({ id: '3', status: 'uploaded', fileId: 'file-3', result: 'file-3' })} />
        <FileUploader.File
          errorText="Upload failed"
          item={makeItem({ id: '4', file: makeFile('invoice.pdf'), status: 'error', errorMessage: 'Upload failed' })}
          onRemove={() => {}}
        />
      </>
    ),
    columns: 2,
    name: 'myFiles',
    variant: 'file',
  },
})

/**
 * When all the files are images/videos, the `media` variant can be used to show each file as a media card.
 * The thumbnails do not display correctly in this example because we are not using real files.
 */
export const Media = Example.extend({
  args: {
    variant: 'media',
    children: (
      <>
        <FileUploader.File
          item={makeItem({ id: '1', file: makeFile('a.png', 'image/png'), status: 'uploaded' })}
          onRemove={() => {}}
        />
        <FileUploader.File
          item={makeItem({
            id: '2',
            file: makeFile('b.png', 'image/png'),
            status: 'uploading',
            progress: 70,
            isLoadingIndicatorVisible: true,
          })}
          onRemove={() => {}}
        />
        <FileUploader.File
          item={makeItem({ id: '3', file: makeFile('c.png', 'image/png'), status: 'error' })}
          onRemove={() => {}}
        />
        <FileUploader.File
          item={makeItem({
            id: '4',
            file: makeFile('d.png', 'image/png'),
            status: 'uploading',
            progress: 20,
            isLoadingIndicatorVisible: true,
          })}
          onRemove={() => {}}
        />
      </>
    ),
  },
})

/**
 * The `minItemHeight` and `minItemWidth` props control the size of each file/media card. The file
 * list stretches to fill its container. If `minItemWidth` exceeds the container width, items will
 * overflow.
 */
export const Sizing = Media.extend({
  args: {
    minItemHeight: '300px',
    minItemWidth: '150px',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', border: '1px solid #FA00FF' }}>
        <Story />
      </div>
    ),
  ],
})

/**
 * The `columns` prop sets an explicit column count for the `media` variant. It has no effect on
 * the `file` variant, which always renders as a single-column list. Defaults to `2`.
 */
export const Columns = Media.extend({
  args: {
    columns: 3,
  },
})

function makeFile(name: string, type = 'text/plain'): File {
  return new File([new Uint8Array(10)], name, { type })
}

function makeItem(overrides: Partial<FileUploadQueue.Item> & { id: string; status: string }): FileUploadQueue.Item {
  return { file: makeFile('document.pdf'), ...overrides } as FileUploadQueue.Item
}
