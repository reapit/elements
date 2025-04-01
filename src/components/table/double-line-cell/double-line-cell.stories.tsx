import { DoubleLineCell } from './double-line-cell'
import { SingleLineCell } from '../single-line-cell'
import { TableText } from '../table-text'
import { TableContainer } from '../table-container'
import { TableToolbar } from '../table-toolbar'
import { Menu, MenuItem, MenuItemGroup, MenuList } from '../../menu'
import { MenuPopover, MenuTrigger } from '#src/components/menu/menu-popover'
import { Button } from '../../button'
import { Icon } from '../../icon'
import { TableHead } from '../table-head'
import { TableHeaderCell } from '../table-header-cell'
import { Table } from '../table'
import { TableBody } from '../table-body'
import { TableRow } from '../table-row'
import { TableCell } from '../table-cell'
import { Skeleton } from '../../skeleton'
import { Avatar } from '../../avatar'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/DoubleLineCell',
  component: DoubleLineCell,
} satisfies Meta<typeof DoubleLineCell>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The `DoubleLineCell` component is designed to be used with in the `TableCell` component.
 * It can accept any components
 */
export const BasicUsage: Story = {
  render: ({}) => (
    <TableContainer>
      <TableToolbar
        description="3 Contents"
        actions={
          <Menu data-alignment="right">
            <MenuTrigger>
              {({ getTriggerProps }) => (
                // To do: Once Button component is update with more props for no-padding, please make updates here
                <Button
                  variant="tertiary"
                  size="small"
                  {...getTriggerProps()}
                  iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
                >
                  Page size: 3
                </Button>
              )}
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItemGroup>
                  <MenuItem>3</MenuItem>
                  <MenuItem>6</MenuItem>
                  <MenuItem>9</MenuItem>
                </MenuItemGroup>
              </MenuList>
            </MenuPopover>
          </Menu>
        }
      />
      <Table>
        <TableHead>
          <TableHeaderCell>
            <SingleLineCell>
              <TableText variant="primary">Content Types</TableText>
            </SingleLineCell>
          </TableHeaderCell>
          <TableHeaderCell>
            <SingleLineCell>
              <TableText variant="primary">Component</TableText>
            </SingleLineCell>
          </TableHeaderCell>
          <TableHeaderCell>
            <SingleLineCell>
              <TableText variant="primary">Skeleton</TableText>
            </SingleLineCell>
          </TableHeaderCell>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <SingleLineCell>
                <TableText>Listing</TableText>
              </SingleLineCell>
            </TableCell>
            <TableCell>
              <DoubleLineCell
                mediaItem={
                  <img src="https://www.realestate.com.au/new-homes-landing-page/index-images/home-designs/aus/home-designs-victoria.jpg" />
                }
                firstLine={<TableText>10 Elizabeth St</TableText>}
                secondLine={<TableText size="extra-small">Brisbane City 4000</TableText>}
              />
            </TableCell>
            <TableCell>
              <DoubleLineCell
                mediaItem={<Skeleton height="40px" width="48px" />}
                firstLine={<Skeleton height="16px" />}
                secondLine={<Skeleton height="12px" width="8rem" />}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <SingleLineCell>
                <TableText>Contact</TableText>
              </SingleLineCell>
            </TableCell>
            <TableCell>
              <DoubleLineCell
                mediaItem={<Avatar>JS</Avatar>}
                firstLine={<TableText>John Smith</TableText>}
                secondLine={<TableText size="extra-small">Plumber</TableText>}
              />
            </TableCell>
            <TableCell>
              <DoubleLineCell
                mediaItem={<Skeleton borderRadius="100%" height="40px" width="40px" />}
                firstLine={<Skeleton height="16px" />}
                secondLine={<Skeleton height="12px" width="8rem" />}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <SingleLineCell>
                <TableText>Mixed Data</TableText>
              </SingleLineCell>
            </TableCell>
            <TableCell>
              <DoubleLineCell
                firstLine={
                  <>
                    <Icon icon="star" fontSize="1rem" />
                    <TableText>Alphanumeric value</TableText>
                    <Icon icon="star" fontSize="1rem" />
                  </>
                }
                secondLine={<TableText size="extra-small">Value 23 Jan 2025 4:30 pm Value</TableText>}
              />
            </TableCell>
            <TableCell>
              <DoubleLineCell
                firstLine={<Skeleton height="16px" width="13rem" />}
                secondLine={<Skeleton height="12px" width="9rem" />}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ),
  // Adding the parameters to display only one varient code in the source
  parameters: {
    docs: {
      source: {
        code: `
   <DoubleLineCell
  mediaItem={<Avatar>JS</Avatar>}
  firstLine={<TableText>John Smith</TableText>}
  secondLine={<TableText size="extra-small">Plumber</TableText>}
/>
          `,
      },
    },
  },
}
