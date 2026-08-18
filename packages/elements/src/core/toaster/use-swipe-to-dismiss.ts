import { useCallback, useRef } from "react";
import type { RefObject } from "react";

import type { Toaster } from "./toaster";

const SWIPE_DISMISS_THRESHOLD = 45;
const SWIPE_VELOCITY_THRESHOLD = 0.11;

interface UseSwipeToDismissOptions {
  /** Ref to the inner content div that receives the visual transform. */
  contentElRef: RefObject<HTMLDivElement | null>;
  /** Toaster position — determines the swipe direction (down for bottom, up for top). */
  position: Toaster.Position;
  /** Called when the swipe exceeds the dismiss threshold. */
  onDismiss: () => void;
  /** Called when the user begins a swipe gesture. */
  onSwipeStart: () => void;
  /** Called when the swipe ends without dismissing (snap-back). */
  onSwipeEnd: () => void;
}

interface UseSwipeToDismissReturn {
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: () => void;
  onPointerCancel: () => void;
}

/**
 * Handles the swipe-to-dismiss gesture on a toast's content element.
 *
 * The swipe direction matches the toaster's edge: bottom positions dismiss on
 * a downward swipe, top positions on an upward swipe.
 */
export function useSwipeToDismiss({
  contentElRef,
  position,
  onDismiss,
  onSwipeStart,
  onSwipeEnd,
}: UseSwipeToDismissOptions): UseSwipeToDismissReturn {
  const pointerStartY = useRef<number | null>(null);
  const swipeOffsetRef = useRef(0);
  const dragStartTimeRef = useRef<number | null>(null);

  const swipeSign = position.startsWith("top") ? -1 : 1;

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      // Ignore right-clicks
      if (event.button === 2) return;
      pointerStartY.current = event.clientY;
      swipeOffsetRef.current = 0;
      dragStartTimeRef.current = Date.now();
      contentElRef.current?.setPointerCapture(event.pointerId);
      onSwipeStart();
    },
    [contentElRef, onSwipeStart],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (pointerStartY.current === null) return;

      // Don't interfere with text selection
      const selection = globalThis.getSelection?.();
      if (selection && selection.toString().length > 0) return;

      const delta = (event.clientY - pointerStartY.current) * swipeSign;

      // --swipe-offset is set directly on the DOM element rather than via React
      // state because pointermove fires at display refresh rate (often 60–120Hz).
      // Each state update would trigger a full React reconciliation cycle,
      // adding per-frame overhead that can cause visible jank during the drag.
      // Direct style mutation keeps the gesture loop in the fast path.
      if (delta > 0) {
        // Swiping toward the dismiss direction — track 1:1
        swipeOffsetRef.current = delta;
        contentElRef.current?.style.setProperty("--swipe-offset", `${String(delta * swipeSign)}px`);
      } else {
        // Swiping against the dismiss direction — apply dampening so the toast
        // resists but still moves slightly, rather than hard-clamping.
        const dampened = delta / (1.5 + Math.abs(delta) / 20);
        swipeOffsetRef.current = delta;
        contentElRef.current?.style.setProperty(
          "--swipe-offset",
          `${String(dampened * swipeSign)}px`,
        );
      }
    },
    [contentElRef, swipeSign],
  );

  const onPointerUp = useCallback(() => {
    if (pointerStartY.current === null) return;

    const absDelta = Math.abs(swipeOffsetRef.current);
    const timeTaken = Date.now() - (dragStartTimeRef.current ?? Date.now());
    const velocity = timeTaken > 0 ? absDelta / timeTaken : 0;

    // Dismiss if the swipe distance OR velocity exceeds the threshold and the
    // swipe was in the correct direction (positive delta).
    if (
      swipeOffsetRef.current > 0 &&
      (absDelta >= SWIPE_DISMISS_THRESHOLD || velocity > SWIPE_VELOCITY_THRESHOLD)
    ) {
      contentElRef.current?.style.removeProperty("--swipe-offset");
      onDismiss();
    } else {
      // Reset offset to 0 — the CSS transition (re-enabled once data-swiping
      // is removed by the parent) animates the content back to rest.
      contentElRef.current?.style.setProperty("--swipe-offset", "0px");
      onSwipeEnd();
    }

    pointerStartY.current = null;
    swipeOffsetRef.current = 0;
    dragStartTimeRef.current = null;
  }, [contentElRef, onDismiss, onSwipeEnd]);

  const onPointerCancel = useCallback(() => {
    pointerStartY.current = null;
    swipeOffsetRef.current = 0;
    dragStartTimeRef.current = null;
    contentElRef.current?.style.setProperty("--swipe-offset", "0px");
    onSwipeEnd();
  }, [contentElRef, onSwipeEnd]);

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel };
}
