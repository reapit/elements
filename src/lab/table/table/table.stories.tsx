import { Meta } from '@storybook/react-vite'
import { Table } from './table'
import { TableContainer } from '../table-container'
import { TableToolbar } from '../table-toolbar'

import { Input } from '#src/deprecated/input'
import { AvatarRectangle } from '#src/core/avatar-rectangle'

export default {
  title: 'Lab/Table',
  component: Table,
} as Meta<typeof Table>

export const BasicUsage = {
  render: ({}) => (
    <TableContainer>
      <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      <Table>
        <thead>
          <th>Checkbox Header</th>
          <th>First Header</th>
          <th>Image Header</th>
          <th>Second Header</th>
          <th>Third Header</th>
        </thead>
        <tbody>
          {Array.from({ length: 5 }, (_, index) => (
            <tr key={index}>
              <td>
                ITableProps
                <Input type="checkbox" />
              </td>
              <td>First Column</td>
              <td>
                <AvatarRectangle variant="residential" size="medium" src="https://picsum.photos/seed/picsum/200/300" />
              </td>
              <td>Second Column</td>
              <td>Last Column</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  ),
}
