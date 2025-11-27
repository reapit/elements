import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

/**
 * A thin useState wrapper that bakes in the type of state expected by a Combobox; specifically,
 * a readonly array of strings.
 */
export function useComboboxState(
  initialState: readonly string[] | (() => readonly string[]),
): [readonly string[], Dispatch<SetStateAction<readonly string[]>>] {
  return useState(initialState)
}
