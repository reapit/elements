import preview from '#.storybook/preview'
import { Avatar } from '#src/core/avatar'
import { Menu } from '#src/core/menu'
import { Table } from '../table'
import { useTableDecorator } from '../__story__/use-table-decorator'

const href = '#'

const meta = preview.meta({
  title: 'Core/Table/BodyRow',
  component: Table.BodyRow,
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
            <Table.BodyCell as="th">10 Hay St, Melbourne 3100</Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>
              <Table.MoreActions aria-label="More actions for 10 Hay St, Melbourne 3100">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </Table.MoreActions>
            </Table.BodyCell>
          </>
        ),
        'Primary action': (
          <>
            <Table.BodyCell as="th">
              <Table.PrimaryAction href={href}>10 Hay St, Melbourne 3100</Table.PrimaryAction>
            </Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>
              <Table.MoreActions aria-label="More actions for 10 Hay St, Melbourne 3100">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </Table.MoreActions>
            </Table.BodyCell>
          </>
        ),
        'Double-line': (
          <>
            <Table.BodyCell as="th">
              <Table.DoubleLineLayout mediaItem={<Avatar>MJ</Avatar>} supplementaryData="Engineer">
                <Table.PrimaryAction href={href}>Mary Jane</Table.PrimaryAction>
              </Table.DoubleLineLayout>
            </Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>
              <Table.MoreActions aria-label="More actions for Mary Jane">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </Table.MoreActions>
            </Table.BodyCell>
          </>
        ),
        Selectable: (
          <>
            <Table.BodyCell>
              <Table.Checkbox aria-label="Select Mary Jane" name="selections" value="1" />
            </Table.BodyCell>
            <Table.BodyCell as="th">
              <Table.DoubleLineLayout mediaItem={<Avatar>MJ</Avatar>} supplementaryData="Engineer">
                <Table.PrimaryAction href={href}>Mary Jane</Table.PrimaryAction>
              </Table.DoubleLineLayout>
            </Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>
              <Table.MoreActions aria-label="More actions for Mary Jane">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </Table.MoreActions>
            </Table.BodyCell>
          </>
        ),
        Selected: (
          <>
            <Table.BodyCell>
              <Table.Checkbox aria-label="Select Mary Jane" checked name="selections" value="1" />
            </Table.BodyCell>
            <Table.BodyCell as="th">
              <Table.DoubleLineLayout mediaItem={<Avatar>MJ</Avatar>} supplementaryData="Engineer">
                <Table.PrimaryAction href={href}>Mary Jane</Table.PrimaryAction>
              </Table.DoubleLineLayout>
            </Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>Data</Table.BodyCell>
            <Table.BodyCell>
              <Table.MoreActions aria-label="More actions for Mary Jane">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </Table.MoreActions>
            </Table.BodyCell>
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
    children: 'Plain text',
  },
  decorators: [useTableDecorator('body-row')],
})

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
export const RowActions = Example.extend({
  args: {
    children: 'Primary action',
  },
  decorators: [useTableDecorator('body-row')],
})

/**
 * Rows have minimum and maximum height constraints, but within this range, they may grow to accommodate
 * their content. For example, a row that contains
 * [Table.DoubleLineLayout](./?path=/docs/core-table-doublelinelayout--docs) cell content will be taller
 * than a row with a single line of cell content.
 */
export const DoubleLineContent = Example.extend({
  name: 'Double-line content',
  args: {
    children: 'Double-line',
  },
  decorators: [useTableDecorator('body-row')],
})

/**
 * When rows are selectable, they will have a [Table.Checkbox](./?path=/docs/core-table-checkbox--docs)
 * present in the leading column.
 */
export const Selectable = Example.extend({
  args: {
    children: 'Selectable',
  },
  decorators: [useTableDecorator('body-row', 'min-content 1fr 1fr 1fr min-content')],
})

/**
 * When the row's selection checkbox is checked, the row will be visually highlighted to indicate it
 * has been selected.
 */
export const Selected = Example.extend({
  args: {
    children: 'Selected',
  },
  decorators: Selectable.input.decorators,
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
      <Table.BodyCell as="div">
        <Table.PrimaryAction href={href}>I&apos;m all divs and no a11y 😬</Table.PrimaryAction>
      </Table.BodyCell>
    ),
  },
  argTypes: {
    children: {
      control: false,
    },
  },
})
