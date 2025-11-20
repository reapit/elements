import { Badge } from '#src/core/badge'
import { ComboboxContext } from '../context'
import { ComboboxListbox } from '../listbox'
import { ComboboxPopupDialog } from './popup-dialog'
import { ComboboxSearchInput } from '../search-input'
import { useId } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Combobox/Popup',
  component: ComboboxPopupDialog,
  argTypes: {
    'aria-labelledby': {
      control: false,
    },
    id: {
      control: false,
    },
    children: {
      control: 'select',
      options: ['Simple', 'Detailed', 'Filterable', 'Multi-select'],
      mapping: {
        Simple: (
          <ComboboxListbox defaultValue={['1']}>
            <ComboboxListbox.Option value="1">Option 1</ComboboxListbox.Option>
            <ComboboxListbox.Option value="2">Option 2</ComboboxListbox.Option>
            <ComboboxListbox.Option value="3">Option 3</ComboboxListbox.Option>
          </ComboboxListbox>
        ),
        Detailed: (
          <ComboboxListbox defaultValue={['1']}>
            <ComboboxListbox.Optgroup label="Recommended">
              <ComboboxListbox.Option
                badge={<Badge colour="neutral">Commercial</Badge>}
                additionalInfo={
                  <>
                    <ComboboxListbox.OptionAdditionalInfo badge={<Badge colour="inactive">Sales</Badge>}>
                      John Smith
                    </ComboboxListbox.OptionAdditionalInfo>
                    <ComboboxListbox.OptionAdditionalInfo badge={<Badge colour="inactive">Owner</Badge>}>
                      Sarah Johnson
                    </ComboboxListbox.OptionAdditionalInfo>
                  </>
                }
                value="1"
              >
                456B Heritage Boulevard, Upper Brookfield Heights, Brisbane QLD 4069
              </ComboboxListbox.Option>
            </ComboboxListbox.Optgroup>
            <ComboboxListbox.Divider />
            <ComboboxListbox.Optgroup label="All">
              <ComboboxListbox.Option
                badge={<Badge colour="neutral">Residential</Badge>}
                additionalInfo={
                  <>
                    <ComboboxListbox.OptionAdditionalInfo badge={<Badge colour="inactive">Sales</Badge>}>
                      Bob Brown
                    </ComboboxListbox.OptionAdditionalInfo>
                    <ComboboxListbox.OptionAdditionalInfo badge={<Badge colour="inactive">Owner</Badge>}>
                      Betty White
                    </ComboboxListbox.OptionAdditionalInfo>
                  </>
                }
                value="2"
              >
                12 Given Terrace, Paddington, Brisbane QLD 4064
              </ComboboxListbox.Option>
              <ComboboxListbox.Option
                badge={<Badge colour="neutral">Residential</Badge>}
                additionalInfo={
                  <ComboboxListbox.OptionAdditionalInfo badge={<Badge colour="inactive">Owner</Badge>}>
                    Bernard Black
                  </ComboboxListbox.OptionAdditionalInfo>
                }
                value="3"
              >
                16/40 Annerley Rd, South Brisbane QLD 4101
              </ComboboxListbox.Option>
            </ComboboxListbox.Optgroup>
          </ComboboxListbox>
        ),
        'Multi-select': (
          <ComboboxListbox defaultValue={['1']} aria-multiselectable>
            <ComboboxListbox.Option value="1">Option 1</ComboboxListbox.Option>
            <ComboboxListbox.Option value="2">Option 2</ComboboxListbox.Option>
            <ComboboxListbox.Option value="3">Option 3</ComboboxListbox.Option>
          </ComboboxListbox>
        ),
      },
    },
    maxWidth: {
      control: 'text',
    },
    search: {
      control: 'boolean',
      mapping: {
        true: <ComboboxSearchInput aria-label="Filter options" />,
        false: null,
      },
    },
    variant: {
      control: 'radio',
      options: ['drawer', 'popover', 'auto'],
    },
  },
  render: (args) => {
    const buttonId = useId()
    const listboxId = useId()
    const popupId = useId()

    return (
      <ComboboxContext.Provider value={{ buttonId, disabled: false, listboxId, popupId, required: false }}>
        <button
          aria-controls={popupId}
          aria-haspopup="dialog"
          id={buttonId}
          onClick={() => ComboboxPopupDialog.open(popupId)}
        >
          Click me and I will open the popup for you!
        </button>
        <ComboboxPopupDialog {...args} aria-labelledby={buttonId} id={popupId} />
      </ComboboxContext.Provider>
    )
  },
} satisfies Meta<typeof ComboboxPopupDialog>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Many popups will function as simple popovers that present the available options to the user.
 * The popup automatically anchors to the element specified by `aria-labelledby`. By default,
 * popovers are slightly wider than their anchor element to accommodate padding.
 */
export const Example: Story = {
  args: {
    'aria-labelledby': 'button-id',
    children: 'Simple',
    closeOnSelection: 'auto',
    id: 'popup-id',
    maxWidth: undefined,
    search: false,
    variant: 'popover',
  },
}

/**
 * By default, popover-style popups are slightly wider than their anchor element to accommodate
 * padding. This width can be overridden by setting `maxWidth` to a valid CSS length. A `--size-*`
 * CSS variable is typically preferred.
 */
export const MaxWidth: Story = {
  name: 'Max-width',
  args: {
    ...Example.args,
    children: 'Detailed',
    maxWidth: 'fit-content',
    variant: 'popover',
  },
}

/**
 * In some cases, such as on devices with small viewports, it can be preferrable to have the popup
 * function as a drawer. This can be achieved using the `drawer` variant.
 */
export const Drawer: Story = {
  args: {
    ...Example.args,
    variant: 'drawer',
  },
}

/**
 * The `auto` variant displays as a drawer on XS breakpoint (< 768px) and as a popover on SM
 * and above. This provides a responsive experience that adapts to the viewport size.
 */
export const Auto: Story = {
  args: {
    ...Example.args,
    variant: 'auto',
  },
}

/**
 * A search input can be included in the popup to allow the options to be filtered/searched.
 */
export const Filterable: Story = {
  args: {
    ...Example.args,
    children: 'Filterable',
    search: true,
  },
}

/**
 * For single-select comboboxes, the popup will close when a selection is made. For multi-select
 * comboboxes, it won't. This behaviour can be customised using `closeOnSelection`.
 *
 * - `auto` (default): Closes on selection for single-select comboboxes; remains open for multi-select.
 * - `always`: Always closes when the user selects an option.
 * - `never`: Never closes on selection; the user must explicitly close the popup.
 */
export const Closing: Story = {
  args: {
    ...Example.args,
    children: 'Multi-select',
    closeOnSelection: 'never',
    variant: 'popover',
  },
}

/**
 * The listbox will scroll when there's too many options to display in the popup's available space.
 */
export const Overflow: Story = {
  args: {
    ...Example.args,
    children: (
      <ComboboxListbox aria-multiselectable defaultValue={['1']}>
        <ComboboxListbox.Option value="1">Option 1</ComboboxListbox.Option>
        <ComboboxListbox.Option value="2">Option 2</ComboboxListbox.Option>
        <ComboboxListbox.Option value="3">Option 3</ComboboxListbox.Option>
        <ComboboxListbox.Option value="4">Option 4</ComboboxListbox.Option>
        <ComboboxListbox.Option value="5">Option 5</ComboboxListbox.Option>
        <ComboboxListbox.Option value="6">Option 6</ComboboxListbox.Option>
        <ComboboxListbox.Option value="7">Option 7</ComboboxListbox.Option>
        <ComboboxListbox.Option value="8">Option 8</ComboboxListbox.Option>
        <ComboboxListbox.Option value="9">Option 9</ComboboxListbox.Option>
        <ComboboxListbox.Option value="10">Option 10</ComboboxListbox.Option>
        <ComboboxListbox.Option value="11">Option 11</ComboboxListbox.Option>
        <ComboboxListbox.Option value="12">Option 12</ComboboxListbox.Option>
        <ComboboxListbox.Option value="13">Option 13</ComboboxListbox.Option>
        <ComboboxListbox.Option value="14">Option 14</ComboboxListbox.Option>
        <ComboboxListbox.Option value="15">Option 15</ComboboxListbox.Option>
        <ComboboxListbox.Option value="16">Option 16</ComboboxListbox.Option>
        <ComboboxListbox.Option value="17">Option 17</ComboboxListbox.Option>
        <ComboboxListbox.Option value="18">Option 18</ComboboxListbox.Option>
        <ComboboxListbox.Option value="19">Option 19</ComboboxListbox.Option>
        <ComboboxListbox.Option value="20">Option 20</ComboboxListbox.Option>
        <ComboboxListbox.Option value="21">Option 21</ComboboxListbox.Option>
        <ComboboxListbox.Option value="22">Option 22</ComboboxListbox.Option>
        <ComboboxListbox.Option value="23">Option 23</ComboboxListbox.Option>
        <ComboboxListbox.Option value="24">Option 24</ComboboxListbox.Option>
        <ComboboxListbox.Option value="25">Option 25</ComboboxListbox.Option>
      </ComboboxListbox>
    ),
    maxHeight: '300px',
    search: true,
    variant: 'auto',
  },
}
