import { render, screen } from "@testing-library/react";

import { PaginationInfo } from "../info";

test("displays given page number and count in the correct format", () => {
  render(<PaginationInfo pageNumber={1} pageCount={10} />);
  expect(screen.getByText("1 of 10")).toBeVisible();
});
