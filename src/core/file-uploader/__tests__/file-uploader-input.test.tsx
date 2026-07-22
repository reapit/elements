import { FileUploaderInput } from '../file-uploader-input'
import { FileUploadQueue } from '../file-upload-queue'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

function makeFile(name: string, size = 100, type = 'text/plain'): File {
  return new File([new Uint8Array(size)], name, { type })
}

test('adding a file through the native input queues it', () => {
  const queue = new FileUploadQueue()
  render(<FileUploaderInput queue={queue} data-testid="input" />)

  const file = makeFile('a.txt')
  fireEvent.change(screen.getByTestId('input'), { target: { files: [file] } })

  expect(queue.getSnapshot()).toMatchObject([{ status: 'queued', file }])
})

test('addFiles is called with the current constraints', () => {
  const queue = new FileUploadQueue()
  const addFiles = vi.spyOn(queue, 'addFiles')
  render(
    <FileUploaderInput
      queue={queue}
      accept="image/*"
      maxFiles={2}
      maxFileSize={1000}
      maxTotalSize={2000}
      data-testid="input"
    />,
  )

  const file = makeFile('a.png', 100, 'image/png')
  fireEvent.change(screen.getByTestId('input'), { target: { files: [file] } })

  expect(addFiles).toHaveBeenCalledWith(expect.anything(), {
    accept: 'image/*',
    maxFiles: 2,
    maxFileSize: 1000,
    maxTotalSize: 2000,
  })
})

test('the rendered input reflects files added directly on the queue', () => {
  const queue = new FileUploadQueue()
  const children = vi.fn(() => null)
  render(<FileUploaderInput queue={queue}>{children}</FileUploaderInput>)

  const file = makeFile('a.txt')
  act(() => queue.addFiles([file]))

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [file] }))
})

test('the rendered input reflects files removed directly on the queue', () => {
  const queue = new FileUploadQueue()
  queue.addFiles([makeFile('a.txt')])
  const [item] = queue.getSnapshot()

  const children = vi.fn(() => null)
  render(<FileUploaderInput queue={queue}>{children}</FileUploaderInput>)

  act(() => queue.removeItem(item.id))

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [] }))
})

test('changing constraints re-projects validity on already-queued items without a new pick', () => {
  const queue = new FileUploadQueue()
  queue.addFiles([makeFile('a.pdf'), makeFile('b.docx')], { maxFiles: 2 })
  expect(queue.getSnapshot().every((item) => !item.validationError)).toBe(true)

  const { rerender } = render(<FileUploaderInput queue={queue} maxFiles={2} />)
  rerender(<FileUploaderInput queue={queue} maxFiles={1} />)

  const [, second] = queue.getSnapshot()
  expect(second.validationError).toMatch(/only one file/i)
})

test('forwards the children render prop through to FileInput unmodified', () => {
  const queue = new FileUploadQueue()
  render(
    <FileUploaderInput queue={queue}>
      {({ openFilePicker }) => <button onClick={openFilePicker}>Browse</button>}
    </FileUploaderInput>,
  )

  expect(screen.getByRole('button', { name: 'Browse' })).toBeVisible()
})
