import { Meta } from '@storybook/react-vite'
import { TableBody } from './table-body'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'
import { TableToolbar } from '../table-toolbar'
import { Input } from '../../../deprecated/input'
import { AvatarRectangle } from '../../avatar-rectangle'

export default {
  title: 'Components/TableBody',
  component: TableBody,
} as Meta<typeof TableBody>

export const BasicUsage = {
  render: () => (
    <TableContainer>
      <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      <Table>
        <thead>
          <tr>
            <th>Checkbox</th>
            <th>First Name</th>
            <th>Profile Picture</th>
            <th>Last Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <TableBody>
          {Array.from({ length: 5 }, (_, index) => (
            <tr key={index}>
              <td>
                <Input type="checkbox" />
              </td>
              <td>John Doe</td>
              <td>
                <AvatarRectangle
                  variant="residential"
                  size="medium"
                  src="https://picsum.photos/seed/picsum/200/300"
                  alt="User avatar"
                />
              </td>
              <td>Doe</td>
              <td>View Details</td>
            </tr>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
}
