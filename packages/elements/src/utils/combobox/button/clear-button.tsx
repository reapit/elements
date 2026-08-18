import type { ButtonHTMLAttributes, MouseEventHandler } from "react";

import { Button } from "#src/core/button";
import { CloseIcon } from "#src/icons/close";
import { clearListboxValue } from "#src/utils/listbox/dom-helpers";

// NOTE: we omit...
// - type, because we want it pinned to "button" to prevent form submission
type AttributesToOmit = "type";

export namespace ComboboxButtonClearButton {
  export interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, AttributesToOmit> {
    /** ID of the combobox listbox element cleared by this button. */
    "aria-controls": string;
    /** Accessible label for the button. Defaults to "Clear selection". */
    "aria-label"?: string;
  }
}

/**
 * Secondary action button that clears the combobox selection. Used as a trailing action within
 * the combobox button container.
 */
export function ComboboxButtonClearButton({
  "aria-label": ariaLabel = "Clear selection",
  "aria-controls": ariaControls,
  onClick,
  ...rest
}: ComboboxButtonClearButton.Props) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);
    clearListboxValue(ariaControls);
  };

  return (
    <Button
      {...rest}
      aria-controls={ariaControls}
      aria-label={ariaLabel}
      hasNoPadding
      iconLeft={<CloseIcon />}
      onClick={handleClick}
      size="small"
      type="button"
      variant="tertiary"
    />
  );
}
