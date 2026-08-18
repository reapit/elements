import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { OfficeSwitcherOfficeGroup } from "../office-group";

test("renders a details element", () => {
  render(<OfficeSwitcherOfficeGroup label="Test Group">Content</OfficeSwitcherOfficeGroup>);
  const details = screen.getByRole("group");
  expect(details.tagName).toBe("DETAILS");
});

test("renders the label in the summary element", () => {
  render(<OfficeSwitcherOfficeGroup label="Test Group">Content</OfficeSwitcherOfficeGroup>);
  expect(screen.getByText("Test Group")).toBeInTheDocument();
});

test("renders children", () => {
  render(<OfficeSwitcherOfficeGroup label="Test Group">Test Content</OfficeSwitcherOfficeGroup>);
  expect(screen.getByText("Test Content")).toBeInTheDocument();
});

test("supports the open prop", () => {
  render(
    <OfficeSwitcherOfficeGroup label="Test Group" open>
      Content
    </OfficeSwitcherOfficeGroup>,
  );
  const details = screen.getByRole("group");
  expect(details).toHaveAttribute("open");
  expect(details).toBeVisible();
});

test("applies custom className", () => {
  render(
    <OfficeSwitcherOfficeGroup label="Test Group" className="custom-class">
      Content
    </OfficeSwitcherOfficeGroup>,
  );
  const details = screen.getByRole("group");
  expect(details).toHaveClass("custom-class");
});

test("forwards other props to details element", () => {
  render(
    <OfficeSwitcherOfficeGroup label="Test Group" data-testid="test-details">
      Content
    </OfficeSwitcherOfficeGroup>,
  );
  expect(screen.getByTestId("test-details")).toBeInTheDocument();
});
