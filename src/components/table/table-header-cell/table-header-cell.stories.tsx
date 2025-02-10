import { Meta } from '@storybook/react'
import { TableHeaderCell } from './table-header-cell'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'
import { TableToolbar } from '../table-toolbar'
import { TableHead } from '../table-head/table-head'
import { TableBody } from '../table-body'
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
    flexDirection: {
      control: 'select',
      description: 'Defines TableCell flex direction to row or column without adding new wrapper on child content',
      options: ['column', 'row'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'column' },
      },
    },
    isFlexWrap: {
      control: 'boolean',
      description:
        'Defines TableCell wrap or nowrap for the children of we have custom child without adding new wrapper',
    },
  },
}
