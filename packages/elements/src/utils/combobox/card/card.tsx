import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

import { ElComboboxCard, ElComboboxCardActionContainer, ElComboboxCardButton } from "./styles";

export namespace ComboboxCard {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Secondary button displayed at the end. Typically a clear button. */
    action?: ReactNode;
    /** ID of the popup element controlled by this button. */
    "aria-controls": string;
    /** Whether the popup is open. */
    "aria-expanded": boolean;
    /**
     * Content representing the combobox's selected option. Typically rendered using
     * `Combobox.SelectedContent`. Must be provided because the card should only be used
     * when a selection has been made.
     */
    children: ReactNode;
    /** Visual size of the button. */
    size?: "small" | "medium" | "large";
  }
}

/**
 * Card component for combobox controls. Used to display structured content about the combobox's currently
 * selected value, typically with `Combobox.SelectedContent`. This is a low-level component and should only
 * be used when building a more complete combobox button experience like `Autocomplete.Button` and
 * `Select.Button`.
 */
export function ComboboxCard({
  action,
  "aria-controls": ariaControls,
  "aria-disabled": ariaDisabled = true,
  "aria-expanded": ariaExpanded,
  children,
  className,
  id,
  onClick,
  size = "medium",
  style,
  ...rest
}: ComboboxCard.Props) {
  // By default, the card button is ARIA disabled. Click events are prevented and their propagation stopped
  // when ARIA disabled to prevent the combobox popup from being opened.
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const isDisabled = event.currentTarget.getAttribute("aria-disabled") === "true";
    if (isDisabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    // Applies consumer class names and inline styles to the container, not the button.
    // Minimizes easy override of button styles critical to component function.
    <ElComboboxCard className={className} data-size={size} style={style}>
      <ElComboboxCardButton
        {...rest}
        aria-autocomplete="list"
        aria-controls={ariaControls}
        aria-disabled={ariaDisabled}
        aria-expanded={ariaExpanded}
        aria-haspopup="dialog"
        id={id}
        onClick={handleClick}
        role="combobox"
        type="button"
      >
        {children}
      </ElComboboxCardButton>
      {action && <ElComboboxCardActionContainer>{action}</ElComboboxCardActionContainer>}
    </ElComboboxCard>
  );
}
