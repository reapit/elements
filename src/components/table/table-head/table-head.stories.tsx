import { Meta } from '@storybook/react'
import { TableHead } from './table-head'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'
import { TableHeaderCell } from '../table-header-cell'
import { TableToolbar } from '../table-toolbar'
import { TableBody } from '../table-body'
import { Input } from '../../input'
import { TableRow } from '../table-row'
import { TableCell } from '../table-cell'

export default {
  title: 'Components/TableHead',
  component: TableHead,
} as Meta<typeof TableHead>

export const BasicUsage = {
  render: (args) => (
    <TableContainer>
      <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      <Table>
        <TableHead {...args}>
          <TableRow>
            <TableHeaderCell maxWidth="30px">Checkbox</TableHeaderCell>
            <TableHeaderCell>First Header</TableHeaderCell>
            <TableHeaderCell>Second Header</TableHeaderCell>
            <TableHeaderCell>Third Header</TableHeaderCell>
            <TableHeaderCell>Last Header</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 10 }, (_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Input type="checkbox" />
              </TableCell>
              <TableCell>First Column</TableCell>
              <TableCell>Second Column</TableCell>
              <TableCell>Third Column</TableCell>
              <TableCell>Last Column</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
  args: {
    isSticky: true,
  },
}
