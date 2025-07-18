import { Meta } from '@storybook/react-vite'
import { TableHead } from './table-head'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'
import { TableHeaderCell } from '../table-header-cell'
import { TableToolbar } from '../table-toolbar'
import { TableBody } from '../table-body'
import { Input } from '../../../deprecated/input'
import { AvatarRectangle } from '../../avatar-rectangle'
import { TableRow } from '../table-row'
import { SingleLineCell } from '../table-cell'

export default {
  title: 'Core/TableHead',
  component: TableHead,
} as Meta<typeof TableHead>

export const BasicUsage = {
  render: (args) => (
    <TableContainer>
      <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      <Table>
        <TableHead {...args}>
          <TableRow>
            <TableHeaderCell maxWidth="30px">Checkbox Header</TableHeaderCell>
            <TableHeaderCell>First Header</TableHeaderCell>
            <TableHeaderCell>Image Header</TableHeaderCell>
            <TableHeaderCell>Second Header</TableHeaderCell>
            <TableHeaderCell>Third Header</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 10 }, (_, index) => (
            <TableRow key={index}>
              <SingleLineCell>
                <Input type="checkbox" />
              </SingleLineCell>
              <SingleLineCell>First Column</SingleLineCell>
              <SingleLineCell>
                <AvatarRectangle variant="residential" size="medium" src="https://picsum.photos/seed/picsum/200/300" />
              </SingleLineCell>
              <SingleLineCell>Second Column</SingleLineCell>
              <SingleLineCell>Last Column</SingleLineCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
  args: {
    isSticky: true,
  },
}
