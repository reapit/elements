import { render } from '@testing-library/react'
import { Table } from '../index'
import { TableToolbar } from '../../table-toolbar'
import { TableContainer } from '../../table-container'
describe('Table', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <TableContainer>
        <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
        <Table>
          <thead>
            <th>Head 1</th>
          </thead>
          <tbody>
            <tr>
              <td>Row 1</td>
            </tr>
          </tbody>
        </Table>
      </TableContainer>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
