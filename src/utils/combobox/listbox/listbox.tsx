import { ComboboxListboxPlaceholder } from './listbox-placeholder'
import { ComboboxListboxOptgroup } from './listbox-optgroup'
import { ComboboxListboxOption } from './listbox-option'
import { ElComboboxListbox } from './styles'
import { Listbox } from '#src/utils/listbox'
import { useComboboxContext } from '../context'
import { useComboboxDefaultOptionsContext } from '../default-options-context'

// We omit...
// - as, because we pin it to our styled element
// - aria-disabled, because it is set by Combobox
// - aria-multiselectable, because it is set by Combobox
// - aria-orientation, because it is always "vertical"
// - aria-required, because it is set by Combobox
// - id, because it is set by Combobox
// - selectionFollowsFocus, because it is always false
type AttributesToOmit =
  | 'as'
  | 'aria-disabled'
  | 'aria-multiselectable'
  | 'aria-orientation'
  | 'aria-required'
  | 'id'
  | 'selectionFollowsFocus'

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
export function ComboboxListbox({ defaultValue: defaultValueProp, ...rest }: ComboboxListbox.Props) {
  const defaultOptions = useComboboxDefaultOptionsContext()
  const defaultValue = defaultOptions.map((option) => option.value)

  const { disabled, listboxId, multiple, required } = useComboboxContext()

  return (
    <Listbox
      {...rest}
      as={ElComboboxListbox}
      aria-disabled={disabled}
      aria-multiselectable={multiple}
      aria-orientation="vertical"
      aria-required={required}
      defaultValue={defaultValueProp ?? defaultValue}
      id={listboxId}
      selectionFollowsFocus={false}
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
