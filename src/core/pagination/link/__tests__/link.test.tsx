import { render, screen } from "@testing-library/react";

import { PaginationLink } from "../link";

test("renders as a link element", () => {
  render(<PaginationLink href="https://fake.url" variant="next-page" />);
  expect(screen.getByRole("link")).toBeVisible();
});
