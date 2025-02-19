import { Meta } from '@storybook/react'
import { TableRow } from './table-row'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'
import { TableToolbar } from '../table-toolbar'
import { TableHeaderCell } from '../table-header-cell'
import { TableHead } from '../table-head'
import { TableBody } from '../table-body'
import { Input } from '../../input'
import { AvatarRectangle } from '../../avatar-rectangle'

export default {
  title: 'Components/TableRow',
  component: TableRow,
} as Meta<typeof TableRow>

export const BasicUsage = {
  render: ({}) => (
    <TableContainer>
      <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      <Table>
        <TableHead>
          <TableHeaderCell maxWidth="30px">Checkbox Header</TableHeaderCell>
          <TableHeaderCell>First Header</TableHeaderCell>
          <TableHeaderCell>Image Header</TableHeaderCell>
          <TableHeaderCell>Second Header</TableHeaderCell>
          <TableHeaderCell>Third Header</TableHeaderCell>
        </TableHead>
        <TableBody>
          {Array.from({ length: 3 }, (_, index) => (
            <TableRow key={index}>
              <td>
                <Input type="checkbox" />
              </td>
              <td>First Column</td>
              <td>
                <AvatarRectangle variant="residential" size="medium" src="https://picsum.photos/seed/picsum/200/300" />
              </td>
              <td>Second Column</td>
              <td>Last Column</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
}
