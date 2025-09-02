import { Avatar } from '#src/core/avatar'
import { Menu } from '#src/core/menu'
import { TableBodyCell } from '../body-cell'
import { TableBodyRow } from './body-row'
import { TableCellCheckbox } from '../checkbox'
import { TableCellDoubleLineLayout } from '../double-line-layout'
import { TableRowPrimaryAction } from '../primary-action'
import { TableRowMoreActions } from '../more-actions'
import { useTableDecorator } from '../__story__/use-table-decorator'

import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location.href!

const meta = {
  title: 'Core/Table/BodyRow',
  component: TableBodyRow,
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
      options: ['Plain text', 'Primary action', 'Double-line', 'Selectable', 'Selected'],
      mapping: {
        'Plain text': (
          <>
            <TableBodyCell as="th">10 Hay St, Melbourne 3100</TableBodyCell>
            <TableBodyCell>Data</TableBodyCell>
            <TableBodyCell>Data</TableBodyCell>
            <TableBodyCell>
              <TableRowMoreActions aria-label="More actions for 10 Hay St, Melbourne 3100">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </TableRowMoreActions>
            </TableBodyCell>
          </>
        ),
        'Primary action': (
          <>
            <TableBodyCell as="th">
              <TableRowPrimaryAction href={href}>10 Hay St, Melbourne 3100</TableRowPrimaryAction>
            </TableBodyCell>
            <TableBodyCell>Data</TableBodyCell>
            <TableBodyCell>Data</TableBodyCell>
            <TableBodyCell>
              <TableRowMoreActions aria-label="More actions for 10 Hay St, Melbourne 3100">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </TableRowMoreActions>
            </TableBodyCell>
          </>
        ),
        'Double-line': (
          <>
            <TableBodyCell as="th">
              <TableCellDoubleLineLayout mediaItem={<Avatar>MJ</Avatar>} supplementaryData="Engineer">
                <TableRowPrimaryAction href={href}>Mary Jane</TableRowPrimaryAction>
              </TableCellDoubleLineLayout>
            </TableBodyCell>
            <TableBodyCell>Data</TableBodyCell>
            <TableBodyCell>Data</TableBodyCell>
            <TableBodyCell>
              <TableRowMoreActions aria-label="More actions for Mary Jane">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </TableRowMoreActions>
            </TableBodyCell>
          </>
        ),
        Selectable: (
          <>
            <TableBodyCell>
              <TableCellCheckbox aria-label="Select Mary Jane" name="selections" value="1" />
            </TableBodyCell>
            <TableBodyCell as="th">
              <TableCellDoubleLineLayout mediaItem={<Avatar>MJ</Avatar>} supplementaryData="Engineer">
                <TableRowPrimaryAction href={href}>Mary Jane</TableRowPrimaryAction>
              </TableCellDoubleLineLayout>
            </TableBodyCell>
            <TableBodyCell>Data</TableBodyCell>
            <TableBodyCell>Data</TableBodyCell>
            <TableBodyCell>
              <TableRowMoreActions aria-label="More actions for Mary Jane">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </TableRowMoreActions>
            </TableBodyCell>
          </>
        ),
        Selected: (
          <>
            <TableBodyCell>
              <TableCellCheckbox aria-label="Select Mary Jane" checked name="selections" value="1" />
            </TableBodyCell>
            <TableBodyCell as="th">
              <TableCellDoubleLineLayout mediaItem={<Avatar>MJ</Avatar>} supplementaryData="Engineer">
                <TableRowPrimaryAction href={href}>Mary Jane</TableRowPrimaryAction>
              </TableCellDoubleLineLayout>
            </TableBodyCell>
            <TableBodyCell>Data</TableBodyCell>
            <TableBodyCell>Data</TableBodyCell>
            <TableBodyCell>
              <TableRowMoreActions aria-label="More actions for Mary Jane">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </TableRowMoreActions>
            </TableBodyCell>
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
} satisfies Meta<typeof TableBodyRow>

export default meta
type Story = StoryObj<typeof meta>

/**
 * By default, rows do not exhibit any cursor-based interactivity, such has hover styles. This is because
 * rows themselves are never interactive.
 */
export const Example: Story = {
  args: {
    as: 'tr',
    children: 'Plain text',
  },
  decorators: [useTableDecorator('body-row')],
}

/**
 * Rows within a table's body will often provide a number of actions to users. When there is a single
 * action, such as viewing more details about the entity represented by a row, that action should appear
 * to users as being invoked by clicking the row. However, rows themselves must not be interactive, so
 * [Table.PrimaryAction](./?path=/docs/core-table-primaryaction--docs) is provided to achieve this visual
 * outcome while maintaining accessiblity and DOM structure. The presence of a `Table.PrimaryAction`
 * descendant in a row will result in the row exhibiting cursor interactivity such as hover styles.
 *
 * Other actions such as a row selection checkbox or a "more actions" menu can be provided. When providing
 * these secondary actions, care must be taken to ensure they sit above the primary action's hit area.
 * This is handled automatically by table-specific component, but if custom actions are provided, it will
 * be up to the consumer to ensure they are click accessible.
 */
export const RowActions: Story = {
  args: {
    ...Example.args,
    children: 'Primary action',
  },
  decorators: [useTableDecorator('body-row')],
}

/**
 * Rows have minimum and maximum height constraints, but within this range, they may grow to accommodate
 * their content. For example, a row that contains
 * [Table.DoubleLineLayout](./?path=/docs/core-table-doublelinelayout--docs) cell content will be taller
 * than a row with a single line of cell content.
 */
export const DoubleLineContent: Story = {
  name: 'Double-line content',
  args: {
    ...Example.args,
    children: 'Double-line',
  },
  decorators: [useTableDecorator('body-row')],
}

/**
 * When rows are selectable, they will have a [Table.Checkbox](./?path=/docs/core-table-checkbox--docs)
 * present in the leading column.
 */
export const Selectable: Story = {
  args: {
    ...Example.args,
    children: 'Selectable',
  },
  decorators: [useTableDecorator('body-row', 'min-content 1fr 1fr 1fr min-content')],
}

/**
 * When the row's selection checkbox is checked, the row will be visually highlighted to indicate it
 * has been selected.
 */
export const Selected: Story = {
  args: {
    ...Example.args,
    children: 'Selected',
  },
  decorators: Selectable.decorators,
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
      <TableBodyCell as="div">
        <TableRowPrimaryAction href={href}>I&apos;m all divs and no a11y 😬</TableRowPrimaryAction>
      </TableBodyCell>
    ),
  },
  argTypes: {
    children: {
      control: false,
    },
  },
}
