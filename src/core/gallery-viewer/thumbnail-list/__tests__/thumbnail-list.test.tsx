import { render, screen } from "@testing-library/react";

import { GalleryViewerThumbnailList } from "../thumbnail-list";

test("renders a <ul> element", () => {
  render(<GalleryViewerThumbnailList />);
  expect(screen.getByRole("list")).toBeVisible();
});

test("renders all children", async () => {
  render(
    <GalleryViewerThumbnailList>
      <li>Item 1</li>
      <li>Item 2</li>
    </GalleryViewerThumbnailList>,
  );
  const items = await screen.findAllByRole("listitem");
  expect(items).toHaveLength(2);
});

test("forwards additional props to the <ul> element", () => {
  render(<GalleryViewerThumbnailList data-testid="thumbnail-list" className="custom-class" />);
  expect(screen.getByTestId("thumbnail-list")).toBeVisible();
  expect(screen.getByTestId("thumbnail-list")).toHaveClass("custom-class");
});

test("exposes GalleryViewerThumbnailList.Item", () => {
  expect(GalleryViewerThumbnailList.Item).toBeDefined();
});

test("exposes GalleryViewerThumbnailList.ButtonItem", () => {
  expect(GalleryViewerThumbnailList.ButtonItem).toBeDefined();
});
