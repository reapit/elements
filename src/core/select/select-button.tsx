import { Combobox } from '#src/core/combobox'
import { useComboboxButton } from '#src/core/combobox/use-button'

type AttributesToOmit = 'aria-controls' | 'aria-expanded' | 'children' | 'id' | 'size'

export namespace SelectButton {
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
 * A button that displays the current selection and opens a popup with selectable options.
 * Use this for standard select-style components where users choose from predefined options.
 */
export function SelectButton({
  children,
  defaultOptions,
  onClick,
  placeholder = 'Select an option',
  selectionStyle = 'default',
  ...rest
}: SelectButton.Props) {
  const buttonProps = useComboboxButton({ onClick })
  const context = Combobox.useContext()
  const hasSelection = Combobox.useHasSelection(context.listboxId)

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
        showSelectedContent ? (
          <Combobox.ClearButton aria-controls={context.listboxId} disabled={context.disabled} />
        ) : (
          <Combobox.OpenPopupButton aria-controls={context.popupId} disabled={context.disabled} />
        )
      }
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

SelectButton.displayName = 'Select.Button'
