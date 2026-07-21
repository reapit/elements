import { syncInputFiles } from '../sync-input-files'

afterEach(() => {
  document.body.innerHTML = ''
})

test('sets the input files to exactly the given files', () => {
  const input = createFileInput()

  const a = makeFile('a.txt')
  const b = makeFile('b.txt')
  syncInputFiles(input, [a, b])

  expect(Array.from(input.files ?? [])).toEqual([a, b])
})

test('clears the input files when given an empty array', () => {
  const input = createFileInput()
  syncInputFiles(input, [makeFile('a.txt')])

  syncInputFiles(input, [])

  expect(input.files).toHaveLength(0)
})

test('replaces the existing files rather than appending to them', () => {
  const input = createFileInput()
  syncInputFiles(input, [makeFile('a.txt')])

  const b = makeFile('b.txt')
  syncInputFiles(input, [b])

  expect(Array.from(input.files ?? [])).toEqual([b])
})

test('does not dispatch a change event', () => {
  const input = createFileInput()
  const onChange = vi.fn()
  input.addEventListener('change', onChange)

  syncInputFiles(input, [makeFile('a.txt')])

  expect(onChange).not.toHaveBeenCalled()
})

function createFileInput(): HTMLInputElement {
  const input = document.createElement('input')
  input.type = 'file'
  document.body.appendChild(input)
  return input
}

function makeFile(name: string): File {
  return new File([new Uint8Array(10)], name)
}
