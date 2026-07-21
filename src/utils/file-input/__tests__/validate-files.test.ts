import { validateFiles } from '../validate-files'

// ---------------------------------------------------------------------------
// No rules
// ---------------------------------------------------------------------------

test('accepts a single incoming file when no rules are provided', () => {
  const file = makeFile('a.txt')
  const { accepted, rejected } = validateFiles([file], [], {})
  expect(accepted).toEqual([file])
  expect(rejected).toEqual([])
})

// ---------------------------------------------------------------------------
// accept
// ---------------------------------------------------------------------------

test('accepts a file matching an extension pattern', () => {
  const file = makeFile('report.pdf')
  const { accepted } = validateFiles([file], [], { accept: '.pdf' })
  expect(accepted).toEqual([file])
})

test('rejects a file not matching an extension pattern', () => {
  const file = makeFile('report.docx')
  const { rejected } = validateFiles([file], [], { accept: '.pdf' })
  expect(rejected).toEqual([{ file, reason: 'accept' }])
})

test('accepts a file matching an exact MIME type', () => {
  const file = makeFile('photo.png', { type: 'image/png' })
  const { accepted } = validateFiles([file], [], { accept: 'image/png' })
  expect(accepted).toEqual([file])
})

test('rejects a file not matching an exact MIME type', () => {
  const file = makeFile('photo.png', { type: 'image/png' })
  const { rejected } = validateFiles([file], [], { accept: 'image/jpeg' })
  expect(rejected).toEqual([{ file, reason: 'accept' }])
})

test('accepts a file matching a MIME wildcard', () => {
  const file = makeFile('photo.png', { type: 'image/png' })
  const { accepted } = validateFiles([file], [], { accept: 'image/*' })
  expect(accepted).toEqual([file])
})

test('rejects a file not matching a MIME wildcard', () => {
  const file = makeFile('report.pdf', { type: 'application/pdf' })
  const { rejected } = validateFiles([file], [], { accept: 'image/*' })
  expect(rejected).toEqual([{ file, reason: 'accept' }])
})

test('accepts a file matching any pattern in a comma-separated accept list', () => {
  const file = makeFile('report.pdf')
  const { accepted } = validateFiles([file], [], { accept: 'image/*,.pdf' })
  expect(accepted).toEqual([file])
})

// ---------------------------------------------------------------------------
// multiple
// ---------------------------------------------------------------------------

test('accepts only the first incoming file when multiple is not set', () => {
  const a = makeFile('a.txt')
  const b = makeFile('b.txt')
  const { accepted, rejected } = validateFiles([a, b], [], {})
  expect(accepted).toEqual([a])
  expect(rejected).toEqual([{ file: b, reason: 'multiple' }])
})

test('accepts only the first incoming file when multiple is false', () => {
  const a = makeFile('a.txt')
  const b = makeFile('b.txt')
  const { accepted, rejected } = validateFiles([a, b], [], { multiple: false })
  expect(accepted).toEqual([a])
  expect(rejected).toEqual([{ file: b, reason: 'multiple' }])
})

test('rejects every incoming file when multiple is false and a file already exists', () => {
  const existing = makeFile('existing.txt')
  const incoming = makeFile('incoming.txt')
  const { accepted, rejected } = validateFiles([incoming], [existing], { multiple: false })
  expect(accepted).toEqual([])
  expect(rejected).toEqual([{ file: incoming, reason: 'multiple' }])
})

test('accepts multiple incoming files when multiple is true', () => {
  const a = makeFile('a.txt')
  const b = makeFile('b.txt')
  const { accepted, rejected } = validateFiles([a, b], [], { multiple: true })
  expect(accepted).toEqual([a, b])
  expect(rejected).toEqual([])
})

// ---------------------------------------------------------------------------
// maxFileSize
// ---------------------------------------------------------------------------

test('accepts a file at exactly maxFileSize', () => {
  const file = makeFile('a.txt', { size: 100 })
  const { accepted } = validateFiles([file], [], { maxFileSize: 100 })
  expect(accepted).toEqual([file])
})

test('rejects a file exceeding maxFileSize', () => {
  const file = makeFile('a.txt', { size: 101 })
  const { rejected } = validateFiles([file], [], { maxFileSize: 100 })
  expect(rejected).toEqual([{ file, reason: 'maxFileSize' }])
})

// ---------------------------------------------------------------------------
// maxFiles
// ---------------------------------------------------------------------------

test('accepts incoming files up to maxFiles', () => {
  const a = makeFile('a.txt')
  const b = makeFile('b.txt')
  const { accepted, rejected } = validateFiles([a, b], [], { multiple: true, maxFiles: 2 })
  expect(accepted).toEqual([a, b])
  expect(rejected).toEqual([])
})

test('rejects incoming files beyond maxFiles', () => {
  const a = makeFile('a.txt')
  const b = makeFile('b.txt')
  const { accepted, rejected } = validateFiles([a, b], [], { multiple: true, maxFiles: 1 })
  expect(accepted).toEqual([a])
  expect(rejected).toEqual([{ file: b, reason: 'maxFiles' }])
})

test('counts existing files towards maxFiles', () => {
  const existing = makeFile('existing.txt')
  const incoming = makeFile('incoming.txt')
  const { accepted, rejected } = validateFiles([incoming], [existing], { multiple: true, maxFiles: 1 })
  expect(accepted).toEqual([])
  expect(rejected).toEqual([{ file: incoming, reason: 'maxFiles' }])
})

// ---------------------------------------------------------------------------
// maxTotalSize
// ---------------------------------------------------------------------------

test('accepts incoming files within maxTotalSize', () => {
  const a = makeFile('a.txt', { size: 50 })
  const b = makeFile('b.txt', { size: 50 })
  const { accepted, rejected } = validateFiles([a, b], [], { multiple: true, maxTotalSize: 100 })
  expect(accepted).toEqual([a, b])
  expect(rejected).toEqual([])
})

test('rejects incoming files that would exceed maxTotalSize', () => {
  const a = makeFile('a.txt', { size: 50 })
  const b = makeFile('b.txt', { size: 51 })
  const { accepted, rejected } = validateFiles([a, b], [], { multiple: true, maxTotalSize: 100 })
  expect(accepted).toEqual([a])
  expect(rejected).toEqual([{ file: b, reason: 'maxTotalSize' }])
})

test('counts existing file sizes towards maxTotalSize', () => {
  const existing = makeFile('existing.txt', { size: 80 })
  const incoming = makeFile('incoming.txt', { size: 30 })
  const { accepted, rejected } = validateFiles([incoming], [existing], { multiple: true, maxTotalSize: 100 })
  expect(accepted).toEqual([])
  expect(rejected).toEqual([{ file: incoming, reason: 'maxTotalSize' }])
})

// ---------------------------------------------------------------------------
// Rule precedence
// ---------------------------------------------------------------------------

test('reports accept before maxFileSize when a file fails both', () => {
  const file = makeFile('report.docx', { size: 200 })
  const { rejected } = validateFiles([file], [], { accept: '.pdf', maxFileSize: 100 })
  expect(rejected).toEqual([{ file, reason: 'accept' }])
})

test('reports maxFileSize before multiple when a file fails both', () => {
  const file = makeFile('a.txt', { size: 200 })
  const { rejected } = validateFiles([file], [makeFile('existing.txt')], { maxFileSize: 100 })
  expect(rejected).toEqual([{ file, reason: 'maxFileSize' }])
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeFile(name: string, options: { type?: string; size?: number } = {}): File {
  const { type = '', size = 10 } = options
  return new File([new Uint8Array(size)], name, { type })
}
