import { ComboboxButton } from './button'
import { useComboboxContext } from './context'
import { useComboboxButton } from './use-button'

type AttributesToOmit = 'aria-controls' | 'aria-expanded' | 'id'

export namespace ComboboxSelectButton {
  export interface Props extends Omit<ComboboxButton.Props, AttributesToOmit> {}
}

/**
 * A button that displays the current selection and opens a popup with selectable options.
 * Use this for standard select-style comboboxes where users choose from a predefined list.
 */
export function ComboboxSelectButton({
  onClick,
  placeholder = 'Select an option',
  size = 'medium',
  ...rest
}: ComboboxSelectButton.Props) {
  const { disabled, listboxId, popupId } = useComboboxContext()
  const { props, selections, selectionSummary } = useComboboxButton({ onClick, placeholder })

  return (
    <ComboboxButton
      {...rest}
      {...props}
      action={
        selections.length > 0 ? (
          <ComboboxButton.ClearButton aria-controls={listboxId} disabled={disabled} />
        ) : (
          <ComboboxButton.OpenPopupButton aria-controls={popupId} disabled={disabled} />
        )
      }
      placeholder={placeholder}
      size={size}
    >
      {selectionSummary}
    </ComboboxButton>
  )
}

ComboboxSelectButton.displayName = 'Combobox.SelectButton'
