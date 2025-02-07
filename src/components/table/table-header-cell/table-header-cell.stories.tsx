import { Meta } from '@storybook/react'
import { TableHeaderCell } from './table-header-cell'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'
import { TableToolbar } from '../table-toolbar'
import { TableHead } from '../table-head/table-head'
import { TableBody } from '../table-body'
import { TableRow } from '../table-row'
import { TableCell } from '../table-cell'
import { Input } from '../../input'
import { AvatarRectangle } from '../../avatar-rectangle'

const meta: Meta<typeof TableHeaderCell> = {
  title: 'Components/TableHeaderCell',
  component: TableHeaderCell,
}

export default meta

export const BasicUsage = {
  render: (args) => (
    <TableContainer>
      <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      <Table>
        <TableHead>
          <TableHeaderCell {...args} maxWidth="30px">
            Checkbox Header
          </TableHeaderCell>
          <TableHeaderCell {...args}>First Header</TableHeaderCell>
          <TableHeaderCell {...args}>Image Header</TableHeaderCell>
          <TableHeaderCell {...args}>Second Header</TableHeaderCell>
          <TableHeaderCell {...args}>Third Header</TableHeaderCell>
        </TableHead>
        <TableBody>
          {Array.from({ length: 10 }, (_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Input type="checkbox" />
              </TableCell>
              <TableCell>First Column</TableCell>
              <TableCell>
                <AvatarRectangle variant="residential" size="medium" src="https://picsum.photos/seed/picsum/200/300" />
              </TableCell>
              <TableCell>Second Column</TableCell>
              <TableCell>Last Column</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
  args: {
    alignment: 'left',
  },
  argTypes: {
    alignment: {
      control: 'select',
      description: 'Defines label text alignment children',
      options: ['left', 'center', 'right'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'left' },
      },
    },
    width: {
      control: 'text',
      description: 'Defines label text width for the children',
    },
    minWidth: {
      control: 'text',
      description: 'Defines label text minWidth for the children',
    },
    maxWidth: {
      control: 'text',
      description: 'Defines label text minWidth for the children',
    },
  },
}
