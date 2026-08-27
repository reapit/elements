# Toaster Architecture

## Overview

The toaster displays transient notifications in the browser's top layer.
Consumers trigger toasts imperatively via `toast()` from anywhere: event
handlers, async functions, or outside the React tree. A single `<Toaster>`
mounted near the application root subscribes to a shared store and renders the
active toasts.

## Toast lifecycle

Each toast follows a four-state lifecycle:

```
             settle()                      dismiss()          remove()
 pending ──────▶ visible ──────────────────────▶ dismissing ──────▶ (removed)
                    │   ▲
             pause()│   │ resume()
                    ▼   │
                 paused ┘
```

**`pending`** — added to the store but not yet painted. The element renders
collapsed with transitions disabled. A `useEffect` in `ToastItem` calls
`toastStore.settle(id)` after the first paint.

**`visible`** — the resting state. The CSS transition from `pending` animates
the toast into view. The auto-dismiss timer is running.

**`paused`** — the auto-dismiss timer is suspended. The toast stays visible
until the pause is lifted. `ToastItem` enters this state in three situations:
the user hovers the toast, the user begins a swipe gesture, or the page becomes
hidden. When the interaction ends or the page becomes visible again, the toast
returns to `visible` with the timer restarted for the remaining duration.

**`dismissing`** — the exit animation plays. `useDismissTransition` listens for
`transitionend` and then removes the entry from the store. A fallback timeout
ensures removal if the event never fires.

### Why not `@starting-style`?

The `Toaster` portals its toast list into whichever outlet is active (see
below). When the active outlet changes, React unmounts and remounts each
`ToastItem` in the new outlet. `@starting-style` would replay the entry
animation on every remount, because the browser treats each insertion as a new
element.

The `pending` → `visible` state machine avoids this. Because `settle()` is a
no-op for entries already `visible`, a remounted element is inserted directly
with `data-state="visible"`; no prior `pending` phase, so no transition fires.

## Outlet stack

When a modal `<dialog>` is open, the browser makes everything outside it
inert: including other top-layer elements like the toaster's popover. Toasts
remain visible but cannot receive hover or pointer events.

The outlet stack solves this. Each `<ToastOutlet>` is a `<div
popover="manual">` that registers itself on a module-level LIFO stack when
mounted. `Dialog` and `Drawer` render a `<ToastOutlet>` inside their
`<dialog>` element; the `Toaster` renders a default `<ToastOutlet>` as the
bottom of the stack.

Each outlet manages its own popover visibility. It subscribes to both the
outlet stack and the toast store, and calls `showPopover()` when it is the
active (topmost) outlet and toasts exist. It calls `hidePopover()` otherwise.
Because `showPopover()` promotes the outlet into the top layer _after_ the
dialog, it sits above the dialog and is not subject to its inertness.

The `Toaster` subscribes to the stack and portals `<ToastList>` into the
topmost outlet. When a dialog closes, its outlet unmounts and pops off the
stack. The `Toaster` falls back to the next outlet below. `pop` removes by
reference rather than position, so outlets that unmount out of order are
handled correctly.

## Auto-dismiss timer

The store owns the auto-dismiss timer. `settle()` starts a `setTimeout` for
the toast's duration. When a toast enters the `paused` state, the timer is
cleared and the remaining duration is stored. When the toast returns to
`visible`, a new timer is started for the remaining duration.

When the timer fires, the store transitions the toast to `dismissing`.

### Timeout bar

The timeout bar uses a CSS `@keyframes` animation. `Toast` sets
`animationPlayState: 'paused'` when the `isPaused` prop is `true`, freezing
the bar in place while the JS timer is also suspended.

The store keeps `startedAt` in sync with pauses and resumes. On each call to
`resume()`, `startedAt` is back-dated so that `Date.now() - startedAt` always
equals the total time the timer has been running. `ToastItem` captures elapsed
time once at mount via a `useState` initialiser. A negative `animationDelay`
of `-${elapsed}ms` causes the bar to resume from the correct position on portal
remounts.

## Animation split

Layout transitions (`grid-template-rows`, `margin-block-start`) live on the
`<li>`, while visual transitions (`transform`, `opacity`) live on an inner
`<div>`. This separation exists because animating both on the same element
caused `translateY(100%)` to resolve against the collapsing grid row height;
which approaches zero during the exit: producing a barely visible slide
instead of a full off-screen one.

## Visibility limit

`Toaster` accepts a `maxItems` prop (default `3`) controlling how many toasts
are visible at once. `ToastList` counts non-dismissing toasts from the end of
the array; any beyond the limit receive `data-is-masked`. The content layer
fades masked toasts to `opacity: 0`. Timers continue running on masked toasts
and clean them up on expiry.

Masking is purely presentational: the store has no awareness of the limit.
