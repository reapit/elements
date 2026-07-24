import { fireEvent, render, screen } from '@testing-library/react'
import { FileUploader } from '../file-uploader'
import { FileUploadQueue } from '../file-upload-queue'

test('renders a file input', () => {
  render(
    <FileUploader onUpload={async () => 'file-id'}>
      <FileUploader.Input aria-label="Upload" />
    </FileUploader>,
  )
  expect(screen.getByLabelText('Upload')).toBeInTheDocument()
})

test('creates its own queue when no queue prop is provided', () => {
  render(
    <FileUploader onUpload={async () => 'file-id'}>
      <FileUploader.Input data-testid="input" multiple />
      <FileUploader.FileList>
        {(items) => items.map((item) => <FileUploader.File key={item.id} item={item} />)}
      </FileUploader.FileList>
    </FileUploader>,
  )

  const file = new File([new Uint8Array(10)], 'a.txt')
  fireEvent.change(screen.getByTestId('input'), { target: { files: [file] } })

  expect(screen.getByText('a.txt')).toBeInTheDocument()
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

test('accept passed to FileUploader.Input is applied directly, not via FileUploader', () => {
  render(
    <FileUploader onUpload={async () => 'file-id'}>
      <FileUploader.Input accept="image/*" data-testid="input" />
    </FileUploader>,
  )

  expect(screen.getByTestId('input')).toHaveAttribute('accept', 'image/*')
})

test('applies maxWidth to the wrapping element', () => {
  const { container } = render(
    <FileUploader maxWidth="300px" onUpload={async () => 'file-id'}>
      <FileUploader.Input aria-label="Upload" />
    </FileUploader>,
  )

  expect(container.firstChild).toHaveStyle({ maxWidth: '300px' })
})

test('FileUploader.Control renders help/error text between the input and the file list, not after both', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  queue.addFiles([new File([new Uint8Array(10)], 'a.txt')])

  render(
    <FileUploader queue={queue}>
      <FileUploader.Control helpText="Help text" label="Documents" />
      <FileUploader.FileList>
        {(items) => items.map((item) => <FileUploader.File key={item.id} item={item} />)}
      </FileUploader.FileList>
    </FileUploader>,
  )

  const helpText = screen.getByText('Help text')
  const fileName = screen.getByText('a.txt')
  expect(helpText.compareDocumentPosition(fileName) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
})
