import { Badge } from '#src/core/badge'
import { ComboboxPopup } from './popup'
import { ComboboxListbox } from '../listbox'
import { SearchInput } from '#src/core/search-input'
import { useId } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { ComboboxContext } from '../context'

const meta = {
  title: 'Core/Combobox/Popup',
  component: ComboboxPopup,
  argTypes: {
    children: {
      control: 'select',
      options: ['Simple', 'Detailed', 'Filterable'],
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
                supplementaryInfo={
                  <>
                    <ComboboxListbox.OptionSupplementaryInfo badge={<Badge colour="inactive">Sales</Badge>}>
                      John Smith
                    </ComboboxListbox.OptionSupplementaryInfo>
                    <ComboboxListbox.OptionSupplementaryInfo badge={<Badge colour="inactive">Owner</Badge>}>
                      Sarah Johnson
                    </ComboboxListbox.OptionSupplementaryInfo>
                  </>
                }
                value="1"
              >
                456B Heritage Boulevard, Upper Brookfield Heights, Brisbane QLD 4069
              </ComboboxListbox.Option>
            </ComboboxListbox.Optgroup>
            <ComboboxListbox.Optgroup label="All">
              <ComboboxListbox.Option
                badge={<Badge colour="neutral">Residential</Badge>}
                supplementaryInfo={
                  <>
                    <ComboboxListbox.OptionSupplementaryInfo badge={<Badge colour="inactive">Sales</Badge>}>
                      Bob Brown
                    </ComboboxListbox.OptionSupplementaryInfo>
                    <ComboboxListbox.OptionSupplementaryInfo badge={<Badge colour="inactive">Owner</Badge>}>
                      Betty White
                    </ComboboxListbox.OptionSupplementaryInfo>
                  </>
                }
                value="2"
              >
                12 Given Terrace, Paddington, Brisbane QLD 4064
              </ComboboxListbox.Option>
              <ComboboxListbox.Option
                badge={<Badge colour="neutral">Residential</Badge>}
                supplementaryInfo={
                  <ComboboxListbox.OptionSupplementaryInfo badge={<Badge colour="inactive">Owner</Badge>}>
                    Bernard Black
                  </ComboboxListbox.OptionSupplementaryInfo>
                }
                value="3"
              >
                16/40 Annerley Rd, South Brisbane QLD 4101
              </ComboboxListbox.Option>
            </ComboboxListbox.Optgroup>
          </ComboboxListbox>
        ),
        Filterable: [
          <SearchInput key="search-input" />,
          <ComboboxListbox key="listbox" defaultValue={['1']}>
            <ComboboxListbox.Option value="1">Option 1</ComboboxListbox.Option>
            <ComboboxListbox.Option value="2">Option 2</ComboboxListbox.Option>
            <ComboboxListbox.Option value="3">Option 3</ComboboxListbox.Option>
          </ComboboxListbox>,
        ],
      },
      maxWidth: {
        control: 'text',
      },
      variant: {
        control: 'radio',
        options: ['drawer', 'popover'],
      },
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
          onClick={() => ComboboxPopup.toggle(popupId)}
        >
          Click me and I will open the popup for you!
        </button>
        <ComboboxPopup {...args} />
      </ComboboxContext.Provider>
    )
  },
} satisfies Meta<typeof ComboboxPopup>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Many popups will function as simple popovers that present the available options to the user.
 * These popovers will always size themselves to the width of their anchor element.
 */
export const Example: Story = {
  args: {
    children: 'Simple',
    maxWidth: undefined,
    variant: 'popover',
  },
}

/**
 * By default, popover-style popups will match their anchor element's width. This can be overridden
 * by setting `maxWidth` to a valid CSS length. A `--size-*` CSS variable is typically preferred.
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
 * A search input can be included in the popup to allow the options to be filtered/searched.
 */
export const Filterable: Story = {
  args: {
    ...Example.args,
    children: 'Filterable',
  },
}
