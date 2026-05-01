import preview from '#.storybook/preview'
import { Table } from '../table'
import { useTableDecorator } from '../__story__/use-table-decorator'

const meta = preview.meta({
  title: 'Core/Table/HeaderRow',
  component: Table.HeaderRow,
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
            <Table.HeaderCell>Property</Table.HeaderCell>
            <Table.HeaderCell>Ownership</Table.HeaderCell>
            <Table.HeaderCell>Tenancy</Table.HeaderCell>
            <Table.HeaderCell aria-label="Actions">{null}</Table.HeaderCell>
          </>
        ),
        'Sortable columns': (
          <>
            <Table.HeaderCell>Property</Table.HeaderCell>
            <Table.HeaderCell>
              <Table.SortButton name="total" value="none">
                Amount
              </Table.SortButton>
            </Table.HeaderCell>
            <Table.HeaderCell aria-sort="descending">
              <Table.SortButton name="dueDate" value="descending">
                Due
              </Table.SortButton>
            </Table.HeaderCell>
            <Table.HeaderCell aria-label="Actions">{null}</Table.HeaderCell>
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
})

/**
 * By default, rows do not exhibit any cursor-based interactivity, such has hover styles. This is because
 * rows themselves are never interactive.
 */
export const Example = meta.story({
  args: {
    as: 'tr',
    children: 'Static text',
  },
  decorators: [useTableDecorator('header-row')],
})

/**
 * Any number of columns in the table can be sortable. In this example, two columns have sort buttons
 * that would allow users to sort the table's data.
 */
export const SortableColumns = meta.story({
  args: {
    as: 'tr',
    children: 'Sortable columns',
  },
  decorators: [useTableDecorator('header-row')],
})

/**
 * Sometimes it may be necessary to render the table row as a plain `<div>`. Providing
 * `as="div"` will achieve this outcome. When doing so, it's important to consider whether an
 * [ARIA role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles)
 * should also be specified.
 *
 * Care must also be taken to ensure the descendant cells are also rendered as `<div>` elements,
 * possibly with explicit ARIA roles as well.
 */
export const Divs = meta.story({
  args: {
    as: 'div',
    children: <Table.HeaderCell as="div">I&apos;m all divs and no a11y 😬</Table.HeaderCell>,
  },
  argTypes: {
    children: {
      control: false,
    },
  },
})
