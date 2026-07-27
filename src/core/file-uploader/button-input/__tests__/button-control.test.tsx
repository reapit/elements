import { fireEvent, render, screen } from '@testing-library/react'
import { FileUploader } from '../../file-uploader'
import { FileUploaderButtonControl } from '../button-control'
import { FileUploaderContext } from '../../context'
import { FileUploadQueue } from '../../file-upload-queue'

function makeFile(name: string, size = 100, type = 'text/plain'): File {
  return new File([new Uint8Array(size)], name, { type })
}

test('renders a file input', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderButtonControl aria-label="Upload" />
    </FileUploader>,
  )
  expect(screen.getByLabelText('Upload')).toBeInTheDocument()
})

test('label is associated with the native input via htmlFor', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderButtonControl data-testid="input" label="Documents" />
    </FileUploader>,
  )

  const input = screen.getByTestId('input')
  const label = screen.getByText('Documents').closest('label')
  expect(label).toHaveAttribute('for', input.id)
})

test('displays error text, when provided', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderButtonControl errorText="Error text" helpText="Help text" label="Label" />
    </FileUploader>,
  )
  expect(screen.getByText('Error text')).toBeVisible()
})

test('displays help text, when provided and no error is present', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderButtonControl helpText="Help text" label="Label" />
    </FileUploader>,
  )
  expect(screen.getByText('Help text')).toBeVisible()
})

test('hides help text when error text is present', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderButtonControl errorText="Error text" helpText="Help text" label="Label" />
    </FileUploader>,
  )
  expect(screen.queryByText('Help text')).not.toBeInTheDocument()
})

test('the input is described by the help text via aria-describedby', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderButtonControl data-testid="input" helpText="Help text" label="Label" />
    </FileUploader>,
  )

  const input = screen.getByTestId('input')
  const describedBy = input.getAttribute('aria-describedby')
  expect(describedBy).toBeTruthy()
  expect(document.getElementById(describedBy!)).toHaveTextContent('Help text')
})

test('the input is associated with the error text via aria-errormessage and marked invalid', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderButtonControl data-testid="input" errorText="Error text" label="Label" />
    </FileUploader>,
  )

  const input = screen.getByTestId('input')
  expect(input).toHaveAttribute('aria-invalid', 'true')
  const errorMessageId = input.getAttribute('aria-errormessage')
  expect(errorMessageId).toBeTruthy()
  expect(document.getElementById(errorMessageId!)).toHaveTextContent('Error text')
})

test('required is forwarded to both the label and the native input', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderButtonControl data-testid="input" label="Documents" required />
    </FileUploader>,
  )

  expect(screen.getByTestId('input')).toBeRequired()
})

test('sets data-show-validity="true" on the input when error text is present', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderButtonControl data-testid="input" errorText="Error text" label="Documents" />
    </FileUploader>,
  )

  expect(screen.getByTestId('input')).toHaveAttribute('data-show-validity', 'true')
})

test('does not set data-show-validity="true" on the input when no error text is present', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderButtonControl data-testid="input" label="Documents" />
    </FileUploader>,
  )

  expect(screen.getByTestId('input')).not.toHaveAttribute('data-show-validity', 'true')
})

test('respects an explicit showValidity={false} override even when error text is present', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderButtonControl data-testid="input" errorText="Error text" label="Documents" showValidity={false} />
    </FileUploader>,
  )

  expect(screen.getByTestId('input')).toHaveAttribute('data-show-validity', 'false')
})

test('adding a file through the native input queues and uploads it', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderButtonControl data-testid="input" />
    </FileUploader>,
  )

  const file = makeFile('a.txt')
  fireEvent.change(screen.getByTestId('input'), { target: { files: [file] } })

  expect(queue.getItemsSnapshot()).toMatchObject([{ status: 'uploading', file }])
})

test('reportValidity is called with a rejection for a file failing accept/maxFileSize', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  const reportValidity = vi.spyOn(queue, 'reportValidity')
  render(
    <FileUploader queue={queue}>
      <FileUploaderButtonControl accept="image/*" data-testid="input" />
    </FileUploader>,
  )

  const file = makeFile('a.txt')
  fireEvent.change(screen.getByTestId('input'), { target: { files: [file] } })

  expect(reportValidity).toHaveBeenCalledWith([{ file, validationError: 'typeMismatch' }])
})

test('throws when rendered with no queue prop and no FileUploader ancestor', () => {
  expect(() => render(<FileUploaderButtonControl data-testid="input" />)).toThrow(
    'useFileUploaderInput must be used within a FileUploader',
  )
})

test('sources the queue and constraints from context when no props are given', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploaderContext.Provider value={{ queue, triggerId: 'trigger' }}>
      <FileUploaderButtonControl accept="image/*" data-testid="input" />
    </FileUploaderContext.Provider>,
  )

  expect(screen.getByTestId('input')).toHaveAttribute('accept', 'image/*')
})

test('removes the native input from tab order in favour of the button trigger', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderButtonControl data-testid="input">Browse files</FileUploaderButtonControl>
    </FileUploader>,
  )

  expect(screen.getByTestId('input')).toHaveAttribute('tabindex', '-1')
})

test('a caller-supplied tabIndex forwards to the button trigger, leaving the hidden input pinned to -1', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderButtonControl data-testid="input" tabIndex={0}>
        Browse files
      </FileUploaderButtonControl>
    </FileUploader>,
  )

  expect(screen.getByTestId('input')).toHaveAttribute('tabindex', '-1')
  expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0')
})

test('renders a button trigger, calling openFilePicker on click', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderButtonControl>Browse files</FileUploaderButtonControl>
    </FileUploader>,
  )

  const trigger = screen.getByRole('button', { name: 'Browse files' })
  const input = document.querySelector('input[type="file"]') as HTMLInputElement
  const click = vi.spyOn(input, 'click')

  fireEvent.click(trigger)

  expect(click).toHaveBeenCalledTimes(1)
})

test('size drives both the button chrome and FormControl label/help/error text size', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  const { container } = render(
    <FileUploader queue={queue}>
      <FileUploaderButtonControl label="Documents" size="small">
        Browse files
      </FileUploaderButtonControl>
    </FileUploader>,
  )

  expect(container.querySelector('[data-size="small"]')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Browse files' })).toHaveAttribute('data-size', 'small')
})
