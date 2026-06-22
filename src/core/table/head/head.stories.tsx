import preview from '#.storybook/preview'
import { Table } from '../table'
import { useTableDecorator } from '../__story__/use-table-decorator'

const meta = preview.meta({
  title: 'Data and tables/Table/Head',
  component: Table.Head,
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
})

export const Example = meta.story({
  args: {
    as: 'thead',
    children: 'Static text',
  },
  decorators: [useTableDecorator('head')],
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
    children: (
      <Table.HeaderRow as="div">
        <Table.HeaderCell as="div">I&apos;m all divs and no a11y 😬</Table.HeaderCell>
      </Table.HeaderRow>
    ),
  },
  argTypes: {
    children: {
      control: false,
    },
  },
})

function buildRows(type: 'non-sortable' | 'sortable') {
  switch (type) {
    case 'non-sortable': {
      return (
        <Table.HeaderRow>
          <Table.HeaderCell>Property</Table.HeaderCell>
          <Table.HeaderCell>Ownership</Table.HeaderCell>
          <Table.HeaderCell>Tenancy</Table.HeaderCell>
          <Table.HeaderCell aria-label="Actions">{null}</Table.HeaderCell>
        </Table.HeaderRow>
      )
    }
    case 'sortable': {
      return (
        <Table.HeaderRow>
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
        </Table.HeaderRow>
      )
    }
  }
}
