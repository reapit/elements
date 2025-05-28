import { useCallback, useMemo, useState } from 'react'

export type SideBarState = 'collapsed' | 'expanded'

export interface UseSideBarResult {
  state: SideBarState
  expand: () => void
  collapse: () => void
  toggle: () => void
}

export function useSideBar(initialState: SideBarState = 'expanded'): UseSideBarResult {
  const [state, setState] = useState(initialState)

  const expand = useCallback(() => setState('expanded'), [])
  const collapse = useCallback(() => setState('collapsed'), [])
  const toggle = useCallback(() => setState((prev) => (prev === 'collapsed' ? 'expanded' : 'collapsed')), [])

  return useMemo<UseSideBarResult>(() => ({ expand, collapse, state, toggle }), [expand, state, toggle])
}
