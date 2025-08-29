import { Avatar } from '#src/core/avatar'
import { AvatarRectangle } from '#src/core/avatar-rectangle'
import { Skeleton } from '#src/core/skeleton'
import { StarIcon } from '#src/icons/star'
import { SupplementaryInfo } from '#src/core/supplementary-info'
import { TableCellDoubleLineLayout } from './double-line-layout'
import { TableCellPrimaryData } from '../primary-data'
import { Text } from '#src/core/text'
import { Tooltip } from '#src/core/tooltip'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Table/DoubleLineLayout',
  component: TableCellDoubleLineLayout,
  argTypes: {
    children: {
      control: 'select',
      options: ['Address Line 1', 'Text + icon', 'Skeleton'],
      mapping: {
        'Address Line 1': '10 Elizabeth St',
        'Contact name': 'Mary Jane',
        'Text + icon': <TableCellPrimaryData iconRight={<StarIcon />}>Alphanumeric value</TableCellPrimaryData>,
        Skeleton: <Skeleton />,
      },
    },
    mediaItem: {
      control: 'radio',
      options: ['None', 'Avatar', 'Image', 'Skeleton'],
      mapping: {
        None: null,
        Avatar: <Avatar>MJ</Avatar>,
        Image: <AvatarRectangle size="small" variant="residential" />,
        Skeleton: <Skeleton borderRadius="100%" height="40px" width="40px" />,
      },
    },
    supplementaryData: {
      control: 'radio',
      options: ['None', 'Address Line 2', 'Supplementary info', 'Skeleton'],
      mapping: {
        None: null,
        'Address Line 2': 'Brisbane City 4000',
        'Supplementary info': (
          <SupplementaryInfo size="xs">
            <SupplementaryInfo.Item>Value 1</SupplementaryInfo.Item>
            <SupplementaryInfo.Item>Value 2</SupplementaryInfo.Item>
            <SupplementaryInfo.Item>Value 3</SupplementaryInfo.Item>
          </SupplementaryInfo>
        ),
        Skeleton: <Skeleton />,
      },
    },
  },
} satisfies Meta<typeof TableCellDoubleLineLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * [Table.PrimaryData](./?path=/docs/core-table-primarydata--docs) will often be used to display
 * the primary data in the double-line layout, though any appropriate content can be provided.
 */
export const Example: Story = {
  args: {
    children: 'Text + icon',
    mediaItem: 'None',
    supplementaryData: 'Supplementary info',
  },
}

/**
 * Media items like avatars and images can also be displayed.
 */
export const MediaItems: Story = {
  args: {
    ...Example.args,
    children: 'Contact name',
    mediaItem: 'Avatar',
    supplementaryData: 'Supplementary info',
  },
}

/**
 * In cases where the content has insufficient space, content will be clipped while the icons remain
 * visible. Notice that the primary data text in this example is not truncating; this is because its
 * not configured to do so, and thus is simply being clipped.
 */
export const Clipping: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', display: 'flex', width: '120px' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * Where possible, content should be truncated, with a tooltip used to display the unabridged content
 * when hovered. Again, the icons will remain visible and only the content will be truncated.
 */
export const Truncation: Story = {
  args: {
    ...Example.args,
    children: (
      <>
        <Text font="inherit" id="primary-text" overflow="truncate">
          10 Queen Elizabeth St
        </Text>
        <Tooltip id="primary-tooltip" placement="top" triggerId="primary-text" truncationTargetId="primary-text">
          10 Queen Elizabeth St
        </Tooltip>
      </>
    ),
    mediaItem: 'Image',
    supplementaryData: (
      <>
        <Text font="inherit" id="supplementary-text" overflow="truncate">
          Melbourne 3100
        </Text>
        <Tooltip
          id="supplementary-tooltip"
          placement="top"
          triggerId="supplementary-text"
          truncationTargetId="supplementary-text"
        >
          Melbourne 3100
        </Tooltip>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', display: 'flex', width: '150px' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * Skeletons can used for the content and the icons to communicate a loading state. The fidelity of
 * the loading state can be low; there is no need to perfectly represent the content being loaded.
 * That is, it would be sufficient in many cases to only display a skeleton for the content, even
 * if an icon may be present once loading is complete.
 */
export const Loading: Story = {
  args: {
    ...Example.args,
    children: 'Skeleton',
    mediaItem: 'Skeleton',
    supplementaryData: 'Skeleton',
  },
}
