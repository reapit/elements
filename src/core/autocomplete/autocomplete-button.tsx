import { Combobox } from '#src/utils/combobox'
import { SearchIcon } from '#src/icons/search'

type AttributesToOmit = 'aria-controls' | 'aria-expanded' | 'children' | 'id' | 'size'

export namespace AutocompleteButton {
  export interface Props extends Omit<Combobox.ButtonProps, AttributesToOmit> {
    /**
     * Render-prop to customise display of selected content. Typically used with the card
     * selection style.
     */
    children?: Combobox.SelectedContentProps['children']
    /** Default options to display when no selections have been made. */
    defaultOptions?: Combobox.SelectedContentProps['defaultOptions']
    /**
     * Visual style of the selected content. Only applies for single-select autocompletes
     * when a selection has been made.
     */
    selectionStyle?: 'card' | 'default'
  }
}

/**
 * A button that opens a popup with searchable options.
 * Use this for autocomplete-style comboboxes where users search and filter options.
 * The button displays placeholder text and does not show selections.
 */
export function AutocompleteButton({
  children,
  defaultOptions,
  onClick,
  placeholder = 'Search...',
  selectionStyle = 'default',
  ...rest
}: AutocompleteButton.Props) {
  const buttonProps = Combobox.useButton({ onClick })
  const context = Combobox.useContext()
  const hasSelection = Combobox.useHasSelection(context.listboxId)

  // Search icon is shown for multi-selects or when a single-select has no selection
  const showSearchIcon = context.multiple || !hasSelection
  // Selected content is only shown for single-selects with a selection
  const showSelectedContent = !context.multiple && hasSelection
  // The card style is only shown for single-selects with a selection
  const showCard = selectionStyle === 'card' && showSelectedContent

  return showCard ? (
    <Combobox.Card
      {...rest}
      {...buttonProps}
      action={<Combobox.ClearButton aria-controls={context.listboxId} disabled={context.disabled} />}
      size={context.size}
    >
      <Combobox.SelectedContent defaultOptions={defaultOptions} listboxId={context.listboxId}>
        {children}
      </Combobox.SelectedContent>
    </Combobox.Card>
  ) : (
    <Combobox.Button
      {...rest}
      {...buttonProps}
      action={
        showSelectedContent && <Combobox.ClearButton aria-controls={context.listboxId} disabled={context.disabled} />
      }
      leadingIcon={showSearchIcon && <SearchIcon aria-hidden />}
      placeholder={placeholder}
      size={context.size}
    >
      {showSelectedContent && (
        <Combobox.SelectedContent defaultOptions={defaultOptions} listboxId={context.listboxId}>
          {children}
        </Combobox.SelectedContent>
      )}
    </Combobox.Button>
  )
}

AutocompleteButton.displayName = 'Autocomplete.Button'
