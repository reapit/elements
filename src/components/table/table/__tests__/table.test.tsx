import { render } from '@testing-library/react'
import { Table } from '../index'
describe('Table', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<Table>Mock Child</Table>)
    expect(asFragment()).toMatchSnapshot()
  })
})
