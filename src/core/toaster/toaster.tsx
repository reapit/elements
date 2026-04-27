import { ToastList } from './toast-list'
import { ToastOutlet } from './toast-outlet'
import { outletStack } from './outlet-stack'
import { toastStore } from './store'
import { createPortal } from 'react-dom'
import { useEffect, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'

export namespace Toaster {
  /** The position of the toaster on the screen. */
  export type Position = 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right'

  export interface Props {
    /**
     * Allows the Toaster to wrap the rest of an application. This is useful when migrating from
     * a context-based toast system like the deprecated Snack.
     */
    children?: ReactNode

    /**
     * The screen position for the toast stack.
     *
     * @default 'bottom-center'
     */
    position?: Position

    /**
     * The maximum number of toasts visible at once. Older toasts beyond this
     * limit are masked (faded out) but remain in the DOM until their timers
     * expire.
     *
     * @default 3
     */
    maxItems?: number
  }
}

/**
 * Renders the toast notification stack. Mount one `Toaster` near the root of
 * your application. Toasts are triggered imperatively via the `toast()` helper
 * and displayed in the browser's top layer — above native `<dialog>` elements
 * — using `popover="manual"`.
 *
 * When a `ToastOutlet` is mounted inside a modal dialog or drawer, the
 * `Toaster` automatically portals its toast list into that outlet instead,
 * ensuring toasts remain interactive above the overlay.
 */
export function Toaster({ position = 'bottom-center', maxItems = 3, children }: Toaster.Props) {
  const activeOutlet = useSyncExternalStore(outletStack.subscribe, outletStack.getSnapshot)
  const toasts = useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot)

  const hasToasts = toasts.length > 0

  useEffect(function clearToastsOnUnmount() {
    return () => {
      toastStore.clear()
    }
  }, [])

  return (
    <>
      <ToastOutlet />
      {activeOutlet && hasToasts && createPortal(<ToastList position={position} maxItems={maxItems} />, activeOutlet)}
      {children}
    </>
  )
}

Toaster.Outlet = ToastOutlet
