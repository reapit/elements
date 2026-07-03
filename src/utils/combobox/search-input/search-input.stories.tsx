import preview from '#.storybook/preview'
import { ComboboxContext } from '../context'
import { ComboboxPopupDialogContext } from '../popup-dialog/context'
import { ComboboxSearchInput } from './search-input'

const meta = preview.meta({
  title: 'Utils/Combobox/SearchInput',
  component: ComboboxSearchInput,
  decorators: [
    (Story, { parameters }) => (
      <ComboboxContext.Provider
        value={{
          comboboxId: 'button-id',
          disabled: false,
          listboxId: 'listbox-id',
          multiple: false,
          popupId: 'popup-id',
          required: false,
          searchInputId: 'search-input-id',
          size: 'medium',
        }}
      >
        <ComboboxPopupDialogContext.Provider value={{ hasSearch: true, variant: parameters.popupVariant ?? 'auto' }}>
          <Story />
        </ComboboxPopupDialogContext.Provider>
      </ComboboxContext.Provider>
    ),
  ],
})

/**
 * When the popup variant is popover, the search input uses the default bordered style.
 */
export const Example = meta.story({
  args: {
    'aria-label': 'Filter options',
    placeholder: 'Search...',
  },
  parameters: {
    popupVariant: 'popover',
  },
})

/**
 * When the popup variant is drawer, the search input automatically uses a borderless style
 * for a seamless drawer experience.
 */
export const Drawer = Example.extend({
  parameters: {
    popupVariant: 'drawer',
  },
})

/**
 * When the popup variant is auto, the input style adapts based on the viewport width.
 * Below SM breakpoint (768px), it displays as borderless. At SM and above, it displays as bordered.
 */
export const Auto = Example.extend({
  parameters: {
    popupVariant: 'auto',
  },
})
