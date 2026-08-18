import { render, screen } from "@testing-library/react";

import { FormLayoutSectionDescription } from "../description";
import { FormLayoutSection } from "../section";
import { FormLayoutSectionTitle } from "../title";

test("renders a section element", () => {
  render(<FormLayoutSection data-testid="section">content</FormLayoutSection>);
  expect(screen.getByTestId("section").tagName).toBe("SECTION");
});

test("renders children", () => {
  render(<FormLayoutSection>Test content</FormLayoutSection>);
  expect(screen.getByText("Test content")).toBeVisible();
});

test("forwards additional props to the underlying element", () => {
  render(<FormLayoutSection data-testid="section">content</FormLayoutSection>);
  expect(screen.getByTestId("section")).toBeVisible();
});

test("merges className with the default class", () => {
  render(
    <FormLayoutSection className="custom-class" data-testid="section">
      content
    </FormLayoutSection>,
  );
  expect(screen.getByTestId("section")).toHaveClass("custom-class");
});

test("wires aria-labelledby to FormLayout.SectionTitle automatically", () => {
  render(
    <FormLayoutSection data-testid="section">
      <FormLayoutSectionTitle>Section title</FormLayoutSectionTitle>
    </FormLayoutSection>,
  );
  const section = screen.getByTestId("section");
  const heading = screen.getByRole("heading", { name: "Section title" });
  expect(section).toHaveAttribute("aria-labelledby", heading.id);
});

test("wires aria-describedby to FormLayout.SectionDescription automatically", () => {
  render(
    <FormLayoutSection data-testid="section">
      <FormLayoutSectionDescription>Add contact details.</FormLayoutSectionDescription>
    </FormLayoutSection>,
  );
  const section = screen.getByTestId("section");
  const description = screen.getByText("Add contact details.");
  expect(section).toHaveAttribute("aria-describedby", description.id);
});

test("consumer-supplied aria-labelledby overrides auto-wired value", () => {
  render(
    <FormLayoutSection aria-labelledby="custom-id" data-testid="section">
      content
    </FormLayoutSection>,
  );
  expect(screen.getByTestId("section")).toHaveAttribute("aria-labelledby", "custom-id");
});

test("aria-labelledby is not set when aria-label is provided", () => {
  render(
    <FormLayoutSection aria-label="My section" data-testid="section">
      content
    </FormLayoutSection>,
  );
  expect(screen.getByTestId("section")).not.toHaveAttribute("aria-labelledby");
});

test("consumer-supplied id on FormLayout.SectionTitle overrides auto-wired titleId", () => {
  render(
    <FormLayoutSection data-testid="section">
      <FormLayoutSectionTitle id="custom-title-id">Section title</FormLayoutSectionTitle>
    </FormLayoutSection>,
  );
  expect(screen.getByRole("heading", { name: "Section title" })).toHaveAttribute(
    "id",
    "custom-title-id",
  );
});
