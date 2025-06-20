import { Meta } from '@storybook/react-vite'
import { TableRow } from './table-row'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'
import { TableToolbar } from '../table-toolbar'
import { TableHeaderCell } from '../table-header-cell'
import { TableHead } from '../table-head'
import { TableBody } from '../table-body'
import { Input } from '../../input'
import { AvatarRectangle } from '../../avatar-rectangle'
import { styled } from '@linaria/react'

const ElTd = styled.td`
  vertical-align: middle;
  padding: var(--spacing-2);
`
export default {
  title: 'Components/TableRow',
  component: TableRow,
} as Meta<typeof TableRow>

export const BasicUsage = {
  render: ({}) => (
    <TableContainer>
      <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell maxWidth="30px">Checkbox Header</TableHeaderCell>
            <TableHeaderCell>First Header</TableHeaderCell>
            <TableHeaderCell>Image Header</TableHeaderCell>
            <TableHeaderCell>Second Header</TableHeaderCell>
            <TableHeaderCell>Third Header</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 5 }, (_, index) => (
            <TableRow key={index} isSelected={index == 0}>
              <ElTd>
                <Input type="checkbox" checked={index == 0} />
              </ElTd>
              <ElTd>First Column</ElTd>
              <ElTd>
                <AvatarRectangle variant="residential" size="medium" src="https://picsum.photos/seed/picsum/200/300" />
              </ElTd>
              <ElTd>Second Column</ElTd>
              <ElTd>Last Column</ElTd>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
}
