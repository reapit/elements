import { TableCellCheckbox } from './checkbox'
import { useArgs } from 'storybook/preview-api'
import { useEffect, useRef } from 'react'

import type { ChangeEventHandler } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Table/Checkbox',
  component: TableCellCheckbox,
  argTypes: {
    checked: {
      control: 'boolean',
    },
    value: {
      control: 'text',
      table: {
        type: {
          summary: 'string | number | readonly string[] | undefined',
        },
      },
    },
  },
} satisfies Meta<typeof TableCellCheckbox>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The checkbox is designed to fill its parent container. In the case of tables, this should mean it will
 * fill the entire cell (i.e., the full height of the row and the full width of the column). This is to
 * ensure the checkbox has a larger hit area than it would naturally possess to help avoid miss-clicks.
 *
 * Importantly, since table cells apply padding by default, this padding should typically be disabled toto
 * allow the checkbox to trully take up the maximum space possible. See
 * [the No Padding story for Table.BodyCell](./?path=/docs/core-table-bodycell--nopadding) and
 * [the No Padding story for Table.HeaderCell](./?path=/docs/core-table-headercell--nopadding) for
 * examples on how to do this.
 */
export const Example: Story = {
  args: {
    'aria-label': 'Select 10 Hay St, Melbourne 3100',
    checked: undefined,
    disabled: false,
    form: undefined,
    name: 'selectedRows',
    value: 'abc-123',
  },
  render: (args) => {
    const [, setArgs] = useArgs()
    const updateSortDirection: ChangeEventHandler<HTMLInputElement> = (event) => {
      setArgs({ checked: event.currentTarget.checked })
    }
    return <TableCellCheckbox {...args} onChange={updateSortDirection} />
  },
}

/**
 * While it does not support an indeterminate prop that can be controlled by consumers, the checkbox
 * does support an indeterminate state via the
 * [:indeterminate](https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate) CSS pseudo-class.
 * Like any native checkbox, this state can be activated by setting the input element's `indeterminate`
 * property programmatically.
 */
export const Indeterminate: Story = {
  args: {
    ...Example.args,
  },
  render: (args) => {
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = true
      }
    }, [])
    return <TableCellCheckbox {...args} ref={inputRef} />
  },
}
