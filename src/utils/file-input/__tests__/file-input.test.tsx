import { createRef, useState } from 'react'
import { FileInput } from '../file-input'
import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

test('renders a native file input inside an unlabelled wrapper', () => {
  const { container } = render(<FileInput data-testid="input" />)
  const input = screen.getByTestId('input')
  expect(input.tagName).toBe('INPUT')
  expect(input).toHaveAttribute('type', 'file')
  expect(input.parentElement).toBe(container.firstElementChild)
  // Deliberately not a `<label>` — see the doc comment on `FileInput` for why: a consumer
  // associating its own external `<label htmlFor>` with the input must be the input's only label.
  expect(container.firstElementChild?.tagName).toBe('DIV')
})

test('forwards a ref to the native input element', () => {
  const ref = createRef<HTMLInputElement>()
  render(<FileInput ref={ref} data-testid="input" />)
  expect(ref.current).toBe(screen.getByTestId('input'))
})

test('forwards accept, multiple, and required as native attributes', () => {
  render(<FileInput accept="image/*" multiple required data-testid="input" />)
  const input = screen.getByTestId('input')
  expect(input).toHaveAttribute('accept', 'image/*')
  expect(input).toHaveAttribute('multiple')
  expect(input).toHaveAttribute('required')
})

test('sets data-show-validity="true" on the native input when showValidity is true', () => {
  render(<FileInput data-testid="input" showValidity />)
  expect(screen.getByTestId('input')).toHaveAttribute('data-show-validity', 'true')
})

test('sets data-show-validity="false" on the native input when showValidity is omitted', () => {
  render(<FileInput data-testid="input" />)
  expect(screen.getByTestId('input')).toHaveAttribute('data-show-validity', 'false')
})

test('infers multiple from a maxFiles greater than 1 when multiple is not set', () => {
  render(<FileInput maxFiles={3} data-testid="input" />)
  expect(screen.getByTestId('input')).toHaveAttribute('multiple')
})

test('does not infer multiple from maxFiles set to 1', () => {
  render(<FileInput maxFiles={1} data-testid="input" />)
  expect(screen.getByTestId('input')).not.toHaveAttribute('multiple')
})

test('respects an explicit multiple={false} even when maxFiles is greater than 1', () => {
  render(<FileInput multiple={false} maxFiles={3} data-testid="input" />)
  expect(screen.getByTestId('input')).not.toHaveAttribute('multiple')
})

test('required implies a minFiles of 1', () => {
  render(<FileInput required data-testid="input" />)
  const input = screen.getByTestId('input') as HTMLInputElement
  expect(input.validationMessage).toBe('filesUnderflow')
})

test('an explicit minFiles={0} opts out of the required-derived default', () => {
  render(<FileInput required minFiles={0} data-testid="input" />)
  const input = screen.getByTestId('input') as HTMLInputElement
  expect(input.validationMessage).toBe('')
})

test('clears the minFiles violation once enough files are selected', () => {
  render(<FileInput required data-testid="input" />)
  const input = screen.getByTestId('input') as HTMLInputElement

  fireEvent.change(input, { target: { files: [makeFile('a.txt')] } })

  expect(input.validationMessage).toBe('')
})

test('an explicit maxFiles wins over multiple when both are set', () => {
  render(<FileInput multiple maxFiles={2} data-testid="input" />)
  const input = screen.getByTestId('input') as HTMLInputElement

  fireEvent.change(input, { target: { files: [makeFile('a.txt'), makeFile('b.txt'), makeFile('c.txt')] } })

  expect(input.validationMessage).toBe('filesOverflow')
})

test('accepts more than one file when multiple is inferred from maxFiles', () => {
  const children = vi.fn(() => null)
  render(
    <FileInput maxFiles={3} data-testid="input">
      {children}
    </FileInput>,
  )

  const a = makeFile('a.txt')
  const b = makeFile('b.txt')
  fireEvent.change(screen.getByTestId('input'), { target: { files: [a, b] } })

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [a, b] }))
  expect((screen.getByTestId('input') as HTMLInputElement).validationMessage).toBe('')
})

test('renders no visible content by default', () => {
  const { container } = render(<FileInput data-testid="input" />)
  expect(container.firstElementChild?.textContent).toBe('')
})

test('does not visually hide the input when no children are provided', () => {
  render(<FileInput data-testid="input" />)
  expect(screen.getByTestId('input')).toHaveAttribute('data-visually-hidden', 'false')
})

test('visually hides the input when children are provided', () => {
  render(<FileInput data-testid="input">{() => <span>Browse</span>}</FileInput>)
  expect(screen.getByTestId('input')).toHaveAttribute('data-visually-hidden', 'true')
})

test('renders the content returned by children', () => {
  render(<FileInput>{() => <span>Browse files</span>}</FileInput>)
  expect(screen.getByText('Browse files')).toBeVisible()
})

test('keeps the input in the default tab order when children are provided', () => {
  render(<FileInput data-testid="input">{() => <span>Browse</span>}</FileInput>)
  // Visually hidden isn't the same as absent from the tab order — a keyboard user must still be
  // able to reach and operate the input directly, since `children` here has no interactive
  // element of its own to receive focus instead.
  expect(screen.getByTestId('input')).toHaveProperty('tabIndex', 0)
})

test('respects an explicit tabIndex on the input even when children are provided', () => {
  render(
    <FileInput tabIndex={-1} data-testid="input">
      {() => <span>Browse</span>}
    </FileInput>,
  )
  // A consumer whose `children` renders its own separately-focusable trigger opts out this way,
  // so the hidden input doesn't become a second, indicator-less tab stop ahead of it.
  expect(screen.getByTestId('input')).toHaveProperty('tabIndex', -1)
})

// ---------------------------------------------------------------------------
// children render prop
// ---------------------------------------------------------------------------

test('exposes the current files, isFocused, and disabled state to children', () => {
  const children = vi.fn(() => null)
  render(
    <FileInput disabled data-testid="input">
      {children}
    </FileInput>,
  )
  expect(children).toHaveBeenCalledWith({
    files: [],
    isDraggingOver: false,
    isFocused: false,
    disabled: true,
    openFilePicker: expect.any(Function),
  })
})

test('openFilePicker opens the native file picker', () => {
  const click = vi.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => {})
  const children = vi.fn((_props: FileInput.RenderProps) => null)
  render(<FileInput data-testid="input">{children}</FileInput>)

  children.mock.calls[0]?.[0]?.openFilePicker()

  expect(click).toHaveBeenCalledTimes(1)
  click.mockRestore()
})

test('openFilePicker is a no-op while disabled', () => {
  const click = vi.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => {})
  const children = vi.fn((_props: FileInput.RenderProps) => null)
  render(
    <FileInput disabled data-testid="input">
      {children}
    </FileInput>,
  )

  children.mock.calls[0]?.[0]?.openFilePicker()

  expect(click).not.toHaveBeenCalled()
  click.mockRestore()
})

test('exposes isDraggingOver as false before any drag', () => {
  const children = vi.fn((_props: FileInput.RenderProps) => null)
  render(<FileInput>{children}</FileInput>)
  expect(children.mock.calls[0]?.[0]).toEqual(expect.objectContaining({ isDraggingOver: false }))
})

test('exposes isFocused as true once the input is focused', () => {
  const children = vi.fn(() => null)
  render(<FileInput data-testid="input">{children}</FileInput>)

  fireEvent.focus(screen.getByTestId('input'))

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ isFocused: true }))
})

test('exposes isFocused as false once the input is blurred', () => {
  const children = vi.fn(() => null)
  render(<FileInput data-testid="input">{children}</FileInput>)

  const input = screen.getByTestId('input')
  fireEvent.focus(input)
  fireEvent.blur(input)

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ isFocused: false }))
})

test('calls a consumer-supplied onFocus handler', () => {
  const onFocus = vi.fn()
  render(<FileInput onFocus={onFocus} data-testid="input" />)
  fireEvent.focus(screen.getByTestId('input'))
  expect(onFocus).toHaveBeenCalledTimes(1)
})

test('calls a consumer-supplied onBlur handler', () => {
  const onBlur = vi.fn()
  render(<FileInput onBlur={onBlur} data-testid="input" />)
  const input = screen.getByTestId('input')
  fireEvent.focus(input)
  fireEvent.blur(input)
  expect(onBlur).toHaveBeenCalledTimes(1)
})

// ---------------------------------------------------------------------------
// Drag and drop
// ---------------------------------------------------------------------------

test('sets isDraggingOver to true on dragenter and false on dragleave', () => {
  const children = vi.fn(() => null)
  const { container } = render(<FileInput>{children}</FileInput>)
  const dropzone = container.firstElementChild as HTMLElement

  fireEvent.dragEnter(dropzone, { dataTransfer: { types: ['Files'] } })
  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ isDraggingOver: true }))

  fireEvent.dragLeave(dropzone, { dataTransfer: { types: ['Files'] } })
  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ isDraggingOver: false }))
})

test('stays isDraggingOver while the pointer moves across a nested child before leaving the dropzone', () => {
  const children = vi.fn(() => null)
  const { container } = render(<FileInput>{children}</FileInput>)
  const dropzone = container.firstElementChild as HTMLElement

  // dragenter/dragleave fire at every element boundary crossed, including nested children — this
  // simulates entering the dropzone, then entering and leaving a child within it, and asserts
  // isDraggingOver survives that inner pair rather than flickering false.
  fireEvent.dragEnter(dropzone, { dataTransfer: { types: ['Files'] } })
  fireEvent.dragEnter(dropzone, { dataTransfer: { types: ['Files'] } })
  fireEvent.dragLeave(dropzone, { dataTransfer: { types: ['Files'] } })
  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ isDraggingOver: true }))

  fireEvent.dragLeave(dropzone, { dataTransfer: { types: ['Files'] } })
  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ isDraggingOver: false }))
})

test('ignores a drag that carries no files', () => {
  const children = vi.fn(() => null)
  const { container } = render(<FileInput>{children}</FileInput>)
  const dropzone = container.firstElementChild as HTMLElement

  fireEvent.dragEnter(dropzone, { dataTransfer: { types: ['text/plain'] } })
  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ isDraggingOver: false }))
})

test('does not set isDraggingOver while disabled', () => {
  const children = vi.fn(() => null)
  const { container } = render(<FileInput disabled>{children}</FileInput>)
  const dropzone = container.firstElementChild as HTMLElement

  fireEvent.dragEnter(dropzone, { dataTransfer: { types: ['Files'] } })
  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ isDraggingOver: false }))
})

test('allows a drop by calling preventDefault on dragover', () => {
  const { container } = render(<FileInput />)
  const dropzone = container.firstElementChild as HTMLElement

  const notCancelled = fireEvent.dragOver(dropzone, { dataTransfer: { types: ['Files'] } })
  expect(notCancelled).toBe(false)
})

test('calls preventDefault on dragover of a file even while disabled', () => {
  const { container } = render(<FileInput disabled />)
  const dropzone = container.firstElementChild as HTMLElement

  const notCancelled = fireEvent.dragOver(dropzone, { dataTransfer: { types: ['Files'] } })
  expect(notCancelled).toBe(false)
})

test('dropping a file updates the selection through the same change path as browsing', () => {
  const children = vi.fn(() => null)
  const onChange = vi.fn()
  const { container } = render(<FileInput onChange={onChange}>{children}</FileInput>)
  const dropzone = container.firstElementChild as HTMLElement

  const file = makeFile('a.txt')
  fireEvent.drop(dropzone, { dataTransfer: { files: [file], types: ['Files'] } })

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [file], isDraggingOver: false }))
  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange.mock.calls[0]?.[0]?.type).toBe('change')
})

test('drops only the first file when multiple is not set', () => {
  const children = vi.fn(() => null)
  const { container } = render(<FileInput>{children}</FileInput>)
  const dropzone = container.firstElementChild as HTMLElement

  const a = makeFile('a.txt')
  const b = makeFile('b.txt')
  fireEvent.drop(dropzone, { dataTransfer: { files: [a, b], types: ['Files'] } })

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [a] }))
})

test('drops every file when multiple is set', () => {
  const children = vi.fn(() => null)
  const { container } = render(<FileInput multiple>{children}</FileInput>)
  const dropzone = container.firstElementChild as HTMLElement

  const a = makeFile('a.txt')
  const b = makeFile('b.txt')
  fireEvent.drop(dropzone, { dataTransfer: { files: [a, b], types: ['Files'] } })

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [a, b] }))
})

test('excludes a dropped file that fails accept before it ever reaches the selection', () => {
  const children = vi.fn(() => null)
  const { container } = render(
    <FileInput accept="image/*" multiple>
      {children}
    </FileInput>,
  )
  const dropzone = container.firstElementChild as HTMLElement

  const match = makeFile('photo.png', { type: 'image/png' })
  const mismatch = makeFile('report.pdf', { type: 'application/pdf' })
  fireEvent.drop(dropzone, { dataTransfer: { files: [mismatch, match], types: ['Files'] } })

  // Unlike a constraint violation (accept on a browsed file, or maxFiles/maxFileSize/maxTotalSize
  // on either entry point), which stays in the selection and only invalidates the input, a dropped
  // file that fails `accept` never lands here at all — matching what the OS picker would have
  // already filtered out before `change` fired for a browsed selection.
  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [match] }))
})

test('ignores a drop while disabled', () => {
  const children = vi.fn(() => null)
  const onChange = vi.fn()
  const { container } = render(
    <FileInput disabled onChange={onChange}>
      {children}
    </FileInput>,
  )
  const dropzone = container.firstElementChild as HTMLElement

  fireEvent.drop(dropzone, { dataTransfer: { files: [makeFile('a.txt')], types: ['Files'] } })

  expect(onChange).not.toHaveBeenCalled()
  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [] }))
})

// ---------------------------------------------------------------------------
// Uncontrolled selection
// ---------------------------------------------------------------------------

test('tracks the selection internally when uncontrolled', () => {
  const children = vi.fn(() => null)
  render(<FileInput data-testid="input">{children}</FileInput>)

  const file = makeFile('a.txt')
  fireEvent.change(screen.getByTestId('input'), { target: { files: [file] } })

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [file] }))
})

test('starts with the files from defaultValue', () => {
  const children = vi.fn(() => null)
  const file = makeFile('a.txt')
  render(<FileInput defaultValue={[file]}>{children}</FileInput>)
  expect(children).toHaveBeenCalledWith(expect.objectContaining({ files: [file] }))
})

test('calls onChange with the native change event', () => {
  const onChange = vi.fn()
  render(<FileInput onChange={onChange} data-testid="input" />)

  fireEvent.change(screen.getByTestId('input'), { target: { files: [makeFile('a.txt')] } })

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange.mock.calls[0]?.[0]?.target).toBe(screen.getByTestId('input'))
})

test('replaces the previous selection when multiple is not set', () => {
  const children = vi.fn(() => null)
  render(<FileInput data-testid="input">{children}</FileInput>)
  const input = screen.getByTestId('input') as HTMLInputElement

  const a = makeFile('a.txt')
  const b = makeFile('b.txt')
  fireEvent.change(input, { target: { files: [a] } })
  fireEvent.change(input, { target: { files: [b] } })

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [b] }))
  expect(Array.from(input.files ?? [])).toEqual([b])
})

test('replaces the previous selection on a second browse round, even when multiple', () => {
  const children = vi.fn(() => null)
  render(
    <FileInput multiple data-testid="input">
      {children}
    </FileInput>,
  )
  const input = screen.getByTestId('input') as HTMLInputElement

  const a = makeFile('a.txt')
  const b = makeFile('b.txt')
  fireEvent.change(input, { target: { files: [a] } })
  fireEvent.change(input, { target: { files: [b] } })

  // `multiple` allows more than one file per round; it doesn't accumulate across rounds. A
  // consumer that wants a running, removable selection owns that itself (a controlled `value`, or
  // `FileUploadQueue`/`FileUploader`) — see the `onChange` doc comment on `FileInput.Props`.
  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [b] }))
  expect(Array.from(input.files ?? [])).toEqual([b])
})

test("onChange's event.target.files reflects only this round's picks, not previous rounds", () => {
  const onChange = vi.fn()
  render(<FileInput multiple onChange={onChange} data-testid="input" />)
  const input = screen.getByTestId('input')

  const a = makeFile('a.txt')
  const b = makeFile('b.txt')
  fireEvent.change(input, { target: { files: [a] } })
  fireEvent.change(input, { target: { files: [b] } })

  const lastEvent = onChange.mock.calls[1]?.[0]
  expect(Array.from(lastEvent.target.files)).toEqual([b])
})

test('keeps a file rejected by accept in the exposed selection but drops it from the native input', () => {
  const children = vi.fn(() => null)
  render(
    <FileInput accept="image/*" data-testid="input">
      {children}
    </FileInput>,
  )

  const file = makeFile('report.pdf')
  fireEvent.change(screen.getByTestId('input'), { target: { files: [file] } })
  const input = screen.getByTestId('input') as HTMLInputElement

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [file] }))
  expect(Array.from(input.files ?? [])).toEqual([])
  expect(input.validationMessage).toBe('')
})

test('keeps a file beyond maxFiles in the selection but invalidates the input', () => {
  const children = vi.fn(() => null)
  render(
    <FileInput multiple maxFiles={1} data-testid="input">
      {children}
    </FileInput>,
  )

  const a = makeFile('a.txt')
  const b = makeFile('b.txt')
  fireEvent.change(screen.getByTestId('input'), { target: { files: [a, b] } })

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [a, b] }))
  expect((screen.getByTestId('input') as HTMLInputElement).validationMessage).toBe('filesOverflow')
})

test('does not enforce maxFiles across separate rounds', () => {
  const children = vi.fn(() => null)
  render(
    <FileInput multiple maxFiles={1} data-testid="input">
      {children}
    </FileInput>,
  )
  const input = screen.getByTestId('input')

  fireEvent.change(input, { target: { files: [makeFile('a.txt')] } })
  const b = makeFile('b.txt')
  fireEvent.change(input, { target: { files: [b] } })

  // Each round is validated against maxFiles on its own — a's earlier round isn't carried
  // forward, so b (one file) doesn't exceed maxFiles=1 for this round.
  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [b] }))
})

test('keeps a file beyond maxFileSize in the exposed selection but drops it from the native input', () => {
  const children = vi.fn(() => null)
  render(
    <FileInput maxFileSize={10} data-testid="input">
      {children}
    </FileInput>,
  )

  const file = makeFile('a.txt', { size: 20 })
  fireEvent.change(screen.getByTestId('input'), { target: { files: [file] } })
  const input = screen.getByTestId('input') as HTMLInputElement

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [file] }))
  expect(Array.from(input.files ?? [])).toEqual([])
  expect(input.validationMessage).toBe('')
})

// ---------------------------------------------------------------------------
// Controlled selection
// ---------------------------------------------------------------------------

test('does not update its own state when controlled', () => {
  const children = vi.fn(() => null)
  const file = makeFile('a.txt')
  render(
    <FileInput value={[file]} onChange={() => {}} data-testid="input">
      {children}
    </FileInput>,
  )

  fireEvent.change(screen.getByTestId('input'), { target: { files: [makeFile('b.txt')] } })

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [file] }))
})

test('does not merge new picks against the controlled value', () => {
  const onChange = vi.fn()
  const a = makeFile('a.txt')
  render(<FileInput multiple value={[a]} onChange={onChange} data-testid="input" />)

  const b = makeFile('b.txt')
  fireEvent.change(screen.getByTestId('input'), { target: { files: [b] } })

  // FileInput forwards only this round's picks; whether to append to or replace the
  // controlled value is the consumer's own decision, made in its onChange handler.
  const event = onChange.mock.calls[0]?.[0]
  expect(Array.from(event.target.files)).toEqual([b])
})

test('reflects an externally-updated controlled value', () => {
  function Controlled() {
    const [value, setValue] = useState<File[]>([])
    return (
      <>
        <FileInput value={value} onChange={(e) => setValue(Array.from(e.target.files ?? []))} data-testid="input" />
        <button onClick={() => setValue([])}>Clear</button>
      </>
    )
  }
  render(<Controlled />)

  fireEvent.change(screen.getByTestId('input'), { target: { files: [makeFile('a.txt')] } })
  expect((screen.getByTestId('input') as HTMLInputElement).files).toHaveLength(1)

  fireEvent.click(screen.getByText('Clear'))
  expect((screen.getByTestId('input') as HTMLInputElement).files).toHaveLength(0)
})

// ---------------------------------------------------------------------------
// Validity
// ---------------------------------------------------------------------------

test('has no custom validity message when the selection satisfies the rules', () => {
  render(<FileInput data-testid="input" />)
  expect((screen.getByTestId('input') as HTMLInputElement).validationMessage).toBe('')
})

test('sets a custom validity token when a controlled value violates maxFiles', () => {
  render(<FileInput multiple maxFiles={1} value={[makeFile('a.txt'), makeFile('b.txt')]} data-testid="input" />)
  expect((screen.getByTestId('input') as HTMLInputElement).validationMessage).toBe('filesOverflow')
})

test('sets a custom validity token when an uncontrolled pick violates a constraint', () => {
  render(<FileInput multiple maxFiles={1} data-testid="input" />)
  fireEvent.change(screen.getByTestId('input'), { target: { files: [makeFile('a.txt'), makeFile('b.txt')] } })
  expect((screen.getByTestId('input') as HTMLInputElement).validationMessage).toBe('filesOverflow')
})

test('does not set a custom validity token when an uncontrolled pick only violates a per-file rule', () => {
  render(<FileInput accept="image/*" data-testid="input" />)
  fireEvent.change(screen.getByTestId('input'), { target: { files: [makeFile('report.pdf')] } })
  expect((screen.getByTestId('input') as HTMLInputElement).validationMessage).toBe('')
})

test('clears the custom validity token once an uncontrolled selection is replaced with a valid one', () => {
  render(<FileInput multiple maxFiles={1} data-testid="input" />)
  const input = screen.getByTestId('input') as HTMLInputElement

  fireEvent.change(input, { target: { files: [makeFile('a.txt'), makeFile('b.txt')] } })
  expect(input.validationMessage).toBe('filesOverflow')

  fireEvent.change(input, { target: { files: [makeFile('a.txt')] } })
  expect(input.validationMessage).toBe('')
})

test('clears the custom validity token once a controlled value satisfies the rules again', () => {
  function Controlled() {
    const [value, setValue] = useState<File[]>([makeFile('a.txt'), makeFile('b.txt')])
    return (
      <>
        <FileInput multiple maxFiles={1} value={value} data-testid="input" />
        <button onClick={() => setValue([makeFile('a.txt')])}>Fix</button>
      </>
    )
  }
  render(<Controlled />)
  expect((screen.getByTestId('input') as HTMLInputElement).validationMessage).toBe('filesOverflow')

  fireEvent.click(screen.getByText('Fix'))
  expect((screen.getByTestId('input') as HTMLInputElement).validationMessage).toBe('')
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeFile(name: string, options: { type?: string; size?: number } = {}): File {
  const { type = '', size = 10 } = options
  return new File([new Uint8Array(size)], name, { type })
}
