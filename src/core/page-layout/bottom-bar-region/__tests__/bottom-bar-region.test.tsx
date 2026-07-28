import { render, screen } from "@testing-library/react";

import { PageLayoutBottomBarRegion } from "../bottom-bar-region";

test("renders a div element", () => {
  const { container } = render(<PageLayoutBottomBarRegion />);
  expect(container.firstElementChild?.tagName).toBe("DIV");
});

test("forwards additional attributes to the div element", () => {
  const { container } = render(<PageLayoutBottomBarRegion data-testid="test-id" />);
  expect(screen.getByTestId("test-id")).toBe(container.firstElementChild);
});
