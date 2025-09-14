import { SingleLineCell } from './single-line-cell'
import { TableText } from '../table-text'
import { DeprecatedIcon } from '#src/deprecated/icon'
import { Skeleton } from '#src/core/skeleton'
import { Badge } from '#src/core/badge'
import { Features, FeatureItem } from '#src/core/features'
import { StatusIndicator } from '#src/core/status-indicator'
import { Tag } from '#src/core/tag'
import { TagGroup } from '#src/core/tag-group'

import { TableContainer } from '../table-container'
import { TableToolbar } from '../table-toolbar'
import { Table } from '../table'
import { TableHead } from '../table-head'
import { TableHeaderCell } from '../table-header-cell'
import { TableBody } from '../table-body'
import { TableRow } from '../table-row'
import { Input } from '#src/deprecated/input'
import type { Meta, StoryObj } from '@storybook/react-vite'

const CHILDREN_OPTIONS = [
  'Alphanumeric',
  'Address',
  'Badge',
  'Features',
  'Icon with Value',
  'Status Indicator',
  'Tags',
  'Skeleton',
]

const meta = {
  title: 'Lab/TableCell/SingleLineCell',
  component: SingleLineCell,
  argTypes: {
    children: {
      control: 'select',
      options: CHILDREN_OPTIONS,
      description: 'The media item will be displayed on the left side of the cell.',
      mapping: CHILDREN_OPTIONS.reduce((acc, itemName) => {
        if (itemName === 'Alphanumeric') {
          acc[itemName] = <TableText>John Smith 356</TableText>
        }
        if (itemName === 'Address') {
          acc[itemName] = <TableText>10 Hay St, Melbourne 3100</TableText>
        }
        if (itemName === 'Badge') {
          acc[itemName] = (
            <Badge
              iconLeft={<DeprecatedIcon icon="add" fontSize="1rem" />}
              iconRight={<DeprecatedIcon icon="chevronDown" fontSize="1rem" />}
              colour="success"
            >
              Label
            </Badge>
          )
        }
        if (itemName === 'Features') {
          acc[itemName] = (
            <Features size="xs">
              <FeatureItem label="Bedrooms" icon={<DeprecatedIcon icon="bed" />} value="1" />
              <FeatureItem label="Bathooms" icon={<DeprecatedIcon icon="bath" />} value="2" />
              <FeatureItem label="Cars" icon={<DeprecatedIcon icon="car" />} value="5" />
              <FeatureItem label="Areas" icon={<DeprecatedIcon icon="appSwitcher" />} value="850 sqm" />
            </Features>
          )
        }
        if (itemName === 'Icon with Value') {
          acc[itemName] = (
            <TableText
              iconLeft={<DeprecatedIcon icon="star" fontSize="1rem" />}
              iconRight={<DeprecatedIcon icon="star" fontSize="1rem" />}
            >
              Value
            </TableText>
          )
        }
        if (itemName === 'Status Indicator') {
          acc[itemName] = <StatusIndicator variant="neutral">Status Indicator</StatusIndicator>
        }
        if (itemName === 'Tags') {
          acc[itemName] = (
            <TagGroup>
              <Tag>Tag</Tag>
              <Tag>Tag</Tag>
              <Tag>Tag</Tag>
              <Tag>Tag</Tag>
              <Tag>Tag</Tag>
            </TagGroup>
          )
        }
        if (itemName === 'Skeleton') {
          acc[itemName] = <Skeleton />
        }
        return acc
      }, {}),
    },
  },
} satisfies Meta<typeof SingleLineCell>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The `SingleLineCell` component is designed to work like
 * the `TableCell` or `TableHeaderCell` component.
 * It can accept any components
 */
export const BasicUsage: Story = {
  args: {
    children: 'Alphanumeric',
    alignment: 'left',
  },
  render: (args) => {
    return (
      <TableContainer>
        <TableToolbar description="125 Properties" actions="Page Size menu component goes here" />
        <Table>
          <TableHead>
            <TableHeaderCell maxWidth="30px">Check</TableHeaderCell>
            <TableHeaderCell>First Header</TableHeaderCell>
            <TableHeaderCell>Second Header</TableHeaderCell>
            <TableHeaderCell>Third Header</TableHeaderCell>
            <TableHeaderCell>Last Header</TableHeaderCell>
          </TableHead>
          <TableBody>
            {Array.from({ length: 5 }, (_, index) => (
              <TableRow key={index}>
                <SingleLineCell {...args}>
                  <Input type="checkbox" />
                </SingleLineCell>
                <SingleLineCell {...args}>
                  <TableText>John Smith 356</TableText>
                </SingleLineCell>
                <SingleLineCell {...args}>
                  <TableText>Online</TableText>
                </SingleLineCell>
                <SingleLineCell {...args}>
                  <TableText>10 Hay St, Melbourne 3100</TableText>
                </SingleLineCell>
                <SingleLineCell {...args}>{args.children}</SingleLineCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  },
}
