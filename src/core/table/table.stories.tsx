import { Avatar } from '#src/core/avatar'
import { Menu } from '#src/core/menu'
import { Table } from './table'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from '../text'

const href = globalThis.top?.location.href!

const meta = {
  title: 'Core/Table',
  component: Table,
  argTypes: {
    as: {
      control: false,
      description: 'The element this table will render as.',
      table: {
        type: {
          summary: "'table' | 'div'",
        },
      },
    },
    children: {
      control: false,
      description: 'The table content.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    as: 'table',
    children: buildTable('semantic'),
    columns: '2fr 1fr 1fr min-content',
  },
}

/**
 * By default, cell content is packed flush to the start edge of its column. This can be changed using
 * the table's `justifyItems` prop. Further, the justification can be adjusted on a per-cell basis
 * using the `justifySelf` props available on both
 * [Table.HeaderCell](./?path=/docs/core-table-headercell--docs) and
 * [Table.BodyCell](./?path=/docs/core-table-bodycell--docs).
 *
 * In this example, the table uses `justifyItems="end"`, while the first column uses `justifySelf="start"`.
 * The header cell and body cells within a table column must always have the same justification.
 */
export const Alignment: Story = {
  args: {
    ...Example.args,
    justifyItems: 'end',
  },
}

/**
 * Sometimes it may be necessary to render the table row as a plain `<div>`. Providing
 * `as="div"` will achieve this outcome. When doing so, it's important to consider whether an
 * [ARIA role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles)
 * should also be specified.
 *
 * Care must also be taken to ensure the descendant cells are also rendered as `<div>` elements,
 * possibly with explicit ARIA roles as well. This example does not provide equivalent ARIA roles
 * and therefore has terrible accessibility.
 */
export const Divs: Story = {
  args: {
    ...Example.args,
    as: 'div',
    children: buildTable('div'),
  },
}

function buildTable(as: 'semantic' | 'div') {
  return (
    <>
      <Table.Head as={as === 'semantic' ? 'thead' : 'div'}>
        <Table.HeaderRow as={as === 'semantic' ? 'tr' : 'div'}>
          <Table.HeaderCell as={as === 'semantic' ? 'th' : 'div'} justifySelf="start">
            Property
          </Table.HeaderCell>
          <Table.HeaderCell as={as === 'semantic' ? 'th' : 'div'}>
            <Table.SortButton name="total" value="none">
              Amount
            </Table.SortButton>
          </Table.HeaderCell>
          <Table.HeaderCell as={as === 'semantic' ? 'th' : 'div'} aria-sort="descending">
            <Table.SortButton name="dueDate" value="descending">
              Due
            </Table.SortButton>
          </Table.HeaderCell>
          <Table.HeaderCell as={as === 'semantic' ? 'th' : 'div'} aria-label="Actions">
            {null}
          </Table.HeaderCell>
        </Table.HeaderRow>
      </Table.Head>

      <Table.Body as={as === 'semantic' ? 'tbody' : 'div'}>
        {Array.from({ length: 2 }, (_, i) => (
          <Table.BodyRow as={as === 'semantic' ? 'tr' : 'div'} key={i}>
            <Table.BodyCell as={as === 'semantic' ? 'th' : 'div'} justifySelf="start">
              <Table.DoubleLineLayout mediaItem={<Avatar>MJ</Avatar>} supplementaryData="Engineer">
                <Table.PrimaryAction href={href}>Mary Jane</Table.PrimaryAction>
              </Table.DoubleLineLayout>
            </Table.BodyCell>
            <Table.BodyCell as={as === 'semantic' ? 'td' : 'div'}>$1,234.00</Table.BodyCell>
            <Table.BodyCell as={as === 'semantic' ? 'td' : 'div'}>
              <Text as="time" colour="error" font="inherit">
                1 July 2025
              </Text>
            </Table.BodyCell>
            <Table.BodyCell as={as === 'semantic' ? 'td' : 'div'}>
              <Table.MoreActions aria-label="More actions for Mary Jane">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </Table.MoreActions>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </>
  )
}
