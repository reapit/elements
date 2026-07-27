import { FileUploaderContext } from '../../context'
import { FileUploaderDropzoneInput } from '../dropzone-input'
import { FileUploadQueue } from '../../file-upload-queue'
import { fireEvent, render, screen } from '@testing-library/react'

function renderDropzone(props: Partial<FileUploaderDropzoneInput.Props> = {}) {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploaderContext.Provider value={{ queue }}>
      <FileUploaderDropzoneInput {...props}>Drag and drop your file here</FileUploaderDropzoneInput>
    </FileUploaderContext.Provider>,
  )
  return { queue }
}

test('renders a button element with the given text', () => {
  renderDropzone({ secondaryText: 'or browse files' })
  expect(screen.getByRole('button')).toHaveTextContent('Drag and drop your file here')
})

test('defaults to type="button" so it does not submit an enclosing form', () => {
  renderDropzone()
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
})

test('opens the file picker when clicked', () => {
  renderDropzone()
  const input = document.querySelector('input[type="file"]') as HTMLInputElement
  const click = vi.spyOn(input, 'click')

  fireEvent.click(screen.getByRole('button'))

  expect(click).toHaveBeenCalledTimes(1)
})

test('also calls a caller-supplied onClick when clicked', () => {
  const onClick = vi.fn()
  renderDropzone({ onClick })

  fireEvent.click(screen.getByRole('button'))

  expect(onClick).toHaveBeenCalledTimes(1)
})

test('reflects variant via a data attribute', () => {
  renderDropzone({ variant: 'compact' })
  expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'compact')
})

test('renders no icon badge when no icon is given', () => {
  renderDropzone()
  expect(screen.getByRole('button').querySelector('[aria-hidden]')).toBeNull()
})

test('forwards identity attributes like id/data-* to the native input, not the visible dropzone', () => {
  renderDropzone({ id: 'my-input', 'data-testid': 'my-input' } as FileUploaderDropzoneInput.Props)
  const input = screen.getByTestId('my-input')
  expect(input.tagName).toBe('INPUT')
  expect(input).toHaveAttribute('id', 'my-input')
})

test('keeps the native input out of tab order by default', () => {
  renderDropzone({ 'data-testid': 'my-input' } as FileUploaderDropzoneInput.Props)
  expect(screen.getByTestId('my-input')).toHaveAttribute('tabindex', '-1')
})

test('queues a picked file on the underlying native input', () => {
  const { queue } = renderDropzone({ 'data-testid': 'my-input' } as FileUploaderDropzoneInput.Props)
  const file = new File([new Uint8Array(10)], 'a.txt', { type: 'text/plain' })

  fireEvent.change(screen.getByTestId('my-input'), { target: { files: [file] } })

  expect(queue.getItemsSnapshot()).toMatchObject([{ status: 'uploading', file }])
})

test('replaces the previous file with the next pick when multiple is not set', () => {
  const { queue } = renderDropzone({ 'data-testid': 'my-input' } as FileUploaderDropzoneInput.Props)
  const first = new File([new Uint8Array(10)], 'a.txt', { type: 'text/plain' })
  const second = new File([new Uint8Array(10)], 'b.txt', { type: 'text/plain' })

  fireEvent.change(screen.getByTestId('my-input'), { target: { files: [first] } })
  fireEvent.change(screen.getByTestId('my-input'), { target: { files: [second] } })

  expect(queue.getItemsSnapshot()).toMatchObject([{ file: second }])
})

test('adds to the existing selection on the next pick when multiple is set', () => {
  const { queue } = renderDropzone({
    'data-testid': 'my-input',
    multiple: true,
  } as FileUploaderDropzoneInput.Props)
  const first = new File([new Uint8Array(10)], 'a.txt', { type: 'text/plain' })
  const second = new File([new Uint8Array(10)], 'b.txt', { type: 'text/plain' })

  fireEvent.change(screen.getByTestId('my-input'), { target: { files: [first] } })
  fireEvent.change(screen.getByTestId('my-input'), { target: { files: [second] } })

  expect(queue.getItemsSnapshot()).toMatchObject([{ file: first }, { file: second }])
})
