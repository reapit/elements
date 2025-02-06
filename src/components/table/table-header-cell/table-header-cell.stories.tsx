import { Meta } from '@storybook/react'
import { TableHeaderCell } from './table-header-cell'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'

const meta: Meta<typeof TableHeaderCell> = {
  title: 'Components/TableHeaderCell',
  component: TableHeaderCell,
}

export default meta

export const BasicUsage = {
  render: ({}) => (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <TableHeaderCell>Test th</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Test td</td>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  ),
}
