import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { isTimedDuration } from "#src/core/toast/is-timed-duration";
import { Toast } from "#src/core/toast/toast";
import { usePageVisibility } from "#src/utils/page-visibility";

import { toastStore } from "./store";
import type { ToastState } from "./store";
import { elToastItem, elToastItemContent } from "./styles";
import type { Toaster } from "./toaster";
import { useDismissTransition } from "./use-dismiss-transition";
import { useSwipeToDismiss } from "./use-swipe-to-dismiss";

export namespace ToastItem {
  export interface Props {
    /** The toast ID, used to remove it from the store. */
    id: string;
    /** The visual variant of the toast. */
    variant: Toast.Variant;
    /** The toast message content. */
    message: ReactNode;
    /** Optional icon for neutral-variant toasts. */
    icon?: ReactNode;
    /** Auto-dismiss duration in milliseconds. When omitted, the toast persists until dismissed. */
    duration?: number;
    /** The current lifecycle state of the toast, driven by the store. */
    state: ToastState;
    /** The position of the toaster, used to determine the swipe-to-dismiss direction. */
    position: Toaster.Position;
    /** Timestamp when the auto-dismiss timer started, or `null` for untimed toasts. */
    startedAt: number | null;
    /** Whether this toast exceeds the visible limit and should be faded out. */
    isMasked?: boolean;
  }
}

export function ToastItem({
  id,
  variant,
  message,
  icon,
  duration,
  state,
  position,
  startedAt,
  isMasked,
}: ToastItem.Props) {
  const [isSwiping, setIsSwiping] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);
  const contentElRef = useRef<HTMLDivElement | null>(null);

  // Compute the elapsed time once at mount so the timeout bar animation style
  // remains stable. On resume from paused, startedAt is back-dated so that
  // Date.now() - startedAt always equals the total elapsed time: meaning a
  // remount after one or more pauses will compute the correct elapsed offset.
  const [elapsed] = useState(() =>
    isTimedDuration(duration) && startedAt !== null
      ? Math.min(Date.now() - startedAt, duration)
      : 0,
  );

  // Set --toast-height on the <div> via a ref callback so it is computed once
  // at mount and not disturbed by re-renders.
  const setContentRef = useCallback((el: HTMLDivElement | null) => {
    contentElRef.current = el;
    if (!el) return;

    el.style.setProperty("--toast-height", `${String(el.scrollHeight)}px`);
  }, []);

  // Transition from 'pending' to 'visible' after the first paint, triggering
  // the entry animation. The store guards this transition so it is a no-op
  // when the toast is already visible (e.g. after a portal remount).
  useEffect(
    function settleAfterEntry() {
      toastStore.settle(id);
    },
    [id],
  );

  // Pause the toast's timer when the page is hidden and resume it when the
  // page becomes visible again, preventing silent auto-dismissal in hidden tabs.
  const handleVisibilityChange = useCallback(
    (hidden: boolean) => {
      if (hidden) {
        toastStore.pause(id);
      } else {
        toastStore.resume(id);
      }
    },
    [id],
  );

  usePageVisibility(handleVisibilityChange);

  const dismiss = useCallback(() => {
    toastStore.dismiss(id);
  }, [id]);

  const onSwipeStart = useCallback(() => {
    toastStore.pause(id);
    setIsSwiping(true);
  }, [id]);

  const onSwipeEnd = useCallback(() => {
    setIsSwiping(false);
    if (!contentElRef.current?.matches(":hover")) {
      toastStore.resume(id);
    }
  }, [id, contentElRef]);

  useDismissTransition(itemRef, state, id);

  const swipeHandlers = useSwipeToDismiss({
    contentElRef,
    position,
    onDismiss: dismiss,
    onSwipeStart,
    onSwipeEnd,
  });

  const isPaused = state === "paused";

  return (
    <li
      className={elToastItem}
      ref={itemRef}
      data-state={state}
      data-position={position}
      data-is-masked={isMasked || undefined}
    >
      <div
        className={elToastItemContent}
        ref={setContentRef}
        data-swiping={isSwiping || undefined}
        onPointerDown={swipeHandlers.onPointerDown}
        onPointerMove={swipeHandlers.onPointerMove}
        onPointerUp={swipeHandlers.onPointerUp}
        onPointerCancel={swipeHandlers.onPointerCancel}
        onMouseEnter={() => toastStore.pause(id)}
        onMouseLeave={() => toastStore.resume(id)}
      >
        <Toast
          variant={variant}
          duration={duration}
          elapsed={elapsed}
          isPaused={isPaused}
          icon={icon}
        >
          {message}
        </Toast>
      </div>
    </li>
  );
}
