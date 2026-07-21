import { useFileInputValidity } from '../use-file-input-validity'
import { renderHook } from '@testing-library/react'

afterEach(() => {
  document.body.innerHTML = ''
})

test('syncs the input files to match the given files', () => {
  const input = createFileInput('input')
  const file = makeFile('a.txt')

  renderHook(() => useValidity({ files: [file] }))

  expect(Array.from(input.files ?? [])).toEqual([file])
})

test('sets no custom validity message when the files satisfy the rules', () => {
  const input = createFileInput('input')

  renderHook(() => useValidity({ files: [makeFile('a.txt')] }))

  expect(input.validationMessage).toBe('')
})

test('sets a custom validity token when the files violate a rule', () => {
  const input = createFileInput('input')

  renderHook(() => useValidity({ files: [makeFile('report.pdf')], accept: 'image/*' }))

  expect(input.validationMessage).toBe('accept')
})

test('updates the validity message when the files change', () => {
  const input = createFileInput('input')
  const { rerender } = renderHook((files: File[]) => useValidity({ files, accept: 'image/*' }), {
    initialProps: [makeFile('report.pdf')],
  })
  expect(input.validationMessage).toBe('accept')

  rerender([makeFile('photo.png', { type: 'image/png' })])

  expect(input.validationMessage).toBe('')
})

test('does not throw when the input element for inputId does not exist', () => {
  expect(() => {
    renderHook(() => useValidity({ files: [], inputId: 'missing' }))
  }).not.toThrow()
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function useValidity(overrides: Partial<Parameters<typeof useFileInputValidity>[0]> & { files: File[] }) {
  return useFileInputValidity({
    inputId: 'input',
    accept: undefined,
    multiple: false,
    maxFileSize: undefined,
    maxFiles: undefined,
    maxTotalSize: undefined,
    ...overrides,
  })
}

function createFileInput(id: string): HTMLInputElement {
  const input = document.createElement('input')
  input.type = 'file'
  input.id = id
  document.body.appendChild(input)
  return input
}

function makeFile(name: string, options: { type?: string } = {}): File {
  const { type = '' } = options
  return new File([new Uint8Array(10)], name, { type })
}
