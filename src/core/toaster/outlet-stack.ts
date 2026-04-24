// Module-level stack of outlet elements, managed with a plain pub-sub so
// useSyncExternalStore can subscribe to changes.
//
// Each ToastOutlet pushes its DOM element onto the stack when it mounts and
// pops it when it unmounts. The Toaster subscribes to the stack and portals
// its ToastList into the topmost outlet.

let stack: HTMLElement[] = []
const listeners = new Set<() => void>()

function notify() {
  for (const listener of listeners) listener()
}

export const outletStack = {
  /** Returns the topmost outlet element, or null when the stack is empty. */
  getSnapshot: (): HTMLElement | null => stack[stack.length - 1] ?? null,

  subscribe: (listener: () => void): (() => void) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },

  /** Push an outlet element onto the top of the stack. */
  push: (el: HTMLElement): void => {
    stack = [...stack, el]
    notify()
  },

  /** Remove a specific outlet element from the stack. */
  pop: (el: HTMLElement): void => {
    stack = stack.filter((entry) => entry !== el)
    notify()
  },
}
