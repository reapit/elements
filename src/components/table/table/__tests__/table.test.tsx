import { render } from '@testing-library/react'
import { Table } from '../index'
import { TableToolbar } from '../../table-toolbar'
import { TableContainer } from '../../table-container'
import { TableHead } from '../../table-head.atom'
import { TableHeaderCell } from '../../table-header-cell.atom'
import { TableBody } from '../../table-body.atom'
import { TableRow } from '../../table-row.atom'
import { TableCell } from '../../table-cell.atom'

describe('Table', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(
      <TableContainer>
        <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
        <Table>
          <TableHead>
            <TableHeaderCell>Head 1</TableHeaderCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Row 1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
