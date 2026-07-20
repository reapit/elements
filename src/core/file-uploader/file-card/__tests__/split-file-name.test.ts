import { splitFileName } from '../split-file-name'

test('splits a filename into base and extension', () => {
  expect(splitFileName('Invoice.pdf')).toEqual({ base: 'Invoice', extension: '.pdf' })
})

test('uses only the last extension for a filename with multiple dots', () => {
  expect(splitFileName('archive.tar.gz')).toEqual({ base: 'archive.tar', extension: '.gz' })
})

test('treats a filename with no dot as having no extension', () => {
  expect(splitFileName('README')).toEqual({ base: 'README', extension: '' })
})

test('does not treat a leading dot as an extension marker', () => {
  expect(splitFileName('.gitignore')).toEqual({ base: '.gitignore', extension: '' })
})

test('treats a trailing dot with no characters after it as having no extension', () => {
  expect(splitFileName('Invoice.')).toEqual({ base: 'Invoice.', extension: '' })
})
