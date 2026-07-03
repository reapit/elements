import { ComboboxListboxPlaceholder } from './listbox-placeholder'
import { ComboboxListboxOptgroup } from './listbox-optgroup'
import { ComboboxListboxOption } from './listbox-option'
import { ElComboboxListbox } from './styles'
import { Listbox } from '#src/utils/listbox'
import { useComboboxContext } from '../context'
import { useComboboxDefaultOptionsContext } from '../default-options-context'
import { ComboboxPopupDialogContext } from '../popup-dialog/context'
import { useContext } from 'react'

// We omit...
// - as, because we pin it to our styled element
// - aria-disabled, because it is set by Combobox
// - aria-multiselectable, because it is set by Combobox
// - aria-orientation, because it is always "vertical"
// - aria-required, because it is set by Combobox
// - id, because it is set by Combobox
// - selectionFollowsFocus, because it is always false
// - tabIndex, because it is derived internally from hasSearch, and consumer overrides would
//   break the aria-activedescendant pattern
type AttributesToOmit =
  | 'as'
  | 'aria-disabled'
  | 'aria-multiselectable'
  | 'aria-orientation'
  | 'aria-required'
  | 'id'
  | 'selectionFollowsFocus'
  | 'tabIndex'

export namespace ComboboxListbox {
  export interface DividerProps extends Listbox.DividerProps {}
  export interface OptgroupProps extends ComboboxListboxOptgroup.Props {}
  export interface OptionProps extends ComboboxListboxOption.Props {}
  export interface OptionAdditionalInfoProps extends ComboboxListboxOption.AdditionalInfoProps {}
  export interface PlaceholderProps extends ComboboxListboxPlaceholder.Props {}

  export interface Props extends Omit<Listbox.Props, AttributesToOmit> {}
}

/**
 * A listbox for a Combobox. Built on the Listbox foundation.
 */
export function ComboboxListbox({ defaultValue: defaultValueProp, onMouseDown, ...rest }: ComboboxListbox.Props) {
  const defaultOptions = useComboboxDefaultOptionsContext()
  const defaultValue = defaultOptions.map((option) => option.value)

  const { disabled, listboxId, multiple, required, searchInputId } = useComboboxContext()
  const popupDialogContext = useContext(ComboboxPopupDialogContext)
  const hasSearch = popupDialogContext?.hasSearch ?? false

  return (
    <Listbox
      {...rest}
      activeDescendantOwnerId={hasSearch ? searchInputId : undefined}
      as={ElComboboxListbox}
      aria-disabled={disabled}
      aria-multiselectable={multiple}
      aria-orientation="vertical"
      aria-required={required}
      defaultValue={defaultValueProp ?? defaultValue}
      id={listboxId}
      selectionFollowsFocus={false}
      // When paired with a SearchInput, the input holds DOM focus throughout the interaction.
      // tabIndex={-1} removes the listbox from the tab sequence so Tab moves directly from the
      // search input to the next element outside the popup. onMouseDown preventDefault stops
      // the listbox from stealing focus when a user clicks in the whitespace between options;
      // the click event still fires on child option elements so selection works normally.
      onMouseDown={(e) => {
        onMouseDown?.(e)
        if (hasSearch) e.preventDefault()
      }}
      tabIndex={hasSearch ? -1 : 0}
    />
  )
}

ComboboxListbox.displayName = 'Combobox.Listbox'

ComboboxListbox.Divider = Listbox.Divider
ComboboxListbox.Optgroup = ComboboxListboxOptgroup
ComboboxListbox.Option = ComboboxListboxOption
ComboboxListbox.OptionAdditionalInfo = ComboboxListboxOption.AdditionalInfo
ComboboxListbox.Placeholder = ComboboxListboxPlaceholder

ComboboxListbox.clearValue = Listbox.clearValue
ComboboxListbox.getOptionLabel = ComboboxListboxOption.getLabel
ComboboxListbox.getSelectedOptions = Listbox.getSelectedOptions
ComboboxListbox.getValue = Listbox.getValue
ComboboxListbox.setOptionSelectedState = Listbox.setOptionSelectedState
ComboboxListbox.useState = Listbox.useState
