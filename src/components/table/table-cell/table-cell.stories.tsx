import { Meta } from '@storybook/react'
import { TableCell } from './table-cell'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'

const meta: Meta<typeof TableCell> = {
  title: 'Components/TableCell',
  component: TableCell,
}

export default meta

export const BasicUsage = {
  render: (args) => (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <TableCell {...args}>Test th</TableCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCell {...args}>Test td</TableCell>
          </tr>
        </tbody>
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
      description: 'Defines TableCell width for the children',
    },
    minWidth: {
      control: 'text',
      description: 'Defines TableCell minWidth for the children',
    },
    maxWidth: {
      control: 'text',
      description: 'Defines TableCell minWidth for the children',
    },
    narrowLabel: {
      control: 'text',
      description: 'Defines TableCell header when table is in mobile devices',
    },
    link: {
      control: 'text',
      description: 'Defines TableCell clickable link as <a> href',
    },
  },
}
