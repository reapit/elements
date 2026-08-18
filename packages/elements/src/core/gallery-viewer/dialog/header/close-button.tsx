import type { MouseEventHandler } from "react";

import { Button } from "#src/core/button";
import { CloseIcon } from "#src/icons/close";
import { getClosestDialogElement } from "#src/utils/dialog";

/**
 * Close button for the gallery viewer dialog header. Uses an onClick handler to find the closest
 * dialog element and call its close method.
 *
 * We intentionally avoid the `formMethod="dialog"` pattern used in other dialog close buttons
 * (e.g. Drawer) because this gallery viewer may be rendered inside a form. Nesting a `<form>`
 * inside another `<form>` is invalid HTML, so the DOM-traversal approach is used instead.
 */
export function GalleryViewerDialogHeaderCloseButton() {
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

GalleryViewerDialogHeaderCloseButton.displayName = "GalleryViewerDialogHeaderCloseButton";
