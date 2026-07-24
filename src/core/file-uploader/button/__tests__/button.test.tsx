import { FileUploaderContext } from '../../context'
import { FileUploaderButtonInput } from '../button'
import { FileUploadQueue } from '../../file-upload-queue'
import { fireEvent, render, screen } from '@testing-library/react'

function renderButton(children: React.ReactNode = 'Browse files', props: Partial<FileUploaderButtonInput.Props> = {}) {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploaderContext.Provider value={{ queue }}>
      <FileUploaderButtonInput {...props}>{children}</FileUploaderButtonInput>
    </FileUploaderContext.Provider>,
  )
  return { queue }
}

test('renders a button element with the given label', () => {
  renderButton('Browse files')
  expect(screen.getByRole('button', { name: 'Browse files' })).toBeVisible()
})

test('defaults to type="button" so it does not submit an enclosing form', () => {
  renderButton()
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
})

test('opens the file picker when clicked', () => {
  renderButton()
  const input = document.querySelector('input[type="file"]') as HTMLInputElement
  const click = vi.spyOn(input, 'click')

  fireEvent.click(screen.getByRole('button'))

  expect(click).toHaveBeenCalledTimes(1)
})

test('also calls a caller-supplied onClick when clicked', () => {
  const onClick = vi.fn()
  renderButton('Browse files', { onClick })

  fireEvent.click(screen.getByRole('button'))

  expect(onClick).toHaveBeenCalledTimes(1)
})

test('forwards Button-specific props like variant/useLinkStyle', () => {
  renderButton('Browse files', { variant: 'primary', useLinkStyle: true })
  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('data-variant', 'primary')
  expect(button).toHaveAttribute('data-use-link-style', 'true')
})

test('forwards identity attributes like id/data-* to the native input, not the button', () => {
  renderButton('Browse files', { id: 'my-input', 'data-testid': 'my-input' } as FileUploaderButtonInput.Props)
  const input = screen.getByTestId('my-input')
  expect(input.tagName).toBe('INPUT')
  expect(input).toHaveAttribute('id', 'my-input')
})

test('keeps the native input out of tab order by default', () => {
  renderButton('Browse files', { 'data-testid': 'my-input' } as FileUploaderButtonInput.Props)
  expect(screen.getByTestId('my-input')).toHaveAttribute('tabindex', '-1')
})

test('queues a picked file on the underlying native input', () => {
  const { queue } = renderButton('Browse files', { 'data-testid': 'my-input' } as FileUploaderButtonInput.Props)
  const file = new File([new Uint8Array(10)], 'a.txt', { type: 'text/plain' })

  fireEvent.change(screen.getByTestId('my-input'), { target: { files: [file] } })

  expect(queue.getItemsSnapshot()).toMatchObject([{ status: 'uploading', file }])
})
