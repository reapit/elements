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
        Filterable: [
          <ComboboxSearchInput aria-label="Filter options" key="search-input" />,
          <ComboboxListbox key="listbox" defaultValue={['1']}>
            <ComboboxListbox.Option value="1">Option 1</ComboboxListbox.Option>
            <ComboboxListbox.Option value="2">Option 2</ComboboxListbox.Option>
            <ComboboxListbox.Option value="3">Option 3</ComboboxListbox.Option>
          </ComboboxListbox>,
        ],
        'Multi-select': [
          <ComboboxSearchInput aria-label="Filter options" key="search-input" />,
          <ComboboxListbox key="listbox" defaultValue={['1']}>
            <ComboboxListbox.Option value="1">Option 1</ComboboxListbox.Option>
            <ComboboxListbox.Option value="2">Option 2</ComboboxListbox.Option>
            <ComboboxListbox.Option value="3">Option 3</ComboboxListbox.Option>
          </ComboboxListbox>,
        ],
      },
    },
    maxWidth: {
      control: 'text',
    },
    variant: {
      control: 'radio',
      options: ['drawer', 'popover', 'auto'],
    },
  },
  render: (args, { parameters }) => {
    const buttonId = useId()
    const listboxId = useId()
    const popupId = useId()

    return (
      <ComboboxContext.Provider
        value={{
          buttonId,
          disabled: false,
          listboxId,
          multiple: parameters.multiple ?? false,
          popupId,
          required: false,
          size: 'medium',
        }}
      >
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
  },
  parameters: {
    multiple: true,
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
