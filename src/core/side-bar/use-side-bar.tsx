import { useCallback, useMemo, useState } from 'react'

export namespace useSideBar {
  export type State = 'collapsed' | 'expanded'

  export interface Result {
    expand: () => void
    state: State
    setState: (state: State) => void
    toggle: () => void
  }
}

/**
 * @deprecated Use `UseSideBar.State` instead
 */
export type SideBarState = useSideBar.State

/**
 * @deprecated Use `UseSideBar.Result` instead
 */
export interface UseSideBarResult extends useSideBar.Result {}

/**
 * Manages the collapsed/expanded state of the side bar and provides setters for changing that state.
 */
export function useSideBar(initialState: useSideBar.State | (() => useSideBar.State) = 'expanded'): useSideBar.Result {
  const [state, setState] = useState(initialState)

  const expand = useCallback(() => setState('expanded'), [])
  const toggle = useCallback(
    () =>
      setState((prev) => {
        return prev === 'collapsed' ? 'expanded' : 'collapsed'
      }),
    [],
  )

  return useMemo(() => ({ expand, state, setState, toggle }), [expand, state, setState, toggle])
}
