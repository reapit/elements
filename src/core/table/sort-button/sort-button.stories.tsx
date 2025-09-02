import { getNextSortDirection } from './sort-direction'
import { TableCellSortButton } from './sort-button'
import { Text } from '#src/core/text'
import { Tooltip } from '#src/core/tooltip'
import { useArgs } from 'storybook/preview-api'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { MouseEventHandler } from 'react'
import type { SortDirection } from './sort-direction'

const meta = {
  title: 'Core/Table/SortButton',
  component: TableCellSortButton,
  argTypes: {
    children: {
      control: 'text',
    },
    value: {
      control: 'select',
      options: ['ascending', 'descending', 'none'] satisfies SortDirection[],
    },
  },
} satisfies Meta<typeof TableCellSortButton>

export default meta
type Story = StoryObj<typeof meta>

/**
 * To indicate that no sort is active for the column, use a value of "none". To change the sort
 * direction when the button is clicked, the consumer must handle click events and update the state
 * that determines what value is provided to the button's `value` prop.
 *
 * Since the button's value represents the _current_ sort direction, the click event handler must
 * calculate what the _next_ sort direction will be. This can be acheived using the
 * `getNextSortDirection` function available from `@reapit/elements/core/table`.
 */
export const Example: Story = {
  args: {
    children: 'Property',
    name: 'address',
    value: 'none',
  },
  render: (args) => {
    const [, setArgs] = useArgs()
    const updateSortDirection: MouseEventHandler<HTMLButtonElement> = (event) => {
      setArgs({ value: getNextSortDirection(event.currentTarget.value) })
    }
    return <TableCellSortButton {...args} onClick={updateSortDirection} />
  },
}

/**
 * To indicate an ascending sort order for the column, use a value of "ascending".
 */
export const Ascending: Story = {
  args: {
    ...Example.args,
    value: 'ascending',
  },
}

/**
 * To indicate a descending sort order for the column, use a value of "descending".
 */
export const Descending: Story = {
  args: {
    ...Example.args,
    value: 'descending',
  },
}

/**
 * The sort button inherits `justify-content` from its parent. This allows it to match the alignment
 * specified for the table header cell in which it resides.
 */
export const Alignment: Story = {
  args: {
    ...Example.args,
    value: 'descending',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          boxSizing: 'content-box',
          border: '1px solid #FA00FF',
          width: '300px',
          justifyContent: 'end',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

/**
 * Column headers should rarely be permitted to truncate, but when it is unavoidable, it's possible
 * to allow truncation to occur and to display a tooltip with the unabridged text. When this is
 * necessary, the tooltip should label the sort button and be displayed when the sort button is
 * hovered or focused.
 */
export const Truncation: Story = {
  args: {
    ...Descending.args,
    'aria-labelledby': 'tooltip',
    children: (
      <>
        <Text font="inherit" id="text" overflow="truncate">
          Long column header
        </Text>
        <Tooltip id="tooltip" triggerId="sort-button" truncationTargetId="text">
          Long column header
        </Tooltip>
      </>
    ),
    id: 'sort-button',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          boxSizing: 'content-box',
          border: '1px solid #FA00FF',
          width: '100px',
        }}
      >
        <Story />
      </div>
    ),
  ],
}
