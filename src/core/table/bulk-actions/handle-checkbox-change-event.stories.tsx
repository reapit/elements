import { handleCheckboxChangeEvent } from './handle-checkbox-change-event'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Table/BulkActions/handleCheckboxChangeEvent',
  render: () => {
    return (
      <>
        <form id="my-form" />
        <div onChange={(event) => handleCheckboxChangeEvent(event)}>
          <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'start', gap: 'var(--spacing-1)' }}>
            <label>
              <input form="my-form" name="selectAll" type="checkbox" /> Select all
            </label>
            <label>
              <input form="my-form" name="selectedRows" type="checkbox" value="1" /> Row 1
            </label>
            <label>
              <input form="my-form" name="selectedRows" type="checkbox" value="2" /> Row 2
            </label>
            <label>
              <input form="my-form" name="selectedRows" type="checkbox" value="3" /> Row 3
            </label>
            <label>
              <input form="my-form" name="selectedRows" type="checkbox" value="4" /> Row 4
            </label>
            <label>
              <input form="my-form" name="selectedRows" type="checkbox" value="5" /> Row 5
            </label>
            <label>
              <input form="my-form" name="selectedRows" type="checkbox" value="6" /> Row 6
            </label>
          </div>
        </div>
      </>
    )
  },
} satisfies Meta

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
export const Example: Story = {}
