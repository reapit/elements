import { TableHeaderCell } from './header-cell'
import { TableCellSortButton } from '../sort-button'
import { Text } from '#src/core/text'
import { Tooltip } from '#src/core/tooltip'
import { useTableDecorator } from '../__story__/use-table-decorator'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Table/HeaderCell',
  component: TableHeaderCell,
  argTypes: {
    'aria-sort': {
      control: 'text',
      description: 'The sort direction currently applied to the column.',
      table: {
        type: {
          summary: "'ascending' | 'descending'",
        },
      },
    },
    as: {
      control: false,
      description: 'The element this table cell will render as.',
      table: {
        type: {
          summary: "'th' | 'div'",
        },
      },
    },
    children: {
      control: 'select',
      description: 'The cell content.',
      options: ['Plain text', 'Sort label'],
      mapping: {
        'Plain text': 'Property',
        'Sort button': (
          <TableCellSortButton name="totalAmount" value="descending">
            Amount
          </TableCellSortButton>
        ),
      },
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
} satisfies Meta<typeof TableHeaderCell>

export default meta
type Story = StoryObj<typeof meta>

/**
 * At their simplest, body cell's will contain a single line of plain text. However, it's important
 * to understand that, without additional styles for the plain text, it will flow to additional lines
 * rather than overflow or truncate when there is insufficient space.
 */
export const Example: Story = {
  args: {
    'aria-sort': undefined,
    as: 'th',
    children: 'Plain text',
  },
  decorators: [useTableDecorator('header-cell')],
}

/**
 * Often, some columns in a table will be sortable. In this case,
 * [Table.SortButton](./?path=/docs/core-table-sortbutton--docs) can be used as the header cell's content.
 * Importantly, when the column has an active sort direction, the header cell must have an `aria-sort`
 * attribute that communicates that sort direction to assistive technologies.
 */
export const Sortable: Story = {
  args: {
    ...Example.args,
    'aria-sort': 'descending',
    children: 'Sort button',
  },
  decorators: [useTableDecorator('header-cell')],
}

/**
 * Overflow should be avoided for column header cells as the columns should generally be sized
 * to fit the content and the header. However, if it is unavoidable, truncation with a tooltip
 * should be used. The tooltip should display the unabridged content.
 */
export const Truncation: Story = {
  args: {
    ...Example.args,
    children: (
      <>
        <Text font="inherit" id="text" overflow="truncate">
          Long column name
        </Text>
        <Tooltip id="tooltip" placement="top" triggerId="text" truncationTargetId="text">
          Long column name
        </Tooltip>
      </>
    ),
  },
  decorators: [
    useTableDecorator('body-cell', '100px'),
    (Story) => (
      // NOTE: This div wraps the entire table.
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', display: 'flex', width: 'min-content' }}>
        <Story />
      </div>
    ),
  ],
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
 * By default, the justification of the cell's content is determined by the table. However, individual
 * cells can also define their own justification using the `justifySelf` prop. There are three
 * options: `start`, `center`, and `end`.
 */
export const Alignment: Story = {
  args: {
    ...Example.args,
    justifySelf: 'end',
  },
  decorators: [
    useTableDecorator('header-cell', '150px'),
    (Story) => (
      <div style={{ boxSizing: 'content-box', border: '1px solid #FA00FF', width: 'min-content' }}>
        <Story />
      </div>
    ),
  ],
}
