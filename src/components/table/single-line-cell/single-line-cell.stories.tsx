import { SingleLineCell } from './single-line-cell'
import { TableText } from '../table-text'
import { Icon } from '../../icon'
import { Skeleton } from '../../skeleton'
import { Badge } from '../../badge'
import { Features, FeaturesItem } from '../../features'
import { StatusIndicator } from '../../status-indicator'
import { Tag, TagGroup } from '../../tag'

import type { Meta, StoryObj } from '@storybook/react'

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
  title: 'Components/SingleLineCell',
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
              iconLeft={<Icon icon="add" fontSize="1rem" />}
              iconRight={<Icon icon="chevronDown" fontSize="1rem" />}
              variant="success"
            >
              Label
            </Badge>
          )
        }
        if (itemName === 'Features') {
          acc[itemName] = (
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
          )
        }
        if (itemName === 'Icon with Value') {
          acc[itemName] = (
            <TableText iconLeft={<Icon icon="star" fontSize="1rem" />} iconRight={<Icon icon="star" fontSize="1rem" />}>
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
 * The `SingleLineCell` component is designed to be used with in
 * the `TableCell` or `TableHeaderCell` component.
 * It can accept any components
 */
export const BasicUsage: Story = {
  args: {
    children: 'Alphanumeric',
  },
}
