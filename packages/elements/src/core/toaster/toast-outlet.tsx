import { useEffect, useRef, useSyncExternalStore } from "react";

import { outletStack } from "./outlet-stack";
import { toastStore } from "./store";
import { elToastOutlet } from "./styles";

/**
 * A mounting point for the toast list. Render this inside a modal `<dialog>`
 * or `<Drawer>` to allow toasts to appear above that overlay without being
 * made inert by the modal's focus trap.
 *
 * When mounted, `ToastOutlet` registers itself at the top of the outlet stack.
 * The `Toaster` will then portal the toast list into this element instead of
 * its default outlet. When the `ToastOutlet` unmounts (e.g. when the dialog
 * closes), the outlet is removed from the stack and the `Toaster` falls back
 * to the next outlet below.
 *
 * Each outlet manages its own popover visibility: it shows itself when it is
 * the active (topmost) outlet and toasts exist, and hides itself otherwise.
 *
 * No props are needed: position and duration are controlled by the `Toaster`.
 */
export function ToastOutlet() {
  const ref = useRef<HTMLDivElement>(null);
  const activeOutlet = useSyncExternalStore(outletStack.subscribe, outletStack.getSnapshot);
  const toasts = useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot);

  useEffect(function registerOutlet() {
    const el = ref.current;
    if (!el) return;
    outletStack.push(el);
    return function unregisterOutlet() {
      outletStack.pop(el);
    };
  }, []);

  const isActive = ref.current !== null && activeOutlet === ref.current;
  const shouldShow = isActive && toasts.length > 0;

  useEffect(
    function syncPopoverVisibility() {
      try {
        if (shouldShow) {
          ref.current?.showPopover();
        } else {
          ref.current?.hidePopover();
        }
      } catch {
        // Throws if the element is not connected or already in the target state.
      }
    },
    [shouldShow],
  );

  // @ts-expect-error -- React 18 does not have types for the popover attribute
  return <div ref={ref} className={elToastOutlet} popover="manual" />;
}
