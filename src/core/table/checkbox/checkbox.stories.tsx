import preview from '#.storybook/preview'
import { Table } from '../table'
import { useArgs } from 'storybook/preview-api'
import { useEffect, useRef } from 'react'

import type { ChangeEventHandler } from 'react'

const meta = preview.meta({
  title: 'Data and tables/Table/Checkbox',
  component: Table.Checkbox,
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
})

/**
 * The checkbox is designed to fill its parent container. In the case of tables, this should mean it will
 * fill the entire cell (i.e., the full height of the row and the full width of the column). This is to
 * ensure the checkbox has a larger hit area than it would naturally possess to help avoid miss-clicks.
 *
 * Importantly, since table cells apply padding by default, this padding should typically be disabled toto
 * allow the checkbox to trully take up the maximum space possible. See
 * [the No Padding story for Table.BodyCell](./?path=/story/core-table-bodycell--no-padding) and
 * [the No Padding story for Table.HeaderCell](./?path=/story/core-table-headercell--no-padding) for
 * examples on how to do this.
 */
export const Example = meta.story({
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
    return <Table.Checkbox {...args} onChange={updateSortDirection} />
  },
})

/**
 * While it does not support an indeterminate prop that can be controlled by consumers, the checkbox
 * does support an indeterminate state via the
 * [:indeterminate](https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate) CSS pseudo-class.
 * Like any native checkbox, this state can be activated by setting the input element's `indeterminate`
 * property programmatically.
 */
export const Indeterminate = Example.extend({
  render: (args) => {
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = true
      }
    }, [])
    return <Table.Checkbox {...args} ref={inputRef} />
  },
})
