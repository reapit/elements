import { render, screen } from "@testing-library/react";

import { OfficeItem } from "../office-item";

test("renders an option element", () => {
  render(<OfficeItem value="test-value">Office name</OfficeItem>);
  expect(screen.getByRole("option", { name: "Office name" })).toBeVisible();
});

test('always renders as a button element with type="button"', () => {
  render(<OfficeItem value="test-value">Office name</OfficeItem>);
  const option = screen.getByRole("option");
  expect(option.tagName).toBe("BUTTON");
  expect(option).toHaveAttribute("type", "button");
});

test("can display a badge", () => {
  render(
    <OfficeItem value="test-value" badge="Badge">
      Office name
    </OfficeItem>,
  );
  expect(screen.getByText("Badge")).toBeVisible();
});

test("has an `aria-details` attribute when a badge is provided", () => {
  render(
    <OfficeItem badge="Badge" value="test-value">
      Office name
    </OfficeItem>,
  );
  expect(screen.getByRole("option")).toHaveAttribute("aria-details");
});

test("does not have an `aria-details` attribute when no badge is provided", () => {
  render(<OfficeItem value="test-value">Office name</OfficeItem>);
  expect(screen.getByRole("option")).not.toHaveAttribute("aria-details");
});

test("renders a check icon", () => {
  const { container } = render(<OfficeItem value="test-value">Office name</OfficeItem>);

  // Check icon is rendered within an aria-hidden container
  const checkIconContainer = container.querySelector('[aria-hidden="true"]');
  expect(checkIconContainer).toBeInTheDocument();

  // Verify the SVG icon is present
  const icon = checkIconContainer?.querySelector("svg");
  expect(icon).toBeInTheDocument();
});

test("does not render badge container when badge is not provided", () => {
  const { container } = render(<OfficeItem value="test-value">Office name</OfficeItem>);

  // Badge container should not exist when badge is not provided
  const badges = container.querySelectorAll("[id]");
  const hasBadge = Array.from(badges).some((el) => el.textContent?.includes("Badge"));
  expect(hasBadge).toBe(false);
});

test("forwards additional props to the option element", () => {
  render(
    <OfficeItem value="test-value" data-testid="custom-option">
      Office name
    </OfficeItem>,
  );
  expect(screen.getByTestId("custom-option")).toBe(screen.getByRole("option"));
});

test("applies aria-selected attribute when provided", () => {
  render(
    <OfficeItem value="test-value" aria-selected={true}>
      Office name
    </OfficeItem>,
  );
  expect(screen.getByRole("option")).toHaveAttribute("aria-selected", "true");
});

test("applies aria-checked attribute when provided", () => {
  render(
    <OfficeItem value="test-value" aria-checked={true}>
      Office name
    </OfficeItem>,
  );
  expect(screen.getByRole("option")).toHaveAttribute("aria-checked", "true");
});

test("has aria-labelledby attribute pointing to label element", () => {
  render(<OfficeItem value="test-value">Office name</OfficeItem>);
  const option = screen.getByRole("option");
  const labelledBy = option.getAttribute("aria-labelledby");
  expect(labelledBy).toBeTruthy();

  // Verify the label element exists with that ID
  const labelElement = document.getElementById(labelledBy!);
  expect(labelElement).toBeInTheDocument();
  expect(labelElement).toHaveTextContent("Office name");
});
