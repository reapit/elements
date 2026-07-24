import { FileUploaderContext } from '../../context'
import { FileUploaderInput } from '../input'
import { FileUploadQueue } from '../../file-upload-queue'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

function makeFile(name: string, size = 100, type = 'text/plain'): File {
  return new File([new Uint8Array(size)], name, { type })
}

test('adding a file through the native input queues and uploads it', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploaderContext.Provider value={{ queue }}>
      <FileUploaderInput data-testid="input" />
    </FileUploaderContext.Provider>,
  )

  const file = makeFile('a.txt')
  fireEvent.change(screen.getByTestId('input'), { target: { files: [file] } })

  expect(queue.getItemsSnapshot()).toMatchObject([{ status: 'uploading', file }])
})

test('addFiles is used for multi-select', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  const addFiles = vi.spyOn(queue, 'addFiles')
  const replaceFiles = vi.spyOn(queue, 'replaceFiles')
  render(
    <FileUploaderContext.Provider value={{ queue }}>
      <FileUploaderInput accept="image/*" data-testid="input" maxFiles={2} maxFileSize={1000} maxTotalSize={2000} />
    </FileUploaderContext.Provider>,
  )

  const file = makeFile('a.png', 100, 'image/png')
  fireEvent.change(screen.getByTestId('input'), { target: { files: [file] } })

  expect(addFiles).toHaveBeenCalledWith([file])
  expect(replaceFiles).not.toHaveBeenCalled()
})

test('replaceFiles is used for single-select', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  const addFiles = vi.spyOn(queue, 'addFiles')
  const replaceFiles = vi.spyOn(queue, 'replaceFiles')
  render(
    <FileUploaderContext.Provider value={{ queue }}>
      <FileUploaderInput data-testid="input" maxFiles={1} />
    </FileUploaderContext.Provider>,
  )

  const file = makeFile('a.txt')
  fireEvent.change(screen.getByTestId('input'), { target: { files: [file] } })

  expect(replaceFiles).toHaveBeenCalledWith([file])
  expect(addFiles).not.toHaveBeenCalled()
})

test('reportValidity is called with a rejection for a file failing accept/maxFileSize', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  const reportValidity = vi.spyOn(queue, 'reportValidity')
  render(
    <FileUploaderContext.Provider value={{ queue }}>
      <FileUploaderInput accept="image/*" data-testid="input" />
    </FileUploaderContext.Provider>,
  )

  const file = makeFile('a.txt')
  fireEvent.change(screen.getByTestId('input'), { target: { files: [file] } })

  expect(reportValidity).toHaveBeenCalledWith([{ file, validationError: 'typeMismatch' }])
})

test('the rendered input reflects files added directly on the queue', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  const children = vi.fn(() => null)
  render(
    <FileUploaderContext.Provider value={{ queue }}>
      <FileUploaderInput>{children}</FileUploaderInput>
    </FileUploaderContext.Provider>,
  )

  const file = makeFile('a.txt')
  act(() => queue.addFiles([file]))

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [file] }))
})

test('the rendered input reflects files removed directly on the queue', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  queue.addFiles([makeFile('a.txt')])
  const [item] = queue.getItemsSnapshot()

  const children = vi.fn(() => null)
  render(
    <FileUploaderContext.Provider value={{ queue }}>
      <FileUploaderInput>{children}</FileUploaderInput>
    </FileUploaderContext.Provider>,
  )

  act(() => queue.removeItem(item.id))

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [] }))
})

test('forwards the children render prop through to FileInput unmodified', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploaderContext.Provider value={{ queue }}>
      <FileUploaderInput>{({ openFilePicker }) => <button onClick={openFilePicker}>Browse</button>}</FileUploaderInput>,
    </FileUploaderContext.Provider>,
  )

  expect(screen.getByRole('button', { name: 'Browse' })).toBeVisible()
})

test('throws when rendered with no queue prop and no FileUploader ancestor', () => {
  expect(() => render(<FileUploaderInput data-testid="input" />)).toThrow(
    'FileUploader.Input must be used within a FileUploader',
  )
})

test('sources the queue and constraints from context when no props are given', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploaderContext.Provider value={{ queue }}>
      <FileUploaderInput accept="image/*" data-testid="input" />
    </FileUploaderContext.Provider>,
  )

  expect(screen.getByTestId('input')).toHaveAttribute('accept', 'image/*')
})
