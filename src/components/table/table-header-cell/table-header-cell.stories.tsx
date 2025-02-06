import { Meta } from '@storybook/react'
import { TableHeaderCell } from './table-header-cell'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'

const meta: Meta<typeof TableHeaderCell> = {
  title: 'Components/TableHeaderCell',
  component: TableHeaderCell,
}

export default meta

export const BasicUsage = {
  render: (args) => (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <TableHeaderCell {...args}>Test th</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Test td</td>
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
