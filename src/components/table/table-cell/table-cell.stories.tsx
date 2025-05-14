import { Meta } from '@storybook/react'
import { TableCell } from './table-cell'
import { Table } from '../table/table'
import { TableContainer } from '../table-container'
import { TableToolbar } from '../table-toolbar'
import { TableHead } from '../table-head'
import { TableHeaderCell } from '../table-header-cell'
import { TableBody } from '../table-body'
import { TableRow } from '../table-row'
import { Input } from '../../input'
import { AvatarRectangle } from '../../avatar-rectangle'
import { SingleLineCell } from '../single-line-cell'
import { DoubleLineCell } from '../double-line-cell'
import { TableText } from '../table-text'

export default {
  title: 'Components/TableCell',
  component: TableCell,
} as Meta<typeof TableCell>

export const BasicUsage = {
  render: (args) => (
    <TableContainer>
      <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell {...args} maxWidth="30px">
              <Input type="checkbox" />
            </TableHeaderCell>
            <TableHeaderCell {...args}>PROPERTY</TableHeaderCell>
            <TableHeaderCell {...args}>OWNERSHIP</TableHeaderCell>
            <TableHeaderCell {...args}>TENANCY</TableHeaderCell>
            <TableHeaderCell alignment="right">KEY</TableHeaderCell>
            <TableHeaderCell {...args}>RENT</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 5 }, (_, index) => (
            <TableRow key={index} isSelected={index == 0}>
              <TableCell {...args}>
                <Input type="checkbox" checked={index == 0} />
              </TableCell>
              <TableCell {...args}>
                <DoubleLineCell
                  mediaItem={
                    <AvatarRectangle
                      variant="residential"
                      size="medium"
                      src="https://picsum.photos/seed/picsum/200/300"
                    />
                  }
                  firstLine={<TableText variant="primary">5 / Lot 4, 200 Adelaide St</TableText>}
                  secondLine={<TableText variant="secondary">North Natalie 5743</TableText>}
                />
              </TableCell>
              <TableCell {...args}>
                <SingleLineCell>Cameron Waters</SingleLineCell>
              </TableCell>
              <TableCell {...args}>
                <DoubleLineCell
                  firstLine={<TableText variant="primary">Eli Lynch</TableText>}
                  secondLine={<TableText variant="secondary">No expiry</TableText>}
                />
              </TableCell>
              <TableCell {...args} alignment="right">
                <SingleLineCell>No Key</SingleLineCell>
              </TableCell>
              <TableCell {...args}>
                <DoubleLineCell
                  firstLine={<TableText variant="primary">$500.00 Weekly</TableText>}
                  secondLine={<TableText variant="warning">Paid to</TableText>}
                />
              </TableCell>
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
