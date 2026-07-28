import { cx } from "@linaria/core";
import { useId } from "react";
import type { DialogHTMLAttributes, ReactNode } from "react";

import { ToastOutlet } from "#src/core/toaster";
import {
  HTMLDialog,
  getClosestDialogElement,
  useDialogOpenController,
  useDialogOpenState,
} from "#src/utils/dialog";

import { DrawerBody } from "./body";
import { DrawerContext, useDrawerContext } from "./context";
import { DrawerFooter } from "./footer";
import { DrawerHeader } from "./header";
import { elDrawer } from "./styles";

// NOTE: we omit..
// - `open` because we do not want React consumers to use it directly as it results in a non-modal experience.
//     Instead, our React `Drawer` component provides an `isOpen` prop that ensures a modal experience is achieved.
type AttributesToOmit = "open";

export namespace Drawer {
  export interface Props extends Omit<DialogHTMLAttributes<HTMLDialogElement>, AttributesToOmit> {
    /** The drawer content */
    children: ReactNode;
    /**
     * Specifies the types of user actions that can be used to close the drawer. This property distinguishes
     * three methods by which a drawer can be closed:
     *
     * - A _light dismiss user action_, in which the drawer is closed when the user clicks or taps
     * outside it. This is equivalent to the "light dismiss" behavior of "auto" state popovers.
     * - A _platform-specific user action_, such as pressing the `Esc` key on desktop platforms, or a "back"
     * or "dismiss" gesture on mobile platforms.
     * - A developer-specified mechanism such as a `<button>` with a `click` handler that invokes
     * `HTMLDialogElement.close()` or a `<form>` submission.
     *
     * Possible values are:
     *
     *  - `any`: The drawer can be closed by clicking on the backdrop, pressing the `Esc` key, or a
     *    developer-specified mechanism. This is useful for lightweight dismissible drawers.
     *  - `closerequest`: The drawer can be dismissed with a platform-specific user action or a
     *    developer-specified mechanism. This is what detail drawers should use.
     *  - `none`: The drawer cannot be closed by the user (e.g. via the close button). This is what form drawers
     *    should use.
     *
     * **note:** Backdrop dismissal for `any` is always handled in JS rather than delegated to the browser's
     * native light-dismiss, to avoid closing the drawer before the triggering click can be hit-tested (which
     * would let that click also activate an element behind the backdrop). Separately, Safari does not support
     * the `closedBy` attribute at all, so "back"/"dismiss" gestures on mobile Safari won't close the drawer.
     */
    closedBy?: "any" | "closerequest" | "none";
    /** Indicates whether the Drawer is open or not */
    isOpen?: boolean;
  }
}

/**
 * The Drawer slides over the screen to get the user's attention. It lets users see more details or do tasks
 * without leaving the page. The layout changes based on the options, with content grouped into clear sections.
 *
 * The Drawer is built with the [\<dialog\> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
 * and is always shown using the dialog's [showModal]() method. This ensures focus will be is set on the first
 * nested focusable element of the drawer. Further, all content beneath a drawer is made
 * [inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert) and focus is trapped within
 * the drawer. See the [accessibility](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#accessibility)
 * section of MDN's `<dialog>` documentation.
 */
export function Drawer({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  children,
  className,
  closedBy = "closerequest",
  isOpen: isOpenProp,
  onCancel,
  onClick,
  onClose,
  ...rest
}: Drawer.Props) {
  // We need to imperatively show or close the dialog element when the `isOpen` prop changes.
  const ref = useDialogOpenController(isOpenProp);
  // We need to track the DOM-held open state of the dialog element to ensure we can show/hide our children.
  const isOpen = useDialogOpenState(ref);

  const titleId = useId();

  return (
    <HTMLDialog
      {...rest}
      // NOTE: we do not wire-up aria-labelledby when aria-label is provided. By default, aria-labelledby takes
      // precedence. See https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label#:~:text=aria%2Dlabelledby%20will%20take%20precedence%20over%20aria%2Dlabel%20if%20both%20are%20applied
      aria-label={ariaLabel}
      aria-labelledby={ariaLabel ? undefined : (ariaLabelledBy ?? titleId)}
      className={cx(elDrawer, className)}
      closedBy={closedBy}
      ref={ref}
      onCancel={onCancel}
      onClick={onClick}
      onClose={onClose}
    >
      <DrawerContext.Provider value={{ titleId }}>
        {/*
         * Note: We only mount children when the drawer is open. This is because drawer content will often fetch
         * its own data and we do not want those network requests occurring when the drawer is mounted but closed.
         */}
        {isOpen && children}
      </DrawerContext.Provider>
      {isOpen && <ToastOutlet />}
    </HTMLDialog>
  );
}

Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;
Drawer.Header = DrawerHeader;
Drawer.HeaderCloseButton = DrawerHeader.CloseButton;

Drawer.Context = DrawerContext;
Drawer.useContext = useDrawerContext;

Drawer.getClosestDialogElement = getClosestDialogElement;

export { getClosestDialogElement } from "#src/utils/dialog";
