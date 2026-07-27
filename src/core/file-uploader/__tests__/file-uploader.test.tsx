import { act, fireEvent, render, screen } from '@testing-library/react'
import { FileUploader } from '../file-uploader'
import { FileUploadQueue } from '../file-upload-queue'

test('renders a file input', () => {
  render(
    <FileUploader onUpload={async () => 'file-id'}>
      <FileUploader.ButtonControl aria-label="Upload" />
    </FileUploader>,
  )
  expect(screen.getByLabelText('Upload')).toBeInTheDocument()
})

test('creates its own queue when no queue prop is provided', async () => {
  render(
    <FileUploader onUpload={async () => 'file-id'}>
      <FileUploader.ButtonControl data-testid="input" multiple />
      <FileUploader.FileList>
        {(items) => items.map((item) => <FileUploader.File key={item.id} item={item} />)}
      </FileUploader.FileList>
    </FileUploader>,
  )

  const file = new File([new Uint8Array(10)], 'a.txt')
  fireEvent.change(screen.getByTestId('input'), { target: { files: [file] } })

  expect(screen.getByText('a.txt')).toBeInTheDocument()

  // Flushes the pending upload's resolution (a microtask scheduled by `onUpload`), so its
  // resulting queue update happens inside `act` instead of after the test completes.
  await act(async () => {})
})

test('uses an externally-provided queue instead of creating its own', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  queue.addFiles([new File([new Uint8Array(10)], 'existing.txt')])

  render(
    <FileUploader queue={queue}>
      <FileUploader.FileList>
        {(items) => items.map((item) => <FileUploader.File key={item.id} item={item} />)}
      </FileUploader.FileList>
    </FileUploader>,
  )

  expect(screen.getByText('existing.txt')).toBeInTheDocument()
})

test('accept passed to FileUploader.ButtonControl is applied directly, not via FileUploader', () => {
  render(
    <FileUploader onUpload={async () => 'file-id'}>
      <FileUploader.ButtonControl accept="image/*" data-testid="input" />
    </FileUploader>,
  )

  expect(screen.getByTestId('input')).toHaveAttribute('accept', 'image/*')
})

test('applies maxWidth to the wrapping element', () => {
  const { container } = render(
    <FileUploader maxWidth="300px" onUpload={async () => 'file-id'}>
      <FileUploader.ButtonControl aria-label="Upload" />
    </FileUploader>,
  )

  expect(container.firstChild).toHaveStyle({ maxWidth: '300px' })
})

test('renders a visually-hidden aria-live region for status announcements', () => {
  const { container } = render(
    <FileUploader onUpload={async () => 'file-id'}>
      <FileUploader.ButtonControl aria-label="Upload" />
    </FileUploader>,
  )

  const announcer = container.querySelector('[aria-live="polite"]')
  expect(announcer).toBeInTheDocument()
  expect(announcer).toHaveAttribute('aria-atomic', 'false')
})

test('FileUploader.ButtonControl renders help/error text between the input and the file list, not after both', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  queue.addFiles([new File([new Uint8Array(10)], 'a.txt')])

  render(
    <FileUploader queue={queue}>
      <FileUploader.ButtonControl helpText="Help text" label="Documents" />
      <FileUploader.FileList>
        {(items) => items.map((item) => <FileUploader.File key={item.id} item={item} />)}
      </FileUploader.FileList>
    </FileUploader>,
  )

  const helpText = screen.getByText('Help text')
  const fileName = screen.getByText('a.txt')
  expect(helpText.compareDocumentPosition(fileName) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})
