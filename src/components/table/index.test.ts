import * as TableExports from './index'

test('should import all exports from index.ts', () => {
  expect(TableExports).toHaveProperty('Table')
  expect(TableExports).toHaveProperty('TableContainer')
  expect(TableExports).toHaveProperty('TableToolbar')
  expect(TableExports).toHaveProperty('TableBody')
})
