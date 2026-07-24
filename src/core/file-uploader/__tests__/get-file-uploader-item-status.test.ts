import { getFileUploaderItemStatus } from '../get-file-uploader-item-status'

test('returns "Queued" for a queued item', () => {
  expect(getFileUploaderItemStatus({ status: 'queued' }).statusText).toBe('Queued')
})

test('returns "Uploading" with no percentage when progress is omitted', () => {
  expect(getFileUploaderItemStatus({ status: 'uploading' }).statusText).toBe('Uploading')
})

test('returns "Uploading: n%" when progress is a number', () => {
  expect(getFileUploaderItemStatus({ status: 'uploading', progress: 45 }).statusText).toBe('Uploading: 45%')
})

test('rounds a fractional progress percentage', () => {
  expect(getFileUploaderItemStatus({ status: 'uploading', progress: 45.6 }).statusText).toBe('Uploading: 46%')
})

test('returns "Processing…" for a processing item', () => {
  expect(getFileUploaderItemStatus({ status: 'processing' }).statusText).toBe('Processing…')
})

test('returns "Uploaded" for an uploaded item', () => {
  expect(getFileUploaderItemStatus({ status: 'uploaded' }).statusText).toBe('Uploaded')
})

test('returns the error message and isError for an error item', () => {
  const result = getFileUploaderItemStatus({ status: 'error', errorMessage: 'File too large' })
  expect(result.statusText).toBe('File too large')
  expect(result.isError).toBe(true)
})

test('is not an error for non-error statuses with no errorMessage', () => {
  expect(getFileUploaderItemStatus({ status: 'uploaded' }).isError).toBe(false)
})

test('a present errorMessage is treated as an error even on a non-error status, for a failing validationError', () => {
  const result = getFileUploaderItemStatus({ status: 'queued', errorMessage: 'File exceeds the maximum size' })
  expect(result.statusText).toBe('File exceeds the maximum size')
  expect(result.isError).toBe(true)
})

test('falls back to a non-empty statusText when errorMessage is omitted', () => {
  const result = getFileUploaderItemStatus({ status: 'error' })
  expect(result.statusText).toBe('Error')
  expect(result.isError).toBe(true)
})

test('clamps an out-of-range progress percentage', () => {
  expect(getFileUploaderItemStatus({ status: 'uploading', progress: 120 }).statusText).toBe('Uploading: 100%')
})

test('returns "Uploading" with no percentage when progress is NaN or Infinity', () => {
  expect(getFileUploaderItemStatus({ status: 'uploading', progress: Number.NaN }).statusText).toBe('Uploading')
  expect(getFileUploaderItemStatus({ status: 'uploading', progress: Number.POSITIVE_INFINITY }).statusText).toBe(
    'Uploading',
  )
})

test('formats fileSize into sizeText when provided', () => {
  const result = getFileUploaderItemStatus({ status: 'queued', fileSize: 2 * 1000 * 1000, locale: 'en-GB' })
  expect(result.sizeText).toBe('2 MB')
})

test('omits sizeText when fileSize is not provided', () => {
  expect(getFileUploaderItemStatus({ status: 'queued' }).sizeText).toBeUndefined()
})
