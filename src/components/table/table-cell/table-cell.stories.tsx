import { Meta } from '@storybook/react'
import { TableCell } from './table-cell'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'

const meta: Meta<typeof TableCell> = {
  title: 'Components/TableCell',
  component: TableCell,
}

export default meta

export const BasicUsage = {
  render: ({}) => (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <TableCell>Test th</TableCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCell>Test td</TableCell>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  ),
}
