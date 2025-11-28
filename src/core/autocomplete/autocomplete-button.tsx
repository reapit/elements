import { Combobox } from '#src/core/combobox'
import { SearchIcon } from '#src/icons/search'

type AttributesToOmit = 'aria-controls' | 'aria-expanded' | 'children' | 'id' | 'size'

export namespace AutocompleteButton {
  export interface Props extends Omit<Combobox.ButtonProps, AttributesToOmit> {
    /** Default selected options to display before the listbox is mounted */
    defaultOptions?: Combobox.SelectedContentProps['defaultOptions']
  }
}

/**
 * A button that opens a popup with searchable options.
 * Use this for autocomplete-style comboboxes where users search and filter options.
 * The button displays placeholder text and does not show selections.
 */
export function AutocompleteButton({
  defaultOptions,
  onClick,
  placeholder = 'Search...',
  ...rest
}: AutocompleteButton.Props) {
  const buttonProps = Combobox.useButton({ onClick, placeholder })
  const context = Combobox.useContext()
  const hasSelection = Combobox.useHasSelection(context.listboxId)

  // Clear button is only shown for single-selects with a selection
  const showClearButton = hasSelection && !context.multiple
  // Search icon is shown when there's no selection
  const showSearchIcon = !hasSelection
  // Placeholder is shown if there are no selections, or when the autocomplete is a multi-select.
  const showPlaceholder = !hasSelection || context.multiple

  return (
    <Combobox.Button
      {...rest}
      {...buttonProps}
      action={showClearButton && <Combobox.ClearButton aria-controls={context.listboxId} disabled={context.disabled} />}
      leadingIcon={showSearchIcon && <SearchIcon aria-hidden />}
      placeholder={placeholder}
      size={context.size}
    >
      {showPlaceholder ? (
        placeholder
      ) : (
        <Combobox.SelectedContent defaultOptions={defaultOptions} listboxId={context.listboxId} />
      )}
    </Combobox.Button>
  )
}

AutocompleteButton.displayName = 'Autocomplete.Button'
