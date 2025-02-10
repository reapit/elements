import { render } from '@testing-library/react'
import { TableBody } from '../index'
import { Table } from '../../table/table'

describe('TableBody', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <Table>
        <thead>
          <th>Head 1</th>
        </thead>
        <TableBody>
          <tr>
            <td>Row 1</td>
          </tr>
        </TableBody>
      </Table>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
