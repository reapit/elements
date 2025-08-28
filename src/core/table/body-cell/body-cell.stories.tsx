import { Badge } from '#src/core/badge'
import { Features } from '#src/core/features'
import { Skeleton } from '#src/core/skeleton'
import { StarIcon } from '#src/icons/star'
import { StatusIndicator } from '#src/core/status-indicator'
import { SupplementaryInfo } from '../../supplementary-info'
import { TableBodyCell } from './body-cell'
import { TableCellDoubleLineLayout } from '../double-line-layout/double-line-layout'
import { TableCellPrimaryData } from '../primary-data'
import { TagGroup } from '#src/core/tag-group'
import { Text } from '#src/core/text'
import { Tooltip } from '#src/core/tooltip'
import { WarningIcon } from '#src/icons/warning'
import { useTableDecorator } from '../__story__/use-table-decorator'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Table/BodyCell',
  component: TableBodyCell,
  argTypes: {
    as: {
      control: false,
      description: 'The element this table cell will render as.',
      table: {
        type: {
          summary: "'td' | 'th' | 'div'",
        },
      },
    },
    children: {
      control: 'select',
      description: 'The cell content.',
      options: [
        'Plain text',
        'Text + icons',
        'Double-line layout',
        'Badge',
        'Icon',
        'Features',
        'Status indicator',
        'Tag group',
        'Skeleton',
      ],
      mapping: {
        'Plain text': '10 Hay St, Melbourne 3100',
        'Text + icons': <TableCellPrimaryData iconRight={<StarIcon />}>10 Hay St, Melbourne 3100</TableCellPrimaryData>,
        'Double-line layout': (
          <TableCellDoubleLineLayout
            supplementaryData={
              <SupplementaryInfo size="xs">
                <SupplementaryInfo.Item>Value 1</SupplementaryInfo.Item>
                <SupplementaryInfo.Item>Value 2</SupplementaryInfo.Item>
                <SupplementaryInfo.Item>Value 3</SupplementaryInfo.Item>
              </SupplementaryInfo>
            }
          >
            <TableCellPrimaryData iconRight={<StarIcon />}>
              <time dateTime="2025-08-22T09:21:00">22 August 2025, 9:21am</time>
            </TableCellPrimaryData>
          </TableCellDoubleLineLayout>
        ),
        Badge: <Badge colour="neutral">Label</Badge>,
        Icon: <StarIcon color="primary" size="sm" />,
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
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
} satisfies Meta<typeof TableBodyCell>

export default meta
type Story = StoryObj<typeof meta>

/**
 * At their simplest, body cell's will contain a single line of plain text. However, it's important
 * to understand that, without additional styles for the plain text, it will flow to additional lines
 * rather than overflow or truncate when there is insufficient space.
 */
export const Example: Story = {
  args: {
    as: 'td',
    children: 'Plain text',
  },
  decorators: [useTableDecorator('body-cell')],
}

/**
 * Often, the cell content will include some text paired with an icon. To achieve this,
 * [Table.PrimaryData](./?path=/docs/core-table-primarydata--docs) can be used.
 */
export const Icons: Story = {
  args: {
    ...Example.args,
    children: 'Text + icons',
  },
  decorators: [useTableDecorator('body-cell')],
}

/**
 * For cells that need to communicate more information than can fit on a single line,
 * [Table.DoubleLineLayout](./?path=/docs/core-table-doublelinelayout--docs) can be used.
 */
export const DoubleLineLayout: Story = {
  name: 'Double-line layout',
  args: {
    ...Example.args,
    children: 'Double-line layout',
  },
  decorators: [useTableDecorator('body-cell')],
}

/**
 * Often it will be necessary to render a table cell as a row header, `<th>`. When you
 * do use `th`, it's [scope](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope)
 * will automatically be set as `row`. Care should be taken to use a medium font weight for the cell's
 * primary content. If you need a cell to act as a column header, use `Table.HeadingCell` instead.
 */
export const RowHeader: Story = {
  args: {
    ...Example.args,
    as: 'th',
    children: <Text weight="medium">I&apos;m in a &lt;th&gt;</Text>,
  },
  decorators: [useTableDecorator('body-cell')],
}

/**
 * Sometimes it may be necessary to render the table cell as a plain `<div>`. Providing
 * `as="div"` will achieve this outcome. When doing so, it's important to consider whether an
 * [ARIA role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles)
 * should also be specified.
 */
export const Divs: Story = {
  args: {
    ...Example.args,
    as: 'div',
    children: "I'm in a <div>",
  },
}

/**
 * In cases where the content can’t fit inside the cell due to the columns width, it will be clipped
 * to avoid overflow into the next column.
 */
export const Overflow: Story = {
  args: {
    ...Example.args,
    children: (
      <Badge id="badge" colour="warning" iconLeft={<WarningIcon />}>
        A very very long badge label
      </Badge>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', display: 'flex', width: '150px' }}>
        <Story />
      </div>
    ),
    useTableDecorator('body-cell'),
  ],
}

/**
 * When possible, truncation should be preferred over clipping, with a tooltip displayed when
 * the truncated content is hovered. The tooltip should display the unabridged content. Achieving
 * this will typically require the truncated text to be inside a container sized to the width of
 * the cell.
 *
 * This is what the single- or double-line content components assist with.
 */
export const Truncation: Story = {
  args: {
    ...Example.args,
    children: (
      <>
        <Text id="text" overflow="truncate" size="sm">
          10 Queen Elizabeth St, Melbourne 3100
        </Text>
        <Tooltip id="tooltip" placement="top" triggerId="text" truncationTargetId="text">
          10 Queen Elizabeth St, Melbourne 3100
        </Tooltip>
      </>
    ),
  },
  decorators: Overflow.decorators,
}

/**
 * When the cell has no data to display, it can either be blank or it can display a placeholder message.
 */
export const EmptyCells: Story = {
  args: {
    ...Example.args,
    children: (
      <Text colour="placeholder" size="sm">
        Not available
      </Text>
    ),
  },
  decorators: [useTableDecorator('body-cell')],
}

/**
 * The justification of the cell's content within the cell's bounding box can be specified using
 * `justifyContent`. There are three options: `start` (default), `center`, and `end`.
 */
export const Alignment: Story = {
  args: {
    ...DoubleLineLayout.args,
    justifyContent: 'end',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'grid', boxSizing: 'content-box', border: '1px solid #FA00FF' }}>
        <Story />
      </div>
    ),
    useTableDecorator('body-cell'),
  ],
}

/**
 * A simple loading state can be achieved by providing a [Skeleton](?path=/docs/core-skeleton--docs)
 * as the content of the cell.
 */
export const Loading: Story = {
  args: {
    ...Example.args,
    children: 'Skeleton',
  },
  decorators: [useTableDecorator('body-cell')],
}
