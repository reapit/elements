import { render, screen } from "@testing-library/react";

import { Button } from "../button";

test("renders a button element", () => {
  render(
    <Button size="medium" variant="primary">
      Button
    </Button>,
  );
  expect(screen.getByRole("button")).toBeVisible();
});
