import { ComboboxListboxOptgroup } from './listbox-optgroup'
import { ComboboxListboxOption } from './listbox-option'
import { ElComboboxListbox } from './styles'
import { Listbox } from '#src/utils/listbox'
import { useComboboxContext } from '../context'

// We omit...
// - aria-disabled, because it is set by Combobox
// - aria-orientation, because it is always "vertical"
// - aria-required, because it is set by Combobox
// - id, because it is set by Combobox
// - selectAction, because it is always "select"
type AttributesToOmit = 'aria-disabled' | 'aria-orientation' | 'aria-required' | 'id' | 'selectAction'

export namespace ComboboxListbox {
  export interface Props extends Omit<Listbox.Props, AttributesToOmit> {}
}

/**
 * A listbox for a Combobox. Built on the Listbox foundation.
 */
export function ComboboxListbox(props: ComboboxListbox.Props) {
  const { disabled, listboxId, required } = useComboboxContext()
  return (
    <Listbox
      as={ElComboboxListbox}
      {...props}
      aria-disabled={disabled}
      aria-orientation="vertical"
      aria-required={required}
      id={listboxId}
      selectAction="select"
      selectionFollowsFocus={false}
    />
  )
}

ComboboxListbox.displayName = 'Combobox.Listbox'

ComboboxListbox.Divider = Listbox.Divider
ComboboxListbox.Optgroup = ComboboxListboxOptgroup
ComboboxListbox.Option = ComboboxListboxOption
ComboboxListbox.OptionSupplementaryInfo = ComboboxListboxOption.SupplementaryInfo

ComboboxListbox.clearValue = Listbox.clearValue
ComboboxListbox.getOptionLabel = ComboboxListboxOption.getLabel
ComboboxListbox.getSelectedOptions = Listbox.getSelectedOptions
ComboboxListbox.getValue = Listbox.getValue
ComboboxListbox.setOptionSelectedState = Listbox.setOptionSelectedState
