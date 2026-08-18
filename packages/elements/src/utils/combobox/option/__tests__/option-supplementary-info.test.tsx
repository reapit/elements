import { render, screen } from "@testing-library/react";

import { ComboboxOptionAdditionalInfo } from "../option-additional-info";

test("renders as a span element", () => {
  const { container } = render(<ComboboxOptionAdditionalInfo>Text</ComboboxOptionAdditionalInfo>);
  const span = container.querySelector("span");
  expect(span?.tagName).toBe("SPAN");
  expect(span).toBeVisible();
});

test("can display supplementary info text", () => {
  render(<ComboboxOptionAdditionalInfo>Supplementary text</ComboboxOptionAdditionalInfo>);
  expect(screen.getByText("Supplementary text")).toBeVisible();
});

test("can display an icon", () => {
  render(<ComboboxOptionAdditionalInfo icon="Icon">Text</ComboboxOptionAdditionalInfo>);
  expect(screen.getByText("Icon")).toBeVisible();
});

test("can display a badge", () => {
  render(<ComboboxOptionAdditionalInfo badge="Badge">Text</ComboboxOptionAdditionalInfo>);
  expect(screen.getByText("Badge")).toBeVisible();
});

test("can display an icon, supplementary text and a badge", () => {
  render(
    <ComboboxOptionAdditionalInfo icon="Icon" badge="Badge">
      Text
    </ComboboxOptionAdditionalInfo>,
  );
  expect(screen.getByText("Icon")).toBeVisible();
  expect(screen.getByText("Text")).toBeVisible();
  expect(screen.getByText("Badge")).toBeVisible();
});

test("does not render icon container when icon is not provided", () => {
  const { container } = render(<ComboboxOptionAdditionalInfo>Text</ComboboxOptionAdditionalInfo>);

  const iconContainer = container.querySelector(
    ".el-combobox-option-supplementary-info-icon-container",
  );
  expect(iconContainer).toBeNull();
});

test("does not render badge container when badge is not provided", () => {
  const { container } = render(<ComboboxOptionAdditionalInfo>Text</ComboboxOptionAdditionalInfo>);

  const badgeContainer = container.querySelector(".el-combobox-option-badge-container");
  expect(badgeContainer).toBeNull();
});

test("forwards additional props to the span element", () => {
  render(
    <ComboboxOptionAdditionalInfo data-testid="custom-info">Text</ComboboxOptionAdditionalInfo>,
  );
  expect(screen.getByTestId("custom-info")).toBeVisible();
});
