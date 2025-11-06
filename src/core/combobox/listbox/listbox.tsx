import { ComboboxListboxOptgroup } from './listbox-optgroup'
import { ComboboxListboxOption } from './listbox-option'
import { ElComboboxListbox } from './styles'
import { Listbox } from '#src/utils/listbox'
import { useComboboxContext } from '../context'

type AttributesToOmit = 'aria-orientation' | 'id' | 'selectAction'

export namespace ComboboxListbox {
  export interface Props extends Omit<Listbox.Props, AttributesToOmit> {}
}

/**
 * A listbox for a Combobox. Built on the Listbox foundation.
 */
export function ComboboxListbox(props: ComboboxListbox.Props) {
  const { listboxId } = useComboboxContext()
  return <Listbox as={ElComboboxListbox} {...props} aria-orientation="vertical" id={listboxId} selectAction="select" />
}

ComboboxListbox.displayName = 'Combobox.Listbox'

ComboboxListbox.Divider = Listbox.Divider
ComboboxListbox.Optgroup = ComboboxListboxOptgroup
ComboboxListbox.Option = ComboboxListboxOption
ComboboxListbox.OptionSupplementaryInfo = ComboboxListboxOption.SupplementaryInfo

ComboboxListbox.clearValue = Listbox.clearValue
ComboboxListbox.getOptionLabel = ComboboxListboxOption.getOptionLabel
ComboboxListbox.getSelectedOptions = Listbox.getSelectedOptions
ComboboxListbox.getValue = Listbox.getValue
ComboboxListbox.setOptionSelectedState = Listbox.setOptionSelectedState
