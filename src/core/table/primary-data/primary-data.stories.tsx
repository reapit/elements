import preview from '#.storybook/preview'
import { Badge } from '#src/core/badge'
import { Features } from '#src/core/features'
import { Skeleton } from '#src/core/skeleton'
import { StarIcon } from '#src/icons/star'
import { StatusIndicator } from '#src/core/status-indicator'
import { Table } from '../table'
import { TagGroup } from '#src/core/tag-group'
import { Text } from '#src/utils/text'
import { Tooltip } from '#src/core/tooltip'

const meta = preview.meta({
  title: 'Data and tables/Table/PrimaryData',
  component: Table.PrimaryData,
  argTypes: {
    children: {
      control: 'select',
      options: ['Plain text', 'Badge', 'Features', 'Status indicator', 'Tag group', 'Skeleton'],
      mapping: {
        'Plain text': '10 Hay St, Melbourne 3100',
        Badge: <Badge colour="neutral">Label</Badge>,
        Features: (
          <Features size="2xs" wrap="nowrap">
            <Features.Bedrooms value={4} />
            <Features.Bathrooms value={2} />
            <Features.CarSpaces value={2} />
          </Features>
        ),
        'Status indicator': <StatusIndicator variant="neutral">Status indicator</StatusIndicator>,
        'Tag group': (
          <TagGroup flow="nowrap">
            <TagGroup.Item>Tag 1</TagGroup.Item>
            <TagGroup.Item>Tag 2</TagGroup.Item>
            <TagGroup.Item>Tag 3</TagGroup.Item>
          </TagGroup>
        ),
        Skeleton: <Skeleton />,
      },
    },
    iconLeft: {
      control: 'radio',
      options: ['None', 'Star', 'Skeleton'],
      mapping: {
        None: null,
        Star: <StarIcon />,
        Skeleton: <Skeleton />,
      },
    },
    iconRight: {
      control: 'radio',
      options: ['None', 'Star', 'Skeleton'],
      mapping: {
        None: null,
        Star: <StarIcon />,
        Skeleton: <Skeleton />,
      },
    },
  },
})

export const Example = meta.story({
  args: {
    children: 'Plain text',
    iconLeft: 'None',
    iconRight: 'None',
  },
})

/**
 * Icons can be placed to the left or right of the content. When the content overflows the cell,
 * the icons should remain visible.
 */
export const Icons = Example.extend({
  args: {
    iconLeft: 'Star',
    iconRight: 'Star',
  },
})

/**
 * Any content can be displayed such as badges and tag groups. Typically, icons will be used
 * with textual content, but they are available regardless of what content is provided.
 */
export const Content = Example.extend({
  args: {
    children: 'Badge',
    iconLeft: 'Star',
    iconRight: 'Star',
  },
})

/**
 * In cases where the content has insufficient space, content will be clipped while the icons remain
 * visible.
 */
export const Clipping = Icons.extend({
  args: {
    children: 'Tag group',
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', display: 'flex', width: '150px' }}>
        <Story />
      </div>
    ),
  ],
})

/**
 * Where possible, content should be truncated, with a tooltip used to display the unabridged content
 * when hovered. Again, the icons will remain visible.
 */
export const Truncation = Icons.extend({
  args: {
    children: (
      <>
        <Text font="inherit" id="text" overflow="truncate">
          10 Queen Elizabeth St, Melbourne 3100
        </Text>
        <Tooltip id="tooltip" placement="top" triggerId="text" truncationTargetId="text">
          10 Queen Elizabeth St, Melbourne 3100
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
})

/**
 * Skeletons can used for the content and the icons to communicate a loading state. The fidelity of
 * the loading state can be low; there is no need to perfectly represent the content being loaded.
 * That is, it would be sufficient in many cases to only display a skeleton for the content, even
 * if an icon may be present once loading is complete.
 */
export const Loading = Example.extend({
  args: {
    children: 'Skeleton',
    iconLeft: 'Skeleton',
    iconRight: 'None',
  },
})
