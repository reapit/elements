import { render, screen } from "@testing-library/react";

import { SplitButtonContext } from "../../context";
import { SplitButtonAction } from "../action";

test("renders a button element", () => {
  render(
    <SplitButtonContext.Provider value={{ busy: undefined, size: "medium", variant: "primary" }}>
      <SplitButtonAction
        aria-disabled={false}
        disabled={false}
        iconLeft={undefined}
        isBusy={false}
        isDestructive={false}
      >
        Button
      </SplitButtonAction>
    </SplitButtonContext.Provider>,
  );
  expect(screen.getByRole("button")).toBeVisible();
});
