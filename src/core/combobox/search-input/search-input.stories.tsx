import { ComboboxPopupDialogContext } from '../popup-dialog/context'
import { ComboboxSearchInput } from './search-input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Core/Combobox/SearchInput',
  component: ComboboxSearchInput,
  decorators: [
    (Story, { parameters }) => (
      <ComboboxPopupDialogContext.Provider value={{ variant: parameters.popupVariant ?? 'auto' }}>
        <Story />
      </ComboboxPopupDialogContext.Provider>
    ),
  ],
} satisfies Meta<typeof ComboboxSearchInput>

export default meta

type Story = StoryObj<typeof meta>

/**
 * When the popup variant is popover, the search input uses the default bordered style.
 */
export const Example: Story = {
  args: {
    'aria-label': 'Filter options',
    placeholder: 'Search...',
  },
  parameters: {
    popupVariant: 'popover',
  },
}

/**
 * When the popup variant is drawer, the search input automatically uses a borderless style
 * for a seamless drawer experience.
 */
export const Drawer: Story = {
  args: {
    ...Example.args,
  },
  parameters: {
    popupVariant: 'drawer',
  },
}

/**
 * When the popup variant is auto, the input style adapts based on the viewport width.
 * Below SM breakpoint (768px), it displays as borderless. At SM and above, it displays as bordered.
 */
export const Auto: Story = {
  args: {
    ...Example.args,
  },
  parameters: {
    popupVariant: 'auto',
  },
}
