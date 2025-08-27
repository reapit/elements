import { Pattern } from '#src/core/drawer/__story__/Pattern'
import { StarIcon } from '#src/icons/star'
import { Story } from '@storybook/addon-docs/blocks'
import { TableCellPrimaryData } from '../primary-data'
import { TableRowPrimaryAction } from './primary-action'
import { TableRowPrimaryActionButton } from './primary-action-button'

import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location.href!

const meta = {
  title: 'Core/Table/PrimaryAction',
  component: TableRowPrimaryAction,
  argTypes: {
    children: {
      control: 'text',
    },
    href: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      // NOTE: This relatively-positioned div is used to simulate a table row. It is this element's
      // bounding box that the primary action's pseudo-element will be positioned in relation to.
      <div style={{ position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    tableWidth: '100%',
  },
} satisfies Meta<typeof TableRowPrimaryAction>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The default font styling of the action has a heavier weight as the primary action should always
 * be used for the primary data of a row's header cell.
 */
export const Example: Story = {
  args: {
    children: '1 Brisbane St, Brisbane 4300',
    href,
  },
}

/**
 * When using [Table.PrimaryData](./?path=/docs/core-table-tablecellprimarydata--docs), it is
 * important to consider whether the leading or trailing icons should form part of the primary action's
 * content or not. In this example, the primary action is a child of `Table.PrimaryData` rather
 * than its parent. This means the accessible name of the icon is not part of the primary action's
 * accessible name. If the icon were wanted as part of the primary action's accessible name, then the
 * hierarchy can simply be inverted by using `Table.PrimaryData` as the content of `Table.PrimaryAction`.
 */
export const PrimaryData: Story = {
  args: {
    'aria-label': 'View Mary Jane',
    children: 'Mary Jane',
    href,
  },
  argTypes: {
    children: {
      control: false,
    },
  },
  render: (args) => (
    <TableCellPrimaryData iconRight={<StarIcon aria-label="Preferred creditor" />}>
      <TableRowPrimaryAction {...args} />
    </TableCellPrimaryData>
  ),
}

/**
 * The key feature of the primary action is that its "hit area" will expand to fill the bounding box of
 * the closest, relative-positioned ancestor. By default, this will be the table row. The example below
 * demonstrates this by placing a sibling element—the pattern—next to the primary action. Hovering
 * the patterned area shows the cursor is actually hovering the primary action. Likewise, focusing the
 * action shows the focus outline surrounding both siblings.
 */
export const HitArea: Story = {
  args: {
    children: '1 Brisbane St, Brisbane 4300',
    href,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          border: '1px solid #FA00FF',
          gridTemplateColumns: 'auto 1fr',
        }}
      >
        <Story />
        <Pattern height="var(--font-small-regular-font-size)" />
      </div>
    ),
  ],
}

/**
 * `Table.PrimaryActionButton` is identical to `Table.PrimaryAction`, except it renders as a
 * `<button>` element, which allows button semantics to be used for a table row's primary action.
 * That said, typically a row's primary action will involve navigation, such as opening a drawer
 * or navigating to another page.
 */
export const Buttons: StoryObj<typeof TableRowPrimaryActionButton> = {
  args: {
    children: '1 Brisbane St, Brisbane 4300',
  },
  render: (args) => <TableRowPrimaryActionButton {...args} />,
}
