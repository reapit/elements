import { ComboboxButtonClearButton } from './clear-button'
import { ComboboxButtonOpenPopupButton } from './open-popup-button'
import {
  ElComboboxButton,
  ElComboboxButtonActionContainer,
  ElComboboxButtonContainer,
  ElComboboxButtonIconContainer,
  ElComboboxButtonLabelContainer,
} from './styles'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

// NOTE: we omit size because we use it for our own purposes.
type AttributesToOmit = 'size'

export namespace ComboboxButton {
  export interface ClearButtonProps extends ComboboxButtonClearButton.Props {}
  export interface OpenPopupButtonProps extends ComboboxButtonOpenPopupButton.Props {}

  export interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, AttributesToOmit> {
    /** Secondary button displayed at the end (e.g., clear button or toggle button). */
    action?: ReactNode
    /** ID of the popup element controlled by this button. */
    'aria-controls': string
    /** Whether the popup is open. */
    'aria-expanded': boolean
    /** Current label of the button. Must be plain text. */
    children?: ReactNode
    /** ID of the button */
    id: string
    /** Icon displayed at the start of the button. */
    leadingIcon?: ReactNode
    /** Maximum width of the button container. Accepts any valid CSS width value. */
    maxWidth?: string
    /** Text displayed when no value is selected. Defaults to "Select an option". */
    placeholder?: string
    /** Visual size of the button. */
    size?: 'small' | 'medium' | 'large'
  }
}

/**
 * Primary button component for combobox controls. Used to open the combobox's popup. Often displays the
 * label text of the selected option and provides a secondary action to clear the selected value.
 *
 * This is a low-level component and should only be used when building a more complete combobox button
 * like `Autocomplete.Button` and `Select.Button`.
 */
export function ComboboxButton({
  action,
  'aria-controls': ariaControls,
  'aria-expanded': ariaExpanded,
  children,
  className,
  id,
  leadingIcon,
  placeholder = 'Select an option',
  size = 'medium',
  style,
  ...rest
}: ComboboxButton.Props) {
  // Children = selected content; no children = no selected content and placeholder should be displayed
  const hasSelection = !!children

  return (
    // Applies consumer class names and inline styles to the container, not the button.
    // Minimizes easy override of button styles critical to component function.
    <ElComboboxButtonContainer className={className} data-size={size} style={style}>
      <ElComboboxButton
        {...rest}
        aria-autocomplete="list"
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        aria-haspopup="dialog"
        id={id}
        role="combobox"
        type="button"
      >
        {leadingIcon && <ElComboboxButtonIconContainer>{leadingIcon}</ElComboboxButtonIconContainer>}
        <ElComboboxButtonLabelContainer data-has-selection={hasSelection} data-placeholder={placeholder}>
          {hasSelection ? children : placeholder}
        </ElComboboxButtonLabelContainer>
      </ElComboboxButton>
      {action && <ElComboboxButtonActionContainer>{action}</ElComboboxButtonActionContainer>}
    </ElComboboxButtonContainer>
  )
}

ComboboxButton.ClearButton = ComboboxButtonClearButton
ComboboxButton.OpenPopupButton = ComboboxButtonOpenPopupButton
