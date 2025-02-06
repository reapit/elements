import { Meta } from '@storybook/react'
import { TableHead } from './table-head'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'
import { TableHeaderCell } from '../table-header-cell'

const meta: Meta<typeof TableHead> = {
  title: 'Components/TableHead',
  component: TableHead,
}

export default meta

export const BasicUsage = {
  render: ({}) => (
    <TableContainer>
      <Table>
        <TableHead>
          <tr>
            <th>Test th</th>
          </tr>
        </TableHead>
        <tbody>
          <tr>
            <td>Test td</td>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  ),
}

export const DisplayWithStickyHeader = {
  render: (args) => (
    <TableContainer>
      <Table>
        <TableHead {...args}>
          <TableHeaderCell>Head 1</TableHeaderCell>
          <TableHeaderCell>Head 2</TableHeaderCell>
        </TableHead>
        <tbody>
          {Array.from({ length: 50 }, (_, index) => (
            <tr key={index}>
              <td>Row {index}</td>
              <td>Row {index} right side</td>
            </tr>
          ))}
        </tbody>
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
