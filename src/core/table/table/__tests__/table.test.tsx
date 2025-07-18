import { render } from '@testing-library/react'
import { Table } from '../index'
describe('Table', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <Table>
        <tbody>
          <tr>
            <td>Mock cell</td>
          </tr>
        </tbody>
      </Table>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
