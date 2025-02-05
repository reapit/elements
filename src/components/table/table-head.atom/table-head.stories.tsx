import { Meta } from '@storybook/react'
import { TableHead } from './table-head'
import { Table } from '../table/table'

const meta: Meta<typeof TableHead> = {
  title: 'Components/TableHead',
  component: TableHead,
}

export default meta

export const BasicUsage = {
  render: ({}) => (
    <Table>
      <TableHead>
        <tr>
          <th>Test th</th>
        </tr>
      </TableHead>
      <tbody>
        <tr>
          <td>Test td</td>
        </tr>
      </tbody>
    </Table>
  ),
}
