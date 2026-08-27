import { useEffect, useRef } from "react";
import type { RefObject } from "react";

import { toastStore } from "./store";
import type { ToastState } from "./store";

/** Safety timeout to remove the toast if transitionend never fires (e.g.
 * prefers-reduced-motion, or the transition is cancelled). Slightly longer
 * than the longest CSS transition duration (300ms) to avoid racing. */
const TRANSITION_FALLBACK_MS = 350;

/**
 * Listens for the exit transition to complete on the toast's `<li>` element,
 * then removes it from the store. A fallback timeout ensures removal even
 * when `transitionend` never fires.
 */
export function useDismissTransition(
  itemRef: RefObject<HTMLLIElement | null>,
  state: ToastState,
  id: string,
) {
  // Guards against toastStore.remove(id) being called multiple times: one
  // transitionend event fires per transitioning property, and we only want to
  // remove the entry on the first one.
  const removedRef = useRef(false);

  useEffect(() => {
    if (state !== "dismissing") return;
    const el = itemRef.current;
    if (el === null) return;
    removedRef.current = false;

    function remove() {
      if (removedRef.current) return;
      removedRef.current = true;
      toastStore.remove(id);
    }

    function handleTransitionEnd(event: TransitionEvent) {
      if (event.target !== el) return;
      remove();
    }

    el.addEventListener("transitionend", handleTransitionEnd);
    const fallbackId = globalThis.setTimeout(remove, TRANSITION_FALLBACK_MS);

    return () => {
      el.removeEventListener("transitionend", handleTransitionEnd);
      globalThis.clearTimeout(fallbackId);
    };
  }, [state, id, itemRef]);
}
