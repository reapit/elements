import { render } from '@testing-library/react'
import { TableBody } from '../index'
import { TableToolbar } from '../../table-toolbar'
import { Table } from '../../table/table'

describe('TableBody', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <Table>
        <TableBody>
          <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
        </TableBody>
      </Table>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
