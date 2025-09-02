import { PaginationInfo } from '../info'
import { render, screen } from '@testing-library/react'

test('displays given page number and count in the correct format', () => {
  render(<PaginationInfo pageNumber={1} pageCount={10} />)
  expect(screen.getByText('1 of 10')).toBeVisible()
})
