import { act, fireEvent, render, screen } from '@testing-library/react'
import { FileUploaderContext } from '../../context'
import { FileUploaderSingleSelectMediaInput } from '../single-select-media-input'
import { FileUploadQueue } from '../../file-upload-queue'

function renderInput(props: Partial<FileUploaderSingleSelectMediaInput.Props> = {}) {
  const queue = new FileUploadQueue({ onUpload: async () => 'file-id' })
  render(
    <FileUploaderContext.Provider value={{ queue }}>
      <FileUploaderSingleSelectMediaInput {...props}>Drag and drop your file here</FileUploaderSingleSelectMediaInput>
    </FileUploaderContext.Provider>,
  )
  return { queue }
}

// `onUpload` resolves on a later microtask, so its follow-up state update must be flushed inside
// `act` here — otherwise it lands after the test's synchronous body has already finished.
async function selectFile(
  queue: FileUploadQueue,
  file = new File([new Uint8Array(10)], 'photo.jpg', { type: 'image/jpeg' }),
) {
  const input = document.querySelector('input[type="file"]') as HTMLInputElement
  await act(async () => {
    fireEvent.change(input, { target: { files: [file] } })
  })
  return file
}

test('renders the empty placeholder trigger by default', () => {
  renderInput()
  expect(screen.getByRole('button', { name: 'Drag and drop your file here' })).toBeInTheDocument()
})

test('opens the file picker when the empty placeholder is clicked', () => {
  renderInput()
  const input = document.querySelector('input[type="file"]') as HTMLInputElement
  const click = vi.spyOn(input, 'click')

  fireEvent.click(screen.getByRole('button', { name: 'Drag and drop your file here' }))

  expect(click).toHaveBeenCalledTimes(1)
})

test('swaps to the media card once a file is selected', async () => {
  const { queue } = renderInput()

  const file = await selectFile(queue)

  expect(screen.queryByRole('button', { name: 'Drag and drop your file here' })).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: `Replace ${file.name}` })).toBeInTheDocument()
})

test('removing the selected file swaps back to the empty placeholder and restores focus to it', async () => {
  const { queue } = renderInput()
  const file = await selectFile(queue)

  fireEvent.click(screen.getByRole('button', { name: `Remove ${file.name}` }))

  const trigger = screen.getByRole('button', { name: 'Drag and drop your file here' })
  expect(trigger).toBeInTheDocument()
  expect(trigger).toHaveFocus()
})

test('replaces the selected file when the media card is clicked', async () => {
  const { queue } = renderInput()
  const file = await selectFile(queue)
  const input = document.querySelector('input[type="file"]') as HTMLInputElement
  const click = vi.spyOn(input, 'click')

  fireEvent.click(screen.getByRole('button', { name: `Replace ${file.name}` }))

  expect(click).toHaveBeenCalledTimes(1)
})

test('disables the empty placeholder trigger when disabled', () => {
  renderInput({ disabled: true })
  expect(screen.getByRole('button', { name: 'Drag and drop your file here' })).toBeDisabled()
})

test('disables the media card when disabled', async () => {
  const { queue } = renderInput({ disabled: true })
  const file = await selectFile(queue)

  const card = screen.getByRole('button', { name: `Replace ${file.name}` })
  expect(card).not.toHaveAttribute('tabindex')
})
