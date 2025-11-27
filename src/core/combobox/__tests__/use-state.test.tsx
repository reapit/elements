import { useComboboxState } from '../use-state'
import type { Dispatch, SetStateAction } from 'react'

test('is typed as readonly string[] state', () => {
  expectTypeOf(useComboboxState).parameter(0).toEqualTypeOf<readonly string[] | (() => readonly string[])>()
  expectTypeOf(useComboboxState).returns.toEqualTypeOf<
    [readonly string[], Dispatch<SetStateAction<readonly string[]>>]
  >()
})
