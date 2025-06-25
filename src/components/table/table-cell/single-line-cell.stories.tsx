import { SingleLineCell } from './single-line-cell'
import { TableText } from '../table-text'
import { DeprecatedIcon } from '../../deprecated-icon'
import { Skeleton } from '../../skeleton'
import { Badge } from '../../badge'
import { Features, FeaturesItem } from '../../features'
import { StatusIndicator } from '../../status-indicator'
import { Tag, TagGroup } from '../../tag'

import { TableContainer } from '../table-container'
import { TableToolbar } from '../table-toolbar'
import { Table } from '../table'
import { TableHead } from '../table-head'
import { TableHeaderCell } from '../table-header-cell'
import { TableBody } from '../table-body'
import { TableRow } from '../table-row'
import { Input } from '../../input'
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
  title: 'Components/TableCell/SingleLineCell',
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
              variant="success"
            >
              Label
            </Badge>
          )
        }
        if (itemName === 'Features') {
          acc[itemName] = (
            <Features>
              <FeaturesItem aria-label="Bedrooms" icon={<DeprecatedIcon icon="bed" />}>
                1
              </FeaturesItem>
              <FeaturesItem aria-label="Bathooms" icon={<DeprecatedIcon icon="bath" />}>
                2
              </FeaturesItem>
              <FeaturesItem aria-label="Cars" icon={<DeprecatedIcon icon="car" />}>
                5
              </FeaturesItem>
              <FeaturesItem aria-label="Areas" icon={<DeprecatedIcon icon="appSwitcher" />}>
                850 sqm
              </FeaturesItem>
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
          acc[itemName] = <StatusIndicator>Status Indicator</StatusIndicator>
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
