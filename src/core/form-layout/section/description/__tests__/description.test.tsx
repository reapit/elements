import { render, screen } from "@testing-library/react";

import { FormLayoutSection } from "../../section";
import { FormLayoutSectionDescription } from "../description";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <FormLayoutSection>{children}</FormLayoutSection>;
}

test("renders a paragraph element", () => {
  const { container } = render(
    <FormLayoutSectionDescription>content</FormLayoutSectionDescription>,
    {
      wrapper: Wrapper,
    },
  );
  expect(container.querySelector("p")).toBeVisible();
});

test("renders children as the paragraph text", () => {
  render(<FormLayoutSectionDescription>Section description text</FormLayoutSectionDescription>, {
    wrapper: Wrapper,
  });
  expect(screen.getByText("Section description text")).toBeVisible();
});

test("forwards additional props to the underlying element", () => {
  render(
    <FormLayoutSectionDescription data-testid="description">content</FormLayoutSectionDescription>,
    {
      wrapper: Wrapper,
    },
  );
  expect(screen.getByTestId("description")).toBeVisible();
});

test("merges className with the default class", () => {
  render(
    <FormLayoutSectionDescription className="custom-class" data-testid="description">
      content
    </FormLayoutSectionDescription>,
    { wrapper: Wrapper },
  );
  expect(screen.getByTestId("description")).toHaveClass("custom-class");
});

test("wires id to the auto-generated descriptionId from context", () => {
  render(
    <FormLayoutSection data-testid="section">
      <FormLayoutSectionDescription>Section description</FormLayoutSectionDescription>
    </FormLayoutSection>,
  );
  const section = screen.getByTestId("section");
  const description = screen.getByText("Section description");
  expect(section).toHaveAttribute("aria-describedby", description.id);
});

test("consumer-supplied id overrides the auto-wired descriptionId", () => {
  render(
    <FormLayoutSectionDescription id="custom-id">Section description</FormLayoutSectionDescription>,
    {
      wrapper: Wrapper,
    },
  );
  expect(screen.getByText("Section description")).toHaveAttribute("id", "custom-id");
});

test("throws when rendered outside a FormLayout or FormLayout.Section", () => {
  expect(() =>
    render(<FormLayoutSectionDescription>Section description</FormLayoutSectionDescription>),
  ).toThrow("useFormLayoutContext requires a FormLayout or FormLayout.Section ancestor");
});
