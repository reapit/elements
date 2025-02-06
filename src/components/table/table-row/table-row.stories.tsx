import { Meta } from '@storybook/react'
import { TableRow } from './table-row'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'

const meta: Meta<typeof TableRow> = {
  title: 'Components/TableRow',
  component: TableRow,
}

export default meta

export const BasicUsage = {
  render: ({}) => (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>Test th</th>
          </tr>
        </thead>
        <tbody>
          <TableRow>
            <td>Test td</td>
          </TableRow>
        </tbody>
      </Table>
    </TableContainer>
  ),
}
