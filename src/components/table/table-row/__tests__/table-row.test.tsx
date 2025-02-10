import { render } from '@testing-library/react'
import { TableRow } from '../index'
import { Table } from '../../table/table'
import { TableBody } from '../../table-body'

describe('TableRow', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <Table>
        <TableBody>
          <TableRow>
            <td>exampe row</td>
          </TableRow>
        </TableBody>
      </Table>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
