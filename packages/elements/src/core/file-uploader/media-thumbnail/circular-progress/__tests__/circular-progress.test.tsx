import { render } from "@testing-library/react";

import { FileUploaderCircularProgress } from "../circular-progress";

test("is hidden from assistive technology", () => {
  const { container } = render(<FileUploaderCircularProgress value={50} />);
  expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
});

test("renders a circle indicator for a partial value", () => {
  const { container } = render(<FileUploaderCircularProgress value={50} />);
  expect(container.querySelector("path")).toBeNull();
  expect(container.querySelectorAll("circle")).toHaveLength(2);
});

test("renders a full circle instead of a stroke indicator when value is 100", () => {
  const { container } = render(<FileUploaderCircularProgress value={100} />);
  expect(container.querySelector("path")).toBeNull();
  expect(container.querySelectorAll("circle")).toHaveLength(2);
});

test("renders a circle indicator with full dashoffset when value is 0", () => {
  const { container } = render(<FileUploaderCircularProgress value={0} />);
  expect(container.querySelector("path")).toBeNull();
  expect(container.querySelectorAll("circle")).toHaveLength(2);
});

test("clamps values above 100 to a full circle", () => {
  const { container } = render(<FileUploaderCircularProgress value={150} />);
  expect(container.querySelector("path")).toBeNull();
  expect(container.querySelectorAll("circle")).toHaveLength(2);
});

test("clamps values below 0 to a circle indicator with full dashoffset", () => {
  const { container } = render(<FileUploaderCircularProgress value={-10} />);
  expect(container.querySelector("path")).toBeNull();
  expect(container.querySelectorAll("circle")).toHaveLength(2);
});
