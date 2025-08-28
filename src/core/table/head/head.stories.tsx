import { TableCellSortButton } from '../sort-button'
import { TableHead } from './head'
import { TableHeaderCell } from '../header-cell'
import { TableHeaderRow } from '../header-row'
import { useTableDecorator } from '../__story__/use-table-decorator'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Table/Head',
  component: TableHead,
  argTypes: {
    as: {
      control: false,
      description: 'The element this table row will render as.',
      table: {
        type: {
          summary: "'tbody' | 'div'",
        },
      },
    },
    children: {
      control: 'select',
      description: 'The table rows.',
      options: ['Static text', 'Sortable columns'],
      mapping: {
        'Static text': buildRows('non-sortable'),
        'Sortable columns': buildRows('sortable'),
      },
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
} satisfies Meta<typeof TableHead>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    as: 'thead',
    children: 'Static text',
  },
  decorators: [useTableDecorator('head')],
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
    children: (
      <TableHeaderRow as="div">
        <TableHeaderCell as="div">I&apos;m all divs and no a11y 😬</TableHeaderCell>
      </TableHeaderRow>
    ),
  },
  argTypes: {
    children: {
      control: false,
    },
  },
}

function buildRows(type: 'non-sortable' | 'sortable') {
  switch (type) {
    case 'non-sortable': {
      return (
        <TableHeaderRow>
          <TableHeaderCell>Property</TableHeaderCell>
          <TableHeaderCell>Ownership</TableHeaderCell>
          <TableHeaderCell>Tenancy</TableHeaderCell>
          <TableHeaderCell aria-label="Actions">{null}</TableHeaderCell>
        </TableHeaderRow>
      )
    }
    case 'sortable': {
      return (
        <TableHeaderRow>
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
        </TableHeaderRow>
      )
    }
  }
}
