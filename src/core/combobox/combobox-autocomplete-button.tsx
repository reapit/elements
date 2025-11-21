import { ComboboxButton } from './button'
import { Listbox } from '#src/utils/listbox'
import { SearchIcon } from '#src/icons/search'
import { useComboboxButton } from './use-button'
import { useComboboxContext } from './context'

type AttributesToOmit = 'aria-controls' | 'aria-expanded' | 'id' | 'size'

export namespace ComboboxAutocompleteButton {
  export interface Props extends Omit<ComboboxButton.Props, AttributesToOmit> {}
}

/**
 * A button that displays the current search selection and opens a popup with searchable options.
 * Use this for autocomplete-style comboboxes where users can search and filter options.
 */
export function ComboboxAutocompleteButton({
  onClick,
  placeholder = 'Search...',
  ...rest
}: ComboboxAutocompleteButton.Props) {
  const { disabled, listboxId, size } = useComboboxContext()
  const { props, selections, selectionSummary } = useComboboxButton({ onClick, placeholder })

  return (
    <ComboboxButton
      {...rest}
      {...props}
      action={
        selections.length > 0 && (
          <ComboboxButton.ClearButton
            aria-controls={listboxId}
            disabled={disabled}
            onClick={() => Listbox.clearValue(listboxId)}
          />
        )
      }
      leadingIcon={selections.length === 0 && <SearchIcon aria-hidden />}
      placeholder={placeholder}
      size={size}
    >
      {selectionSummary}
    </ComboboxButton>
  )
}

ComboboxAutocompleteButton.displayName = 'Combobox.AutocompleteButton'
