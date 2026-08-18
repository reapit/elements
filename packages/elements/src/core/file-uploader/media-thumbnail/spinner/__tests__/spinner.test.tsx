import { render } from "@testing-library/react";

import { FileUploaderSpinner } from "../spinner";

test("is hidden from assistive technology", () => {
  const { container } = render(<FileUploaderSpinner />);
  expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
});

test("renders a track and an indicator circle", () => {
  const { container } = render(<FileUploaderSpinner />);
  expect(container.querySelectorAll("circle")).toHaveLength(2);
});
