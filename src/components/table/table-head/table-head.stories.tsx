import { Meta } from '@storybook/react'
import { TableHead } from './table-head'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'
import { TableHeaderCell } from '../table-header-cell'
import { TableToolbar } from '../table-toolbar'
import { TableBody } from '../table-body'
import { Input } from '../../input'
import { AvatarRectangle } from '../../avatar-rectangle'

const meta: Meta<typeof TableHead> = {
  title: 'Components/TableHead',
  component: TableHead,
  parameters: {
    docs: {
      description: {
        component: `
          The \`TableHead\` component is used to define the header of the table.
          It typically includes \`TableHeaderCell\` elements that represent the table column headers.
          You can combine it with other components like \`Table\`, \`TableBody\`, and \`TableToolbar\` to create a fully functional table.
        `,
      },
    },
  },
}

export default meta

export const BasicUsage = {
  render: (args) => (
    <TableContainer>
      <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      <Table>
        <TableHead {...args}>
          <TableHeaderCell maxWidth="30px">Checkbox Header</TableHeaderCell>
          <TableHeaderCell>First Header</TableHeaderCell>
          <TableHeaderCell>Image Header</TableHeaderCell>
          <TableHeaderCell>Second Header</TableHeaderCell>
          <TableHeaderCell>Third Header</TableHeaderCell>
        </TableHead>
        <TableBody>
          {Array.from({ length: 10 }, (_, index) => (
            <tr key={index}>
              <td>
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
        </TableBody>
      </Table>
    </TableContainer>
  ),
  args: {
    isSticky: true,
  },
  argTypes: {
    isSticky: {
      control: 'boolean',
      description: 'Defines TableHead to have sticky possition',
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'false' },
      },
    },
  },
}
