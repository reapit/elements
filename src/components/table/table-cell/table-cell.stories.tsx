import { Meta } from '@storybook/react-vite'
import { TableCell } from './table-cell'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'
import { TableToolbar } from '../table-toolbar'
import { TableHead } from '../table-head'
import { TableHeaderCell } from '../table-header-cell'
import { TableBody } from '../table-body'
import { TableRow } from '../table-row'
import { Input } from '../../input'
import { AvatarRectangle } from '../../avatar-rectangle'

export default {
  title: 'Components/TableCell',
  component: TableCell,
} as Meta<typeof TableCell>

export const BasicUsage = {
  render: (args) => (
    <TableContainer>
      <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      <Table>
        <TableHead>
          <TableHeaderCell maxWidth="30px">Checkbox Header</TableHeaderCell>
          <TableHeaderCell>First Header</TableHeaderCell>
          <TableHeaderCell>Image Header</TableHeaderCell>
          <TableHeaderCell>Second Header</TableHeaderCell>
          <TableHeaderCell>Third Header</TableHeaderCell>
        </TableHead>
        <TableBody>
          {Array.from({ length: 5 }, (_, index) => (
            <TableRow key={index}>
              <TableCell {...args}>
                <Input type="checkbox" />
              </TableCell>
              <TableCell {...args}>First Column</TableCell>
              <TableCell {...args}>
                <AvatarRectangle variant="residential" size="medium" src="https://picsum.photos/seed/picsum/200/300" />
              </TableCell>
              <TableCell {...args}>Second Column</TableCell>
              <TableCell {...args} maxWidth="200px">
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </span>
                <AvatarRectangle variant="residential" size="medium" src="https://picsum.photos/seed/picsum/200/300" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
  args: {
    alignment: 'left',
  },
}
