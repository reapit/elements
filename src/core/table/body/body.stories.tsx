import { Avatar } from '#src/core/avatar'
import { Menu } from '#src/core/menu'
import { TableBody } from './body'
import { TableBodyCell } from '../body-cell'
import { TableBodyRow } from '../body-row'
import { TableCellDoubleLineLayout } from '../double-line-layout'
import { TableRowPrimaryAction } from '../primary-action'
import { TableRowMoreActions } from '../more-actions'
import { useTableDecorator } from '../__story__/use-table-decorator'

import type { Meta, StoryObj } from '@storybook/react-vite'

const href = globalThis.top?.location.href!

const meta = {
  title: 'Core/Table/Body',
  component: TableBody,
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
      options: ['Single-line', 'Double-line'],
      mapping: {
        'Single-line': buildRows('single-line'),
        'Double-line': buildRows('double-line'),
      },
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
} satisfies Meta<typeof TableBody>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    as: 'tbody',
    children: 'Double-line',
  },
  decorators: [useTableDecorator('body')],
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
      <TableBodyRow as="div">
        <TableBodyCell as="div">
          <TableRowPrimaryAction href={href}>I&apos;m all divs and no a11y 😬</TableRowPrimaryAction>
        </TableBodyCell>
      </TableBodyRow>
    ),
  },
  argTypes: {
    children: {
      control: false,
    },
  },
}

function buildRows(type: 'single-line' | 'double-line') {
  switch (type) {
    case 'single-line': {
      return (
        <>
          <TableBodyRow>
            <TableBodyCell as="th">
              <TableRowPrimaryAction href={href}>10 Hay St, Melbourne 3100</TableRowPrimaryAction>
            </TableBodyCell>
            <TableBodyCell>Data</TableBodyCell>
            <TableBodyCell>Data</TableBodyCell>
            <TableBodyCell>
              <TableRowMoreActions aria-label="More actions for John Smith">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </TableRowMoreActions>
            </TableBodyCell>
          </TableBodyRow>

          <TableBodyRow>
            <TableBodyCell as="th">
              <TableRowPrimaryAction href={href}>45 Queen Elizabeth St, Melbourne 3100</TableRowPrimaryAction>
            </TableBodyCell>
            <TableBodyCell>Data</TableBodyCell>
            <TableBodyCell>Data</TableBodyCell>
            <TableBodyCell>
              <TableRowMoreActions aria-label="More actions for 45 Queen Elizabeth St, Melbourne 3100">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </TableRowMoreActions>
            </TableBodyCell>
          </TableBodyRow>
        </>
      )
    }
    case 'double-line': {
      return (
        <>
          <TableBodyRow>
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
          </TableBodyRow>

          <TableBodyRow>
            <TableBodyCell as="th">
              <TableCellDoubleLineLayout mediaItem={<Avatar>JS</Avatar>} supplementaryData="Engineer">
                <TableRowPrimaryAction href={href}>John Smith</TableRowPrimaryAction>
              </TableCellDoubleLineLayout>
            </TableBodyCell>
            <TableBodyCell>Data</TableBodyCell>
            <TableBodyCell>Data</TableBodyCell>
            <TableBodyCell>
              <TableRowMoreActions aria-label="More actions for John Smith">
                <Menu.Item>Action 1</Menu.Item>
                <Menu.Item>Action 2</Menu.Item>
              </TableRowMoreActions>
            </TableBodyCell>
          </TableBodyRow>
        </>
      )
    }
  }
}
