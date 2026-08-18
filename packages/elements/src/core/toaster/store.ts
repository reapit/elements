import type { ReactNode } from "react";

import { isTimedDuration } from "#src/core/toast/is-timed-duration";
import type { Toast } from "#src/core/toast/toast";

/**
 * The lifecycle state of a toast entry.
 *
 * See toaster/ARCHITECTURE.md for the state machine.
 *
 * The auto-dismiss timer is cleared when a toast enters `paused` and
 * restarted with the remaining duration when it returns to `visible`.
 */
export type ToastState = "pending" | "visible" | "paused" | "dismissing";

export interface ToastEntry {
  /** Unique identifier for this toast. */
  id: string;
  /** The visual variant of the toast. */
  variant: Toast.Variant;
  /** The toast message content. */
  message: ReactNode;
  /** Optional icon for neutral-variant toasts. */
  icon?: ReactNode;
  /** Auto-dismiss duration in milliseconds. */
  duration?: number;
  /** The current lifecycle state of the toast. */
  state: ToastState;
  /**
   * The logical start timestamp for the timeout bar animation.
   *
   * Set to `Date.now()` when the toast first becomes `visible`. On each
   * resume from `paused`, it is back-dated by the elapsed portion of the
   * duration so that `Date.now() - startedAt` always equals the total time
   * the timer has been running. `null` for untimed toasts.
   */
  startedAt: number | null;
}

// Plain mutable state + pub-sub, outside React.
// useSyncExternalStore handles concurrent-mode safety (tearing prevention) on the React side.
// The store always produces a new array reference on update so React detects the change
// via reference equality in getSnapshot.
const MIN_DURATION = 4000;
/**
 * Ordered oldest-first: the earliest toast is at index 0 and the most
 * recent toast is at the end. New toasts are appended via `add`.
 */
let toasts: ToastEntry[] = [];
const timers = new Map<string, ReturnType<typeof globalThis.setTimeout>>();
const remaining = new Map<string, number>();
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function startTimer(id: string, duration: number): void {
  const timerId = globalThis.setTimeout(() => {
    timers.delete(id);

    const entry = toasts.find((t) => t.id === id);
    if (!entry) return;

    if (entry.state === "visible") {
      toasts = toasts.map((t) => (t.id === id ? { ...t, state: "dismissing" as ToastState } : t));
      notify();
    }
  }, duration);

  timers.set(id, timerId);
}

function clearTimer(id: string): void {
  const timerId = timers.get(id);
  if (timerId !== undefined) {
    globalThis.clearTimeout(timerId);
    timers.delete(id);
  }
}

export const toastStore = {
  getSnapshot: (): ToastEntry[] => toasts,
  subscribe: (listener: () => void): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  clear: (): void => {
    for (const timerId of timers.values()) {
      globalThis.clearTimeout(timerId);
    }
    timers.clear();
    remaining.clear();
    toasts = [];
    notify();
  },
  add: (entry: Omit<ToastEntry, "id" | "state" | "startedAt">): string => {
    const id = crypto.randomUUID();
    // Clamp finite durations to MIN_DURATION to prevent imperceptibly short
    // or zero-length toasts. Infinity (persistent toasts) passes through unchanged.
    const duration = isTimedDuration(entry.duration)
      ? Math.max(entry.duration, MIN_DURATION)
      : entry.duration;
    toasts = [...toasts, { ...entry, id, duration, state: "pending", startedAt: null }];
    notify();
    return id;
  },
  /** Transition a toast from `pending` to `visible`, triggering its entry animation and starting the auto-dismiss timer. */
  settle: (id: string): void => {
    const entry = toasts.find((t) => t.id === id);
    if (!entry || entry.state !== "pending") return;

    const startedAt = isTimedDuration(entry.duration) ? Date.now() : null;
    toasts = toasts.map((t) =>
      t.id === id ? { ...t, state: "visible" as ToastState, startedAt } : t,
    );

    if (isTimedDuration(entry.duration)) {
      startTimer(id, entry.duration);
    }

    notify();
  },
  /**
   * Transition a toast from `visible` to `paused`, clearing its auto-dismiss
   * timer. The remaining duration is stored so it can be restarted on resume.
   *
   * Called when the user hovers or begins swiping the toast, or when the page
   * becomes hidden.
   */
  pause: (id: string): void => {
    const entry = toasts.find((t) => t.id === id);
    if (!entry || entry.state !== "visible") return;

    if (isTimedDuration(entry.duration) && entry.startedAt !== null) {
      const elapsed = Date.now() - entry.startedAt;
      remaining.set(id, Math.max(0, entry.duration - elapsed));
      clearTimer(id);
    }

    toasts = toasts.map((t) => (t.id === id ? { ...t, state: "paused" as ToastState } : t));
    notify();
  },
  /**
   * Transition a toast from `paused` back to `visible`, restarting its
   * auto-dismiss timer with the remaining duration.
   *
   * Called when the user stops hovering or swiping, or when the page becomes
   * visible again.
   */
  resume: (id: string): void => {
    const entry = toasts.find((t) => t.id === id);
    if (!entry || entry.state !== "paused") return;

    let startedAt = entry.startedAt;

    if (isTimedDuration(entry.duration)) {
      const remainingTime = remaining.get(id) ?? entry.duration;
      remaining.delete(id);
      // Back-date startedAt so that Date.now() - startedAt equals the total
      // elapsed time, keeping the timeout bar animation in sync across pauses.
      startedAt = Date.now() - (entry.duration - remainingTime);
      startTimer(id, remainingTime);
    }

    toasts = toasts.map((t) =>
      t.id === id ? { ...t, state: "visible" as ToastState, startedAt } : t,
    );
    notify();
  },
  /** Transition a toast to the `dismissing` state, triggering its exit animation. */
  dismiss: (id: string): void => {
    const entry = toasts.find((t) => t.id === id);
    if (!entry || entry.state === "dismissing") return;

    clearTimer(id);
    remaining.delete(id);
    toasts = toasts.map((t) => (t.id === id ? { ...t, state: "dismissing" as ToastState } : t));
    notify();
  },
  /** Remove a toast from the store entirely. Called after the exit animation completes. */
  remove: (id: string): void => {
    clearTimer(id);
    remaining.delete(id);
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  },
};
