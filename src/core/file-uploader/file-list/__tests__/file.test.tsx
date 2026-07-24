import { FileUploaderContext } from '../../context'
import { FileUploaderFile } from '../file'
import { FileUploaderFileListContext } from '../context'
import { fireEvent, render, screen } from '@testing-library/react'

import type { FileUploadQueue } from '../../file-upload-queue'
import type { ReactNode } from 'react'

function makeFile(name: string, type = 'text/plain'): File {
  return new File([new Uint8Array(10)], name, { type })
}

function makeItem(overrides: Partial<FileUploadQueue.Item> = {}): FileUploadQueue.Item {
  return { id: '1', file: makeFile('a.txt'), status: 'queued', ...overrides } as FileUploadQueue.Item
}

interface WrapperProps {
  children: ReactNode
  locale?: string
  name?: string
  variant?: 'file' | 'media'
}

function Wrapper({ children, locale, name, variant = 'file' }: WrapperProps) {
  return (
    <FileUploaderContext.Provider value={{ locale, queue: {} as FileUploadQueue<any> }}>
      <FileUploaderFileListContext.Provider value={{ name, variant }}>{children}</FileUploaderFileListContext.Provider>
    </FileUploaderContext.Provider>
  )
}

test('throws when rendered outside a FileUploader', () => {
  expect(() => render(<FileUploaderFile item={makeItem()} />)).toThrow(
    'FileUploader.File must be used within a FileUploader',
  )
})

test('throws when rendered outside a FileUploader.FileList', () => {
  expect(() =>
    render(<FileUploaderFile item={makeItem()} />, {
      wrapper: ({ children }) => (
        <FileUploaderContext.Provider value={{ queue: {} as FileUploadQueue<any> }}>
          {children}
        </FileUploaderContext.Provider>
      ),
    }),
  ).toThrow('FileUploader.File must be used within a FileUploader.FileList')
})

test('renders a FileCard row when variant is file', () => {
  render(<FileUploaderFile item={makeItem()} />, { wrapper: Wrapper })
  expect(screen.getByText('a.txt')).toBeVisible()
})

test('renders a MediaCard tile when variant is media', () => {
  const item = makeItem({ file: makeFile('a.png', 'image/png') })
  const { container } = render(<FileUploaderFile item={item} />, {
    wrapper: (props) => <Wrapper {...props} variant="media" />,
  })
  expect(container.querySelector('img')).toBeInTheDocument()
})

test('renders an image leading element when the file is an image, even when variant is file', () => {
  const item = makeItem({ file: makeFile('a.png', 'image/png') })
  const { container } = render(<FileUploaderFile item={item} />, { wrapper: Wrapper })
  expect(container.querySelector('img')).toBeInTheDocument()
})

test('renders an icon leading element for a non-image file', () => {
  const { container } = render(<FileUploaderFile item={makeItem()} />, { wrapper: Wrapper })
  expect(container.querySelector('img')).not.toBeInTheDocument()
})

test('renders the file name and size', () => {
  const item = makeItem({ file: new File([new Uint8Array(2 * 1000 * 1000)], 'invoice.pdf') })
  render(<FileUploaderFile item={item} />, { wrapper: (props) => <Wrapper {...props} locale="en-GB" /> })
  expect(screen.getByText('invoice.pdf')).toBeVisible()
  expect(screen.getByText('2 MB')).toBeVisible()
})

test('shows the upload error message when status is error', () => {
  const item = makeItem({ status: 'error' })
  render(<FileUploaderFile errorText="Upload failed" item={item} />, { wrapper: Wrapper })
  expect(screen.getByText('Upload failed')).toBeVisible()
})

test('shows no error message for a failing item with no errorText', () => {
  const item = makeItem({ validationError: 'typeMismatch' })
  render(<FileUploaderFile item={item} />, { wrapper: Wrapper })
  expect(screen.getByText('Queued')).toBeVisible()
})

test('renders no remove button when onRemove is omitted', () => {
  render(<FileUploaderFile item={makeItem()} />, { wrapper: Wrapper })
  expect(screen.queryByRole('button')).not.toBeInTheDocument()
})

test('calls onRemove when the remove button is clicked', () => {
  const onRemove = vi.fn()
  render(<FileUploaderFile item={makeItem()} onRemove={onRemove} />, { wrapper: Wrapper })

  fireEvent.click(screen.getByRole('button', { name: 'Remove a.txt' }))

  expect(onRemove).toHaveBeenCalledTimes(1)
})

test('shows upload progress while uploading', () => {
  const item = makeItem({ status: 'uploading', progress: 45, isLoadingIndicatorVisible: true })
  render(<FileUploaderFile item={item} />, { wrapper: Wrapper })
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '45')
})

test('renders a hidden input valued at fileId when name comes from context and the item is uploaded', async () => {
  const item = makeItem({ status: 'uploaded', fileId: 'result-id' })
  render(<FileUploaderFile item={item} />, { wrapper: (props) => <Wrapper {...props} name="documentIds" /> })

  const hiddenInput = await screen.findByDisplayValue('result-id')
  expect(hiddenInput).toHaveAttribute('type', 'hidden')
  expect(hiddenInput).toHaveAttribute('name', 'documentIds')
})

test("a name prop passed directly overrides FileUploader.FileList's context name", async () => {
  const item = makeItem({ status: 'uploaded', fileId: 'result-id' })
  render(<FileUploaderFile item={item} name="overridden" />, {
    wrapper: (props) => <Wrapper {...props} name="documentIds" />,
  })

  const hiddenInput = await screen.findByDisplayValue('result-id')
  expect(hiddenInput).toHaveAttribute('name', 'overridden')
})

test('does not render a hidden input for an item with a validationError, even when uploaded', () => {
  const item = makeItem({ status: 'uploaded', fileId: 'result-id', validationError: 'typeMismatch' })
  const { container } = render(<FileUploaderFile item={item} />, {
    wrapper: (props) => <Wrapper {...props} name="documentIds" />,
  })

  expect(container.querySelector('input[type="hidden"]')).not.toBeInTheDocument()
})

test('forwards native input props — onChange, onBlur, ref — onto the hidden input, for RHF/Formik integration', async () => {
  const item = makeItem({ status: 'uploaded', fileId: 'result-id' })
  const onChange = vi.fn()
  const onBlur = vi.fn()
  const ref = { current: null as HTMLInputElement | null }

  render(<FileUploaderFile ref={ref} item={item} name="documentIds" onBlur={onBlur} onChange={onChange} />, {
    wrapper: Wrapper,
  })

  const hiddenInput = await screen.findByDisplayValue('result-id')
  expect(ref.current).toBe(hiddenInput)
})
