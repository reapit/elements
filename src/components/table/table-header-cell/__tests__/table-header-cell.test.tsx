import { render } from '@testing-library/react'
import { TableHeaderCell } from '../table-header-cell'

describe('TableHeaderCell', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<TableHeaderCell>Mock Children</TableHeaderCell>)
    expect(asFragment()).toMatchSnapshot()
  })
})
