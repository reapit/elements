import { Menu } from '#src/core/menu'
import { TableRowMoreActions } from './more-actions'
import { TableRowPrimaryAction } from '../primary-action'

import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location?.href!

const meta = {
  title: 'Core/Table/MoreActions',
  component: TableRowMoreActions,
  argTypes: {
    children: {
      control: false,
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TableRowMoreActions>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    'aria-disabled': false,
    'aria-label': 'More actions for Mary Jane',
    children: (
      <>
        <Menu.Item>Action 1</Menu.Item>
        <Menu.Item>Action 2</Menu.Item>
      </>
    ),
    disabled: false,
  },
}

/**
 * Disabling of the more actions button should generally be avoided as it prevents the menu's actions
 * from being discovered by users. Typically, it's best to keep the menu accessible and simply disable
 * menu individual items that may be unavailable due to certain conditions.
 *
 * That aside, the button can be disabled using `aria-disabled` or `disabled`. In both cases, click
 * events will be ignored, however, `aria-disabled` allows the button to still be focusable, which,
 * for example, allows tooltips to still be displayed. A `disabled` button is also `aria-disabled`,
 * regardless of the value of `aria-disabled`.
 */
export const Disabled: Story = {
  args: {
    ...Example.args,
    disabled: true,
  },
}

/**
 * One of the key features of `Table.MoreActions` is that it ensures the trigger button is layered above
 * the table row's primary action. This is important because the hit area of a
 * [Table.PrimaryAction](./?path=/docs/core-table-primaryaction--docs) will expand to fill the bounding
 * box of our the row, covering any other cell content in the row, unless that cell content is explicitly
 * layered above it. This example shows that the more button is still clickable despite the presence
 * of the primary action and its expanded hit area.
 */
export const Layering: Story = {
  args: {
    ...Example.args,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          boxSizing: 'content-box',
          border: '1px solid #FA00FF',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <TableRowPrimaryAction href={href}>Primary action</TableRowPrimaryAction>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
}
