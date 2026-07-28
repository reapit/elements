import type { MouseEventHandler } from "react";

import { Button } from "#src/core/button";
import { CloseIcon } from "#src/icons/close";
import { getClosestDialogElement } from "#src/utils/dialog";

/**
 * Close button for the combobox popup. Uses a form element with the
 * `formMethod="dialog"` attribute to close the dialog. See
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#formmethod)
 * for more information.
 */
export function ComboboxPopupDialogCloseButton() {
  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const dialogElement = getClosestDialogElement(event.currentTarget);
    dialogElement?.close();
  };
  return (
    <Button
      aria-label="Close"
      iconLeft={<CloseIcon aria-hidden />}
      onClick={onClick}
      size="large"
      type="button"
      variant="tertiary"
    />
  );
}
