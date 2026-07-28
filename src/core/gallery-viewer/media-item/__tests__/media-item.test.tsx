import { render, screen } from "@testing-library/react";

import { GalleryViewerMediaItem } from "../media-item";

test("renders a figure element", () => {
  const { container } = render(
    <GalleryViewerMediaItem id="item-1">Content</GalleryViewerMediaItem>,
  );
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  expect(container.querySelector("figure")).toBeInTheDocument();
});

test("sets the id attribute", () => {
  render(
    <GalleryViewerMediaItem id="item-1" data-testid="item">
      Content
    </GalleryViewerMediaItem>,
  );
  expect(screen.getByTestId("item")).toHaveAttribute("id", "item-1");
});

test("forwards className", () => {
  render(
    <GalleryViewerMediaItem id="item-1" className="custom" data-testid="item">
      Content
    </GalleryViewerMediaItem>,
  );
  expect(screen.getByTestId("item")).toHaveClass("custom");
});

test("forwards additional props", () => {
  render(
    <GalleryViewerMediaItem id="item-1" data-testid="item">
      Content
    </GalleryViewerMediaItem>,
  );
  expect(screen.getByTestId("item")).toBeVisible();
});

test('does not set role="group"', () => {
  render(<GalleryViewerMediaItem id="item-1">Content</GalleryViewerMediaItem>);
  expect(screen.queryByRole("group")).toBeNull();
});

test("does not set aria-roledescription", () => {
  render(
    <GalleryViewerMediaItem id="item-1" data-testid="item">
      Content
    </GalleryViewerMediaItem>,
  );
  expect(screen.getByTestId("item")).not.toHaveAttribute("aria-roledescription");
});
