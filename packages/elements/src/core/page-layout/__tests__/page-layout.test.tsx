import { render, screen } from "@testing-library/react";

import { PageLayout } from "../page-layout";

test("renders a div element", () => {
  const { container } = render(<PageLayout id="my-page" scroll="self" />);
  expect(container.firstElementChild?.tagName).toBe("DIV");
});

test('has data-overflow="auto" attribute when scroll="self"', () => {
  const { container } = render(<PageLayout id="my-page" scroll="self" />);
  expect(container.firstElementChild).toHaveAttribute("data-overflow", "auto");
});

test('does NOT have data-overflow attribute when scroll="body"', () => {
  const { container } = render(<PageLayout id="my-page" scroll="body" />);
  expect(container.firstElementChild).not.toHaveAttribute("data-overflow");
});

// NOTE: Skipped because the assertion doesn't currently work as expected. Unsure if it's happy-dom
// or @testing-library/jest-dom that owns the behaviour.
// See https://github.com/testing-library/jest-dom/issues/649
test.skip("applies specified background colour", () => {
  const { container } = render(
    <PageLayout backgroundColour="--colour-fill-neutral-lightest" id="my-page" scroll="self" />,
  );
  expect(container.firstElementChild).toHaveStyle({
    backgroundColor: "var(--colour-fill-neutral-lightest)",
  });
});

test("provides id and scroll setting via PageLayoutContext", () => {
  expect.assertions(2);
  render(
    <PageLayout id="my-page" scroll="self">
      <PageLayout.Context.Consumer>
        {(context) => {
          expect(context?.rootId).toBe("my-page");
          expect(context?.scroll).toBe("self");
          return null;
        }}
      </PageLayout.Context.Consumer>
    </PageLayout>,
  );
});

test("forwards additional attributes to the div element", () => {
  const { container } = render(<PageLayout data-testid="test-id" id="my-page" scroll="self" />);
  expect(screen.getByTestId("test-id")).toBe(container.firstElementChild);
});
