import type { Dispatch, SetStateAction } from "react";

import { useListboxState } from "../use-state";

test("is typed as `string | readonly string[]` state", () => {
  expectTypeOf(useListboxState)
    .parameter(0)
    .toEqualTypeOf<string | readonly string[] | (() => string | readonly string[])>();
  expectTypeOf(useListboxState).returns.toEqualTypeOf<
    [string | readonly string[], Dispatch<SetStateAction<string | readonly string[]>>]
  >();
});
