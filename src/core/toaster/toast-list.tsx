import { elToastList } from './styles'
import { toastStore } from './store'
import { ToastItem } from './toast-item'
import { useSyncExternalStore } from 'react'

import type { Toaster } from './toaster'

export namespace ToastList {
  export interface Props {
    /** The screen position for the toast stack. */
    position: Toaster.Position
    /** The maximum number of visible toasts. */
    maxItems: number
  }
}

/**
 * Renders the list of active toasts from the store. This is a pure
 * presentational component — it subscribes to the store and maps entries to
 * `ToastItem` elements inside a positioned `<ul>`.
 *
 * The `Toaster` portals this component into whichever `ToastOutlet` is
 * currently at the top of the outlet stack.
 */
export function ToastList({ position, maxItems }: ToastList.Props) {
  const toasts = useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot)

  // From the non-dismissing toasts, everything except the last maxItems is
  // masked. Dismissing toasts are already exiting and should never be masked.
  // Clamp to a minimum of 1 so that slice(0, -0) never returns an empty array.
  const clampedMaxItems = Math.max(1, maxItems)
  const visible = toasts.filter((t) => t.state !== 'dismissing')
  const maskedIds = new Set(visible.slice(0, -clampedMaxItems).map((t) => t.id))

  return (
    <ul className={elToastList} data-position={position}>
      {toasts.map((t) => (
        <ToastItem
          key={t.id}
          id={t.id}
          variant={t.variant}
          message={t.message}
          icon={t.icon}
          duration={t.duration}
          state={t.state}
          startedAt={t.startedAt}
          position={position}
          isMasked={maskedIds.has(t.id)}
        />
      ))}
    </ul>
  )
}
