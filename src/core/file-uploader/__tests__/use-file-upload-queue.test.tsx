import { act, render } from '@testing-library/react'
import { useFileUploadQueue } from '../use-file-upload-queue'
import type { FileUploadQueue } from '../file-upload-queue'

test('creates one queue instance per mount, stable across re-renders', () => {
  const queues: unknown[] = []
  function Consumer() {
    queues.push(useFileUploadQueue({ onUpload: async () => 'file-id' }))
    return null
  }

  const { rerender } = render(<Consumer />)
  rerender(<Consumer />)

  expect(queues).toHaveLength(2)
  expect(queues[0]).toBe(queues[1])
})

test('passes options through to the underlying queue', async () => {
  let queue: FileUploadQueue<string> | undefined
  function Consumer() {
    queue = useFileUploadQueue({ onUpload: async () => 'result-id' })
    return null
  }

  render(<Consumer />)

  act(() => {
    queue!.addFiles([new File([], 'a.txt')])
    queue!.reportValidity([])
  })

  await vi.waitFor(() => expect(queue!.getItemsSnapshot()).toMatchObject([{ status: 'uploaded', fileId: 'result-id' }]))
})
