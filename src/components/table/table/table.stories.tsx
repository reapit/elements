import { Meta } from '@storybook/react'
import { Table } from './table'
import { TableContainer } from '../table-container'
import { TableToolbar } from '../table-toolbar'
import { TableHead } from '../table-head.atom'
import { TableHeaderCell } from '../table-header-cell.atom'
import { TableBody } from '../table-body.atom'
import { TableRow } from '../table-row.atom'
import { TableCell } from '../table-cell.atom'
import { IData } from './types'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
}

export default meta

export const BasicUsage = {
  render: ({ }) => (
    <TableContainer>
      <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      <Table>
        <TableHead>
          <TableHeaderCell>Head 1</TableHeaderCell>
          <TableHeaderCell>Head 2</TableHeaderCell>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell narrowLabel='Head 1'>Row 1</TableCell>
            <TableCell narrowLabel='Head 2'>Row 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ),
}

const DATA_TABLE: IData<string, string> = {
  rows: ["Row 1", "Row 2", "Row 3", "Row 4"],
  heads: ["Head 1", "Head 2"]
};
export const WithDataTable = {
  render: ({ }) => (
    <TableContainer>
      <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      <Table<string, string> data={DATA_TABLE}>
        <TableHead<string>>
          {({ row }) => (
            <TableHeaderCell>{row}</TableHeaderCell>
          )}
        </TableHead>
        <TableBody<string, string>>
          {({ row, heads, index }) => (
            <TableRow>
              <TableCell narrowLabel={heads[0]}>{row}</TableCell>
              <TableCell narrowLabel={heads[1]}>{row} right side</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  ),
  args: {
    data: DATA_TABLE
  },
}

export const WithFloatingHeader = {
  render: ({ }) => (
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
              <TableCell narrowLabel='Head 1'>Row {index}</TableCell>
              <TableCell narrowLabel='Head 2'>Row {index} right side</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
}

// export const ReactUsage: StoryObj<typeof NavSearchButton> = {}
// export const WithoutShortcut: StoryObj<typeof NavSearchButton> = {
//   args: {
//     isShortcutVisible: false,
//   },
// }

