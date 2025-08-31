import { TableCellSortButton } from '../sort-button'
import { TableHeaderCell } from '../header-cell'
import { TableHeaderRow } from './header-row'
import { useTableDecorator } from '../__story__/use-table-decorator'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Table/HeaderRow',
  component: TableHeaderRow,
  argTypes: {
    as: {
      control: false,
      description: 'The element this table row will render as.',
      table: {
        type: {
          summary: "'tr' | 'div'",
        },
      },
    },
    children: {
      control: 'select',
      description: 'The row content.',
      options: ['Static text', 'Sortable columns'],
      mapping: {
        'Static text': (
          <>
            <TableHeaderCell>Property</TableHeaderCell>
            <TableHeaderCell>Ownership</TableHeaderCell>
            <TableHeaderCell>Tenancy</TableHeaderCell>
            <TableHeaderCell aria-label="Actions">{null}</TableHeaderCell>
          </>
        ),
        'Sortable columns': (
          <>
            <TableHeaderCell>Property</TableHeaderCell>
            <TableHeaderCell>
              <TableCellSortButton name="total" value="none">
                Amount
              </TableCellSortButton>
            </TableHeaderCell>
            <TableHeaderCell aria-sort="descending">
              <TableCellSortButton name="dueDate" value="descending">
                Due
              </TableCellSortButton>
            </TableHeaderCell>
            <TableHeaderCell aria-label="Actions">{null}</TableHeaderCell>
          </>
        ),
      },
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
} satisfies Meta<typeof TableHeaderRow>

export default meta
type Story = StoryObj<typeof meta>

/**
 * By default, rows do not exhibit any cursor-based interactivity, such has hover styles. This is because
 * rows themselves are never interactive.
 */
export const Example: Story = {
  args: {
    as: 'tr',
    children: 'Static text',
  },
  decorators: [useTableDecorator('header-row')],
}

/**
 * Any number of columns in the table can be sortable. In this example, two columns have sort buttons
 * that would allow users to sort the table's data.
 */
export const SortableColumns: Story = {
  args: {
    as: 'tr',
    children: 'Sortable columns',
  },
  decorators: [useTableDecorator('header-row')],
}

/**
 * Sometimes it may be necessary to render the table row as a plain `<div>`. Providing
 * `as="div"` will achieve this outcome. When doing so, it's important to consider whether an
 * [ARIA role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles)
 * should also be specified.
 *
 * Care must also be taken to ensure the descendant cells are also rendered as `<div>` elements,
 * possibly with explicit ARIA roles as well.
 */
export const Divs: Story = {
  args: {
    as: 'div',
    children: <TableHeaderCell as="div">I&apos;m all divs and no a11y 😬</TableHeaderCell>,
  },
  argTypes: {
    children: {
      control: false,
    },
  },
}
