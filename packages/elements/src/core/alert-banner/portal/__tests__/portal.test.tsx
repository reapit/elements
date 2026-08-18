import { render, screen } from "@testing-library/react";

import { AlertBannerOutlet } from "../../outlet";
import { AlertBannerPortal } from "../portal";

test("does not render when outlet does not exist", () => {
  render(
    <AlertBannerPortal>
      <div data-testid="portal-content">Portal content</div>
    </AlertBannerPortal>,
  );

  expect(screen.queryByTestId("portal-content")).not.toBeInTheDocument();
});

test("renders children when outlet exists", () => {
  // Set up outlet first
  render(<AlertBannerOutlet id="test-outlet" data-testid="outlet" />);

  // Then render portal
  render(
    <AlertBannerPortal outletId="test-outlet">
      <div data-testid="portal-content">Portal content</div>
    </AlertBannerPortal>,
  );

  expect(screen.getByTestId("portal-content")).toBeVisible();
});

test("renders to default outlet when no id provided", () => {
  // Set up default outlet
  render(<AlertBannerOutlet data-testid="default-outlet" />);

  // Then render portal without id
  render(
    <AlertBannerPortal>
      <div data-testid="portal-content">Portal content</div>
    </AlertBannerPortal>,
  );

  expect(screen.getByTestId("portal-content")).toBeVisible();
});

test("forwards additional props to portal children", () => {
  render(<AlertBannerOutlet id="test-outlet" />);

  render(
    <AlertBannerPortal outletId="test-outlet">
      <div data-testid="portal-content" className="custom-class">
        Portal content
      </div>
    </AlertBannerPortal>,
  );

  const portalContent = screen.getByTestId("portal-content");
  expect(portalContent).toHaveClass("custom-class");
});

test("can render multiple portals to same outlet", () => {
  render(<AlertBannerOutlet id="test-outlet" />);

  render(
    <>
      <AlertBannerPortal outletId="test-outlet">
        <div data-testid="content-1">Content 1</div>
      </AlertBannerPortal>
      <AlertBannerPortal outletId="test-outlet">
        <div data-testid="content-2">Content 2</div>
      </AlertBannerPortal>
    </>,
  );

  expect(screen.getByTestId("content-1")).toBeVisible();
  expect(screen.getByTestId("content-2")).toBeVisible();
});

test("does not render to wrong outlet", () => {
  render(<AlertBannerOutlet id="wrong-outlet" />);

  render(
    <AlertBannerPortal outletId="correct-outlet">
      <div data-testid="portal-content">Portal content</div>
    </AlertBannerPortal>,
  );

  expect(screen.queryByTestId("portal-content")).not.toBeInTheDocument();
});
