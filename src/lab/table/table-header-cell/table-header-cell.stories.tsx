import { Meta } from '@storybook/react-vite'
import { TableHeaderCell } from './table-header-cell'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'
import { TableToolbar } from '../table-toolbar'
import { TableHead } from '../table-head/table-head'
import { TableBody } from '../table-body'
import { Input } from '#src/deprecated/input'
import { AvatarRectangle } from '#src/core/avatar-rectangle'
import { TableRow } from '../table-row'
import { SingleLineCell } from '../table-cell'

const meta: Meta<typeof TableHeaderCell> = {
  title: 'Lab/TableHeaderCell',
  component: TableHeaderCell,
}

export default meta

export const BasicUsage = {
  render: (args) => (
    <TableContainer>
      <TableToolbar description="125 Properties" actions="Page size menu component goes here" />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell {...args} maxWidth="30px">
              Check
            </TableHeaderCell>
            <TableHeaderCell {...args}>First Header</TableHeaderCell>
            <TableHeaderCell {...args}>Image Header</TableHeaderCell>
            <TableHeaderCell {...args}>Second Header</TableHeaderCell>
            <TableHeaderCell {...args}>Third Header</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 3 }, (_, index) => (
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
    alignment: 'left',
  },
}
