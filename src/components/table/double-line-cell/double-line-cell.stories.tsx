import { DoubleLineCell } from './double-line-cell'
import { TableText } from '../table-text'
import { DeprecatedIcon } from '../../deprecated-icon'
import { Skeleton } from '../../skeleton'
import { Avatar } from '../../avatar'

import type { Meta, StoryObj } from '@storybook/react-vite'

const MEDIA_OPTIONS = ['Image', 'Avatar', 'Empty', 'Image Skeleton', 'Avatar Skeleton']
const FIRST_LINE_OPTIONS = ['Sddress', 'Name', 'Text', 'Skeleton']
const SECOND_LINE_OPTIONS = ['Suburb', 'Job', 'Text', 'Skeleton']

const meta = {
  title: 'Components/DoubleLineCell',
  component: DoubleLineCell,
  argTypes: {
    mediaItem: {
      control: 'select',
      options: MEDIA_OPTIONS,
      description: 'The media item will be displayed on the left side of the cell.',
      mapping: MEDIA_OPTIONS.reduce((acc, itemName) => {
        if (itemName === 'Image') {
          acc[itemName] = (
            <img src="https://www.realestate.com.au/new-homes-landing-page/index-images/home-designs/aus/home-designs-victoria.jpg" />
          )
        }
        if (itemName === 'Avatar') {
          acc[itemName] = <Avatar>JS</Avatar>
        }
        if (itemName === 'Empty') {
          acc[itemName] = ''
        }
        if (itemName === 'Image Skeleton') {
          acc[itemName] = <Skeleton height="40px" width="48px" />
        }
        if (itemName === 'Avatar Skeleton') {
          acc[itemName] = <Skeleton borderRadius="100%" height="40px" width="40px" />
        }
        return acc
      }, {}),
    },
    firstLine: {
      control: 'select',
      options: FIRST_LINE_OPTIONS,
      description: 'This will be displayed on the right side of the cell.',
      mapping: FIRST_LINE_OPTIONS.reduce((acc, itemName) => {
        if (itemName === 'Address') {
          acc[itemName] = <TableText>10 Elizabeth St</TableText>
        }
        if (itemName === 'Name') {
          acc[itemName] = <TableText>John Smith</TableText>
        }
        if (itemName === 'Text') {
          acc[itemName] = (
            <>
              <DeprecatedIcon icon="star" fontSize="1rem" />
              <TableText>Alphanumeric value</TableText>
              <DeprecatedIcon icon="star" fontSize="1rem" />
            </>
          )
        }
        if (itemName === 'Skeleton') {
          acc[itemName] = <Skeleton height="16px" />
        }
        return acc
      }, {}),
    },
    secondLine: {
      control: 'select',
      options: SECOND_LINE_OPTIONS,
      description: 'This will be displayed on the right side of the cell.',
      mapping: SECOND_LINE_OPTIONS.reduce((acc, itemName) => {
        if (itemName === 'Suburb') {
          acc[itemName] = <TableText size="extra-small">Brisbane City 4000</TableText>
        }
        if (itemName === 'Job') {
          acc[itemName] = <TableText size="extra-small">Plumber</TableText>
        }
        if (itemName === 'Text') {
          acc[itemName] = <TableText size="extra-small">Value 23 Jan 2025 4:30 pm Value</TableText>
        }
        if (itemName === 'Skeleton') {
          acc[itemName] = <Skeleton height="12px" width="8rem" />
        }
        return acc
      }, {}),
    },
  },
} satisfies Meta<typeof DoubleLineCell>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The `DoubleLineCell` component is designed to be used with in the `TableCell` component.
 * It can accept any components
 */
export const BasicUsage: Story = {
  args: {
    mediaItem: 'Image',
    firstLine: 'Address',
    secondLine: 'Suburb',
  },
}

/**
 * The `DoubleLineCell` component can be used to show the Skeleton component in order to show a loading state.
 */
export const WithSkeleton: Story = {
  args: {
    mediaItem: 'Image Skeleton',
    firstLine: 'Skeleton',
    secondLine: 'Skeleton',
  },
}
