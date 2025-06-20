import { render } from '@testing-library/react'
import { TableHeaderCell } from '../table-header-cell'

describe('TableHeaderCell', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<TableHeaderCell>Mock Children</TableHeaderCell>, {
      wrapper: (props) => (
        <table>
          <thead>
            <tr {...props} />
          </thead>
        </table>
      ),
    })
    expect(asFragment()).toMatchSnapshot()
  })
})
