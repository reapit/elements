import { render, screen, waitFor } from "@testing-library/react";

import { AlertBanner } from "../../alert-banner";
import { AlertBannerOutlet } from "../outlet";

test("renders outlet element with default ID", () => {
  render(<AlertBannerOutlet />);

  const outlet = document.getElementById("alert-banner-outlet");
  expect(outlet).toHaveAttribute("id", "alert-banner-outlet");
});

test("renders outlet element with custom ID", () => {
  render(<AlertBannerOutlet id="custom-outlet" />);

  const outlet = document.getElementById("custom-outlet");
  expect(outlet).toBeVisible();
});

test('has aria-live="polite" attribute', () => {
  render(<AlertBannerOutlet id="custom-outlet" />);

  const outlet = document.getElementById("custom-outlet");
  expect(outlet).toHaveAttribute("aria-live", "polite");
});

test("renders children when provided", () => {
  render(
    <AlertBannerOutlet>
      <div data-testid="child-element" data-variant="info">
        Child content
      </div>
    </AlertBannerOutlet>,
  );

  expect(screen.getByTestId("child-element")).toBeVisible();
  expect(screen.getByText("Child content")).toBeVisible();
});

test("applies default priority to hide all but highest priority banner", async () => {
  render(
    <AlertBannerOutlet>
      <AlertBanner data-testid="info-banner" variant="info">
        Info
      </AlertBanner>
      <AlertBanner data-testid="warning-banner" variant="warning">
        Warning
      </AlertBanner>
      <AlertBanner data-testid="error-banner" variant="error">
        Error
      </AlertBanner>
    </AlertBannerOutlet>,
  );

  await waitFor(() => {
    expect(screen.getByTestId("info-banner")).not.toBeVisible();
    expect(screen.getByTestId("warning-banner")).not.toBeVisible();
    expect(screen.getByTestId("error-banner")).toBeVisible();
  });
});

test("forwards additional props to outlet element", () => {
  render(<AlertBannerOutlet data-testid="test-outlet" className="custom-class" />);

  const outlet = screen.getByTestId("test-outlet");
  expect(outlet).toHaveClass("custom-class");
});
