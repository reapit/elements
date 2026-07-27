import { act, renderHook } from '@testing-library/react'
import { FileUploadQueue } from '../file-upload-queue'
import { useFileUploaderAnnouncements } from '../use-file-uploader-announcements'

function makeQueue() {
  return new FileUploadQueue({ onUpload: async () => 'file-id' })
}

function makeFile(name: string): File {
  return new File([new Uint8Array(10)], name)
}

test('returns an empty list before any status transitions occur', () => {
  const queue = makeQueue()
  const { result } = renderHook(() => useFileUploaderAnnouncements(queue))
  expect(result.current).toEqual([])
})

test('announces when an item reaches uploaded', async () => {
  const queue = makeQueue()
  const { result } = renderHook(() => useFileUploaderAnnouncements(queue))

  act(() => {
    queue.addFiles([makeFile('Invoice.pdf')])
    queue.reportValidity([])
  })

  await vi.waitFor(() => {
    expect(result.current).toContain('Invoice.pdf uploaded')
  })
})

test('announces when an item reaches error', async () => {
  const queue = new FileUploadQueue<string>({
    onUpload: async () => {
      throw new Error('file too large')
    },
  })
  const { result } = renderHook(() => useFileUploaderAnnouncements(queue))

  act(() => {
    queue.addFiles([makeFile('Invoice.pdf')])
    queue.reportValidity([])
  })

  await vi.waitFor(() => {
    expect(result.current).toContain('Invoice.pdf failed to upload: file too large')
  })
})

test('produces a single replace announcement when one item disappears and a new item reaches uploaded in the same diff', async () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  const { result } = renderHook(() => useFileUploaderAnnouncements(queue))

  // Add first file and wait for it to upload.
  act(() => {
    queue.addFiles([makeFile('Invoice.pdf')])
    queue.reportValidity([])
  })

  await vi.waitFor(() => {
    expect(queue.getItemsSnapshot()).toMatchObject([{ status: 'uploaded' }])
  })

  const announcementsAfterFirst = result.current.length

  // Replace with a second file — replaceFiles removes the first item atomically, then the
  // new item starts queued and must be started via reportValidity.
  act(() => {
    queue.replaceFiles([makeFile('Photo.jpg')])
  })

  // reportValidity starts the new item uploading in a separate tick, as the consumer would do.
  act(() => {
    queue.reportValidity([])
  })

  await vi.waitFor(() => {
    expect(result.current.length).toBeGreaterThan(announcementsAfterFirst)
  })

  const newAnnouncements = result.current.slice(announcementsAfterFirst)

  // Must be exactly one announcement, not two (not "Invoice.pdf removed" + "Photo.jpg uploaded").
  expect(newAnnouncements).toHaveLength(1)
  expect(newAnnouncements[0]).toBe('Invoice.pdf replaced with Photo.jpg')
})

test('accumulates multiple announcements without clearing previous ones', async () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  const { result } = renderHook(() => useFileUploaderAnnouncements(queue))

  act(() => {
    queue.addFiles([makeFile('a.pdf'), makeFile('b.pdf')])
    queue.reportValidity([])
  })

  await vi.waitFor(() => {
    expect(queue.getItemsSnapshot().every((item) => item.status === 'uploaded')).toBe(true)
  })

  expect(result.current).toContain('a.pdf uploaded')
  expect(result.current).toContain('b.pdf uploaded')
})
