import { render, screen, fireEvent } from "@testing-library/react";

import { ErrorIcon } from "#src/icons/error";
import { InfoIcon } from "#src/icons/info";

import { AlertBanner } from "../alert-banner";

test("renders an alert banner element", () => {
  const onDismiss = vi.fn();
  render(
    <AlertBanner
      icon={<InfoIcon />}
      variant="info"
      onDismiss={onDismiss}
      actions={<button>Learn More</button>}
    >
      Alert Banner Description
    </AlertBanner>,
  );

  expect(screen.getByText("Alert Banner Description")).toBeVisible();
  expect(screen.getByRole("button", { name: "Dismiss announcement" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Learn More" })).toBeVisible();
});

test("renders the description text", () => {
  render(<AlertBanner variant="info">Test description</AlertBanner>);
  expect(screen.getByText("Test description")).toBeVisible();
});

test("renders icon when provided", () => {
  const { container } = render(
    <AlertBanner icon={<InfoIcon />} variant="info">
      Test description
    </AlertBanner>,
  );
  expect(container.querySelector("svg")).toBeVisible();
});

test("renders dismiss button when onDismiss callback is provided", () => {
  const onDismiss = vi.fn();
  render(
    <AlertBanner onDismiss={onDismiss} variant="info">
      Test description
    </AlertBanner>,
  );

  const dismissButton = screen.getByRole("button", { name: "Dismiss announcement" });
  const icon = dismissButton.querySelector("svg[aria-hidden]");

  expect(icon).toBeVisible();
  expect(dismissButton).toBeVisible();
});

test("renders actions when provided", () => {
  render(
    <AlertBanner actions={<button>Learn More</button>} variant="info">
      Test description
    </AlertBanner>,
  );
  expect(screen.getByRole("button", { name: "Learn More" })).toBeVisible();
});

test("does not render icon when not provided", () => {
  const { container } = render(<AlertBanner variant="info">Test description</AlertBanner>);
  expect(container.querySelector("svg")).not.toBeInTheDocument();
});

test("does not render dismiss button when onDismiss is not provided", () => {
  render(<AlertBanner variant="info">Test description</AlertBanner>);
  const dismissButton = screen.queryByRole("button", { name: "Dismiss announcement" });
  expect(dismissButton).not.toBeInTheDocument();
});

test("does not render actions container when actions are not provided", () => {
  render(<AlertBanner variant="info">Test description</AlertBanner>);
  expect(screen.queryByRole("button", { name: "Learn More" })).not.toBeInTheDocument();
});

test("does not have a default role", () => {
  const { container } = render(<AlertBanner variant="info">Test description</AlertBanner>);
  expect(container.firstElementChild).not.toHaveAttribute("role");
});

test("accepts explicit role attribute", () => {
  const { container } = render(
    <AlertBanner variant="error" role="alert">
      Test description
    </AlertBanner>,
  );
  expect(container.firstElementChild).toHaveAttribute("role", "alert");
});

test("calls onDismiss callback when dismiss button is clicked", () => {
  const onDismiss = vi.fn();
  render(
    <AlertBanner onDismiss={onDismiss} variant="info">
      Test description
    </AlertBanner>,
  );
  const dismissButton = screen.getByRole("button", { name: "Dismiss announcement" });
  fireEvent.click(dismissButton);
  expect(onDismiss).toHaveBeenCalledTimes(1);
});

test.each(["error", "warning", "info"] as const)(
  "applies correct data-variant attribute for %s variant",
  (variant) => {
    const { container } = render(<AlertBanner variant={variant}>Test description</AlertBanner>);
    expect(container.firstElementChild).toHaveAttribute("data-variant", variant);
  },
);

test("forwards additional props to the container element", () => {
  const { container } = render(
    <AlertBanner data-testid="alert-banner" variant="info">
      Test description
    </AlertBanner>,
  );
  expect(screen.getByTestId("alert-banner")).toBe(container.firstElementChild);
});

test("renders complete alert banner with all features", () => {
  const onDismiss = vi.fn();
  render(
    <AlertBanner
      icon={<ErrorIcon aria-label="Error" />}
      variant="error"
      onDismiss={onDismiss}
      actions={
        <>
          <button>Action 1</button>
          <button>Action 2</button>
        </>
      }
    >
      Critical system outage
    </AlertBanner>,
  );

  expect(screen.getByText("Critical system outage")).toBeVisible();
  expect(screen.getByRole("button", { name: "Dismiss announcement" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Action 1" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Action 2" })).toBeVisible();
});
