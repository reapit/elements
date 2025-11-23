import { ComboboxButton } from '../button'
import { SearchIcon } from '#src/icons/search'
import { useComboboxButtonProps } from '../use-button-props'
import { useComboboxContext } from '../context'

type AttributesToOmit = 'aria-controls' | 'aria-expanded' | 'id' | 'size'

export namespace ComboboxAutocompleteButton {
  export interface Props extends Omit<ComboboxButton.Props, AttributesToOmit> {}
}

/**
 * A button that opens a popup with searchable options.
 * Use this for autocomplete-style comboboxes where users search and filter options.
 * The button displays placeholder text and does not show selections.
 */
export function ComboboxAutocompleteButton({
  onClick,
  placeholder = 'Search...',
  ...rest
}: ComboboxAutocompleteButton.Props) {
  const { disabled, listboxId, size } = useComboboxContext()
  const buttonProps = useComboboxButtonProps({ onClick })

  return (
    <ComboboxButton
      {...rest}
      {...buttonProps}
      action={<ComboboxButton.OpenPopupButton aria-controls={listboxId} disabled={disabled} />}
      leadingIcon={<SearchIcon aria-hidden />}
      placeholder={placeholder}
      size={size}
    >
      {placeholder}
    </ComboboxButton>
  )
}

ComboboxAutocompleteButton.displayName = 'Combobox.AutocompleteButton'
