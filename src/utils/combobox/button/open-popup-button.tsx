import type { ButtonHTMLAttributes, MouseEventHandler } from "react";

import { Button } from "#src/core/button";
import { ChevronDownIcon } from "#src/icons/chevron-down";

import { openComboboxPopup } from "../popup-dialog";

export namespace ComboboxButtonOpenPopupButton {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Accessible label for the button. Defaults to "Toggle popup". */
    "aria-label"?: string;
    /** ID of the popup element controlled by this button. */
    "aria-controls": string;
  }
}

/**
 * Secondary action button that toggles combobox popup visibility. Used as a trailing action within
 * the combobox button container.
 */
export function ComboboxButtonOpenPopupButton({
  "aria-label": ariaLabel = "Open popup",
  "aria-controls": ariaControls,
  onClick,
  ...rest
}: ComboboxButtonOpenPopupButton.Props) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);
    openComboboxPopup(ariaControls);
  };

  return (
    <Button
      {...rest}
      aria-controls={ariaControls}
      aria-label={ariaLabel}
      hasNoPadding
      iconLeft={<ChevronDownIcon />}
      onClick={handleClick}
      size="small"
      // Removed from tab order because this is primarily a visual addon.
      // Accessible users will open the popup from the primary combobox button.
      tabIndex={-1}
      variant="tertiary"
    />
  );
}
