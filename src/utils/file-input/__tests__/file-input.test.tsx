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

test('exposes isDraggingOver as false', () => {
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

test('keeps a file rejected by accept in the selection but invalidates the input', () => {
  const children = vi.fn(() => null)
  render(
    <FileInput accept="image/*" data-testid="input">
      {children}
    </FileInput>,
  )

  const file = makeFile('report.pdf')
  fireEvent.change(screen.getByTestId('input'), { target: { files: [file] } })

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [file] }))
  expect((screen.getByTestId('input') as HTMLInputElement).validationMessage).toBe('accept')
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
  expect((screen.getByTestId('input') as HTMLInputElement).validationMessage).toBe('maxFiles')
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

test('keeps a file beyond maxFileSize in the selection but invalidates the input', () => {
  const children = vi.fn(() => null)
  render(
    <FileInput maxFileSize={10} data-testid="input">
      {children}
    </FileInput>,
  )

  const file = makeFile('a.txt', { size: 20 })
  fireEvent.change(screen.getByTestId('input'), { target: { files: [file] } })

  expect(children).toHaveBeenLastCalledWith(expect.objectContaining({ files: [file] }))
  expect((screen.getByTestId('input') as HTMLInputElement).validationMessage).toBe('maxFileSize')
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
  expect((screen.getByTestId('input') as HTMLInputElement).validationMessage).toBe('maxFiles')
})

test('sets a custom validity token when an uncontrolled pick violates a constraint', () => {
  render(<FileInput accept="image/*" data-testid="input" />)
  fireEvent.change(screen.getByTestId('input'), { target: { files: [makeFile('report.pdf')] } })
  expect((screen.getByTestId('input') as HTMLInputElement).validationMessage).toBe('accept')
})

test('clears the custom validity token once an uncontrolled selection is replaced with a valid one', () => {
  render(<FileInput accept="image/*" data-testid="input" />)
  const input = screen.getByTestId('input') as HTMLInputElement

  fireEvent.change(input, { target: { files: [makeFile('report.pdf')] } })
  expect(input.validationMessage).toBe('accept')

  fireEvent.change(input, { target: { files: [makeFile('photo.png', { type: 'image/png' })] } })
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
  expect((screen.getByTestId('input') as HTMLInputElement).validationMessage).toBe('maxFiles')

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
