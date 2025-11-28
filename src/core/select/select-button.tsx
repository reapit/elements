import { Combobox } from '#src/core/combobox'
import { useComboboxButton } from '#src/core/combobox/use-button'

type AttributesToOmit = 'aria-controls' | 'aria-expanded' | 'children' | 'id' | 'size'

export namespace SelectButton {
  export interface Props extends Omit<Combobox.ButtonProps, AttributesToOmit> {
    /** Default options to display when no selections have been made. */
    defaultOptions?: Combobox.SelectedContentProps['defaultOptions']
  }
}

/**
 * A button that displays the current selection and opens a popup with selectable options.
 * Use this for standard select-style components where users choose from predefined options.
 */
export function SelectButton({
  defaultOptions,
  onClick,
  placeholder = 'Select an option',
  ...rest
}: SelectButton.Props) {
  const buttonProps = useComboboxButton({ onClick, placeholder })
  const context = Combobox.useContext()
  const hasSelection = Combobox.useHasSelection(context.listboxId)

  // Clear button is only shown for single-selects with a selection
  const showClearButton = hasSelection && !context.multiple
  // Placeholder is shown if there are no selections, or when the select is a multi-select.
  const showPlaceholder = !hasSelection || context.multiple

  return (
    <Combobox.Button
      {...rest}
      {...buttonProps}
      action={
        showClearButton ? (
          <Combobox.ClearButton aria-controls={context.listboxId} disabled={context.disabled} />
        ) : (
          <Combobox.OpenPopupButton aria-controls={context.popupId} disabled={context.disabled} />
        )
      }
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

SelectButton.displayName = 'Select.Button'
