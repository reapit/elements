import { Meta } from '@storybook/react'
import { TableBody } from './table-body'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'
import { TableToolbar } from '../table-toolbar'
import { Input } from '../../input'
import { AvatarRectangle } from '../../avatar-rectangle'

const meta: Meta<typeof TableBody> = {
  title: 'Components/TableBody',
  component: TableBody,
  parameters: {
    docs: {
      description: {
        component: 'The `TableBody` component is used within a `Table` to render the main content of the table.',
      },
    },
  },
}

export default meta

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
  parameters: {
    docs: {
      description: {
        story: 'This example demonstrates the basic usage of the `TableBody` component inside a `Table`. It includes checkboxes, text columns, and images.',
      },
    },
  },
}
