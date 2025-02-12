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
  parameters: {
    docs: {
      description: {
        component: `
          The \`TableHeaderCell\` component represents a header cell in a table. 
          It is typically used within the \`TableHead\` component to define column headers.
          It allows customization of alignment, width, and other properties like flex direction and wrapping behavior.
          
          You can customize its content with a wide range of styles and options, making it flexible for various table use cases.
        `,
      },
    },
  },
}

export default meta

export const BasicUsage = {
  render: (args) => (
    <TableContainer>
      <TableToolbar description="125 Properties" actions="Page size menu component goes here" />
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
      description: 'Defines the alignment of the header text within the cell.',
      options: ['left', 'center', 'right'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'left' },
      },
    },
    width: {
      control: 'text',
      description: 'Sets the width of the header cell. This value is a CSS width value (e.g., "100px").',
    },
    minWidth: {
      control: 'text',
      description: 'Defines the minimum width for the header cell. The cell won’t shrink smaller than this value.',
    },
    maxWidth: {
      control: 'text',
      description: 'Defines the maximum width for the header cell. The cell won’t expand beyond this value.',
    },
    flexDirection: {
      control: 'select',
      description:
        'Sets the flex direction for the content of the header cell. This can be set to "row" or "column" to arrange the content accordingly.',
      options: ['column', 'row'],
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'column' },
      },
    },
    isFlexWrap: {
      control: 'boolean',
      description:
        'Determines whether the content inside the header cell should wrap. If set to true, content will wrap; if false, content will not wrap.',
    },
  },
}
