import { useCallback, useMemo, useState } from 'react'

export type SideBarState = 'collapsed' | 'expanded'

export interface UseSideBarResult {
  expand: () => void
  state: SideBarState
  setState: (state: SideBarState) => void
  toggle: () => void
}

/**
 * Manages the collapsed/expanded state of the side bar and provides setters for changing that state.
 */
export function useSideBar(initialState: SideBarState | (() => SideBarState) = 'expanded'): UseSideBarResult {
  const [state, setState] = useState(initialState)

  const expand = useCallback(() => setState('expanded'), [])
  const toggle = useCallback(() => setState((prev) => (prev === 'collapsed' ? 'expanded' : 'collapsed')), [])

  return useMemo<UseSideBarResult>(() => ({ expand, state, setState, toggle }), [expand, state, setState, toggle])
}
