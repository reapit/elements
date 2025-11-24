import { ComboboxOption } from '../option'
import { Listbox } from '#src/utils/listbox'
import { useComboboxContext } from '../context'

// We omit `size` because it is defined by ComboboxContext
type AttributesToOmit = 'size'

export namespace ComboboxListboxOption {
  export interface AdditionalInfoProps extends ComboboxOption.AdditionalInfoProps {}
  export interface Props extends Omit<Listbox.OptionProps<typeof ComboboxOption>, AttributesToOmit> {}
}

/**
 * Integrates `ComboboxOption` with the internal `<select>` element. Updates checked/selected state
 * automatically and renders as a native `<option>` when needed.
 */
export function ComboboxListboxOption(props: ComboboxListboxOption.Props) {
  const { size } = useComboboxContext()
  // Options only have medium and large sizes. When the combobox is small, the options use medium.
  return <Listbox.Option as={ComboboxOption} {...props} size={size === 'small' ? 'medium' : size} />
}

ComboboxListboxOption.displayName = 'Combobox.Option'

ComboboxListboxOption.getLabel = ComboboxOption.getOptionLabel
ComboboxListboxOption.AdditionalInfo = ComboboxOption.AdditionalInfo
