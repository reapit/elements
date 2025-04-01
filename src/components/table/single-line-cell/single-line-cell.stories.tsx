import { SingleLineCell } from './singe-line-cell'
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
import { Badge } from '../../badge'
import { Features, FeaturesItem } from '../../features'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/SingleLineCell',
  component: SingleLineCell,
} satisfies Meta<typeof SingleLineCell>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The table text component is designed to be used with in the table component.
 * It can have different color varients and can be of only two sizes 'small' or 'extra-small'
 */
export const BasicUsage: Story = {
  render: ({}) => (
    <TableContainer>
      <TableToolbar
        description="5 Contents"
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
                  Page size: 5
                </Button>
              )}
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItemGroup>
                  <MenuItem>5</MenuItem>
                  <MenuItem>10</MenuItem>
                  <MenuItem>15</MenuItem>
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
                <TableText>Alphanumeric</TableText>
              </SingleLineCell>
            </TableCell>
            <TableCell>
              <SingleLineCell>
                <TableText>John Smith 356</TableText>
              </SingleLineCell>
            </TableCell>
            <TableCell>
              <SingleLineCell>
                <Skeleton />
              </SingleLineCell>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <SingleLineCell>
                <TableText>Address</TableText>
              </SingleLineCell>
            </TableCell>
            <TableCell>
              <SingleLineCell>
                <TableText>10 Hay St, Melbourne 3100</TableText>
              </SingleLineCell>
            </TableCell>
            <TableCell>
              <SingleLineCell>
                <Skeleton />
              </SingleLineCell>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <SingleLineCell>
                <TableText>Badge</TableText>
              </SingleLineCell>
            </TableCell>
            <TableCell>
              <SingleLineCell>
                <Badge
                  iconLeft={<Icon icon="add" fontSize="1rem" />}
                  iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
                  variant="success"
                >
                  Label
                </Badge>
              </SingleLineCell>
            </TableCell>
            <TableCell>
              <SingleLineCell>
                <Skeleton width="4rem" />
              </SingleLineCell>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <SingleLineCell>
                <TableText>Features</TableText>
              </SingleLineCell>
            </TableCell>
            <TableCell>
              <SingleLineCell>
                <Features>
                  <FeaturesItem aria-label="Bedrooms" icon={<Icon icon="bed" />}>
                    1
                  </FeaturesItem>
                  <FeaturesItem aria-label="Bathooms" icon={<Icon icon="bath" />}>
                    2
                  </FeaturesItem>
                  <FeaturesItem aria-label="Cars" icon={<Icon icon="car" />}>
                    5
                  </FeaturesItem>
                  <FeaturesItem aria-label="Areas" icon={<Icon icon="appLauncher" />}>
                    850 sqm
                  </FeaturesItem>
                </Features>
              </SingleLineCell>
            </TableCell>
            <TableCell>
              <SingleLineCell>
                <Skeleton />
              </SingleLineCell>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <SingleLineCell>
                <TableText>Icon with Value</TableText>
              </SingleLineCell>
            </TableCell>
            <TableCell>
              <SingleLineCell>
                <TableText
                  iconLeft={<Icon icon="star" fontSize="1rem" />}
                  iconRight={<Icon icon="star" fontSize="1rem" />}
                >
                  Value
                </TableText>
              </SingleLineCell>
            </TableCell>
            <TableCell>
              <SingleLineCell>
                <Skeleton width="2rem" />
              </SingleLineCell>
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
   <SingleLineCell>
  <TableText>Value</TableText>
</SingleLineCell>
          `,
      },
    },
  },
}
