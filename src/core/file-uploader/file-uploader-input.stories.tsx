import preview from '#.storybook/preview'
import { FileUploaderInput } from './file-uploader-input'
import { FileUploaderFileCard } from './file-card/file-card'
import { FileUploaderFileCardLeadingElement } from './file-card/leading-element/leading-element'
import { FileUploaderMediaCard } from './media-card/media-card'
import { FileUploadQueue } from './file-upload-queue'
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'

const meta = preview.meta({
  title: 'Input and selection/FileUploader/Input',
  component: FileUploaderInput,
  argTypes: {
    queue: {
      control: false,
      table: {
        type: {
          summary: 'FileUploadQueue',
        },
      },
    },
  },
  args: {
    // Every story below creates and passes its own queue via `render` — this default only exists
    // so `queue` (a required prop) doesn't have to be repeated in every story's `args`.
    queue: new FileUploadQueue(),
  },
})

/**
 * `FileUploaderInput` is the wiring layer that connects a native `FileInput` to a `FileUploadQueue`
 * — see `src/core/file-uploader/ARCHITECTURE.md`. It renders no item UI of its own: a consumer
 * creates the `queue` and is responsible for rendering its items, typically with
 * `FileUploader.FileCard`/`FileUploader.MediaCard`, shown in the stories below.
 */
export const Example = meta.story({
  args: {
    'aria-label': 'Upload a file',
    multiple: true,
  },
  render: function Example(args) {
    const [queue] = useState(() => new FileUploadQueue())
    const items = useSyncExternalStore(queue.subscribe, queue.getSnapshot)

    return (
      <div style={{ display: 'flex', flexFlow: 'column nowrap', gap: 'var(--spacing-2)', alignItems: 'flex-start' }}>
        <FileUploaderInput {...args} queue={queue} />
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
    )
  },
})

/**
 * A realistic composition alongside `FileUploader.FileCard`: `FileUploaderInput` drives the queue,
 * and each queued item is rendered as a row. `onUpload` here is a simulated upload — reporting
 * progress and resolving after a couple of seconds — but a real implementation would call an API.
 */
export const WithFileCard = Example.extend({
  name: 'With FileCard',
  argTypes: {
    multiple: { control: false },
  },
  render: function WithFileCard(args) {
    const [queue] = useState(() => new FileUploadQueue({ onUpload: simulateUpload }))
    const items = useSyncExternalStore(queue.subscribe, queue.getSnapshot)

    return (
      <div style={{ display: 'flex', flexFlow: 'column nowrap', gap: 'var(--spacing-4)', alignItems: 'flex-start' }}>
        <FileUploaderInput {...args} queue={queue} multiple />
        {items.length > 0 && (
          <div style={{ display: 'flex', flexFlow: 'column nowrap', gap: 'var(--spacing-3)', width: '320px' }}>
            {items.map((item) => (
              <FileUploaderFileCard
                key={item.id}
                fileName={item.file.name}
                fileSize={item.file.size}
                status={item.status}
                progress={item.status === 'uploading' ? item.progress : undefined}
                errorMessage={item.status === 'error' ? item.errorMessage : item.validationError}
                leadingElement={<FileUploaderFileCardLeadingElement type="icon" />}
                onRemove={() => queue.removeItem(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    )
  },
})

/**
 * The same composition using `FileUploader.MediaCard` instead, for an `accept` restricted to
 * images. Each thumbnail is generated from the selected file itself via `URL.createObjectURL`.
 */
export const WithMediaCard = Example.extend({
  name: 'With MediaCard',
  argTypes: {
    multiple: { control: false },
  },
  render: function WithMediaCard(args) {
    const [queue] = useState(() => new FileUploadQueue({ onUpload: simulateUpload }))
    const items = useSyncExternalStore(queue.subscribe, queue.getSnapshot)
    const objectUrls = useObjectUrls(items)

    return (
      <div style={{ display: 'flex', flexFlow: 'column nowrap', gap: 'var(--spacing-4)', alignItems: 'flex-start' }}>
        <FileUploaderInput {...args} queue={queue} accept="image/*" multiple />
        {items.length > 0 && (
          <div style={{ display: 'grid', gap: 'var(--spacing-3)', gridTemplateColumns: 'repeat(3, 160px)' }}>
            {items.map((item) => (
              <FileUploaderMediaCard
                key={item.id}
                fileName={item.file.name}
                fileSize={item.file.size}
                status={item.status}
                progress={item.status === 'uploading' ? item.progress : undefined}
                errorMessage={item.status === 'error' ? item.errorMessage : item.validationError}
                src={objectUrls.get(item.id) ?? ''}
                onRemove={() => queue.removeItem(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    )
  },
})

/**
 * Creates one object URL per queue item, keyed by item id, reusing it across re-renders (e.g.
 * upload progress ticks) instead of creating a fresh one every time — and revokes any URL whose
 * item is no longer in the queue, plus every remaining URL on unmount.
 */
function useObjectUrls(items: { id: string; file: File }[]): Map<string, string> {
  const urlsRef = useRef(new Map<string, string>())

  const urls = useMemo(() => {
    const next = new Map<string, string>()
    for (const item of items) {
      next.set(item.id, urlsRef.current.get(item.id) ?? URL.createObjectURL(item.file))
    }
    for (const [id, url] of urlsRef.current) {
      if (!next.has(id)) URL.revokeObjectURL(url)
    }
    urlsRef.current = next
    return next
  }, [items])

  useEffect(() => {
    return () => {
      for (const url of urlsRef.current.values()) URL.revokeObjectURL(url)
    }
  }, [])

  return urls
}

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
