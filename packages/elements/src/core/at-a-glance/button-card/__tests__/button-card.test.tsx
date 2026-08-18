import { render, screen } from "@testing-library/react";

import { AtAGlanceButtonCard } from "../button-card";

test("renders a button element", () => {
  render(<AtAGlanceButtonCard label="Test Label" displayValue="Test Value" />);
  expect(screen.getByRole("button", { name: "Test Label" })).toBeVisible();
});

test("displays label", () => {
  render(<AtAGlanceButtonCard label="Test Label" displayValue="Test Value" />);
  expect(screen.getByText("Test Label")).toBeVisible();
});

test("displays value", () => {
  render(<AtAGlanceButtonCard label="Test Label" displayValue="$12,345" />);
  expect(screen.getByText("$12,345")).toBeVisible();
  expect(screen.getByRole("button")).toHaveAccessibleDescription("$12,345");
});

test("displays description when provided", () => {
  render(
    <AtAGlanceButtonCard
      label="Test Label"
      displayValue="Test Value"
      description="Test Description"
    />,
  );
  expect(screen.getByText("Test Description")).toBeVisible();
  expect(screen.getByRole("button")).toHaveAccessibleDescription("Test Description Test Value");
});

test("does not display description when not provided", () => {
  render(<AtAGlanceButtonCard label="Test Label" displayValue="Test Value" />);
  expect(screen.queryByText("Test Description")).not.toBeInTheDocument();
});

test("displays icon when provided", () => {
  render(
    <AtAGlanceButtonCard
      label="Test Label"
      displayValue="Test Value"
      icon={<svg data-testid="test-icon" />}
    />,
  );
  expect(screen.getByTestId("test-icon")).toBeVisible();
});

test("does not display icon when not provided", () => {
  render(<AtAGlanceButtonCard label="Test Label" displayValue="Test Value" />);
  expect(screen.queryByTestId("test-icon")).not.toBeInTheDocument();
});

test("applies vertical layout by default", () => {
  render(<AtAGlanceButtonCard label="Test Label" displayValue="Test Value" />);
  expect(screen.getByRole("button")).toHaveAttribute("data-layout", "vertical");
});

test("applies horizontal layout when specified", () => {
  render(<AtAGlanceButtonCard label="Test Label" displayValue="Test Value" layout="horizontal" />);
  expect(screen.getByRole("button")).toHaveAttribute("data-layout", "horizontal");
});

test("applies compact layout when specified", () => {
  render(<AtAGlanceButtonCard label="Test Label" displayValue="Test Value" layout="compact" />);
  expect(screen.getByRole("button")).toHaveAttribute("data-layout", "compact");
});

test("applies max-width when specified", () => {
  render(<AtAGlanceButtonCard label="Test Label" displayValue="Test Value" maxWidth="300px" />);
  expect(screen.getByRole("button")).toHaveStyle({ maxWidth: "300px" });
});

test("applies min-width when specified", () => {
  render(<AtAGlanceButtonCard label="Test Label" displayValue="Test Value" minWidth="200px" />);
  expect(screen.getByRole("button")).toHaveStyle({ minWidth: "200px" });
});

test("applies custom styles", () => {
  render(
    <AtAGlanceButtonCard label="Test Label" displayValue="Test Value" style={{ color: "red" }} />,
  );
  expect(screen.getByRole("button")).toHaveStyle({ color: "red" });
});

test('defaults to type="button"', () => {
  render(<AtAGlanceButtonCard label="Test Label" displayValue="Test Value" />);
  expect(screen.getByRole("button")).toHaveAttribute("type", "button");
});

test("applies correct type when specified", () => {
  render(<AtAGlanceButtonCard label="Test Label" displayValue="Test Value" type="submit" />);
  expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
});

test("does not call onClick when disabled", () => {
  const handleClick = vi.fn();

  render(
    <AtAGlanceButtonCard
      label="Test Label"
      displayValue="Test Value"
      onClick={handleClick}
      disabled
    />,
  );

  const button = screen.getByRole("button");
  button.click();
  expect(handleClick).not.toHaveBeenCalled();
});

test("supports aria-checked", () => {
  render(<AtAGlanceButtonCard label="Test Label" displayValue="Test Value" aria-checked={true} />);
  expect(screen.getByRole("button")).toHaveAttribute("aria-checked", "true");
});

test("supports aria-pressed", () => {
  render(<AtAGlanceButtonCard label="Test Label" displayValue="Test Value" aria-pressed={true} />);
  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
});

test("supports aria-selected", () => {
  render(<AtAGlanceButtonCard label="Test Label" displayValue="Test Value" aria-selected={true} />);
  expect(screen.getByRole("button")).toHaveAttribute("aria-selected", "true");
});

test("forwards additional props to the button", () => {
  render(
    <AtAGlanceButtonCard
      label="Test Label"
      displayValue="Test Value"
      data-testid="custom-button"
    />,
  );
  expect(screen.getByTestId("custom-button")).toBe(screen.getByRole("button"));
});
