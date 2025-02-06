import { Meta } from '@storybook/react'
import { TableBody } from './table-body'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'

const meta: Meta<typeof TableBody> = {
  title: 'Components/TableBody',
  component: TableBody,
}

export default meta

export const BasicUsage = {
  render: ({}) => (
    <TableContainer>
      <Table>
        <thead>
          <th>Test th</th>
        </thead>
        <TableBody>
          <tr>
            <td>Test td</td>
          </tr>
        </TableBody>
      </Table>
    </TableContainer>
  ),
}
