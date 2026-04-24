import { toastStore } from './store'

import type { ReactNode } from 'react'
import type { Toast } from '#src/core/toast/toast'

/** Default auto-dismiss duration in milliseconds. */
const DEFAULT_DURATION = 4000

export interface ToastOptions {
  /**
   * Auto-dismiss duration in milliseconds. Defaults to 4000. Set to `Infinity`
   * to keep the toast visible until dismissed manually.
   *
   * Finite values below 4000ms are clamped to 4000ms to prevent
   * imperceptibly short toasts.
   */
  duration?: number
  /** Icon to display. Only used for the `neutral` variant. */
  icon?: ReactNode
}

function createToast(variant: Toast.Variant, message: ReactNode, options: ToastOptions = {}): string {
  const duration = options.duration ?? DEFAULT_DURATION
  return toastStore.add({ variant, message, icon: options.icon, duration })
}

/**
 * Imperatively show a toast notification. Returns the toast ID, which can be passed to
 * `toast.dismiss()` to remove it programmatically.
 *
 * Accepts an optional `variant` option (defaults to `'neutral'`). For typed convenience,
 * prefer the `toast.success`, `toast.error`, `toast.info`, `toast.warning`, and
 * `toast.neutral` helpers instead.
 */
export function toast(message: ReactNode, options?: ToastOptions & { variant?: Toast.Variant }): string {
  return createToast(options?.variant ?? 'neutral', message, options)
}

/** Show a success toast. */
toast.success = (message: ReactNode, options?: ToastOptions): string => createToast('success', message, options)

/** Show an error toast. */
toast.error = (message: ReactNode, options?: ToastOptions): string => createToast('error', message, options)

/** Show an informational toast. */
toast.info = (message: ReactNode, options?: ToastOptions): string => createToast('info', message, options)

/** Show a warning toast. */
toast.warning = (message: ReactNode, options?: ToastOptions): string => createToast('warning', message, options)

/** Show a neutral toast. */
toast.neutral = (message: ReactNode, options?: ToastOptions): string => createToast('neutral', message, options)

/**
 * Dismiss a toast by its ID. Triggers the exit animation then removes it from the DOM.
 * The ID is returned by the `toast()` helper when the toast is created.
 */
toast.dismiss = (id: string): void => {
  toastStore.dismiss(id)
}
