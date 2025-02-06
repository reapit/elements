import { Meta } from '@storybook/react'
import { Table } from './table'
import { TableContainer } from '../table-container'
import { TableToolbar } from '../table-toolbar'
import { TableHead } from '../table-head'
import { TableHeaderCell } from '../table-header-cell'
import { TableBody } from '../table-body'
import { TableRow } from '../table-row'
import { TableCell } from '../table-cell'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
}

export default meta

export const BasicUsage = {
  render: ({}) => (
    <TableContainer>
      <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      <Table>
        <TableHead>
          <TableHeaderCell>Head 1</TableHeaderCell>
          <TableHeaderCell>Head 2</TableHeaderCell>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell narrowLabel="Head 1">Row 1</TableCell>
            <TableCell narrowLabel="Head 2">Row 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ),
}

export const WithFloatingHeader = {
  render: ({}) => (
    <TableContainer>
      <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      <Table>
        <TableHead isSticky>
          <TableHeaderCell>Head 1</TableHeaderCell>
          <TableHeaderCell>Head 2</TableHeaderCell>
        </TableHead>
        <TableBody>
          {Array.from({ length: 50 }, (_, index) => (
            <TableRow key={index}>
              <TableCell narrowLabel="Head 1">Row {index}</TableCell>
              <TableCell narrowLabel="Head 2">Row {index} right side</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
}
