import { render, screen } from "@testing-library/react";

import { MainContainer } from "../main-container";

test("renders a div element by default", () => {
  const { container } = render(<MainContainer size="fluid" />);
  expect(container.firstElementChild?.tagName).toBe("DIV");
});

test("can render as an article", () => {
  render(<MainContainer as="article" size="fluid" />);
  expect(screen.getByRole("article")).toBeVisible();
});

test("can render as a complementary element", () => {
  render(<MainContainer as="aside" size="fluid" />);
  expect(screen.getByRole("complementary")).toBeVisible();
});

test("can render as a region", () => {
  // NOTE: the aria-label provides the section with an accessible name. This causes the implicit
  // role of the element to be "region".
  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section#technical_summary
  render(<MainContainer aria-label="Overview" as="section" size="fluid" />);
  expect(screen.getByRole("region")).toBeVisible();
});

test("has data-size attribute set to specified size", () => {
  const { container } = render(<MainContainer size="wide" />);
  expect(container.firstElementChild).toHaveAttribute("data-size", "wide");
});

test("child element has data-template attribute set to specified template", () => {
  render(<MainContainer as="article" size="wide" template="two-columns-asymmetrical-end" />);
  expect(screen.getByRole("article").firstElementChild).toHaveAttribute(
    "data-template",
    "two-columns-asymmetrical-end",
  );
});

// NOTE: Skipped because the assertion doesn't currently work as expected. Unsure if it's happy-dom
// or @testing-library/jest-dom that owns the behaviour.
// See https://github.com/testing-library/jest-dom/issues/649
test.skip("applies specified background colour", () => {
  const { container } = render(
    <MainContainer backgroundColour="--colour-fill-neutral-lightest" size="narrow" />,
  );
  expect(container.firstElementChild).toHaveStyle({
    backgroundColor: "var(--colour-fill-neutral-lightest)",
  });
});

test("forwards additional attributes to the div element", () => {
  const { container } = render(<MainContainer data-testid="test-id" size="fluid" />);
  expect(screen.getByTestId("test-id")).toBe(container.firstElementChild);
});
