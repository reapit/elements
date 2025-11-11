import { ComboboxOption } from '../option'
import { Listbox } from '#src/utils/listbox'

export namespace ComboboxListboxOption {
  export interface Props extends Listbox.OptionProps, ComboboxOption.Props {}
}

/**
 * Integrates `ComboboxOption` with the internal `<select>` element. Updates checked/selected state
 * automatically and renders as a native `<option>` when needed.
 */
export function ComboboxListboxOption(props: ComboboxListboxOption.Props) {
  return <Listbox.Option as={ComboboxOption} {...props} />
}

ComboboxListboxOption.displayName = 'Combobox.Option'

ComboboxListboxOption.getLabel = ComboboxOption.getOptionLabel
ComboboxListboxOption.SupplementaryInfo = ComboboxOption.SupplementaryInfo
