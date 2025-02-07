import { Meta } from '@storybook/react'
import { TableHead } from './table-head'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'
import { TableHeaderCell } from '../table-header-cell'
import { TableToolbar } from '../table-toolbar'
import { TableBody } from '../table-body'
import { TableRow } from '../table-row'
import { TableCell } from '../table-cell'
import { Input } from '../../input'
import { AvatarRectangle } from '../../avatar-rectangle'

const meta: Meta<typeof TableHead> = {
  title: 'Components/TableHead',
  component: TableHead,
}

export default meta

export const BasicUsage = {
  render: ({}) => (
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
          {Array.from({ length: 10 }, (_, index) => (
            <TableRow key={index}>
              <TableCell narrowLabel="Selected">
                <Input type="checkbox" />
              </TableCell>
              <TableCell>First Column</TableCell>
              <TableCell narrowLabel="Image">
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
}

export const DisplayWithStickyHeader = {
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
            <TableRow key={index}>
              <TableCell narrowLabel="Selected">
                <Input type="checkbox" />
              </TableCell>
              <TableCell>First Column</TableCell>
              <TableCell narrowLabel="Image">
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

// export const BasicUsage = {
//   render: (args) => (
//     <TableContainer>
//       <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
//       <Table>
//         <TableHead {...args}>
//           <TableHeaderCell>Head 1</TableHeaderCell>
//           <TableHeaderCell>Head 2</TableHeaderCell>
//         </TableHead>
//         <TableBody>
//           {Array.from({ length: 50 }, (_, index) => (
//             <TableRow key={index}>
//               <TableCell narrowLabel="Head 1">Row {index}</TableCell>
//               <TableCell narrowLabel="Head 2">Row {index} right side</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   ),
//   args: {
//     isSticky: false
//   },
//   argTypes: {
//     isSticky: {
//       control: 'boolean',
//       description: 'Defines TableHead to have sticky possition',
//       table: {
//         type: { summary: 'enum' },
//         defaultValue: { summary: 'false' },
//       },
//     },
//   },
// }
