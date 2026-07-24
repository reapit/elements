import { FileUploader } from '../../file-uploader'
import { FileUploaderControl } from '../control'
import { FileUploadQueue } from '../../file-upload-queue'
import { render, screen } from '@testing-library/react'

test('renders a file input', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderControl aria-label="Upload" />
    </FileUploader>,
  )
  expect(screen.getByLabelText('Upload')).toBeInTheDocument()
})

test('label is associated with the native input via htmlFor', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderControl data-testid="input" label="Documents" />
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
      <FileUploaderControl errorText="Error text" helpText="Help text" label="Label" />
    </FileUploader>,
  )
  expect(screen.getByText('Error text')).toBeVisible()
})

test('displays help text, when provided and no error is present', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderControl helpText="Help text" label="Label" />
    </FileUploader>,
  )
  expect(screen.getByText('Help text')).toBeVisible()
})

test('hides help text when error text is present', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderControl errorText="Error text" helpText="Help text" label="Label" />
    </FileUploader>,
  )
  expect(screen.queryByText('Help text')).not.toBeInTheDocument()
})

test('the input is described by the help text via aria-describedby', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderControl data-testid="input" helpText="Help text" label="Label" />
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
      <FileUploaderControl data-testid="input" errorText="Error text" label="Label" />
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
      <FileUploaderControl data-testid="input" label="Documents" required />
    </FileUploader>,
  )

  expect(screen.getByTestId('input')).toBeRequired()
})

test('sets data-show-validity="true" on the input when error text is present', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderControl data-testid="input" errorText="Error text" label="Documents" />
    </FileUploader>,
  )

  expect(screen.getByTestId('input')).toHaveAttribute('data-show-validity', 'true')
})

test('does not set data-show-validity="true" on the input when no error text is present', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderControl data-testid="input" label="Documents" />
    </FileUploader>,
  )

  expect(screen.getByTestId('input')).not.toHaveAttribute('data-show-validity', 'true')
})

test('respects an explicit showValidity={false} override even when error text is present', () => {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploader queue={queue}>
      <FileUploaderControl data-testid="input" errorText="Error text" label="Documents" showValidity={false} />
    </FileUploader>,
  )

  expect(screen.getByTestId('input')).toHaveAttribute('data-show-validity', 'false')
})
