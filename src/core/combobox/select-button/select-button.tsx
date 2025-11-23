import { ComboboxButton } from '../button'
import { getComboboxSelectButtonLabelText } from './get-label-text'
import { useComboboxContext } from '../context'
import { useComboboxButtonProps } from '../use-button-props'
import { useComboboxSelectedOptions } from '../use-selected-options'

type AttributesToOmit = 'aria-controls' | 'aria-expanded' | 'id' | 'size'

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
  ...rest
}: ComboboxSelectButton.Props) {
  const { disabled, listboxId, multiple, popupId, size } = useComboboxContext()
  const buttonProps = useComboboxButtonProps({ onClick })
  const selections = useComboboxSelectedOptions(listboxId)
  const labelText = getComboboxSelectButtonLabelText({ multiple, placeholder, selections })

  return (
    <ComboboxButton
      {...rest}
      {...buttonProps}
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
      {labelText}
    </ComboboxButton>
  )
}

ComboboxSelectButton.displayName = 'Combobox.SelectButton'
