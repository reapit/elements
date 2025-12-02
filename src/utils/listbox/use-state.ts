import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

/**
 * A thin useState wrapper that bakes in the type of state expected by a Listbox; specifically,
 * a string or readonly array of strings.
 */
export function useListboxState(
  initialState: string | readonly string[] | (() => string | readonly string[]),
): [string | readonly string[], Dispatch<SetStateAction<string | readonly string[]>>] {
  return useState(initialState)
}
